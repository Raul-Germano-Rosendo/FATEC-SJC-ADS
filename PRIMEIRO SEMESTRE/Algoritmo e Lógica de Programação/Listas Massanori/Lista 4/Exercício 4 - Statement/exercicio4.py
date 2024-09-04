import string


texto = """The Python Software Foundation and the global Python community welcome and 
encourage participation by everyone. Our community is based on mutual respect, 
tolerance, and encouragement, and we are working to help each other live up 
to these principles. We want our community to be more diverse: whoever you are, 
and whatever your background, we welcome you."""




palavras = texto.split()


palavras_limpas = []
for palavra in palavras:
    palavra_limpa = palavra.strip(string.punctuation).lower()
    palavras_limpas.append(palavra_limpa)



#set
letras = set("python")
resultado = []
for palavra in palavras_limpas:
    if palavra and (palavra[0] in letras or palavra[-1] in letras):
        resultado.append(palavra)



print(resultado)
