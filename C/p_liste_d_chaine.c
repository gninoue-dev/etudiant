#include <stdio.h>
#include <stdlib.h>
//
typedef struct p_liste_d_chaine 
{
    int donnee;
    struct p_liste_d_chaine *precedent;
    struct p_liste_d_chaine *suivant;
} p_liste_d_chaine;
//
typedef struct listeDoublementChaine 
{
    p_liste_d_chaine *tete;
    p_liste_d_chaine *queue;
} ListeDoublementChainee;
//
void initialiser(ListeDoublementChainee *liste) 
{
    liste->tete = NULL;
    liste->queue = NULL;
}
//
void ajouter_en_queue(ListeDoublementChainee *liste, int donnee) 
{   //
    p_liste_d_chaine *nouveau = (p_liste_d_chaine *)malloc(sizeof(p_liste_d_chaine));
    nouveau->donnee = donnee;
    nouveau->suivant = NULL;
    if (liste->queue == NULL) { 
        nouveau->precedent = NULL;
        liste->tete = nouveau;
        liste->queue = nouveau;
    } else {
        nouveau->precedent = liste->queue;
        liste->queue->suivant = nouveau;
        liste->queue = nouveau;
    }
}
//
void supprimer_en_queue(ListeDoublementChainee *liste) 
{   //
    if (liste->queue == NULL) {
        printf("Erreur : Liste vide\n");
        return;
    }
    //
    p_liste_d_chaine *temp = liste->queue;
    if (liste->queue->precedent != NULL) { // Plus d'un élément
        liste->queue->precedent->suivant = NULL;
        liste->queue = liste->queue->precedent;
    } else { // Un seul élément
        liste->tete = NULL;
        liste->queue = NULL;
    }
    free(temp);
}
//
void afficher(ListeDoublementChainee *liste) 
{//
    p_liste_d_chaine *courant = liste->tete;
    while (courant != NULL) {
        printf("%d ", courant->donnee);
        courant = courant->suivant;
    }
    printf("\n");
}
//
void liberer(ListeDoublementChainee *liste) {
    p_liste_d_chaine *courant = liste->tete;
    while (courant != NULL) {
        p_liste_d_chaine *temp = courant;
        courant = courant->suivant;
        free(temp);
    }
    liste->tete = NULL;
    liste->queue = NULL;
}
//
int main() 
{
    ListeDoublementChainee liste;
    initialiser(&liste);
    ajouter_en_queue(&liste, 10);
    ajouter_en_queue(&liste, 20);
    ajouter_en_queue(&liste, 30);
    afficher(&liste); // 10 20 30
    supprimer_en_queue(&liste);
    afficher(&liste); // 10 20
    liberer(&liste);
    return 0;
}