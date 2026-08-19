# Prof. Jean Carlos - Redes de Computadores

    4 elementos básicos de uma rede de computadores  
    -  Meio
    -  Protocolo
    -  Mensagem
    -  Dispositivos

    Regras de Comunicação
    - Emissor e Reçeptor identificado
    - Acordo sobre método de Comunicação
    - Linguagem Comum
    - Velocidade e Ritmo da Transmissão
    - Requisitos de confirmação ou recepção


#   O que é RISC?
    Significado: Reduced Instruction Set Computer (Computador com Conjunto Reduzido de Instruções).Como funciona: Usa um grupo pequeno e simples de comandos. Cada instrução básica executa em apenas um ciclo de clock.Vantagens: Maior eficiência de energia, menor geração de calor e projetos mais baratos.Onde é usado: Celulares, tablets, dispositivos inteligentes e chips modernos de alta performance (como a arquitetura ARM e Apple Silicon).

# O que é CISC?
    Significado: Complex Instruction Set Computer (Computador com Conjunto Complexo de Instruções).Como funciona: Possui uma lista longa e variada de comandos avançados. Uma única instrução pode ler a memória, fazer cálculos e salvar o resultado de uma vez só.Vantagens: O código do programa precisa de menos instruções para realizar tarefas difíceis, facilitando o trabalho do software.Onde é usado: Computadores de mesa (PCs), notebooks e servidores tradicionais (arquitetura x86).


# Verificação de IP Público com [What_is_my_ip](https://whatismyipaddress.com/pt/meu-ip)





### TCP UDP
TCP (Transmission Control Protocol) e UDP (User Datagram Protocol) são os dois principais protocolos da camada de transporte usados para enviar dados na internet. O TCP foca em segurança e entrega garantida (como uma ligação telefônica), enquanto o UDP foca em velocidade máxima (como enviar um bilhete sem saber se chegou).


<br>
<br>

### Verificar permissões em uma chave .pem
    ls -l .\Redes_Comp_20262_1.pem

Saída:
```
PS C:\Users\raulg\Downloads> ls -l .\Redes_Comp_20262_1.pem
    Diretório: C:\Users\raulg\Downloads


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        12/08/2026     10:27           1674 Redes_Comp_20262_1.pem
```

### Como mudar as permissões? -> chmod
_RWXRWXRWX_ <br>
read write execute -> Dono(user)<br>
read write execute -> grupo do Dono(user)<br>
read write execute -> outros usuários(diferente dos demais)<br>

regra Octal - usa o intervalo de 0 até 7 <br>
chmod 777 -> libera tudo pra todos (Igual sua ex) <br>

<br>

Regra Octal do chmod

Cada permissão possui um valor:

r = 4  (read)
w = 2  (write)
x = 1  (execute)

rwx = 7
rw- = 6
r-x = 5
r-- = 4
-wx = 3
-w- = 2
--x = 1
--- = 0

A estrutura é:

chmod ABC arquivo


A = User
B = Group
C = Others

Exemplo:

chmod 754 arquivo
7 → rwx → User
5 → r-x → Group
4 → r-- → Others




### SSH
Funciona da seguinte maneira: <br>

ssh -i(caso utilize chave)"NomeDaChave.pem" usuario@IP(local ou publico) [caso utilize a porta 22 padrao]<br>
ssh -i(caso utilize chave)"NomeDaChave.pem" usuario@IP(local ou publico) -p(numero da porta utilizada sem default)

<br>

exemplo:[ssh -i ".\Teste.pem" ubuntu@124.25.12.0]<br>
0 - 1023 (Portas Baixas)


### Gerenciador APT
    sudo apt update
    sudo apt upgrade
    sudo apt-cache search openssh-server
    sudo apt install openssh-server -y
    sudo apt-cache search net-tools
    sudo netstat

### Manual
    man (nome do comando)

