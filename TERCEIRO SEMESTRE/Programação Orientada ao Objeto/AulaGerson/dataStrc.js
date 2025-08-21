/*
let estrutura = new Map()
estrutura.set(1,'12')

estrutura.set('funcao', function(){
    return 'funcao anônima dentro do mapa'
})

console.log(estrutura.get(1))

console.log(estrutura.get('funcao')())
*/

/*
let estrutura = new Map()
estrutura.set(1,"120")
estrutura.set(2,"120")

console.log("tamanho da estrutura: " + estrutura.size)
console.log(estrutura.keys())
console.log(estrutura.values())
*/

/*
let estrutura = new Set()

estrutura.add(1)
estrutura.add(function(){
    return "função dentro do set"
})
estrutura.add("1")

console.log(estrutura.size)
*/

let estrutura = []
estrutura.push('novo valor')
estrutura.push('valor teste')
estrutura.push('asbiup')
console.log(estrutura)

estrutura.pop()
estrutura.shift()
console.log(estrutura)