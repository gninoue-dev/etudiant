#include <stdio.h>
#include <stdlib.h>
//declaration de la pile en tableau statique
typedef struct pile_t_dynamique
{
    int *elements;
    int taille_actuelle;
    int capacite;
} pile_t_dynamique;
//
void initialiser(pile_t_dynamique *tab, int capacite_initiale) 
{
    tab->elements = (int *)malloc(capacite_initiale * sizeof(int));
    tab->taille_actuelle = 0;
    tab->capacite = capacite_initiale;
}
//
void redimensionner(pile_t_dynamique *tab) 
{
    tab->capacite *= 2;
    tab->elements = (int *)realloc(tab->elements, tab->capacite * sizeof(int));
}
//
void ajouter(pile_t_dynamique *tab, int element) 
{
    if (tab->taille_actuelle == tab->capacite) {
        redimensionner(tab);
    }
    tab->elements[tab->taille_actuelle] = element;
    tab->taille_actuelle++;
}
//
void supprimer(pile_t_dynamique *tab, int indice) 
{
    if (indice < 0 || indice >= tab->taille_actuelle) {
        printf("Erreur : Indice invalide\n");
        return;
    }
    for (int i = indice; i < tab->taille_actuelle - 1; i++) {
        tab->elements[i] = tab->elements[i + 1];
    }
    tab->taille_actuelle--;
}
//
int acceder(pile_t_dynamique *tab, int indice) 
{
    if (indice < 0 || indice >= tab->taille_actuelle) {
        printf("Erreur : Indice invalide\n");
        return -1;
    }
    return tab->elements[indice];
}
//
void liberer(pile_t_dynamique *tab) 
{
    free(tab->elements);
}
//
void afficher(pile_t_dynamique *tab) 
{
    for (int i = 0; i < tab->taille_actuelle; i++) {
        printf("%d ", tab->elements[i]);
    }
    printf("\n");
}
//
int main() 
{
    pile_t_dynamique tab;
    initialiser(&tab, 2);
    ajouter(&tab, 10);
    ajouter(&tab, 20);
    ajouter(&tab, 30); // Redimensionnement automatique
    afficher(&tab); // 10 20 30
    supprimer(&tab, 0);
    afficher(&tab); // 20 30
    printf("Element à l'indice 1: %d\n", acceder(&tab, 1)); // 30
    liberer(&tab);
    return 0;
}