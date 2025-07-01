package gui;

import dao.AlunoDAO;
import dao.CursoDAO;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import modelo.Aluno;
import modelo.Curso;

import java.sql.Date;
import java.util.List;

public class AlunoGUI extends Stage {

    private VBox root;
    private TableView<Aluno> tabelaAlunos;
    private boolean mostrandoInativos = false;  // Estado da visualização

    public AlunoGUI() {
        root = new VBox(10);
        root.getStyleClass().add("container");

        // Campos do formulário
        TextField txtNome = new TextField();
        txtNome.setPromptText("Nome do Aluno");

        TextField txtCpf = new TextField();
        txtCpf.setPromptText("CPF (somente números)");

        TextField txtTelefone = new TextField();
        txtTelefone.setPromptText("Telefone");

        TextField txtEmail = new TextField();
        txtEmail.setPromptText("Email");

        DatePicker dpNascimento = new DatePicker();
        dpNascimento.setPromptText("Data de Nascimento");

        ComboBox<Curso> comboCursos = new ComboBox<>();
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
        Button btnCadastrar = new Button("Cadastrar Aluno");
        btnCadastrar.getStyleClass().add("botao");

        Button btnEditar = new Button("Aplicar alterações (Editar Aluno)");
        btnEditar.getStyleClass().add("botao");

        Button btnExcluir = new Button("Excluir Aluno");
        btnExcluir.getStyleClass().add("botao");

        Button btnDesabilitar = new Button("Desabilitar Aluno");
        btnDesabilitar.getStyleClass().add("botao");

        Button btnReabilitar = new Button("Reabilitar Aluno");
        btnReabilitar.getStyleClass().add("botao");

        Button btnInativos = new Button("Mostrar Inativos");
        btnInativos.getStyleClass().add("botao");

        // Caixa de botões
        HBox boxBotoes = new HBox(10, btnCadastrar, btnEditar, btnExcluir, btnDesabilitar, btnReabilitar, btnInativos);
        boxBotoes.setStyle("-fx-alignment: center;");

        Label mensagem = new Label();

        // TableView
        tabelaAlunos = new TableView<>();

        TableColumn<Aluno, Integer> colId = new TableColumn<>("ID");
        colId.setCellValueFactory(new PropertyValueFactory<>("idAluno"));

        TableColumn<Aluno, String> colNome = new TableColumn<>("Nome");
        colNome.setCellValueFactory(new PropertyValueFactory<>("nome"));

        TableColumn<Aluno, String> colCpf = new TableColumn<>("CPF");
        colCpf.setCellValueFactory(new PropertyValueFactory<>("cpf"));

        TableColumn<Aluno, String> colTelefone = new TableColumn<>("Telefone");
        colTelefone.setCellValueFactory(new PropertyValueFactory<>("telefone"));

        TableColumn<Aluno, String> colEmail = new TableColumn<>("Email");
        colEmail.setCellValueFactory(new PropertyValueFactory<>("email"));

        TableColumn<Aluno, Date> colNascimento = new TableColumn<>("Nascimento");
        colNascimento.setCellValueFactory(new PropertyValueFactory<>("dataNascimento"));

        TableColumn<Aluno, String> colCurso = new TableColumn<>("Curso");
        colCurso.setCellValueFactory(cellData -> {
            Curso curso = cellData.getValue().getCurso();
            return new javafx.beans.property.SimpleStringProperty(curso != null ? curso.getNome() : "");
        });

        tabelaAlunos.getColumns().addAll(colId, colNome, colCpf, colTelefone, colEmail, colNascimento, colCurso);
        tabelaAlunos.setPrefHeight(200);

        // Listener para preencher campos ao selecionar aluno na tabela
        tabelaAlunos.getSelectionModel().selectedItemProperty().addListener((obs, antigo, novo) -> {
            if (novo != null) {
                txtNome.setText(novo.getNome());
                txtCpf.setText(novo.getCpf());
                txtTelefone.setText(novo.getTelefone());
                txtEmail.setText(novo.getEmail());
                if (novo.getDataNascimento() != null) {
                    dpNascimento.setValue(novo.getDataNascimento().toLocalDate());
                } else {
                    dpNascimento.setValue(null);
                }

                // Ajusta o combo para o curso correto selecionado
                Curso selecionado = null;
                for (Curso c : comboCursos.getItems()) {
                    if (novo.getCurso() != null && c.getIdCurso() == novo.getCurso().getIdCurso()) {
                        selecionado = c;
                        break;
                    }
                }
                comboCursos.setValue(selecionado);
            }
        });

        carregarAlunos();

        // Ações dos botões

        btnCadastrar.setOnAction(e -> {
            String nome = txtNome.getText().trim();
            String cpf = txtCpf.getText().trim();
            String telefone = txtTelefone.getText().trim();
            String email = txtEmail.getText().trim();
            Curso cursoSelecionado = comboCursos.getValue();
            java.time.LocalDate nascimento = dpNascimento.getValue();

            // Validação: Nome
            if (nome.isEmpty() || nome.length() < 3) {
                mensagem.setText("Nome obrigatório (mínimo 3 caracteres).");
                return;
            }

            // Validação: CPF
            if (!cpf.matches("\\d{11}")) {
                mensagem.setText("CPF inválido! Digite exatamente 11 números.");
                return;
            }

            // Verificar CPF duplicado
            AlunoDAO dao = new AlunoDAO();
            if (dao.cpfExiste(cpf)) {
                mensagem.setText("CPF já cadastrado!");
                return;
            }

            // Validação: Email
            if (email.isEmpty() || !email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
                mensagem.setText("Email inválido. Exemplo válido: usuario@dominio.com");
                return;
            }

            // Validação: Data de nascimento
            if (nascimento == null) {
                mensagem.setText("Data de nascimento obrigatória.");
                return;
            }
            java.time.LocalDate hoje = java.time.LocalDate.now();
            java.time.Period idade = java.time.Period.between(nascimento, hoje);
            if (idade.getYears() < 16) {
                mensagem.setText("Aluno precisa ter pelo menos 16 anos.");
                return;
            }

            // Validação: Curso
            if (cursoSelecionado == null) {
                mensagem.setText("Selecione um curso.");
                return;
            }

            // Criar objeto Aluno
            Aluno aluno = new Aluno();
            aluno.setNome(nome);
            aluno.setCpf(cpf);
            aluno.setTelefone(telefone);
            aluno.setEmail(email);
            aluno.setDataNascimento(Date.valueOf(nascimento));
            aluno.setCurso(cursoSelecionado);
            aluno.setAtivo(1);

            // Tentar cadastrar
            boolean sucesso = dao.cadastrarAluno(aluno);

            if (sucesso) {
                mensagem.setText("Aluno cadastrado com sucesso!");
                limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
                carregarAlunos();
            } else {
                mensagem.setText("Não foi possível cadastrar: limite de alunos atingido para o curso.");
            }
        });


        btnEditar.setOnAction(e -> {
            Aluno aluno = tabelaAlunos.getSelectionModel().getSelectedItem();
            if (aluno != null) {
                if (txtNome.getText().isEmpty() || txtCpf.getText().isEmpty() || dpNascimento.getValue() == null || comboCursos.getValue() == null) {
                    mensagem.setText("Preencha todos os campos obrigatórios para editar!");
                    return;
                }

                aluno.setNome(txtNome.getText());
                aluno.setCpf(txtCpf.getText());
                aluno.setTelefone(txtTelefone.getText());
                aluno.setEmail(txtEmail.getText());
                aluno.setDataNascimento(Date.valueOf(dpNascimento.getValue()));
                aluno.setCurso(comboCursos.getValue());

                new AlunoDAO().editarAluno(aluno);
                mensagem.setText("Aluno editado com sucesso!");
                limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
                carregarAlunos();
            } else {
                mensagem.setText("Selecione um aluno para editar.");
            }
        });

        btnExcluir.setOnAction(e -> {
            Aluno aluno = tabelaAlunos.getSelectionModel().getSelectedItem();
            if (aluno != null) {
                new AlunoDAO().excluirAluno(aluno.getIdAluno());
                mensagem.setText("Aluno excluído com sucesso!");
                limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
                carregarAlunos();
            } else {
                mensagem.setText("Selecione um aluno para excluir.");
            }
        });

        btnDesabilitar.setOnAction(e -> {
            Aluno aluno = tabelaAlunos.getSelectionModel().getSelectedItem();
            if (aluno != null) {
                new AlunoDAO().desabilitarAluno(aluno.getIdAluno());
                mensagem.setText("Aluno desabilitado!");
                limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
                carregarAlunos();
            } else {
                mensagem.setText("Selecione um aluno para desabilitar.");
            }
        });

        btnReabilitar.setOnAction(e -> {
            Aluno aluno = tabelaAlunos.getSelectionModel().getSelectedItem();
            if (aluno != null) {
                new AlunoDAO().reabilitarAluno(aluno.getIdAluno());
                mensagem.setText("Aluno reabilitado!");
                limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
                carregarAlunos();
            } else {
                mensagem.setText("Selecione um aluno para reabilitar.");
            }
        });

        btnInativos.setOnAction(e -> {
            AlunoDAO dao = new AlunoDAO();
            if (!mostrandoInativos) {
                tabelaAlunos.setItems(FXCollections.observableArrayList(dao.listarInativos()));
                btnInativos.setText("Voltar para Ativos");
                mostrandoInativos = true;
            } else {
                carregarAlunos();
                btnInativos.setText("Mostrar Inativos");
                mostrandoInativos = false;
            }
            limparCampos(txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos);
        });

        root.getChildren().addAll(
                txtNome, txtCpf, txtTelefone, txtEmail, dpNascimento, comboCursos,
                boxBotoes,
                mensagem, tabelaAlunos
        );

        Scene scene = new Scene(root, 800, 600);

        try {
            scene.getStylesheets().add(MenuPrincipal.class.getResource("/gui/style.css").toExternalForm());
        } catch (Exception e) {
            System.err.println("CSS não encontrado!");
        }


        setTitle("Gestão de Alunos");
        setScene(scene);
    }

    private void carregarAlunos() {
        AlunoDAO dao = new AlunoDAO();
        List<Aluno> lista = dao.listarAtivos();
        tabelaAlunos.setItems(FXCollections.observableArrayList(lista));
    }

    private void limparCampos(TextField txtNome, TextField txtCpf, TextField txtTelefone, TextField txtEmail,
                              DatePicker dpNascimento, ComboBox<Curso> comboCursos) {
        txtNome.clear();
        txtCpf.clear();
        txtTelefone.clear();
        txtEmail.clear();
        dpNascimento.setValue(null);
        comboCursos.getSelectionModel().clearSelection();
    }

    public VBox getView() {
        return root;
    }
}
