# 🎬 Transcription Tool v2.0 - After Effects

## 📋 À propos

**Transcription Tool** est un panel dockable pour **After Effects** qui automatise la transcription audio et la création de sous-titres texte.

**Créateur :** Jean Marc Gninoue  
**Université :** Université Technologique d'Abidjan (UTA)  
**Email :** devgninoue@gmail.com

### ✨ Nouvelles fonctionnalités v2.0

- ✅ **Auto-détection de langue** (français/anglais)
- ✅ **Sélection de modèle Whisper** (tiny, base, small, medium, large)
- ✅ **Contrôle de la taille de police** des sous-titres
- ✅ **Interface améliorée** avec statut en direct
- ✅ **Journal d'exécution** pour suivre les opérations
- ✅ **Gestion d'erreurs robuste**
- ✅ **Formatage automatique** (texte blanc, centré)

---

## 🚀 Installation

### 1️⃣ Installation du panel After Effects

#### Windows :
```
Copier : TranscriptionTool_v2.jsx
Vers : C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts\ScriptUI Panels\
```

#### macOS :
```
Copier : TranscriptionTool_v2.jsx
Vers : /Applications/Adobe After Effects <version>/Scripts/ScriptUI Panels/
```

### 2️⃣ Installation de Whisper

Whisper est le moteur de transcription d'OpenAI. Il doit être installé en local sur votre machine.

