const personagem1 = {
    nome: "Steve Rogers",
    codinome: "Capitão América",
    armaPrincipal: "Escudo Americano",
    armaSecundaria: "Porradaria Honesta",
    velocidade: 85, // considerando de 0 a 100
    forca: 75, // considerando de 0 a 100
    resistencia: 80, // considerando de 0 a 100
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }

}

const personagem2 = {
    nome: "Tony Stark",
    codinome: "Homem de Ferro",
    armaPrincipal: "Armadura",
    armaSecundaria: "Repulsores",
    velocidade: 90,
    forca: 80,
    resistencia: 70,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem3 = {
    nome: "Natasha Romanoff",
    codinome: "Viúva Negra",
    armaPrincipal: "Armas",
    armaSecundaria: "Artes marciais",
    velocidade: 80,
    forca: 60,
    resistencia: 65,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem4 = {
    nome: "Thor Odinson",
    codinome: "Thor",
    armaPrincipal: "Mjolnir",
    armaSecundaria: "Stormbreaker",
    velocidade: 80,
    forca: 100,
    resistencia: 100,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem5 = {
    nome: "Bruce Banner",
    codinome: "Hulk",
    armaPrincipal: "Força Bruta",
    armaSecundaria: "Absorção Gama",
    velocidade: 70,
    forca: 100,
    resistencia: 95,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem6 = {
    nome: "Clint Barton",
    codinome: "Gavião Arqueiro",
    armaPrincipal: "Arco e Flecha",
    armaSecundaria: "Flechas Explosivas",
    velocidade: 95,
    forca: 60,
    resistencia: 60,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem7 = {
    nome: "Peter Parker",
    codinome: "Homem-Aranha",
    armaPrincipal: "Lançador de Teia",
    armaSecundaria: "Sentido Aranha",
    velocidade: 95,
    forca: 75,
    resistencia: 70,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const personagem8 = {
    nome: "T'Challa",
    codinome: "Pantera Negra",
    armaPrincipal: "Garras de Vibranium",
    armaSecundaria: "Tecnologia Wakandana",
    velocidade: 85,
    forca: 80,
    resistencia: 80,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}


const personagem9 = {
    nome: "Stephen Strange",
    codinome: "Doutor Estranho",
    armaPrincipal: "Olho de Agamotto",
    armaSecundaria: "Capa",
    velocidade: 70,
    forca: 90,
    resistencia: 75,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}

const thanos = {
    nome: "Thanos",
    codinome: "Thanos, o Titã Louco",
    armaPrincipal: "Manopla do Infinito",
    armaSecundaria: "Força Bruta",
    velocidade: 50,
    forca: 100,
    resistencia: 100,
    descricao: function() {
        return "Nome do Personagem: " + this.nome + "\n"
            + "Codinome do Personagem: " + this.codinome + "\n"
            + "Arma Principal: " + this.armaPrincipal + "\n"
            + "Arma Secundária: " + this.armaSecundaria + "\n"
            + "Nível de Força: " + this.forca + "\n"
            + "Nível de Velocidade: " + this.velocidade + "\n"
            + "Nível de Resistência: " + this.resistencia + "\n"
    }
}



const arrayPersonagens = [personagem1, personagem2, personagem3, personagem4, personagem5, personagem6, personagem7, personagem8, personagem9, thanos];


arrayPersonagens.forEach(x => {
    console.log(x.descricao());
})

for (let i = 0; i < arrayPersonagens.length; i++) {
    for (let j = 0; j < arrayPersonagens.length; j++) {
        if (i !== j) {
            const p1 = arrayPersonagens[i];
            const p2 = arrayPersonagens[j];

            
            if (p1.velocidade > p2.velocidade) {
                console.log(`${p1.codinome} (${p1.velocidade}) vence na Velocidade contra ${p2.codinome} (${p2.velocidade})`);
            } else if (p1.velocidade < p2.velocidade) {
                console.log(`${p2.codinome} (${p2.velocidade}) vence na Velocidade contra ${p1.codinome} (${p1.velocidade})`);
            } else {
                console.log(`${p1.codinome} (${p1.velocidade}) e ${p2.codinome} (${p2.velocidade}) empatam na Velocidade`);
            }

            
            if (p1.forca > p2.forca) {
                console.log(`${p1.codinome} (${p1.forca}) vence na Força contra ${p2.codinome} (${p2.forca})`);
            } else if (p1.forca < p2.forca) {
                console.log(`${p2.codinome} (${p2.forca}) vence na Força contra ${p1.codinome} (${p1.forca})`);
            } else {
                console.log(`${p1.codinome} (${p1.forca}) e ${p2.codinome} (${p2.forca}) empatam na Força`);
            }

            if (p1.resistencia > p2.resistencia) {
                console.log(`${p1.codinome} (${p1.resistencia}) vence na Resistência contra ${p2.codinome} (${p2.resistencia})`);
            } else if (p1.resistencia < p2.resistencia) {
                console.log(`${p2.codinome} (${p2.resistencia}) vence na Resistência contra ${p1.codinome} (${p1.resistencia})`);
            } else {
                console.log(`${p1.codinome} (${p1.resistencia}) e ${p2.codinome} (${p2.resistencia}) empatam na Resistência`);
            }

            console.log('--------------------------------------------------------------');
        }
    }
}

console.log("O Thanos perderia se o Homem-Formiga tivesse entrado no thAnus dele")


