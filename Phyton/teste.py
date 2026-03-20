def primus(a):
    if (a% 2) == 0:
        return "pair" 
    else:
        return "impair"
nombre = int(input("entrez un nombre"))
print(primus(nombre))
