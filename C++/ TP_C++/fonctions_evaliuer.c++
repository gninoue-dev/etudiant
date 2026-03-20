#include<iostream>
using namespace std;
int main() 
{
string t_nom[10];
int i;
float note_1[10];
float note_2[10];
float note_3[10];
float moyenne[10];
{  
        cin>>note_1[i];//

        cout<<"Entrez la note 2";
        cin>>note_2[i];//

        cout<<"Entrez la note 3";
        cin>>note_3[i];//

        moyenne[i] = (note_1[i] + note_2[i] + note_3[i] / 3 );

         cout<<"la moyenn de"<<t_nom[i]<<"est"<<moyenne[i]<<endl;
    }
return 0;
}