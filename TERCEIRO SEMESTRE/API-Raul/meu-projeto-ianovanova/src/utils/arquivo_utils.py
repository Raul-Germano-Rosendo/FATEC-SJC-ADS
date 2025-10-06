import os
import json
from typing import List

def listar_arquivos_json(pasta: str) -> List[str]:
    """Lista todos os arquivos JSON em uma pasta"""
    if not os.path.exists(pasta):
        return []
    
    arquivos = []
    for arquivo in os.listdir(pasta):
        if arquivo.endswith('.json'):
            caminho_completo = os.path.join(pasta, arquivo)
            arquivos.append(caminho_completo)
    
    return arquivos

def carregar_json(caminho: str) -> dict:
    """Carrega um arquivo JSON"""
    with open(caminho, 'r', encoding='utf-8') as f:
        return json.load(f)

def salvar_json(dados: dict, caminho: str):
    """Salva dados em um arquivo JSON"""
    with open(caminho, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)