#### ✅ Prérequis
- **Python 3.8+** installé ([Télécharger](https://www.python.org/downloads/))
- **pip** (installé avec Python)

#### Installation (Windows, macOS, Linux)

Ouvrez un terminal/PowerShell et exécutez :

```bash
pip install openai-whisper
```

**Vérifier l'installation :**
```bash
whisper --version
```

Vous devriez voir : `whisper version X.X.X`

### 3️⃣ Redémarrer After Effects

Fermez et rouvrez After Effects. Le panel apparaîtra dans :
```
Fenêtre > Transcription Tool v2.0
```

---

## 🎯 Utilisation

### Processus simplifié (3 clics)

1. **Sélectionner une composition** dans After Effects
2. **Cliquer sur "📤 Exporter + Transcrire"**
   - Choisir où sauvegarder l'audio WAV
   - Laisser Whisper transcrire (peut prendre quelques minutes)
   - Les sous-titres apparaissent automatiquement
3. **Ajuster et animer** les couches de texte dans After Effects

### Options disponibles

| Option | Description | Défaut |
|--------|-------------|--------|
| **Langue** | Auto-détection ou français/anglais | Auto-détection |
| **Modèle Whisper** | tiny (rapide) → large (précis) | base |
| **Taille police** | Taille du texte en pixels | 36 |

### Importer un SRT existant

Si vous avez déjà un fichier `.srt` :
1. Cliquer sur **"📥 Importer SRT"**
2. Choisir votre fichier `.srt`
3. Les sous-titres s'ajoutent immédiatement

---

## 📊 Choix du modèle Whisper

Plus le modèle est grand, plus la précision augmente mais le temps aussi.

| Modèle | Taille | Vitesse | Précision | Recommandé pour |
|--------|--------|---------|-----------|-----------------|
| **tiny** | 39 MB | ⚡⚡⚡ Très rapide | ⭐ Basique | Tests, aperçu rapide |
| **base** | 140 MB | ⚡⚡ Rapide | ⭐⭐ Bonne | Usage courant |
| **small** | 466 MB | ⚡ Moyen | ⭐⭐⭐ Très bonne | Production |
| **medium** | 1.5 GB | ⏱️ Lent | ⭐⭐⭐⭐ Excellente | Textes complexes |
| **large** | 2.9 GB | ⏱️⏱️ Très lent | ⭐⭐⭐⭐⭐ Parfaite | Qualité max |

**💡 Conseil :** Commencez avec "base" puis ajustez selon vos besoins.

---

## 🐛 Dépannage

### ❌ "Whisper n'est pas trouvé"

**Solution :**
1. Vérifier que Python est installé : `python --version`
2. Réinstaller Whisper :
```bash
pip install --upgrade openai-whisper
```
3. Redémarrer After Effects

### ❌ "Aucun fichier SRT trouvé"

**Causes possibles :**
- Whisper n'a pas créé le SRT (erreur de transcription)
- L'audio était muet ou illisible

**Solutions :**
1. Vérifier que l'audio est correct en After Effects
2. Tester manuellement : `whisper "votre_audio.wav"`
3. Utiliser un modèle plus petit (tiny ou base)

### ❌ "Sélectionnez une composition"

**Solution :** Assurez-vous que vous avez bien une composition active dans la timeline d'After Effects

### ⏳ "Le processus est très lent"

**Solutions :**
1. Réduire la qualité : utiliser modèle "tiny" ou "base"
2. Couper l'audio : transcriber seulement les parties importantes
3. Augmenter la RAM disponible

### 🔊 "Mauvais résultat de transcription"

**Essayez :**
1. Spécifier la langue (au lieu d'auto-détection)
2. Passer à un modèle plus grand (small, medium, large)
3. Nettoyer l'audio (réduire le bruit, normaliser le volume)

---

## 🎨 Personnalisation

### Modifier la taille des sous-titres

Dans le panel, changer le champ **"Taille police"** :
- Petits écrans : 24-28
- Standard : 36-42
- Grand écran : 48-60

### Modifier l'apparence (après import)

Une fois les sous-titres importés dans After Effects :
1. Sélectionner une couche de texte
2. Ajuster dans le panneau **Caractères** :
   - Police
   - Couleur
   - Ombre
   - Animation

### Positionnement personnalisé

Par défaut, les sous-titres sont centrés en bas de l'écran.

Pour changer la position :
1. Sélectionner une couche de texte
2. Changer `position` et `anchorPoint` dans After Effects

---

## 📚 Formats supportés

### Entrée (vidéo)
- MP4, MOV, AVI, WebM, WMV, FLV, MXF, etc.

### Audio (exporté)
- WAV (48 kHz, 16 bits, stéréo)

### Sous-titres (sortie)
- SRT (SubRip) → importer automatiquement
- VTT (WebVTT) → importer manuellement

---

## 💡 Conseils Pro

### ✅ Pour une bonne transcription :
- Utiliser un audio de **qualité correcte** (claire, sans bruit excessif)
- Enregistrer en **mono ou stéréo** (pas de formats exotiques)
- Préférer les vidéos avec **sous-titres incorporés** comme référence
- Tester d'abord avec un petit extrait

### ✅ Pour une bonne synchronisation :
- Vérifier les timecodes importés
- Ajuster manuellement si décalage (rare)
- Utiliser des repères temporels comme guide

### ✅ Pour les vidéos multilingues :
- Lancer la transcription plusieurs fois en changeant la langue
- Importer les SRT sur des pistes différentes
- Synchroniser manuellement si besoin

---

## 📞 Support

**Problèmes ?** Consultez d'abord la section [Dépannage](#-dépannage) ci-dessus.

**Contact :** devgninoue@gmail.com  
**Université :** UTA - Université Technologique d'Abidjan

---

## 📜 Licence

Créé à titre éducatif. Libre d'utilisation et de modification.

### Crédits
- **Whisper** : OpenAI (https://github.com/openai/whisper)
- **After Effects** : Adobe
- **Développeur** : Jean Marc Gninoue

---

## 🔄 Historique des versions

### v2.0 (2026)
- ✨ Auto-détection de langue
- ✨ Sélection de modèle Whisper
- ✨ Contrôle de taille de police
- ✨ Interface améliorée avec journal
- 🐛 Gestion d'erreurs robuste

### v1.0 (2024)
- Version initiale
- Export audio → Whisper → Import SRT

---

**Merci d'utiliser Transcription Tool ! 🎉**
