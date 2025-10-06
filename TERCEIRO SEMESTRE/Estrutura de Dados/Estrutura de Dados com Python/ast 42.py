import ast  #necessita Python 3.9 em diante
expr = '''
def resposta():
   print('Alô Mundo')
'''
p = ast.parse(expr)

# Substitui o corpo da função por 'return 42'
p.body[0].body = [ast.parse('return 42').body[0]]
# Converte AST de volta para código fonte
print(ast.unparse(p))

