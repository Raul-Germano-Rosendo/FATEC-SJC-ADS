function calcularMediaPonderada(n1, n2, n3) {
    const peso1 = 2, peso2 = 5, peso3 = 3;
    const somaPesos = peso1 + peso2 + peso3;
    const media = ((n1 * peso1) + (n2 * peso2) + (n3 * peso3)) / somaPesos;
    return media;
}

function classificarNota(media) {
    if (media >= 9 && media <= 10) return 'A';
    if (media >= 8 && media < 9) return 'B';
    if (media >= 7 && media < 8) return 'C';
    if (media >= 6 && media < 7) return 'D';
    if (media >= 5 && media < 6) return 'E';
    return 'F';
}


//  f   u   n   ç   ã   o           i   m   p   e   d   i   t   i   v   a
['n1', 'n2', 'n3'].forEach(id => {
    document.getElementById(id).addEventListener('input', function(e) {
        let value = this.value;

        // Limita para 2 casas decimais
        if (value.includes('.')) {
            const [intPart, decPart] = value.split('.');
            if (decPart && decPart.length > 2) {
                this.value = intPart + '.' + decPart.slice(0, 2);
            }
        }

        // Limita entre 0 e 10
        let num = parseFloat(this.value);
        if (num < 0) this.value = 0;
        if (num > 10) this.value = 10;
    });
});

document.getElementById('notasForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const n1 = parseFloat(document.getElementById('n1').value);
    const n2 = parseFloat(document.getElementById('n2').value);
    const n3 = parseFloat(document.getElementById('n3').value);

    if (
        isNaN(n1) || n1 < 0 || n1 > 10 ||
        isNaN(n2) || n2 < 0 || n2 > 10 ||
        isNaN(n3) || n3 < 0 || n3 > 10
    ) {
        alert("Por favor, insira notas válidas entre 0 e 10.");
        return;
    }

    const media = calcularMediaPonderada(n1, n2, n3);
    const classificacao = classificarNota(media);

    alert(`A média do aluno é = ${media.toFixed(2)} e a sua classificação é ${classificacao}`);
});