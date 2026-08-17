# ☁️ AWS EC2 — Ubuntu/Debian T3 Micro

Guia rápido para criar e configurar uma instância **EC2 na AWS** utilizando **Ubuntu ou Debian**, instância **t3.micro** e acesso por **SSH com par de chaves**.

---

## 📋 Requisitos

* Conta na AWS
* Região AWS escolhida
* Par de chaves SSH (`.pem`)
* Cliente SSH
* Terminal (PowerShell, Linux ou macOS)

---

# 1. Criar a instância EC2

Acesse o console da AWS e vá para:

**EC2 → Instances → Launch instances**

### Nome

Defina um nome para identificar a máquina:

```text
meu-servidor
```

### Sistema operacional

Em **Application and OS Images (AMI)**, escolha uma das opções:

**Ubuntu**

* Ubuntu Server LTS
* Arquitetura: `64-bit (x86)`

ou

**Debian**

* Debian Server
* Arquitetura: `64-bit (x86)`

> Para este guia, os comandos são praticamente iguais entre Ubuntu e Debian.

---

# 2. Escolher o tipo da instância

Em **Instance type**, selecione:

```text
t3.micro
```

Características:

```text
2 vCPUs
1 GiB RAM
```

A `t3.micro` é uma opção pequena e econômica para servidores de desenvolvimento, APIs, aplicações web e estudos.

---

# 3. Criar o par de chaves SSH

Na seção **Key pair**, clique em:

**Create new key pair**

Configure, por exemplo:

```text
Name: minha-chave
Key pair type: RSA
Private key format: .pem
```

Depois clique em:

**Create key pair**

O arquivo será baixado para seu computador:

```text
minha-chave.pem
```

### ⚠️ IMPORTANTE

**Não compartilhe o arquivo `.pem`.**

Ele funciona como sua credencial privada para acessar o servidor.

---

# 4. Configurar o Security Group

Na seção **Network settings**, crie ou selecione um Security Group.

Para acesso SSH:

```text
Type: SSH
Protocol: TCP
Port: 22
```

### Origem recomendada

Utilize:

```text
My IP
```

Isso restringe o SSH ao seu endereço IP atual.

Evite:

```text
0.0.0.0/0
```

para SSH em servidores reais, pois permite tentativas de conexão de qualquer endereço IPv4.

---

## Portas comuns

Se posteriormente instalar uma aplicação web:

| Serviço |  Porta |
| ------- | -----: |
| SSH     |   `22` |
| HTTP    |   `80` |
| HTTPS   |  `443` |
| Django  | `8000` |
| Node.js | `3000` |

**Abra somente as portas realmente necessárias.**

---

# 5. Armazenamento

Para projetos pequenos, o armazenamento padrão já costuma ser suficiente.

Exemplo:

```text
Root volume
20 GiB
gp3
```

O volume pode ser ajustado conforme a necessidade do projeto.

---

# 6. Criar a instância

Revise as configurações:

```text
OS: Ubuntu/Debian
Instance type: t3.micro
Key pair: minha-chave
Security Group: configurado
Storage: conforme necessário
```

Depois clique em:

**Launch instance**

Aguarde alguns segundos até o status ficar:

```text
Running
```

---

# 7. Descobrir o IP público

Na página da instância, procure:

```text
Public IPv4 address
```

Exemplo:

```text
18.123.45.67
```

Esse será o endereço utilizado para conectar via SSH.

---

# 🔑 8. Conectar via SSH

## Linux / macOS

Primeiro proteja a chave:

**COMANDO IMPORTANTE:**

```bash
chmod 400 minha-chave.pem
```

Depois:

**COMANDO IMPORTANTE:**

```bash
ssh -i "minha-chave.pem" ubuntu@18.123.45.67
```

Para Ubuntu, normalmente o usuário é:

```text
ubuntu
```

Para Debian, normalmente:

```text
admin
```

ou, dependendo da AMI:

```text
debian
```

Exemplo:

```bash
ssh -i "minha-chave.pem" admin@18.123.45.67
```

---

# 🪟 9. Conectar pelo Windows PowerShell

No PowerShell, entre na pasta onde está sua chave:

```powershell
cd C:\Users\SEU_USUARIO\Downloads
```

Depois:

**COMANDO IMPORTANTE:**

```powershell
ssh -i ".\minha-chave.pem" ubuntu@18.123.45.67
```

Se for Debian:

```powershell
ssh -i ".\minha-chave.pem" admin@18.123.45.67
```

---

# 🛠️ 10. Primeiros comandos no servidor

Depois de conectar:

```bash
whoami
```

Verificar o sistema:

```bash
uname -a
```

Ver informações da distribuição:

```bash
cat /etc/os-release
```

Ver o IP:

```bash
ip a
```

Ver espaço em disco:

**COMANDO IMPORTANTE:**

```bash
df -h
```

Ver memória:

**COMANDO IMPORTANTE:**

```bash
free -h
```

Ver processos:

```bash
top
```

ou:

```bash
htop
```

---

# 🔄 11. Atualizar o sistema

## Ubuntu / Debian

**COMANDOS IMPORTANTES:**

```bash
sudo apt update
```

Depois:

```bash
sudo apt upgrade -y
```

Ou de uma vez:

```bash
sudo apt update && sudo apt upgrade -y
```

---

# 📦 12. Instalar pacotes

Exemplo:

```bash
sudo apt install git curl wget unzip -y
```

Verificar Git:

```bash
git --version
```

Verificar Curl:

```bash
curl --version
```

---

# 👤 13. Comandos importantes de usuários

Ver usuário atual:

```bash
whoami
```

Criar usuário:

```bash
sudo adduser nomeusuario
```

Adicionar usuário ao grupo sudo:

```bash
sudo usermod -aG sudo nomeusuario
```

