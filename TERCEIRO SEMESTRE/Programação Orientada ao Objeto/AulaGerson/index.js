console.log("Você pagou 20 reais no morango do amor?");


let steveRogers = "Capitão América";
var tonyStark = "Homem de Ferro";
console.log("Super herois da Marvel: " + steveRogers + ", " + tonyStark);

let pagamento = 1500.50;
var conta = 2356;
console.log("Fazer pagamento de "+pagamento+" na conta: "+conta)


console.log("Meu nome é " +nome)
nome = "Black Panther"
console.log("Meu nome é " +nome)
var nome = "Principe T'chala";


if(true){
    var Hulk = 'Eric Bana'
    console.log(Hulk)
}
console.log(Hulk)


let idade = 80 // Number
let nome2 = "Steve Rogers" // String
let capitao = {nome: "Steve Rogers", Idade: 80 } // Object
console.log('Nome do Personagem' + capitao.nome)

/*
function calcularPotencia(base, expoente) {
    return base**expoente
}

let resultado = calcularPotencia(2,3)
console.log('resultado: '+ resultado)*/

let calcularPotencia = new Function("base,expoente", "return base**expoente")

let resultado = calcularPotencia(2,2)
console.log("resultado: " + resultado)

const Personagem = {
    apelido: "Capitão America",
    nome: "Steve Rogers",
    habilidades: "Força e Velocidade",
    descrição: function(){
        return "Nome: " + this.nome + " Apelido: " + this.apelido + " Poderes: "+this.habilidades
    }
}

console.log(Personagem.descrição())


//Funções:
soma = function (valor1, valor2) {
    return valor1 + valor2
}
console.log("Valor da soma: " + soma(3,5))

soma2 = (valor1, valor2) => {
    return valor1 + valor2
}
console.log("Valor da soma2: " + soma2(3,7))