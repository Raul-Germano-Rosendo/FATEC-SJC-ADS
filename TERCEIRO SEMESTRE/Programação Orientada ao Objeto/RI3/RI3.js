/*
EXEMPLO DADO

class Cliente {
    #cpf
    constructor(nome, cpf, endereco){
        this.nome = nome
        this.endereco = endereco
        this.telefones = new Set()
        this.#cpf = cpf
    }
}

class Telefone {
    constructor(ddd, numero){
        this.ddd = ddd
        this.numero = numero
    }
}

class Endereco {
    constructor(estado, cidade, rua, numero){
        this.estado = estado
        this.cidade = cidade
        this.rua = rua
        this.numero = numero
    }
}

class Empresa{
    #cnpj
    constructor(razaoSocial, nomeFantasia, cnpj, endereco){
        this.endereco
        this.nomeFantasia = nomeFantasia
        this.razaoSocial = razaoSocial
        this.#cnpj = cnpj
        this.clientes = new Set()
        this.telefones = new Set()
    }
}

*/




/*classe do cliente com cpf privado e mais de um telefone*/
class Cliente {
    #cpf
    constructor(nome, cpf, endereco) {
        this.nome = nome
        this.endereco = endereco
        this.telefones = new Set()
        this.#cpf = cpf
    }

    /*reetorna o CPF do cliente */
    get pegarCpf() {
        return this.#cpf
    }

    /*adiciona um telefone ao cliente */
    adicionarTelefone(telefone) {
        this.telefones.add(telefone)
    }

    /*retorna o nome do cliente em maiúsculas */
    nomeMaiusculo() {
        return this.nome.toUpperCase()
    }

    /*retorna o nome do cliente em minúsculas */
    nomeMinusculo() {
        return this.nome.toLowerCase()
    }

  /*retorna os detalhes completos do cliente */
mostrarDetalhes() {
    let telefonesFormatados = ""
    for (const telefone of this.telefones) {
        telefonesFormatados += `(${telefone.ddd}) ${telefone.numero}, `
    }
    telefonesFormatados = telefonesFormatados.slice(0, -2)

    return `Nome: ${this.nomeMaiusculo()} | CPF: ${this.#cpf} | Endereço: ${this.endereco.getEndereco()} | Telefones: ${telefonesFormatados}`
}

}

/*Classe telefone*/
class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd
        this.numero = numero
    }
}

/*classe endereco*/ 
class Endereco {
    constructor(estado, cidade, rua, numero) {
        this.estado = estado
        this.cidade = cidade
        this.rua = rua
        this.numero = numero
    }

    /* formatacao do return */
    getEndereco() {
        return `${this.rua}, ${this.numero} - ${this.cidade}/${this.estado}`
    }
}

/**
empresa com CNPJ privado, clientes, telefones e endereco.
 */

class Empresa {
    #cnpj
    constructor(razaoSocial, nomeFantasia, cnpj, endereco) {
        this.razaoSocial = razaoSocial
        this.nomeFantasia = nomeFantasia
        this.#cnpj = cnpj
        this.endereco = endereco
        this.clientes = new Set()
        this.telefones = new Set()
    }

    get pegarCnpj() {
        return this.#cnpj
    }

    
    adicionarCliente(cliente) {
        this.clientes.add(cliente)
    }

    adicionarTelefone(telefone) {
        this.telefones.add(telefone)
    }

    /** Retorna os detalhes completos da empresa e de seus clientes */
    mostrarDetalhes() {
        let telefonesEmpresa = Array.from(this.telefones)
            .map(t => `(${t.ddd}) ${t.numero}`).join(", ")

        let clientesDetalhes = Array.from(this.clientes)
            .map(c => "\n   - " + c.mostrarDetalhes())
            .join("")

        return `= EMPRESA =
Razão Social: ${this.razaoSocial}
Nome Fantasia: ${this.nomeFantasia}
CNPJ: ${this.#cnpj}
Endereço: ${this.endereco.getEndereco()}
Telefones: ${telefonesEmpresa}
= CLIENTES =${clientesDetalhes}`
    }
}

//testes
//Criando endereco e telefones
const enderecoEmpresa = new Endereco("SP", "São Paulo", "Rua do Porto", "290")
const empresa = new Empresa("Meio dia e cinco LTDA", "Perto de terminar", "12.345.678/1111-90", enderecoEmpresa)
empresa.adicionarTelefone(new Telefone("13", "99999-0000"))
empresa.adicionarTelefone(new Telefone("12", "98888-1111"))

//Criando 5 clientes
for (let i = 1; i <= 5; i++) {
    const enderecoCliente = new Endereco("SP", "São Paulo", `Rua ${i}`, `${100 + i}`)
    const cliente = new Cliente(`Cliente ${i}`, `000.000.000-0${i}`, enderecoCliente)
    cliente.adicionarTelefone(new Telefone("11", `90000-000${i}`))
    cliente.adicionarTelefone(new Telefone("11", `91111-000${i}`))
    empresa.adicionarCliente(cliente)
}

console.log(empresa.mostrarDetalhes())
