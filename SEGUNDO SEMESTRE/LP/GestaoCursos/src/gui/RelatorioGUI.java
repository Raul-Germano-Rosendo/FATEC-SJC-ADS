package gui;

import dao.AlunoDAO;
import dao.CursoDAO;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import modelo.Aluno;
import modelo.Curso;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class RelatorioGUI extends Stage {

    private VBox root;
    private TableView<Aluno> tabelaAlunos;
    private ComboBox<Curso> comboCursos;
    private Label mensagem;

    public RelatorioGUI() {
        root = new VBox(10);
        root.setStyle("-fx-padding: 20;");

        // Inicializa o atributo comboCursos, não uma variável local
        comboCursos = new ComboBox<>();
        comboCursos.setPromptText("Selecione um Curso");

        // Carregar cursos no ComboBox
        CursoDAO cursoDAO = new CursoDAO();
        ObservableList<Curso> cursosObs = FXCollections.observableArrayList(cursoDAO.listarAtivos());
        comboCursos.setItems(cursosObs);

        // Mostrar só o nome do curso no ComboBox (na lista e no botão)
        comboCursos.setCellFactory(lv -> new ListCell<Curso>() {
            @Override
            protected void updateItem(Curso curso, boolean empty) {
                super.updateItem(curso, empty);
                setText(empty || curso == null ? "" : curso.getNome());
            }
        });
        comboCursos.setButtonCell(new ListCell<Curso>() {
            @Override
            protected void updateItem(Curso curso, boolean empty) {
                super.updateItem(curso, empty);
                setText(empty || curso == null ? "" : curso.getNome());
            }
        });

        // Botões
        Button btnListarAlunosCurso = new Button("Listar Alunos do Curso");
        Button btnListarTodos = new Button("Listar Cursos com Alunos");
        Button btnExportarAtivos = new Button("Exportar Ativos por Curso");
        Button btnExportarInativos = new Button("Exportar Inativos por Curso");

        // Caixa de botões
        HBox boxBotoes = new HBox(10, btnListarAlunosCurso, btnListarTodos, btnExportarAtivos, btnExportarInativos);
        boxBotoes.setStyle("-fx-alignment: center;");

        mensagem = new Label();

        // TableView para Alunos
        tabelaAlunos = new TableView<>();

        TableColumn<Aluno, String> colNome = new TableColumn<>("Nome");
        colNome.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getNome()));

        TableColumn<Aluno, String> colCpf = new TableColumn<>("CPF");
        colCpf.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getCpf()));

        TableColumn<Aluno, String> colTelefone = new TableColumn<>("Telefone");
        colTelefone.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getTelefone()));

        TableColumn<Aluno, String> colEmail = new TableColumn<>("Email");
        colEmail.setCellValueFactory(data -> new javafx.beans.property.SimpleStringProperty(data.getValue().getEmail()));

        tabelaAlunos.getColumns().addAll(colNome, colCpf, colTelefone, colEmail);
        tabelaAlunos.setPrefHeight(300);

        // Ações dos botões
        btnListarAlunosCurso.setOnAction(e -> listarAlunosPorCurso());
        btnListarAlunosCurso.getStyleClass().add("botao-relatorio");
        btnListarTodos.setOnAction(e -> listarTodosCursosComAlunos());
        btnListarTodos.getStyleClass().add("botao-relatorio");
        btnExportarAtivos.setOnAction(e -> exportar(true));
        btnExportarAtivos.getStyleClass().add("botao-relatorio");
        btnExportarInativos.setOnAction(e -> exportar(false));
        btnExportarInativos.getStyleClass().add("botao-relatorio");

        // Adiciona os componentes no layout root
        root.getChildren().addAll(comboCursos, boxBotoes, mensagem, tabelaAlunos);

        Scene scene = new Scene(root, 650, 500);

        // Carregando o CSS
        try {
            scene.getStylesheets().add(getClass().getResource("/gui/style.css").toExternalForm());
        } catch (Exception ex) {
            System.err.println("CSS não encontrado!");
            ex.printStackTrace();
        }

        setScene(scene);
        setTitle("Relatórios de Cursos e Alunos");
    }

    private void listarAlunosPorCurso() {
        Curso curso = comboCursos.getValue();
        if (curso != null) {
            AlunoDAO dao = new AlunoDAO();
            List<Aluno> alunos = dao.listarPorCurso(curso.getIdCurso());
            tabelaAlunos.setItems(FXCollections.observableArrayList(alunos));
            mensagem.setText("Total de alunos no curso \"" + curso.getNome() + "\": " + alunos.size());
        } else {
            mensagem.setText("Selecione um curso.");
        }
    }

    private void listarTodosCursosComAlunos() {
        AlunoDAO dao = new AlunoDAO();
        Map<Curso, List<Aluno>> mapa = dao.listarCursosComAlunos(true);
        StringBuilder sb = new StringBuilder();
        for (Curso curso : mapa.keySet()) {
            sb.append("Curso: ").append(curso.getNome()).append("\n");
            for (Aluno aluno : mapa.get(curso)) {
                sb.append(" - ").append(aluno.getNome()).append(" | CPF: ").append(aluno.getCpf()).append("\n");
            }
            sb.append("\n");
        }
        Alert alert = new Alert(Alert.AlertType.INFORMATION, sb.toString(), ButtonType.OK);
        alert.setHeaderText("Todos os cursos e seus alunos");
        alert.showAndWait();
    }

    private void exportar(boolean ativos) {
        FileChooser chooser = new FileChooser();
        chooser.setTitle("Salvar Relatório");
        chooser.setInitialFileName(ativos ? "alunos_ativos.txt" : "alunos_inativos.txt");
        File file = chooser.showSaveDialog(this);
        if (file != null) {
            AlunoDAO dao = new AlunoDAO();
            Map<Curso, List<Aluno>> mapa = dao.listarCursosComAlunos(ativos);
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
                for (Curso curso : mapa.keySet()) {
                    writer.write("Curso: " + curso.getNome());
                    writer.newLine();
                    for (Aluno aluno : mapa.get(curso)) {
                        writer.write(" - " + aluno.getNome() + " | CPF: " + aluno.getCpf());
                        writer.newLine();
                    }
                    writer.newLine();
                }
                mensagem.setText("Relatório salvo com sucesso.");
            } catch (IOException ex) {
                mensagem.setText("Erro ao salvar arquivo.");
                ex.printStackTrace();
            }
        }
    }
}
