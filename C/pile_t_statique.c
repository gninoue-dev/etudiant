#include <stdio.h>
#define TAILLE_MAX 20

typedef struct 
{
    int elements[TAILLE_MAX];
    int taille_actuelle;
} TableauStatique;

void initialiser(TableauStatique *tab)
{
    tab->taille_actuelle = 0;
}

void ajouter(TableauStatique *tab, int element)
{
    if (tab->taille_actuelle < TAILLE_MAX) {
        tab->elements[tab->taille_actuelle] = element;
        tab->taille_actuelle++;
    } else {
        printf("Erreur : Tableau plein\n");
    }
}

void supprimer(TableauStatique *tab, int indice) 
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

int acceder(TableauStatique *tab, int indice) 
{
    if (indice < 0 || indice >= tab->taille_actuelle) {
        printf("Erreur : Indice invalide\n");
        return -1; // Valeur d'erreur
    }
    return tab->elements[indice];
}

void afficher(TableauStatique *tab) 
{
    for (int i = 0; i < tab->taille_actuelle; i++) {
        printf("%d ", tab->elements[i]);
    }
    printf("\n");
}

int main() 
{
    TableauStatique tab;
    initialiser(&tab);
    ajouter(&tab, 10);
    ajouter(&tab, 20);
    ajouter(&tab, 30);
    afficher(&tab); // 10 20 30
    supprimer(&tab, 1);
    afficher(&tab); // 10 30
    printf("Element à l'indice 1: %d\n", acceder(&tab, 1)); // 30
    return 0;
}