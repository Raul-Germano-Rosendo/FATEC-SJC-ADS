import Pessoa from "./Pessoa";

export default class Aluno extends Pessoa{
    private estresse: boolean
    constructor(nome: string, estresse: boolean){
        super(nome)
        this.estresse = estresse
    }
    
    dados(): string{
        return `Nome: ${this.nome} Estresse: ${this.estresse}`
    }

}