Trocar de usuário:

```bash
su - nomeusuario
```

---

# 📁 14. Comandos básicos de arquivos

Listar arquivos:

```bash
ls
```

Listar detalhes:

```bash
ls -la
```

Entrar em uma pasta:

```bash
cd pasta
```

Voltar:

```bash
cd ..
```

Criar pasta:

```bash
mkdir projeto
```

Criar arquivo:

```bash
touch arquivo.txt
```

Copiar:

```bash
cp arquivo.txt backup.txt
```

Mover/renomear:

```bash
mv arquivo.txt novo.txt
```

Remover:

```bash
rm arquivo.txt
```

⚠️ Cuidado com:

```bash
rm -rf
```

Esse comando pode apagar diretórios inteiros sem pedir confirmação.

---

# 🌐 15. Testar conexão com a Internet

**COMANDO IMPORTANTE:**

```bash
ping -c 4 google.com
```

Testar uma URL:

```bash
curl https://example.com
```

---

# 🔥 16. Firewall

Ubuntu/Debian podem utilizar o **UFW**.

Ver status:

```bash
sudo ufw status
```

Permitir SSH:

**COMANDO IMPORTANTE:**

```bash
sudo ufw allow 22/tcp
```

Permitir HTTP:

```bash
sudo ufw allow 80/tcp
```

Permitir HTTPS:

```bash
sudo ufw allow 443/tcp
```

Ativar:

**COMANDO IMPORTANTE:**

```bash
sudo ufw enable
```

> **Atenção:** sempre permita SSH antes de ativar o firewall, para evitar perder o acesso ao servidor.

---

# 📊 17. Monitoramento rápido

Ver memória:

```bash
free -h
```

Ver armazenamento:

```bash
df -h
```

Ver processos:

```bash
top
```

Ver carga do sistema:

```bash
uptime
```

Ver serviços:

```bash
systemctl --type=service
```

---

# ⚙️ 18. Serviços com systemd

Iniciar um serviço:

```bash
sudo systemctl start NOME
```

Parar:

```bash
sudo systemctl stop NOME
```

Reiniciar:

**COMANDO IMPORTANTE:**

```bash
sudo systemctl restart NOME
```

Ver status:

**COMANDO IMPORTANTE:**

```bash
sudo systemctl status NOME
```

Ativar no boot:

```bash
sudo systemctl enable NOME
```

---

# 🧹 19. Desligar a instância

Para desligar o servidor pelo Linux:

```bash
sudo shutdown now
```

Ou:

```bash
sudo poweroff
```

Também é possível fazer isso pelo console:

**EC2 → Instance → Instance state → Stop instance**

> **Stop** normalmente preserva o volume EBS, enquanto a instância deixa de consumir recursos de computação. Custos de armazenamento podem continuar existindo.

---

# 🗑️ 20. Encerrar a instância

Quando não precisar mais dela:

**EC2 → Instance → Instance state → Terminate instance**

⚠️ **IMPORTANTE:** terminar uma instância pode ser irreversível e pode resultar na exclusão dos volumes configurados para serem apagados junto com a instância.

---

# 🚀 21. Fluxo rápido

Para criar um servidor do zero:

```text
AWS
 │
 ├── EC2
 │    └── Launch Instance
 │
 ├── Ubuntu/Debian
 │
 ├── t3.micro
 │
 ├── Criar Key Pair
 │      └── minha-chave.pem
 │
 ├── Security Group
 │      └── SSH : 22
 │
 └── Launch
        │
        ▼
     IP público
        │
        ▼
      SSH
        │
        ▼
   Ubuntu/Debian
        │
        ├── apt update
        ├── apt upgrade
        ├── git
        ├── Docker
        ├── Nginx
        └── Aplicação
```

---

# ⭐ Comandos essenciais — Resumo

### Conectar

```bash
ssh -i "minha-chave.pem" ubuntu@IP
```

### Atualizar

```bash
sudo apt update && sudo apt upgrade -y
```

### Ver memória

```bash
free -h
```

### Ver disco

```bash
df -h
```

### Ver IP

```bash
ip a
```

### Ver sistema

```bash
cat /etc/os-release
```

### Ver serviços

```bash
sudo systemctl status NOME
```

### Reiniciar serviço

```bash
sudo systemctl restart NOME
```

### Testar Internet

```bash
ping -c 4 google.com
```

### Firewall

```bash
sudo ufw status
```

### Sair do SSH

```bash
exit
```

---

# 🔐 Boas práticas

* **Nunca compartilhe sua chave `.pem`.**
* **Não coloque a chave privada no GitHub.**
* Restrinja SSH para **My IP** sempre que possível.
* Utilize **Security Groups** para controlar as portas.
* Abra somente as portas necessárias.
* Mantenha o sistema atualizado.
* Crie usuários separados para serviços quando apropriado.
* Evite executar aplicações permanentemente como `root`.
* Para aplicações públicas, utilize **HTTPS**.
* Considere utilizar um **Elastic IP** quando precisar de um endereço IPv4 público persistente.
* Monitore CPU, memória, disco e custos da AWS.
* Ao terminar seus testes, **pare ou encerre recursos que não estiver usando**.

---

## 📌 Próximo passo EXEMPLO

Depois de criar a instância, uma stack comum para hospedar uma aplicação seria:

```text
AWS EC2
   │
   ├── Ubuntu/Debian
   ├── Docker
   ├── Nginx
   ├── HTTPS / Certbot
   ├── PostgreSQL
   └── Aplicação
        ├── Django
        ├── Node.js
        └── API REST
```

Esse setup permite transformar a `t3.micro` em um pequeno servidor para **APIs, projetos acadêmicos, portfólio, aplicações web e ambientes de desenvolvimento**.
