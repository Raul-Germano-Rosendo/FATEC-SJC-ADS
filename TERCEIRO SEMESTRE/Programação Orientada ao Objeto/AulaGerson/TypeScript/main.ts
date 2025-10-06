let mensagem = (msg: string | number) => {
    return `Mensagem: ${msg}`
}

console.log(mensagem(`Paysandu esta quase rebaixado`))


type Telefone = {
    ddd: string,
    numero: string
}

let tel:Telefone = {
    ddd: "12",
    numero: "987364777"
}


let mostrar = (tel: Telefone) => {
    console.log(`ddd: ${tel.ddd} numero: ${tel.numero}`)
}

mostrar(tel)


/*typeof*/

let mensagem = (informacao: string | number): string => {
    if (typeof informacao === 'string'){
        return `informacao recebida: ${informacao.toUpperCase()}`
    } else {
        return `informacao recebida ${informacao}`
    }
}

