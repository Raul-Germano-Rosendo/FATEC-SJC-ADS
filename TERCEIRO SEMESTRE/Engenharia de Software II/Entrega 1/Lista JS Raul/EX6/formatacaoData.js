document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = document.getElementById('data').value.trim();
    const partes = data.split('/'); // adiciona a Barra na data

    if (partes.length !== 3) {
        document.getElementById('saida').textContent = "Data inválida!";
        return;
    }

    const dia = partes[0];
    const mes = parseInt(partes[1], 10);
    const ano = partes[2];

    const diaNum = parseInt(dia, 10);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
        document.getElementById('saida').textContent = "Dia inválido!";
        return;
    }

    const meses = [
        '', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    if (mes < 1 || mes > 12) {
        document.getElementById('saida').textContent = "Mês inválido!";
        return;
    }

    document.getElementById('saida').textContent = `${dia} de ${meses[mes]} de ${ano}`;
});