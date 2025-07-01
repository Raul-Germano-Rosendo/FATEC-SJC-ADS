package crud;

import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try {
            ClienteDAO dao = new ClienteDAO();
            Scanner sc = new Scanner(System.in);

            while (true) {
                System.out.println("1 - Cadastrar cliente");
                System.out.println("2 - Listar clientes");
                System.out.println("3 - Buscar cliente por CPF");
                System.out.println("4 - Atualizar cliente");
                System.out.println("5 - Remover cliente");
                System.out.println("0 - Sair");
                int opcao = sc.nextInt();
                sc.nextLine();

                switch (opcao) {
                    case 1:
                        System.out.println("Nome: ");
                        String nome = sc.nextLine();
                        System.out.println("CPF: ");
                        String cpf = sc.nextLine();
                        System.out.println("Email: ");
                        String email = sc.nextLine();
                        System.out.println("Telefone: ");
                        String telefone = sc.nextLine();
                        System.out.println("Endereço: ");
                        String endereco = sc.nextLine();
                        System.out.println("Data de nascimento (YYYY-MM-DD): ");
                        String dataNasc = sc.nextLine();
                        Cliente novo = new Cliente(nome, cpf, email, telefone, endereco, dataNasc);
                        dao.adicionarCliente(novo);
                        break;

                    case 2:
                        List<Cliente> clientes = dao.listarClientes();
                        for (Cliente c : clientes) {
                            System.out.println(c.getNome() + " - " + c.getCpf());
                        }
                        break;

                    case 3:
                        System.out.println("Digite o CPF: ");
                        String cpfBusca = sc.nextLine();
                        Cliente encontrado = dao.buscarPorCpf(cpfBusca);
                        if (encontrado != null) {
                            System.out.println("Nome: " + encontrado.getNome());
                            System.out.println("Email: " + encontrado.getEmail());
                            System.out.println("Telefone: " + encontrado.getTelefone());
                            System.out.println("Endereço: " + encontrado.getEndereco());
                            System.out.println("Data Nasc.: " + encontrado.getDataNascimento());
                        } else {
                            System.out.println("Cliente não encontrado!");
                        }
                        break;

                    case 4:
                        System.out.println("Digite o CPF do cliente a atualizar: ");
                        String cpfAtualiza = sc.nextLine();
                        Cliente clienteAtualiza = dao.buscarPorCpf(cpfAtualiza);
                        if (clienteAtualiza != null) {
                            System.out.println("Novo nome: ");
                            clienteAtualiza.setNome(sc.nextLine());
                            System.out.println("Novo email: ");
                            clienteAtualiza.setEmail(sc.nextLine());
                            System.out.println("Novo telefone: ");
                            clienteAtualiza.setTelefone(sc.nextLine());
                            System.out.println("Novo endereço: ");
                            clienteAtualiza.setEndereco(sc.nextLine());
                            System.out.println("Nova data de nascimento (YYYY-MM-DD): ");
                            clienteAtualiza.setDataNascimento(sc.nextLine());
                            dao.atualizarCliente(clienteAtualiza);
                        } else {
                            System.out.println("Cliente não encontrado!");
                        }
                        break;

                    case 5:
                        System.out.println("Digite o CPF do cliente a remover: ");
                        String cpfRemove = sc.nextLine();
                        dao.removerCliente(cpfRemove);
                        break;

                    case 0:
                        dao.fecharConexao();
                        System.exit(0);
                        break;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}