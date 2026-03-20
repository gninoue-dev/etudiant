#!/bin/bash
echo "============================================"
echo "Installation de Whisper pour After Effects"
echo "============================================"

if ! command -v python3 &> /dev/null
then
    echo "Python3 n'est pas installé. Installez-le avant de continuer."
    exit
fi

echo "Installation de Whisper..."
pip3 install openai-whisper
echo "Installation terminée !"
