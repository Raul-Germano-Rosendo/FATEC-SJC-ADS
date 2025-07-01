import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class TesteJavaFX extends Application {
    @Override
    public void start(Stage stage) {
            Label label = new Label("JavaFX TA FUNCIONANDO CARAIOOOO");
        Scene scene = new Scene(label, 400, 400);
        stage.setScene(scene);
        stage.setTitle("Teste JavaFX");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
