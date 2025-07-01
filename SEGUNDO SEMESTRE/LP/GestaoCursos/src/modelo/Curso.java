package modelo;

import java.util.ArrayList;
import java.util.List;

public class Curso {
    private int idCurso;
    private String nome;
    private int cargaHoraria;
    private int limiteAlunos;
    private int ativo;
    private List<Aluno> listaAluno;

    public Curso() {
        listaAluno = new ArrayList<>();
        this.ativo = 1;
    }

    public Curso(String nome, int cargaHoraria, int limiteAlunos) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.limiteAlunos = limiteAlunos;
        this.ativo = 1;
        this.listaAluno = new ArrayList<>();
    }

    // Getters e Setters

    public int getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(int idCurso) {
        this.idCurso = idCurso;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(int cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public int getLimiteAlunos() {
        return limiteAlunos;
    }

    public void setLimiteAlunos(int limiteAlunos) {
        this.limiteAlunos = limiteAlunos;
    }

    public int getAtivo() {
        return ativo;
    }

    public void setAtivo(int ativo) {
        this.ativo = ativo;
    }

    public List<Aluno> getListaAluno() {
        return listaAluno;
    }

    public void setListaAluno(List<Aluno> listaAluno) {
        this.listaAluno = listaAluno;
    }
}
