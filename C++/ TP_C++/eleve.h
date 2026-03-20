#include<iostream>
#include"eleve.h"

#ifndef ELEVE_H
#define ELEVE_H
class eleve
{
    private:
            //attributs
            string nom;
            string prenom;
            string niveau_etude;
            string matricule;
            int age;
            string adresse ;
            string etablissement;
    public:      
            //methode  
            void etudier();
            void composer();
            void etre_assidut();
            //constrcteur
                 eleve(string n, string p, 
                      string n_e,
                      string m, int a, 
                      string ad,
                        string e)
        /*initialistion des attributs de 
        la class eleve par le constructeur*/
                {
                  nom = n;
                  prenom = p;
                  niveau_etude = n_e;
                  matricule = m;
                  age = a;
                  adresse = ad;
                  etablissement = e;
                }
            //destructeur
                ~eleve()
                {

                }

};
#endif