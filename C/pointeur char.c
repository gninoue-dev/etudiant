#include<stdio.h>
#include<stdlib.h>

int main()
{
    int i;
    char *chaine;
        chaine = ("chaine de caractere");
    for (i =0 ; *chaine != '\0'; i++)chaine++;
    printf(" nombre de caractere = %d\n", i);
    
    return 0;    
}