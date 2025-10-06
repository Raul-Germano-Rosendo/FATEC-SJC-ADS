document.getElementById('freteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const distancia = parseFloat(document.getElementById('distancia').value);
    const pecas = parseInt(document.getElementById('pecas').value);
    const regiao = document.getElementById('regiao').value;
    const rastreamento = document.getElementById('rastreamento').value;

    // Tabela de valores
    const tabela = {
        1: { nome: "Sul", valor: 1.00, desconto: 0.10 },
        2: { nome: "Sudeste", valor: 1.20, desconto: 0.12 },
        3: { nome: "Centro-oeste", valor: 1.30, desconto: 0.13 }
    };

    if (!tabela[regiao]) {
        alert("Selecione uma região válida.");
        return;
    } //catch erro

    let valorFretePecas = 0;
    if (pecas <= 1000) {
        valorFretePecas = pecas * tabela[regiao].valor;
    } else {
        const normal = 1000 * tabela[regiao].valor;
        const desconto = tabela[regiao].valor * (1 - tabela[regiao].desconto);
        const extra = (pecas - 1000) * desconto;
        valorFretePecas = normal + extra;
    }

    const taxaRastreamento = rastreamento === "S" ? 200 : 0;
    const valorFreteKm = distancia * 1; // 1 litro/km

    const totalFrete = taxaRastreamento + valorFretePecas + valorFreteKm;

    // Exibir resultados toFixed
    document.getElementById('taxaRastreamento').textContent = `Taxa do rastreamento: R$ ${taxaRastreamento.toFixed(2)}`;
    document.getElementById('valorFretePecas').textContent = `Valor do frete pelas peças: R$ ${valorFretePecas.toFixed(2)}`;
    document.getElementById('valorFreteKm').textContent = `Valor do frete por quilômetro: R$ ${valorFreteKm.toFixed(2)}`;
    document.getElementById('totalFrete').textContent = `Total do frete: R$ ${totalFrete.toFixed(2)}`;

    document.getElementById('resultado').style.display = 'block';
});