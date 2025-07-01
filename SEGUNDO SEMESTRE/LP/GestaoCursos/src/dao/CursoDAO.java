package dao;

import factory.Conexao;
import modelo.Curso;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CursoDAO {

    public List<Curso> listarTodos() {
        List<Curso> cursos = new ArrayList<>();
        String sql = "SELECT * FROM curso";

        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("idCurso"));
                curso.setNome(rs.getString("nome"));
                curso.setCargaHoraria(rs.getInt("cargaHoraria"));
                curso.setLimiteAlunos(rs.getInt("limiteAlunos"));
                curso.setAtivo(rs.getInt("ativo"));
                cursos.add(curso);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao listar cursos: " + e.getMessage());
            e.printStackTrace();
        }

        return cursos;
    }


    // Cadastrar novo curso
    public void cadastrarCurso(Curso curso) {
        String sql = "INSERT INTO curso (nome, cargaHoraria, limiteAlunos, ativo) VALUES (?, ?, ?, ?)";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, curso.getNome());
            stmt.setInt(2, curso.getCargaHoraria());
            stmt.setInt(3, curso.getLimiteAlunos());
            stmt.setInt(4, curso.getAtivo());
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                curso.setIdCurso(rs.getInt(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Editar curso
    public void editarCurso(Curso curso) {
        String sql = "UPDATE curso SET nome = ?, cargaHoraria = ?, limiteAlunos = ?, ativo = ? WHERE idCurso = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, curso.getNome());
            stmt.setInt(2, curso.getCargaHoraria());
            stmt.setInt(3, curso.getLimiteAlunos());
            stmt.setInt(4, curso.getAtivo());
            stmt.setInt(5, curso.getIdCurso());

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao editar curso: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Excluir curso
    public void excluirCurso(int idCurso) {
        String sql = "DELETE FROM curso WHERE idCurso = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurso);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao excluir curso: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Desabilitar curso (ativo = 0)
    public void desabilitarCurso(int idCurso) {
        String sql = "UPDATE curso SET ativo = 0 WHERE idCurso = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurso);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao desabilitar curso: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Reabilitar curso (ativo = 1)
    public void reabilitarCurso(int idCurso) {
        String sql = "UPDATE curso SET ativo = 1 WHERE idCurso = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idCurso);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Erro ao reabilitar curso: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Listar todos os cursos
    public List<Curso> listarCursos() {
        List<Curso> lista = new ArrayList<>();
        String sql = "SELECT * FROM curso";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("idCurso"));
                curso.setNome(rs.getString("nome"));
                curso.setCargaHoraria(rs.getInt("cargaHoraria"));
                curso.setLimiteAlunos(rs.getInt("limiteAlunos"));
                curso.setAtivo(rs.getInt("ativo"));
                lista.add(curso);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    // Listar cursos ativos (ativo = 1)
    public List<Curso> listarAtivos() {
        List<Curso> lista = new ArrayList<>();
        String sql = "SELECT * FROM curso WHERE ativo = 1";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("idCurso"));
                curso.setNome(rs.getString("nome"));
                curso.setCargaHoraria(rs.getInt("cargaHoraria"));
                curso.setLimiteAlunos(rs.getInt("limiteAlunos"));
                curso.setAtivo(rs.getInt("ativo"));
                lista.add(curso);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    // ** NOVO: Listar cursos inativos (ativo = 0) **
    public List<Curso> listarInativos() {
        List<Curso> lista = new ArrayList<>();
        String sql = "SELECT * FROM curso WHERE ativo = 0";
        try (Connection conn = Conexao.conectar();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Curso curso = new Curso();
                curso.setIdCurso(rs.getInt("idCurso"));
                curso.setNome(rs.getString("nome"));
                curso.setCargaHoraria(rs.getInt("cargaHoraria"));
                curso.setLimiteAlunos(rs.getInt("limiteAlunos"));
                curso.setAtivo(rs.getInt("ativo"));
                lista.add(curso);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

}
