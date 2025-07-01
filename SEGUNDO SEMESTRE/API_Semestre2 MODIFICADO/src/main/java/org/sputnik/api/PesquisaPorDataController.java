
package org.sputnik.api.historicoPesquisaPorData;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextArea;
import org.sputnik.api.Historico;
import org.sputnik.api.HistoricoDAO;

import java.time.LocalDate;
import java.util.List;

public class PesquisaPorDataController {

    @FXML
    private DatePicker datePicker;

    @FXML
    private Button buscarButton;

    @FXML
    private TextArea resultadoArea;

    @FXML
    public void initialize() {
        buscarButton.setOnAction(event -> buscarHistoricoPorData());
    }

    private void buscarHistoricoPorData() {
        LocalDate dataSelecionada = datePicker.getValue();

        if (dataSelecionada != null) {
            HistoricoDAO dao = new HistoricoDAO();
            List<Historico> resultados = dao.buscarPorData(dataSelecionada);

            StringBuilder builder = new StringBuilder();
            for (Historico h : resultados) {
                builder.append("[").append(h.getData()).append("]\n")
                       .append("Código: ").append(h.getCodigo()).append("\n")
                       .append("Explicação: ").append(h.getExplicacao()).append("\n")
                       .append("Sugestão: ").append(h.getSugestao()).append("\n")
                       .append("Tradução: ").append(h.getTraducao()).append("\n\n");
            }

            resultadoArea.setText(builder.toString());
        } else {
            resultadoArea.setText("Por favor, selecione uma data.");
        }
    }
}
