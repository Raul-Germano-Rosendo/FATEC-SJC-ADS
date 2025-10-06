import json
import random
from datetime import datetime
from uuid import uuid4
from typing import List, Dict, Any
import os

class GeradorFormulario:
    def __init__(self):
        self.perguntas = self._criar_perguntas()
    
    def _criar_perguntas(self) -> List[Dict[str, Any]]:
        """Cria as 10 perguntas do formulário empresarial com 4 alternativas cada"""
        return [
            {
                "id": 1,
                "pergunta": "Em qual área principal sua empresa atua?",
                "alternativas": [
                    "Tecnologia e Informática",
                    "Saúde e Bem-estar",
                    "Educação e Treinamento",
                    "Varejo e Comércio Eletrônico"
                ]
            },
            {
                "id": 2,
                "pergunta": "Qual é o tamanho da sua empresa em número de funcionários?",
                "alternativas": [
                    "Microempresa (até 10 funcionários)",
                    "Pequena empresa (11-50 funcionários)",
                    "Média empresa (51-200 funcionários)",
                    "Grande empresa (acima de 200 funcionários)"
                ]
            },
            {
                "id": 3,
                "pergunta": "Há quanto tempo sua empresa está no mercado?",
                "alternativas": [
                    "Menos de 1 ano",
                    "1 a 3 anos",
                    "3 a 10 anos",
                    "Mais de 10 anos"
                ]
            },
            {
                "id": 4,
                "pergunta": "Qual é o principal desafio que sua empresa enfrenta atualmente?",
                "alternativas": [
                    "Falta de clientes ou baixa demanda",
                    "Dificuldades financeiras ou fluxo de caixa",
                    "Concorrência acirrada no mercado",
                    "Falta de mão de obra qualificada"
                ]
            },
            {
                "id": 5,
                "pergunta": "Qual área da sua empresa mais precisa de melhorias?",
                "alternativas": [
                    "Marketing e Divulgação",
                    "Gestão Financeira",
                    "Processos Internos e Operacionais",
                    "Recursos Humanos e Treinamento"
                ]
            },
            {
                "id": 6,
                "pergunta": "Como você classifica a saúde financeira da sua empresa?",
                "alternativas": [
                    "Excelente - temos lucros consistentes",
                    "Boa - temos lucros, mas poderiam ser melhores",
                    "Regular - equilibramos entre lucros e prejuízos",
                    "Preocupante - temos prejuízos consistentes"
                ]
            },
            {
                "id": 7,
                "pergunta": "Qual é o principal objetivo da sua empresa para os próximos 12 meses?",
                "alternativas": [
                    "Aumentar as vendas e receita",
                    "Expandir para novos mercados",
                    "Lançar novos produtos ou serviços",
                    "Melhorar a eficiência operacional"
                ]
            },
            {
                "id": 8,
                "pergunta": "Como sua empresa se posiciona em relação à concorrência?",
                "alternativas": [
                    "Líder de mercado",
                    "Entre os principais concorrentes",
                    "Em posição intermediária",
                    "Em desvantagem competitiva"
                ]
            },
            {
                "id": 9,
                "pergunta": "Qual é o maior obstáculo para o crescimento da sua empresa?",
                "alternativas": [
                    "Limitações de capital",
                    "Falta de conhecimento técnico/especializado",
                    "Barreiras regulatórias ou burocráticas",
                    "Falta de uma estratégia clara"
                ]
            },
            {
                "id": 10,
                "pergunta": "Qual tipo de suporte da EntreNova seria mais valioso para sua empresa?",
                "alternativas": [
                    "Consultoria estratégica e de gestão",
                    "Soluções tecnológicas e automação",
                    "Capacitação e treinamento de equipe",
                    "Acesso a networking e parcerias"
                ]
            }
        ]
    
    def gerar_respostas_aleatorias(self) -> Dict[int, Dict[str, Any]]:
        """Gera respostas aleatórias para todas as perguntas"""
        respostas = {}
        for pergunta in self.perguntas:
            resposta_aleatoria = random.choice(pergunta["alternativas"])
            respostas[pergunta["id"]] = {
                "pergunta": pergunta["pergunta"],
                "resposta": resposta_aleatoria
            }
        return respostas
    
    def criar_formulario_completo(self) -> Dict[str, Any]:
        """Cria um formulário completo com respostas aleatórias"""
        respostas = self.gerar_respostas_aleatorias()
        
        return {
            "id": str(uuid4())[:8],
            "data_preenchimento": datetime.now().isoformat(),
            "perguntas": self.perguntas,
            "respostas": respostas
        }
    
    def salvar_formulario_json(self, formulario: Dict[str, Any], caminho: str):
        """Salva o formulário em formato JSON"""
        # Garante que o diretório existe
        os.makedirs(os.path.dirname(caminho), exist_ok=True)
        
        with open(caminho, 'w', encoding='utf-8') as f:
            json.dump(formulario, f, ensure_ascii=False, indent=4)
    
    def carregar_formulario_json(self, caminho: str) -> Dict[str, Any]:
        """Carrega um formulário a partir de um arquivo JSON"""
        with open(caminho, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def gerar_multiplos_formularios(self, quantidade: int, pasta_destino: str):
        """Gera múltiplos formulários e salva em JSON"""
        for i in range(quantidade):
            formulario = self.criar_formulario_completo()
            caminho_arquivo = os.path.join(pasta_destino, f"formulario_{formulario['id']}.json")
            self.salvar_formulario_json(formulario, caminho_arquivo)
            print(f"Formulário {i+1} gerado e salvo em: {caminho_arquivo}")