export default abstract class Pessoa {
    protected nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }

    abstract dados(): string;
}
