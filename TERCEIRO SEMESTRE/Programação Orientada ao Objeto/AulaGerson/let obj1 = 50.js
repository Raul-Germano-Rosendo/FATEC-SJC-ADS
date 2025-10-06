/*
let obj1 = {
    valor: 10
}

let obj2 = obj1

obj2.valor = 50

console.log(`valor do obj1:  ${obj1.valor}`)
console.log(`valor do obj2:  ${obj2.valor}`)


*/

/*
let fprimitiva = (valor) => {
    valor = valor + 100
    return valor
}


let numero = 50

console.log(`Numero: ${numero}`)
console.log(`Numero: ${fprimitiva(numero)}`)
console.log(`Numero: ${numero}`)
*/

/*
let freferencia = (obj) => {
    obj.valor = obj.valor + 100
    return obj.valor
}

let objetinho = {valor: 50}
let juju = objetinho

console.log(`O valor do obj: ${objetinho}`)
console.log(`O valor do obj: ${freferencia(objetinho)}`)
console.log(`O valor do obj: ${objetinho}`)
console.log(`O valor do obj: ${juju.valor}`)

*/

/*
const empresa = new Object()
empresa.nome = "Banco Nacional"
empresa.cnpg = "12548757652545"

const empresa2 = empresa
empresa2['nome'] = "Banco Internacional"

console.log(empresa.nome)
console.log(empresa2.nome)


let valorReferencia = {valor: 10}

function aumentarMaisDez(referencia){
    referencia.valor = referencia.valor + 10
}

aumentarMaisDez(valorReferencia)
console.log(`Este é o valor da variável: ` + valorReferencia.valor)

*/

/*
let empresa = {
    nome: 'Mercado Online',
    razaoSocial: 'ABC LTDA',
    get pegarNome(){
        return this.nome
    }
}

console.log('Qual o nome da empresa: ' + empresa.pegarNome)

*/


/*
let empresa = {
    nome: 'Mercado Online',
    razaoSocial: 'ABC LTDA',
    set colocarNome(novoNome){
        this.nome = novoNome
    }
}


empresa.colocarNome = "Mercado Online Americano"

console.log('Qual o nome da empresa: ' + empresa.nome)
*/

/*
function Empresa(nome, cnpj){
    this.nome = nome
    this.cnpj = cnpj
}

let emp1 = new Empresa('Shibata', '4352435243')

console.log(`nome: ${emp1.nome}`)
console.log(`cnpj: ${emp1.cnpj}`)


*/


function Empresa(nome, razaoSocial){
    this.nome = nome
    this.razaoSocial = razaoSocial
        this.detalhe = function(){
            return this.nome + '\n' + this.razaoSocial
        }
}

let empresa = new Empresa('Mercado Online', 'ABC LTDA')
let empresa2 = new Empresa('teste', 'Testando')
console.log("Detalhes da empresa: \n" + empresa.detalhe())

console.log("Detalhes da empresa: \n" + empresa2.detalhe())
