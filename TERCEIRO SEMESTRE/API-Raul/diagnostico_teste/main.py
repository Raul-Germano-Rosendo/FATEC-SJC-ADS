import subprocess
import os
from datetime import datetime

perguntas = {
    "Pessoas & Cultura": [
        "Como a comunicação acontece no dia a dia?",
        "Como você descreveria o estilo de liderança predominante?",
        "Quando surgem problemas, como os times costumam agir?",
        "Como está organizada a rotina de trabalho?",
        "Até que ponto os valores da empresa estão presentes no dia a dia?",
        "Quais ferramentas apoiam pessoas & cultura?"
    ],
    "Estrutura & Operações": [
        "Como é a troca de informações entre áreas?",
        "Como os gestores lidam com delegação?",
        "Quando processos falham, o que acontece?",
        "Quanta autonomia operacional os colaboradores têm?",
        "Qual é a relação da empresa com padrões de qualidade?",
        "Quais ferramentas apoiam as operações do dia a dia?"
    ],
    "Mercado & Clientes": [
        "Como a empresa ouve seus clientes?",
        "Como vendas e atendimento trabalham juntos?",
        "Quando o mercado muda, como a empresa reage?",
        "Como é o acompanhamento de metas comerciais?",
        "O diferencial competitivo está claro?",
        "Quais ferramentas apoiam mercado & clientes?"
    ],
    "Direção & Futuro": [
        "Como a visão de futuro é comunicada?",
        "Como os líderes conectam pessoas à estratégia?",
        "Qual é o papel da inovação no planejamento?",
        "Como as atividades diárias se conectam com a estratégia?",
        "Como a empresa lida com propósito e impacto social?",
        "Quais ferramentas apoiam a estratégia?"
    ]
}

# ----------------------------
# OPÇÕES POSSÍVEIS
# ----------------------------
opcoes = {
    "4": "Melhor prática / estágio avançado",
    "3": "Bom, mas com falhas",
    "2": "Frágil, dependente de fatores externos",
    "1": "Inexistente ou muito problemático"
}


def gerar_prompt_perguntas():
    prompt = "Você é um consultor especialista em diagnóstico organizacional.\n"
    prompt += "Leia cada pergunta abaixo e escolha a alternativa mais adequada entre 1 e 4.\n"
    prompt += "Formato de saída: JSON contendo pergunta, opção escolhida, descrição e pontuação.\n\n"

    for dimensao, questoes in perguntas.items():
        prompt += f"\n=== Dimensão: {dimensao} ===\n"
        for idx, q in enumerate(questoes, 1):
            prompt += f"\nPergunta {idx}: {q}\n"
            for valor, descricao in opcoes.items():
                prompt += f"  ({valor}) {descricao}\n"
    return prompt


def rodar_ollama(prompt):
    comando = ["ollama", "run", "llama3"]
    resultado = subprocess.run(
        comando,
        input=prompt.encode("utf-8"),
        capture_output=True
    )
    return resultado.stdout.decode("utf-8", errors="ignore").strip()


if __name__ == "__main__":
    os.makedirs("resultados", exist_ok=True)

    # Gerar timestamp para salvar arquivos únicos
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # === PASSO 1: IA escolhe respostas ===
    print("=== OLLAMA ESCOLHENDO RESPOSTAS ===\n")
    respostas = rodar_ollama(gerar_prompt_perguntas())

    respostas_path = f"resultados/respostas_{timestamp}.txt"
    with open(respostas_path, "w", encoding="utf-8") as f:
        f.write(respostas)

    print(f"Respostas salvas em {respostas_path} ✅")

    # === PASSO 2: IA gera diagnóstico ===
    print("\n=== GERANDO DIAGNÓSTICO ===\n")
    prompt_diag = (
        "Você é um consultor especialista em diagnóstico organizacional.\n"
        "Analise as respostas abaixo e gere:\n"
        "1. O estágio de maturidade de cada dimensão (1 a 4).\n"
        "2. Pontos fortes.\n"
        "3. Fragilidades.\n"
        "4. Trilhas de melhoria recomendadas.\n\n"
        f"{respostas}"
    )
    diagnostico = rodar_ollama(prompt_diag)

    diagnostico_path = f"resultados/diagnostico_{timestamp}.txt"
    with open(diagnostico_path, "w", encoding="utf-8") as f:
        f.write(diagnostico)

    print(f"Diagnóstico salvo em {diagnostico_path} ✅")
