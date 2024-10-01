data = input("Digitar ano-mes-dia ")
def muda_data(data):
    data = data.split('-')
    data = '/'.join(data[::-1])
    return data
print(muda_data(data))
