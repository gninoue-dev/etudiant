#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

class JeuDevineNombre {
private:
    int num_secret;
    bool mode_solo;
    string niveau;
    int propositions_max;
    int joueur_actuel;

public:
    JeuDevineNombre() {
        srand(time(0));
        num_secret = rand() % 100 + 1;
        joueur_actuel = 1;
    }

    void configurerPartie() {
        string mode;
        cout << "Choisissez le mode (Solo/Multijoueur): ";
        cin >> mode;
        mode_solo = (mode == "Solo");

        cout << "Choisissez la difficulte (Facile/Moyen/Difficile): ";
        cin >> niveau;

        if (mode_solo) {
            if (niveau == "Facile") propositions_max = 10;
            else if (niveau == "Moyen") propositions_max = 8;
            else propositions_max = 4;
        } else {
            if (niveau == "Facile") propositions_max = 5;
            else if (niveau == "Moyen") propositions_max = 4;
            else propositions_max = 2;
        }
    }

    void jouer() {
        int propositions_restantes = propositions_max;
        bool trouve = false;
        int proposition;

        while (propositions_restantes > 0 && !trouve) {
            if (!mode_solo) {
                cout << "Joueur " << joueur_actuel << " - ";
            }
            cout << "Essais restants: " << propositions_restantes << endl;
            cout << "Devinez le nombre (1-100): ";
            cin >> proposition;

            if (proposition == num_secret) {
                if (mode_solo) {
                    cout << "Bravo! Vous avez trouve en " 
                         << (propositions_max - propositions_restantes + 1) 
                         << " essais!" << endl;
                } else {
                    cout << "Joueur " << joueur_actuel << " gagne!" << endl;
                }
                trouve = true;
            } else if (proposition < num_secret) {
                cout << "Plus!" << endl;
            } else {
                cout << "Moins!" << endl;
            }

            propositions_restantes--;

            if (!mode_solo && propositions_restantes > 0) {
                joueur_actuel = (joueur_actuel == 1) ? 2 : 1;
                propositions_restantes = propositions_max;
            }
        }

        if (!trouve) {
            cout << "Perdu! Le nombre etait " << num_secret << endl;
        }
    }
};

int main() {
    JeuDevineNombre jeu;
    jeu.configurerPartie();
    jeu.jouer();
    return 0;
}