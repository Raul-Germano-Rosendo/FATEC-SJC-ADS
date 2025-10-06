import Pessoa from "./Pessoa";

export default class Professor extends Pessoa{
    private raiva: boolean
    constructor(nome: string, raiva: boolean){
        super(nome)
        this.raiva = raiva
    }

    dados(): string{
        return `Nome: ${this.nome} Raiva: ${this.raiva}`
    }
}    
