#  Backlog do Produto Priorizado – Commercial Track 

| Sprint | PBI  | User Story | Critérios de Aceite | Priorização |
|--------|------|------------|---------------------|-------------|
| **Sprint 1** | PBI-01 | **Como** gerente de vendas, **eu quero** cadastrar e editar informações de produtos, **para** manter o catálogo atualizado e organizado. | - Cadastrar nome, categoria, preço, quantidade inicial e código.<br>- Editar qualquer campo do produto.<br>- Não permitir campos obrigatórios vazios. | 🟥 |
| **Sprint 1** | PBI-02 | **Como** gerente de vendas, **eu quero** excluir produtos do catálogo, **para** remover itens que não serão mais vendidos, garantindo que não haja vendas associadas. | - Bloquear exclusão se houver vendas associadas.<br>- Mensagem clara de aviso em caso de bloqueio. | 🟥 |
| **Sprint 1** | - | **Como** vendedor, **eu quero** visualizar a lista de produtos e quantidades em estoque, **para** consultar disponibilidade antes de vender. | - Listar todos os produtos cadastrados.<br>- Exibir quantidade atual. | 🟥 |
| **Sprint 2** | PBI-03 | **Como** vendedor, **eu quero** registrar vendas com cliente, produto e quantidade, **para** registrar transações e manter histórico. | - Selecionar produto(s) existentes.<br>- Registrar quantidade vendida.<br>- Associar a venda a um cliente. | 🟨 |
| **Sprint 2** | PBI-04 | **Como** vendedor, **eu quero** que o estoque seja atualizado automaticamente após registrar uma venda, **para** manter quantidades corretas sem precisar atualizar manualmente. | - Reduzir a quantidade no estoque.<br>- Bloquear venda se quantidade solicitada for maior que a disponível. |  🟨 |
| **Sprint 3** | PBI-05 | **Como** gerente de vendas, **eu quero** receber alertas visuais para produtos com estoque menor que 10 unidades, **para** repor antes que falte. | - Destacar produtos com quantidade < 10 com cor ou ícone de alerta. |  🟨 |
| **Sprint 3** | - | **Como** gerente de vendas, **eu quero** visualizar relatórios de vendas por período e por produto, **para** acompanhar a performance e identificar produtos mais vendidos. | - Selecionar intervalo de datas.<br>- Exibir total de vendas e ranking de produtos mais vendidos. | 🟩 |
