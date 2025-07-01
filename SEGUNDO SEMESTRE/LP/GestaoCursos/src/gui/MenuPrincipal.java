package gui;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;


import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.effect.DropShadow;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class MenuPrincipal extends Application {

    private BorderPane root;
    private VBox menuBox;
    private Label rodapeLabel;

    @Override
    public void start(Stage primaryStage) {
        root = new BorderPane();
        root.setPadding(new Insets(20));

        menuBox = criarMenuPrincipal();
        root.setCenter(menuBox);

        // Rodapé fixo no menu principal
        rodapeLabel = new Label("Novo Sistema do Aluno... dessa vez, realmente feito pelo aluno");
        rodapeLabel.getStyleClass().add("rodape");
        root.setBottom(rodapeLabel);
        BorderPane.setAlignment(rodapeLabel, Pos.CENTER);

        Scene scene = new Scene(root, 800, 600);
        scene.getStylesheets().add(getClass().getResource("/gui/style.css").toExternalForm());

        primaryStage.setTitle("NSA");
        primaryStage.setScene(scene);
        primaryStage.setMaximized(true);
        primaryStage.show();
    }

    private VBox criarMenuPrincipal() {
        Image logo = new Image(getClass().getResourceAsStream("nsa-online-etec.png"));
        ImageView logoView = new ImageView(logo);
        logoView.setFitWidth(400);
        logoView.setPreserveRatio(true);
        logoView.setSmooth(true);

        Label titulo = new Label("NOVO SISTEMA DO ALUNO");
        titulo.getStyleClass().add("titulo");
        DropShadow ds = new DropShadow();
        ds.setColor(Color.web("#007BFF", 0.7));
        ds.setRadius(8);
        titulo.setEffect(ds);

        Label subtitulo = new Label("Sistema de Gestão de Cursos e Alunos");
        subtitulo.getStyleClass().add("subtitulo");

        Button btnAluno = new Button("Gerenciar Alunos");
        btnAluno.getStyleClass().add("botao");
        btnAluno.setOnAction(e -> mostrarAlunoGUI());

        Button btnCurso = new Button("Gerenciar Cursos");
        btnCurso.getStyleClass().add("botao");
        btnCurso.setOnAction(e -> mostrarCursoGUI());

        Button btnRelatorio = new Button("Gerar Relatório");
        btnRelatorio.getStyleClass().add("botao");
        btnRelatorio.setOnAction(e -> mostrarRelatorioGUI());

        HBox botoesBox = new HBox(20, btnAluno, btnCurso, btnRelatorio);
        botoesBox.setAlignment(Pos.CENTER);

        VBox box = new VBox(20, logoView, titulo, subtitulo, botoesBox);
        box.setAlignment(Pos.CENTER);
        box.setPadding(new Insets(30));
        return box;
    }


    private void mostrarAlunoGUI() {
        AlunoGUI painelAluno = new AlunoGUI();

        Button voltar = new Button("Voltar ao Menu");
        voltar.getStyleClass().add("botao");
        voltar.setOnAction(e -> voltarAoMenu());

        VBox telaAluno = new VBox(20, painelAluno.getView(), voltar);
        telaAluno.setAlignment(Pos.CENTER);
        telaAluno.setPadding(new Insets(20));

        root.setCenter(telaAluno);
        root.setBottom(null);  // Remove o rodapé (pra não ficar duplicado)

    }

    private void mostrarCursoGUI() {
        CursoGUI painelCurso = new CursoGUI();

        Button voltar = new Button("Voltar ao Menu");
        voltar.getStyleClass().add("botao");
        voltar.setOnAction(e -> voltarAoMenu());

        VBox telaCurso = new VBox(20, painelCurso.getView(), voltar);
        telaCurso.setAlignment(Pos.CENTER);
        telaCurso.setPadding(new Insets(20));

        root.setCenter(telaCurso);
        root.setBottom(null);

    }

    private void mostrarRelatorioGUI() {
        RelatorioGUI relatorioGUI = new RelatorioGUI();
        relatorioGUI.show(); // Abre em uma nova janela
    }

    private void voltarAoMenu() {
        root.setCenter(menuBox);
        root.setBottom(rodapeLabel);
        BorderPane.setAlignment(rodapeLabel, Pos.CENTER);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
