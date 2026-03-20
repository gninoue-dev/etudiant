#include <iostream>
#include <string>

using namespace std;

class jeux_devine_nombre_secret
{
private:
    int num_secret;
    bool mode_solo;
    string niveau;
    int proposition_max;
    int joueur_actuel;
public:
    jeux_devine_nombre_secret()
    {
        srand(time(0));
        num_secret = rand() % 100+1;
        joueur_actuel = 1;
    };
    void configurationPartie()
    {
        string mode;
        cout <<"choisissez le mode de jeux :";cin>> mode;
        mode_solo = (mode == "solo");

        if (mode_solo)
        {
            if(niveau == "Facile")proposition_max = 10;
            else if( niveau == "Moyen")proposition_max = 8;           
            else proposition_max = 2;
        }
    }
    void joueur()
    {
        int propositions_restantes = proposition_max;
        bool trouve = false;
        int proposition;

        while (propositions_restantes > 0 && !trouve)
        {
            if(!mode_solo)
            {
                cout <<"joueur" << joueur_actuel <<"-";
            }
            cout <<"Essais restants;" << propositions_restantes << endl;
            cout <<"Devinez le nombre secret entre 1 et 100 :"; cin >>proposition;
            if(proposition == num_secret)
            {
                if(mode_solo)
                {
                    cout<<"BRAVO vous avez trouver en"
                        <<(proposition_max - propositions_restantes +1)
                        <<"Essais!"<<endl;
                } else 
                  {
                    cout<<"joueur_actuel"<<"gagner!" <<endl;
                  }
                  trouve = true;
            } else if(proposition < num_secret)
              {
                cout <<"Plus!"<<endl;
              }
              else
              {
                cout <<"Moins!" <<endl;
              }
              propositions_restantes--;
              if(!mode_solo && propositions_restantes > 0)
              {
                joueur_actuel = (joueur_actuel== 1)?2 :1;
                propositions_restantesproposition_max;
              }
        }
        if(!trouve)
        {
            cout<<"Perdu! le nombre etait"<< num_secret<<endl;
        }
    }
};
int main()
{
   jeux_devine_nombre_secret;
    jeux.configurePartie();
    jeux.joueur();
    return 0;
}