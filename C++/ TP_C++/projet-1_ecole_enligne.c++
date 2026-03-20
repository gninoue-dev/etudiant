#include<iostream>
using namespace std;


//declaration des class
class enseignant
{
    private:
            //attributs
            string nom;
            string prenom;
            string matiere;
    public:
            //methode
            void enseigner();
            void evaluer();
            //constructeur
                 enseignant(string n,string p,
                            string m)
         /*initialisation des attributs de la 
         class enseignant par le constructeur*/
                 { 
                   nom = n;
                   prenom = p;
                   matiere = m;
                 }
           //destructeur
                 ~enseignant()
                 {

                 }
                            
};

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

/*definition des methodes enseignant en dehors de la class*/
        void enseignant::enseigner()
        {

        }
        void::enseignant::evaluer()
        {                                                      
                string t_nom[10];
                int i;
                float note_1[10];
                float note_2[10];
                float note_3[10];
                float moyenne[10];
                for ( i = 1 ; i < 10; i++)
                {
                        cin>>note_1[i];
                         cout<<"Entrez la note 2";
                         cin>>note_2[i];
                        cout<<"Entrez la note 3";
                        cin>>note_3[i];
                        moyenne[i] = (note_1[i] + note_2[i] + note_3[i] / 3 );
                        cout<<"la moyenn de"<<t_nom[i]<<"est"<<moyenne[i]<<endl;
                }
        }          
/*definition des methodes eleve en dehors de la class*/
        void eleve::etudier()
        {   

        }       
        void eleve::composer()
        {
                
        }
        void eleve::etre_assidut()
        {

        }
/*definition des methodes parents en dehors de la class*/
        void parent::suivre_enfant()
        {

        }

int main()
{

        return 0;
}