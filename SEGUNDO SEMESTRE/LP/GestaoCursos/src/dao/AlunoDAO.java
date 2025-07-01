package dao;

import factory.Conexao;
import modelo.Aluno;
import modelo.Curso;

/* imports para Relatórios */
import java.util.Map;
import java.util.HashMap;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


/**
 * Retorna um mapa com todos os cursos e suas respectivas listas de alunos, podendo filtrar apenas os alunos ativos.
 */

public class AlunoDAO {

    public Map<Curso, List<Aluno>> listarCursosComAlunos(boolean apenasAtivos) {
        Map<Curso, List<Aluno>> resultado = new HashMap<>();
        CursoDAO cursoDAO = new CursoDAO();
        List<Curso> cursos = cursoDAO.listarTodos();

        for (Curso curso : cursos) {
            List<Aluno> alunos = listarComStatus(curso.getIdCurso(), apenasAtivos);
            resultado.put(curso, alunos);
        }

        return resultado;
    }

    private List<Aluno> listarComStatus(int idCurso, boolean ativo) {
        List<Aluno> lista = new ArrayList<>();
        String sql = "SELECT a.*, c.nome AS nomeCurso FROM aluno a " +
                "INNER JOIN curso c ON a.curso = c.idCurso " +
                "WHERE a.curso = ? AND a.ativo = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurso);
            stmt.setInt(2, ativo ? 1 : 0);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Aluno aluno = new Aluno();
                aluno.setIdAluno(rs.getInt("idAluno"));
                aluno.setNome(rs.getString("nome"));
                aluno.setCpf(rs.getString("cpf"));
                aluno.setTelefone(rs.getString("telefone"));
                aluno.setEmail(rs.getString("email"));
                aluno.setDataNascimento(rs.getDate("dataNascimento"));

                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("curso"));
                curso.setNome(rs.getString("nomeCurso"));
                aluno.setCurso(curso);

                lista.add(aluno);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }


    public List<Aluno> listarPorCurso(int idCurso) {
        List<Aluno> lista = new ArrayList<>();
        String sql = "SELECT a.*, c.nome AS nomeCurso FROM aluno a " +
                "INNER JOIN curso c ON a.curso = c.idCurso " +
                "WHERE a.curso = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurso);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Aluno aluno = new Aluno();
                aluno.setIdAluno(rs.getInt("idAluno"));
                aluno.setNome(rs.getString("nome"));
                aluno.setCpf(rs.getString("cpf"));
                aluno.setTelefone(rs.getString("telefone"));
                aluno.setEmail(rs.getString("email"));
                aluno.setDataNascimento(rs.getDate("dataNascimento"));

                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("curso"));
                curso.setNome(rs.getString("nomeCurso"));
                aluno.setCurso(curso);

                lista.add(aluno);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }



    public int contarAlunosAtivosPorCurso(int idCurso) {
        String sql = "SELECT COUNT(*) FROM aluno WHERE curso = ? AND ativo = 1";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idCurso);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao contar alunos do curso: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }


    // Cadastrar novo aluno
    public boolean cadastrarAluno(Aluno aluno) {
        int qtdAlunos = contarAlunosAtivosPorCurso(aluno.getCurso().getIdCurso());
        int limiteCurso = aluno.getCurso().getLimiteAlunos();

        if (qtdAlunos >= limiteCurso) {
            return false; // Não permite o cadastro
        }

        String sql = "INSERT INTO aluno (cpf, nome, telefone, email, dataNascimento, curso, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, aluno.getCpf());
            stmt.setString(2, aluno.getNome());
            stmt.setString(3, aluno.getTelefone());
            stmt.setString(4, aluno.getEmail());
            stmt.setDate(5, aluno.getDataNascimento());
            stmt.setInt(6, aluno.getCurso().getIdCurso());
            stmt.setInt(7, aluno.getAtivo());

            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                aluno.setIdAluno(rs.getInt(1));
            }

            return true;

        } catch (SQLException e) {
            System.err.println("Erro ao cadastrar aluno: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }





    public void editarAluno(Aluno aluno) {
        String sql = "UPDATE aluno SET nome = ?, cpf = ?, telefone = ?, email = ?, dataNascimento = ?, curso = ? WHERE idAluno = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, aluno.getNome());
            stmt.setString(2, aluno.getCpf());
            stmt.setString(3, aluno.getTelefone());
            stmt.setString(4, aluno.getEmail());
            stmt.setDate(5, aluno.getDataNascimento());
            stmt.setInt(6, aluno.getCurso().getIdCurso());
            stmt.setInt(7, aluno.getIdAluno());

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao editar aluno: " + e.getMessage());
            e.printStackTrace();
        }
    }


    // Excluir aluno
    public void excluirAluno(int idAluno) {
        String sql = "DELETE FROM aluno WHERE idAluno = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idAluno);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao excluir aluno: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Aluno> listarAtivos() {
        List<Aluno> lista = new ArrayList<>();
        String sql = "SELECT a.*, c.nome AS nomeCurso FROM aluno a INNER JOIN curso c ON a.curso = c.idCurso WHERE a.ativo = 1";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Aluno aluno = new Aluno();
                aluno.setIdAluno(rs.getInt("idAluno"));
                aluno.setNome(rs.getString("nome"));
                aluno.setCpf(rs.getString("cpf"));
                aluno.setTelefone(rs.getString("telefone"));
                aluno.setEmail(rs.getString("email"));
                aluno.setDataNascimento(rs.getDate("dataNascimento"));

                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("curso"));
                curso.setNome(rs.getString("nomeCurso"));

                aluno.setCurso(curso);
                aluno.setAtivo(rs.getInt("ativo"));

                lista.add(aluno);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    //verifica se o cpf existe
    public boolean cpfExiste(String cpf) {
        String sql = "SELECT COUNT(*) FROM aluno WHERE cpf = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, cpf);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


    // Desabilitar aluno
    public void desabilitarAluno(int idAluno) {
        String sql = "UPDATE aluno SET ativo = 0 WHERE idAluno = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idAluno);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao desabilitar aluno: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //Mostrar alunos com status inativo
    public List<Aluno> listarInativos() {
        List<Aluno> lista = new ArrayList<>();
        String sql = "SELECT a.*, c.nome AS nomeCurso FROM aluno a INNER JOIN curso c ON a.curso = c.idCurso WHERE a.ativo = 0";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Aluno aluno = new Aluno();
                aluno.setIdAluno(rs.getInt("idAluno"));
                aluno.setNome(rs.getString("nome"));
                aluno.setCpf(rs.getString("cpf"));
                aluno.setTelefone(rs.getString("telefone"));
                aluno.setEmail(rs.getString("email"));
                aluno.setDataNascimento(rs.getDate("dataNascimento"));

                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("curso"));
                curso.setNome(rs.getString("nomeCurso"));

                aluno.setCurso(curso);
                aluno.setAtivo(rs.getInt("ativo"));

                lista.add(aluno);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }


    // Reabilitar aluno
    public void reabilitarAluno(int idAluno) {
        String sql = "UPDATE aluno SET ativo = 1 WHERE idAluno = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idAluno);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao reabilitar aluno: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
