#!/bin/bash
# === INSTALLATION WHISPER POUR MAC/LINUX ===
# Version 2.0 - Dev Gninoue
# Ce script installe Whisper automatiquement

echo ""
echo "=========================================="
echo "  Installation de Whisper pour Mac/Linux"
echo "=========================================="
echo ""

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "[ERREUR] Python 3 n'est pas installé"
    echo ""
    echo "Installation recommandée :"
    echo "macOS : brew install python3"
    echo "Ubuntu : sudo apt-get install python3 python3-pip"
    echo "Fedora : sudo dnf install python3 python3-pip"
    echo ""
    exit 1
fi

echo "[OK] Python détecté"
python3 --version
echo ""

# Upgrader pip
echo "[*] Mise à jour de pip..."
python3 -m pip install --upgrade pip

if [ $? -ne 0 ]; then
    echo "[ERREUR] Impossible de mettre à jour pip"
    exit 1
fi

echo "[OK] pip à jour"
echo ""

# Installer Whisper
echo "[*] Installation de Whisper (cela peut prendre 1-2 minutes)..."
pip3 install openai-whisper

if [ $? -ne 0 ]; then
    echo "[ERREUR] Installation de Whisper échouée"
    echo "Essayez avec : sudo pip3 install openai-whisper"
    exit 1
fi

echo "[OK] Whisper installé avec succès"
echo ""

# Vérifier l'installation
echo "[*] Vérification de l'installation..."
whisper --version

if [ $? -ne 0 ]; then
    echo "[AVERTISSEMENT] Impossible de vérifier Whisper"
    echo "Redémarrez votre terminal et essayez : whisper --version"
    exit 1
fi

echo ""
echo "=========================================="
echo "  ✅ Installation réussie !"
echo "=========================================="
echo ""
echo "Whisper est maintenant installé et prêt à être utilisé"
echo "depuis After Effects."
echo ""
echo "Prochaines étapes :"
echo "1. Copier TranscriptionTool_v2.jsx dans ScriptUI Panels"
echo "   macOS : /Applications/Adobe After Effects <version>/Scripts/ScriptUI Panels/"
echo "2. Redémarrer After Effects"
echo "3. Accéder via Fenetre > Transcription Tool v2.0"
echo ""
