/*Exemplo dado

functio Cliente(nome, telefoneCelular, email, endereco) {
    this.nome = nome
    this.endereco = endereco
    this.email = email
    this.telefoneCelular = telefoneCelular

    //metodos de acesso com Object.defineProperty

    Object.defineProperty(this, 'getNome', {
        get: function() {return this.nome}
    }) //padronização desse formato
}

*/


function TelefoneCelular(ddd, numero) {
    this.ddd = ddd
    this.numero = numero

    Object.defineProperty(this, 'descricao', {
        get: function() {
            return "------------------\nTelefone:\nDDD: " + this.ddd + "\nNúmero: " + this.numero
        }
    })
}

function Endereco(estado, cidade, rua, numero) {
    this.estado = estado
    this.cidade = cidade
    this.rua = rua
    this.numero = numero

    Object.defineProperty(this, 'descricao', {
        get: function() {
            return "------------------\nEndereço:\nRua: " + this.rua + "\nNúmero: " + this.numero + "\nCidade: " + this.cidade + "\nEstado: " + this.estado
        }
    })


}
function Cliente(nome, telefoneCelular, email, endereco) {
    this.nome = nome
    this.telefoneCelular = telefoneCelular
    this.email = email
    this.endereco = endereco

    Object.defineProperty(this, 'descricao', {
        get: function() {
            return "------------------\nInformações do Cliente:\n" +
                this.nome + "\n------------------\n" +
                this.telefoneCelular.descricao + "\n" +
                this.endereco.descricao
        }
    })


}


// funcao de ordenagem
function ordenarClientesPorNome(arrayClientes) {
    //retorna um novo array ordenado pelo nom
    return arrayClientes.slice().sort(function(a, b) {
        return a.nome.localeCompare(b.nome)
    })
}

// Teste da saída formatada
let telefone = new TelefoneCelular('21', '984628874')
let endereco = new Endereco('Rio de Janeiro', 'Cabo Frio', 'Nova Orleans', '122')
let cliente = new Cliente('Jotabê Medeiros', telefone, 'JotaBMedeiros@gmail.com', endereco)

let telefone2 = new TelefoneCelular('12', '992480000')
let endereco2 = new Endereco('São Paulo', 'Caçapava', 'R. João Quirino da Costa', '251')
let cliente2 = new Cliente('Raul Germano Rosendo de Oliveira Duarte', telefone2, 'Raulgermanorosendo@gmail.com', endereco2)


console.log(cliente.descricao + "\n\n\n" + cliente2.descricao)

// Teste de ordenação
let cliente3 = new Cliente('Ana Souza', telefone, 'ana.souza@app.com', endereco)
let cliente4 = new Cliente('Bruno Lima', telefone, 'bruno.lima@app.com', endereco)
let listaClientes = [cliente, cliente2, cliente3, cliente4]

let listaOrdenada = ordenarClientesPorNome(listaClientes)
console.log('\nLista Ordenado:')
listaOrdenada.forEach(c => console.log(c.nome))