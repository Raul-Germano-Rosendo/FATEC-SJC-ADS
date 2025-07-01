package gui;

import dao.CursoDAO;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import modelo.Curso;

import java.util.List;

public class CursoGUI extends Stage {

    private VBox root;
    private TableView<Curso> tabelaCursos;
    private boolean mostrandoInativos = false;  // para controlar visualização

    public CursoGUI() {
        root = new VBox(10);
        root.getStyleClass().add("container");

        // Campos do formulário
        TextField txtNome = new TextField();
        txtNome.setPromptText("Nome do Curso");
        txtNome.getStyleClass().add("campo");

        TextField txtCargaHoraria = new TextField();
        txtCargaHoraria.setPromptText("Carga horária do curso");
        txtCargaHoraria.getStyleClass().add("campo");

        TextField txtLimiteAlunos = new TextField();
        txtLimiteAlunos.setPromptText("Limite de Alunos");
        txtLimiteAlunos.getStyleClass().add("campo");

        // Botões
        Button btnCadastrar = new Button("Cadastrar Curso");
        Button btnEditar = new Button("Editar Curso");
        Button btnExcluir = new Button("Excluir Curso");
        Button btnDesabilitar = new Button("Desabilitar Curso");
        Button btnReabilitar = new Button("Reabilitar Curso");
        Button btnInativos = new Button("Mostrar Inativos");

        btnCadastrar.getStyleClass().add("botao");
        btnEditar.getStyleClass().add("botao");
        btnExcluir.getStyleClass().add("botao");
        btnDesabilitar.getStyleClass().add("botao");
        btnReabilitar.getStyleClass().add("botao");
        btnInativos.getStyleClass().add("botao");

        HBox boxBotoes = new HBox(10, btnCadastrar, btnEditar, btnExcluir, btnDesabilitar, btnReabilitar, btnInativos);
        boxBotoes.setStyle("-fx-alignment: center;");

        Label mensagem = new Label();
        mensagem.getStyleClass().add("mensagem");

        // TableView para listar cursos
        tabelaCursos = new TableView<>();

        TableColumn<Curso, Integer> colId = new TableColumn<>("ID");
        colId.setCellValueFactory(new PropertyValueFactory<>("idCurso"));

        TableColumn<Curso, String> colNome = new TableColumn<>("Nome");
        colNome.setCellValueFactory(new PropertyValueFactory<>("nome"));

        TableColumn<Curso, Integer> colCargaHoraria = new TableColumn<>("Carga Horária");
        colCargaHoraria.setCellValueFactory(new PropertyValueFactory<>("cargaHoraria"));

        TableColumn<Curso, Integer> colLimiteAlunos = new TableColumn<>("Limite de Alunos");
        colLimiteAlunos.setCellValueFactory(new PropertyValueFactory<>("limiteAlunos"));

        tabelaCursos.getColumns().addAll(colId, colNome, colCargaHoraria, colLimiteAlunos);
        tabelaCursos.setPrefHeight(200);

        // Carregar lista inicial de cursos
        carregarCursos();

        // Ações dos botões

        btnCadastrar.setOnAction(e -> {
            try {
                if (txtNome.getText().isEmpty() || txtCargaHoraria.getText().isEmpty() || txtLimiteAlunos.getText().isEmpty()) {
                    mensagem.setText("Preencha todos os campos obrigatórios!");
                    return;
                }

                Curso curso = new Curso();
                curso.setNome(txtNome.getText());
                curso.setCargaHoraria(Integer.parseInt(txtCargaHoraria.getText()));
                curso.setLimiteAlunos(Integer.parseInt(txtLimiteAlunos.getText()));
                curso.setAtivo(1); // ativo

                new CursoDAO().cadastrarCurso(curso);

                mensagem.setText("Curso cadastrado com sucesso!");
                limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
                carregarCursos();

            } catch (NumberFormatException ex) {
                mensagem.setText("Carga horária e limite devem ser números inteiros.");
            } catch (Exception ex) {
                mensagem.setText("Erro ao cadastrar curso.");
                ex.printStackTrace();
            }
        });

        btnEditar.setOnAction(e -> {
            Curso curso = tabelaCursos.getSelectionModel().getSelectedItem();
            if (curso != null) {
                if (txtNome.getText().isEmpty() || txtCargaHoraria.getText().isEmpty() || txtLimiteAlunos.getText().isEmpty()) {
                    mensagem.setText("Preencha todos os campos obrigatórios para editar!");
                    return;
                }
                try {
                    curso.setNome(txtNome.getText());
                    curso.setCargaHoraria(Integer.parseInt(txtCargaHoraria.getText()));
                    curso.setLimiteAlunos(Integer.parseInt(txtLimiteAlunos.getText()));

                    new CursoDAO().editarCurso(curso);

                    mensagem.setText("Curso editado com sucesso!");
                    limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
                    carregarCursos();

                } catch (NumberFormatException ex) {
                    mensagem.setText("Carga horária e limite devem ser números inteiros.");
                } catch (Exception ex) {
                    mensagem.setText("Erro ao editar curso.");
                    ex.printStackTrace();
                }
            } else {
                mensagem.setText("Selecione um curso para editar.");
            }
        });

        btnExcluir.setOnAction(e -> {
            Curso curso = tabelaCursos.getSelectionModel().getSelectedItem();
            if (curso != null) {
                new CursoDAO().excluirCurso(curso.getIdCurso());
                mensagem.setText("Curso excluído com sucesso!");
                limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
                carregarCursos();
            } else {
                mensagem.setText("Selecione um curso para excluir.");
            }
        });

        btnDesabilitar.setOnAction(e -> {
            Curso curso = tabelaCursos.getSelectionModel().getSelectedItem();
            if (curso != null) {
                new CursoDAO().desabilitarCurso(curso.getIdCurso());
                mensagem.setText("Curso desabilitado!");
                limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
                carregarCursos();
            } else {
                mensagem.setText("Selecione um curso para desabilitar.");
            }
        });

        btnReabilitar.setOnAction(e -> {
            Curso curso = tabelaCursos.getSelectionModel().getSelectedItem();
            if (curso != null) {
                new CursoDAO().reabilitarCurso(curso.getIdCurso());
                mensagem.setText("Curso reabilitado!");
                limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
                carregarCursos();
            } else {
                mensagem.setText("Selecione um curso para reabilitar.");
            }
        });

        btnInativos.setOnAction(e -> {
            CursoDAO dao = new CursoDAO();
            if (!mostrandoInativos) {
                // Supondo que você tenha um método listarInativos() no CursoDAO
                tabelaCursos.setItems(FXCollections.observableArrayList(dao.listarInativos()));
                btnInativos.setText("Voltar para Ativos");
                mostrandoInativos = true;
            } else {
                carregarCursos();
                btnInativos.setText("Mostrar Inativos");
                mostrandoInativos = false;
            }
            limparCampos(txtNome, txtCargaHoraria, txtLimiteAlunos);
        });

        // Para preencher campos quando selecionar um curso da tabela
        tabelaCursos.getSelectionModel().selectedItemProperty().addListener((obs, antigo, novo) -> {
            if (novo != null) {
                txtNome.setText(novo.getNome());
                txtCargaHoraria.setText(String.valueOf(novo.getCargaHoraria()));
                txtLimiteAlunos.setText(String.valueOf(novo.getLimiteAlunos()));
            }
        });

        // Montar o layout
        root.getChildren().addAll(
                txtNome, txtCargaHoraria, txtLimiteAlunos,
                boxBotoes,
                mensagem,
                tabelaCursos
        );

        Scene scene = new Scene(root, 800, 600);

        try {
            scene.getStylesheets().add(getClass().getResource("/gui/style.css").toExternalForm());
        } catch (Exception e) {
            System.err.println("CSS não encontrado!");
        }

        setTitle("Gestão de Cursos");
        setScene(scene);
    }

    private void carregarCursos() {
        CursoDAO dao = new CursoDAO();
        List<Curso> lista = dao.listarAtivos();
        tabelaCursos.setItems(FXCollections.observableArrayList(lista));
    }

    private void limparCampos(TextField txtNome, TextField txtCargaHoraria, TextField txtLimiteAlunos) {
        txtNome.clear();
        txtCargaHoraria.clear();
        txtLimiteAlunos.clear();
    }

    public VBox getView() {
        return root;
    }
}
