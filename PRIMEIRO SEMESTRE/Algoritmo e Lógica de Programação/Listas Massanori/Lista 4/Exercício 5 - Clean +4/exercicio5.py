import string


texto = """The Python Software Foundation and the global Python community welcome and 
encourage participation by everyone. Our community is based on mutual respect, 
tolerance, and encouragement, and we are working to help each other live up 
to these principles. We want our community to be more diverse: whoever you are, 
and whatever your background, we welcome you."""



#splitar o texto
palavras = texto.split()

#clean
palavras_limpas = []
for palavra in palavras:
    palavra_limpa = palavra.strip(string.punctuation).lower()
    palavras_limpas.append(palavra_limpa)


#python +4
letras = set("python")
contador = 0
for palavra in palavras_limpas:
    if len(palavra) > 4 and any(letra in palavra for letra in letras):
        contador += 1




print(f"Número de palavras com mais de 4 caracteres que contêm uma das letras 'python': {contador}")
