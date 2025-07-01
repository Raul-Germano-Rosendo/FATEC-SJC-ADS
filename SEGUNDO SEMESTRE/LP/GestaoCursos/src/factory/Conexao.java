package factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {

    private static final String URL = "jdbc:mysql://localhost:3306/sistema_cursos";
    private static final String USUARIO = "root";
    private static final String SENHA = "W1sper$y";

    public static Connection conectar() {
        try {
            // Garantir que o driver seja carregado
            Class.forName("com.mysql.cj.jdbc.Driver");

            return DriverManager.getConnection(URL, USUARIO, SENHA);
        } catch (ClassNotFoundException e) {
            System.out.println("Driver MySQL não encontrado.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Erro ao conectar com o banco de dados:");
            e.printStackTrace();
        }
        return null;
    }
}
