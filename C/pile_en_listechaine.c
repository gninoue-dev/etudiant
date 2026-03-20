#include <stdio.h>
#include <stdlib.h>

typedef struct p_listechaine 
{
    int donnee;
    struct p_listechaine *suivant;
} p_listechaine;

typedef struct 
{
    p_listechaine *tete;
} ListeChainee;

void initialiser(ListeChainee *liste) 
{
    liste->tete = NULL;
}

void ajouter_en_tete(ListeChainee *liste, int donnee) 
{
    Noeud *nouveau = (Noeud *)malloc(sizeof(p_listechaine));
    nouveau->donnee = donnee;
    nouveau->suivant = liste->tete;
    liste->tete = nouveau;
}

void supprimer_en_tete(ListeChainee *liste) 
{
    if (liste->tete == NULL) {
        printf("Erreur : Liste vide\n");
        return;
    }
    Noeud *temp = liste->tete;
    liste->tete = liste->tete->suivant;
    free(temp);
}

int acceder(ListeChainee *liste, in  t indice) 
{
    Noeud *courant = liste->tete;
    int compteur = 0;
    while (courant != NULL && compteur < indice) {
        courant = courant->suivant;
        compteur++;
    }
    if (courant == NULL) {
        printf("Erreur : Indice invalide\n");
        return -1;
    }
    return courant->donnee;
}

void afficher(ListeChainee *liste) 
{
    Noeud *courant = liste->tete;
    while (courant != NULL) {
        printf("%d ", courant->donnee);
        courant = courant->suivant;
    }
    printf("\n");
}

void liberer(ListeChainee *liste) 
{
    Noeud *courant = liste->tete;
    while (courant != NULL) {
        Noeud *temp = courant;
        courant = courant->suivant;
        free(temp);
    }
    liste->tete = NULL;
}

int main() 
{
    ListeChainee liste;
    initialiser(&liste);
    ajouter_en_tete(&liste, 10);
    ajouter_en_tete(&liste, 20);
    ajouter_en_tete(&liste, 30);
    afficher(&liste); // 30 20 10
    supprimer_en_tete(&liste);
    afficher(&liste); // 20 10
    printf("Element à l'indice 1: %d\n", acceder(&liste, 1)); // 10
    liberer(&liste);
    return 0;
}