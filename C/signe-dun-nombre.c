#include<stdio.h>

int main() 
{
float nombre;

printf("Entrez un nombre :");
scanf("%f", &nombre);
if (nombre > 0)
{
    printf("Le nombre est positif");
}
else if (nombre < 0)
{
    printf("Le nombre est négatif");
}
else
{
    printf("le nombre est nul");
}

return 0;    
}