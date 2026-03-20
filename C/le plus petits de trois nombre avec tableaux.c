#include<stdio.h>
//fonction principale main
int main ()
{
//declaraction de variable
int nombre[3];
int resultats;
int i = 0;
//
do{

    printf("Entrez votre premier nombre :\n");
    scanf("%d", &nombre[1]);
    printf("Entrez votre deuxieme nombre :\n");
    scanf("%d", &nombre[2]);
    printf("Entrez votre troisieme nombre :\n ");
    scanf("%d", &nombre[3]);
        resultats = 0;
//condiction pour trouver le plus petit des trois nombres 
        if (nombre[1] < nombre[2])
        {
            resultats = nombre[1];
        }
        else
        {
            resultats = nombre[2];
        }
        if ( resultats < nombre[3])
        {
            resultats = resultats;
        }
        else
        {
            resultats = nombre[3];
        }
//affichage du plus petit nombre

    printf("le plus petits des trois nombre est :%d\n", resultats);
   i++;
}
while( nombre[1]==0 && nombre[2]==0 && nombre[3]==0);
return 0;
}