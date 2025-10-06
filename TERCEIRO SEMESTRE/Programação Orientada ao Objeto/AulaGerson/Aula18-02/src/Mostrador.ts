import Pessoa from "./Pessoa";

export default class Mostrador{
    public mostrar(pessoa: Pessoa): void{
        console.log(pessoa.dados())
    }
}