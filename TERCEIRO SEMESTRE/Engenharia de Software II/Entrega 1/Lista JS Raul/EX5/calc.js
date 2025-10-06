function calculo(num1, num2, operacao) {
    if (operacao === 'soma') {
        return num1 + num2;
    } else if (operacao === 'subtração') {
        return num1 - num2;
    } else {
        return null;
    }
}

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacao = document.getElementById('operacao').value.trim().toLowerCase();

    const resultado = calculo(num1, num2, operacao);

    if (resultado === null) {
        document.getElementById('saida').textContent = "Operação inválida. Digite 'soma' ou 'subtração'.";
    } else {
        document.getElementById('saida').textContent = `O resultado é: ${resultado}.`;
    }
});