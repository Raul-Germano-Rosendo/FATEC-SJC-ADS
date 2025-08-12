const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntaAsync(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const nome = await perguntaAsync("Digite o nome da pessoa: ");

  const alturaStr = await perguntaAsync("Digite a altura em centímetros: ");
  const pesoStr = await perguntaAsync("Digite o peso em quilos: ");

  // Convertendo para float
  const alturaCm = parseFloat(alturaStr.replace(',', '.'));
  const peso = parseFloat(pesoStr.replace(',', '.'));

  if (isNaN(alturaCm) || isNaN(peso)) {
    console.log("Altura ou peso inválidos. Use números válidos.");
    rl.close();
    return;
  }

  // Converter altura para metros
  const altura = alturaCm / 100;

  // Calcular IMC
  const imc = peso / (altura * altura);

  // Classificar IMC
  let classificacao = '';

  if (imc < 16) classificacao = "Baixo peso muito grave";
  else if (imc >= 16 && imc <= 16.99) classificacao = "Baixo peso grave";
  else if (imc >= 17 && imc <= 18.49) classificacao = "Baixo peso";
  else if (imc >= 18.5 && imc <= 24.99) classificacao = "Peso normal";
  else if (imc >= 25 && imc <= 29.99) classificacao = "Sobrepeso";
  else if (imc >= 30 && imc <= 34.99) classificacao = "Obesidade grau I";
  else if (imc >= 35 && imc <= 39.99) classificacao = "Obesidade grau II";
  else if (imc >= 40) classificacao = "Obesidade grau III";

  // Exibir resultado
  console.log(`${nome} possui índice de massa corporal igual a ${imc.toFixed(2)} , sendo classificado como: ${classificacao}.`);

  rl.close();
}

main();
