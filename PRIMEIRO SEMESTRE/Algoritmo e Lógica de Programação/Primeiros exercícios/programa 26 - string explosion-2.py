def string_splosion(s):
    k = 1
    resp = ""
    while k <= len(s):
        resp = resp + s [0:k]
        k = k + 1
    return resp
print(string_splosion('test'))
