@echo off
REM === INSTALLATION WHISPER POUR WINDOWS ===
REM Version 2.0 - Dev Gninoue
REM Ce script installe Whisper automatiquement

title Whisper Installation Tool

echo.
echo ========================================
echo  Installation de Whisper pour Windows
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python n'est pas installé ou pas dans PATH
    echo.
    echo Téléchargez Python depuis : https://www.python.org/downloads/
    echo Assurez-vous de cocher "Add Python to PATH" durant l'installation
    echo.
    pause
    exit /b 1
)

echo [OK] Python détecté
python --version
echo.

REM Upgrader pip
echo [*] Mise à jour de pip...
python -m pip install --upgrade pip
if errorlevel 1 (
    echo [ERREUR] Impossible de mettre à jour pip
    pause
    exit /b 1
)

echo [OK] pip à jour
echo.

REM Installer Whisper
echo [*] Installation de Whisper (cela peut prendre 1-2 minutes)...
pip install openai-whisper
if errorlevel 1 (
    echo [ERREUR] Installation de Whisper échouée
    echo Essayez d'exécuter ce script en tant qu'administrateur
    pause
    exit /b 1
)

echo [OK] Whisper installé avec succès
echo.

REM Vérifier l'installation
echo [*] Vérification de l'installation...
whisper --version
if errorlevel 1 (
    echo [AVERTISSEMENT] Impossible de vérifier Whisper
    echo Redémarrez votre terminal et essayez : whisper --version
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ Installation réussie !
echo ========================================
echo.
echo Whisper est maintenant installé et prêt à être utilisé
echo depuis After Effects.
echo.
echo Prochaines étapes :
echo 1. Copier TranscriptionTool_v2.jsx dans ScriptUI Panels
echo 2. Redémarrer After Effects
echo 3. Accéder via Fenetre > Transcription Tool v2.0
echo.
pause
