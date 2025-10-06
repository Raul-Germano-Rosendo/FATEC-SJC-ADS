document.getElementById('folhaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const horas = parseInt(document.getElementById('horas').value);
    const turno = document.getElementById('turno').value.toUpperCase();
    const categoria = document.getElementById('categoria').value.toUpperCase();
    const salmin = parseFloat(document.getElementById('salmin').value);

    let valorHora = 0;
    if (categoria === 'G') {
        switch (turno) {
            case 'M':
            case 'V':
                valorHora = 0.04 * salmin;
                break;
            case 'N':
                valorHora = 0.05 * salmin;
                break;
        }
    } else if (categoria === 'F') {
        switch (turno) {
            case 'M':
            case 'V':
                valorHora = 0.02 * salmin;
                break;
            case 'N':
                valorHora = 0.03 * salmin;
                break;
        }
    }

    const salarioInicial = valorHora * horas;

    let aux = 0;
    if (salarioInicial <= 800) {
        aux = salarioInicial * 0.25;
    } else if (salarioInicial <= 1200) {
        aux = salarioInicial * 0.20;
    } else {
        aux = salarioInicial * 0.15;
    }

    const salarioFinal = salarioInicial + aux;

    
    document.getElementById('saida').textContent =
        `Código: ${codigo}
Horas trabalhadas: ${horas}
Valor da hora: R$ ${valorHora.toFixed(2)}
Salário inicial: R$ ${salarioInicial.toFixed(2)}
Auxílio alimentação: R$ ${aux.toFixed(2)}
Salário final: R$ ${salarioFinal.toFixed(2)}`;
});