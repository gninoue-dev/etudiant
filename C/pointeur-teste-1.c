#include<stdio.h>
#include<stdlib.h>

int main()
{
    int i = 3;
    int *p;
    printf("valeur de p avant initialisation = %ld\n" ,p);
        p = (int*) malloc (sizeof(int));
    printf("valeur de p après initialisation = %ld\n", p);
        *p = i;
    printf("valeur de *p = %\n, *p");
    return 0;
}