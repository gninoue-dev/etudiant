#include<iostream>
using namespace std;


#ifndef ENSEIGNANT_H
#define ENSEIGNANT_H
class enseignant
{
private:
    string t_nom[10];
    int i;
    float note_1[10];
    float note_2[10];
    float note_3[10];
    float moyenne[10];
public:
    void evaluer() {}; // methode
};
#endif

