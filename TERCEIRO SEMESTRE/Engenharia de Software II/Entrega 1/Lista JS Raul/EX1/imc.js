document.getElementById('form-imc').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const alturaCm = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    if (!nome || isNaN(alturaCm) || isNaN(peso)) {
        document.getElementById('resultado').textContent = 'Por favor, preencha todos os campos corretamente.';
        return;
    } //pegar erro

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);

    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else {
        classificacao = 'Obesidade';
    }

    document.getElementById('resultado').textContent =
        `${nome}, seu IMC é ${imc.toFixed(2)} (${classificacao}).`;
});