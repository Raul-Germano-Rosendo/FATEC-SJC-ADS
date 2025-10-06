def sanduíche(s):
    vogais = 'aeiou'
    #print (s)
    for k in range(len(s) - 2):
        a = s[k].lower()
        b = s[k].lower()
    if a in vogais and b in vogais:
        print(True)
    else: print(False)
        
print (sanduíche('amazing'))
print (sanduíche('cooool'))
print (sanduíche('aeiouAEIOU'))
print (sanduíche(''))
