from formulario.gerador_formulario import GeradorFormulario
from ia.ollama_service import OllamaService
from utils.arquivo_utils import listar_arquivos_json, carregar_json
import os
import subprocess
import time
import sys

def verificar_processo_ollama():
    """Verifica se o Ollama já está em execução"""
    try:
        # Comandos para verificar processos em diferentes sistemas operacionais
        if os.name == 'nt':  # Windows
            result = subprocess.run(['netstat', '-ano'], capture_output=True, text=True)
            return ':11434' in result.stdout
        else:  # Linux/Mac
            result = subprocess.run(['lsof', '-i', ':11434'], capture_output=True, text=True)
            return result.returncode == 0
    except:
        return False

def iniciar_ollama():
    """Tenta iniciar o Ollama"""
    print("🔄 Tentando iniciar o Ollama...")
    
    try:
        if os.name == 'nt':  # Windows
            subprocess.Popen(['ollama', 'serve'], 
                           creationflags=subprocess.CREATE_NO_WINDOW)
        else:  # Linux/Mac
            subprocess.Popen(['ollama', 'serve'], 
                           stdout=subprocess.DEVNULL, 
                           stderr=subprocess.DEVNULL)
        
        # Aguardar o Ollama inicializar
        time.sleep(3)
        return True
    except FileNotFoundError:
        print("❌ Ollama não está instalado ou não está no PATH.")
        print("📥 Instale em: https://ollama.ai")
        return False
    except Exception as e:
        print(f"❌ Erro ao iniciar Ollama: {e}")
        return False

def main():
    # Configurações
    PASTA_FORMULARIOS = "data/formularios_gerados"
    NUMERO_FORMULARIOS = 3
    
    # Criar instâncias
    gerador = GeradorFormulario()
    ollama_service = OllamaService()
    
    print("=== SISTEMA DE GERADOR DE FORMULÁRIOS E DIAGNÓSTICOS ===")
    print()
    
    # Gerar formulários
    print(f"📋 Gerando {NUMERO_FORMULARIOS} formulários com respostas aleatórias...")
    print()
    
    gerador.gerar_multiplos_formularios(NUMERO_FORMULARIOS, PASTA_FORMULARIOS)
    
    print()
    print("✅ Formulários gerados com sucesso!")
    print()
    
    # Listar formulários gerados
    arquivos_formularios = listar_arquivos_json(PASTA_FORMULARIOS)
    
    if not arquivos_formularios:
        print("ℹ️  Nenhum formulário encontrado.")
        return
    
    print("📄 Formulários disponíveis para análise:")
    for i, arquivo in enumerate(arquivos_formularios, 1):
        print(f"{i}. {os.path.basename(arquivo)}")
    
    print()
    
    # Verificar conexão com Ollama
    print("🔍 Verificando conexão com Ollama...")
    
    if ollama_service.testar_conexao():
        print("✅ Conexão com Ollama estabelecida!")
    else:
        print("❌ Não foi possível conectar ao Ollama.")
        print("\n💡 Possíveis soluções:")
        print("1. Verifique se o Ollama está instalado (https://ollama.ai)")
        print("2. Execute 'ollama serve' em outro terminal")
        print("3. Feche outras instâncias do Ollama que podem estar rodando")
        
        if verificar_processo_ollama():
            print("\n⚠️  Foi detectado um processo usando a porta 11434.")
            escolha = input("Deseja tentar reiniciar o Ollama? (s/n): ").lower()
            if escolha == 's':
                if iniciar_ollama():
                    print("🔄 Aguardando inicialização...")
                    time.sleep(5)
                else:
                    print("❌ Não foi possível iniciar o Ollama.")
                    return
            else:
                print("ℹ️  Continuando sem Ollama.")
                return
        else:
            escolha = input("Deseja tentar iniciar o Ollama? (s/n): ").lower()
            if escolha == 's':
                if iniciar_ollama():
                    print("🔄 Aguardando inicialização...")
                    time.sleep(5)
                else:
                    print("❌ Não foi possível iniciar o Ollama.")
                    return
            else:
                print("ℹ️  Continuando sem Ollama.")
                return
    
    # Verificar novamente após tentativa de conexão
    if not ollama_service.testar_conexao():
        print("❌ Ainda não foi possível conectar ao Ollama.")
        print("ℹ️  Os formulários foram gerados, mas não será possível gerar diagnósticos.")
        return
    
    # Oferecer opção de gerar diagnóstico
    escolha = input("\n🤖 Deseja gerar um diagnóstico para um formulário? (s/n): ").lower()
    
    if escolha == 's':
        try:
            num_arquivo = int(input(f"🔢 Digite o número do formulário (1-{len(arquivos_formularios)}): ")) - 1
            if 0 <= num_arquivo < len(arquivos_formularios):
                arquivo_selecionado = arquivos_formularios[num_arquivo]
                formulario = carregar_json(arquivo_selecionado)
                
                print()
                print("🧠 Gerando diagnóstico com Ollama...")
                print("⏳ Isso pode levar alguns instantes...")
                print()
                
                # Gerar diagnóstico
                diagnostico = ollama_service.gerar_diagnostico(formulario)
                
                print("=" * 50)
                print("📊 DIAGNÓSTICO GERADO")
                print("=" * 50)
                print(diagnostico)
                print("=" * 50)
                print()
                
                # Oferecer para salvar o diagnóstico
                salvar = input("💾 Deseja salvar este diagnóstico? (s/n): ").lower()
                if salvar == 's':
                    nome_base = os.path.splitext(os.path.basename(arquivo_selecionado))[0]
                    caminho_diagnostico = os.path.join(PASTA_FORMULARIOS, f"{nome_base}_diagnostico.txt")
                    
                    with open(caminho_diagnostico, 'w', encoding='utf-8') as f:
                        f.write(diagnostico)
                    
                    print(f"✅ Diagnóstico salvo em: {caminho_diagnostico}")
            else:
                print("❌ Número inválido.")
        except ValueError:
            print("❌ Entrada inválida. Digite um número.")
    else:
        print("ℹ️  Operação cancelada.")

if __name__ == "__main__":
    main()