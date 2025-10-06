class Empresa {
    static telefoneGeral
    constructor(razaoSocial, nomeFantasia, cnpj){
        this.razaoSocial = razaoSocial
        this.nomeFantasia = nomeFantasia
        this.cnpj = cnpj
    }
}

Empresa.telefoneGeral = '(12) 9999999999'

console.log('telefone de empresa: \n' + Empresa.telefoneGeral)