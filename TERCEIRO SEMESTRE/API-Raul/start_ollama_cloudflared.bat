@echo off
:: Arquivo para iniciar Ollama + Cloudflared com link gratuito

:: Caminho do Ollama (ajuste se necessário)
set OLLAMA_PATH="C:\Users\raulg\AppData\Local\Programs\Ollama\ollama.exe"

:: Caminho do Cloudflared (ajuste se necessário)
set CLOUDFLARED_PATH="C:\cloudflared\cloudflared.exe"

:: Iniciar Ollama em uma janela separada
start "" %OLLAMA_PATH% serve

:: Aguardar 5 segundos para Ollama subir
timeout /t 5 /nobreak

:: Iniciar Cloudflared em outra janela e gerar link
start "" %CLOUDFLARED_PATH% tunnel --url http://127.0.0.1:11434

:: Mensagem para o usuário
echo.
echo ==============================================
echo Aguarde o Cloudflared gerar o link.
echo Ele será mostrado na nova janela do terminal.
echo ==============================================
pause
