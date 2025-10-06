class Empresa {
    #cnpj;

    constructor(razaoSocial, nomeFantasia, cnpj) {
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.#cnpj = cnpj;
    }

    #colocarMaiusculo(texto) {
        return texto.toUpperCase();
    }

    mostrarDetalhes() {
        return 'Nome da Empresa: ' + this.#colocarMaiusculo(this.razaoSocial) +
               '\nNome Fantasia: ' + this.#colocarMaiusculo(this.nomeFantasia);
    }

    get pegarCnpj() {
        return this.#cnpj;
    }

    set setCNPJ(novoCnpj) {
        this.#cnpj = novoCnpj;
    }
}

let empresa = new Empresa('ABC LTDA', 'Mercado Online', '999999999');


empresa.setCNPJ = "888888888";


console.log("Qual o CNPJ: " + empresa.pegarCnpj);
console.log("Detalhes:\n" + empresa.mostrarDetalhes());
