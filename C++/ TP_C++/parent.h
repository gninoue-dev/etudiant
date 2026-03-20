#include<iostream>
#include"parent.h"

#ifndef PARENT_H
#define PARENT_H
class parent
{
    private:
            //attributs
            string nom;
            string prenom;
            string adresse;
    public: 
            void suivre_enfant();
           //constructeur
                 parent(string n, string p,
                        string ad)
                 {
                   nom = n;
                   prenom = p;
                   adresse = ad;
                 }
          //destructeur
                 ~parent()
                 {

                 }
};
#endif