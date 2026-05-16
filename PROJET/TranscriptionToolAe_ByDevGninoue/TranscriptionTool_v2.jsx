// === PANEL DOCKABLE POUR AFTER EFFECTS - VERSION 2.0 ===
// Exporter audio, lancer Whisper avec auto-détection de langue, importer SRT
// Créé par Dev Gninoue - Université Technologique d'Abidjan

function buildUI(thisObj) {
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Transcription Tool v2.0", undefined, {resizeable: true});
    
    // STYLES ET GROUPES
    myPanel.preferredSize = [350, 500];
    
    // === TITRE ===
    var titleGroup = myPanel.add("group");
    titleGroup.orientation = "column";
    titleGroup.add("statictext", undefined, "🎬 TRANSCRIPTION TOOL").helpTip = "Transcription audio → Sous-titres";
    
    // === STATUT ===
    var statusGroup = myPanel.add("panel", undefined, "Statut");
    statusGroup.orientation = "column";
    statusGroup.margins = 10;
    var statusText = statusGroup.add("statictext", undefined, "Prêt");
    statusText.size = [300, 20];
    
    // === OPTIONS ===
    var optionsGroup = myPanel.add("panel", undefined, "Options");
    optionsGroup.orientation = "column";
    optionsGroup.margins = 10;
    optionsGroup.spacing = 8;
    
    // Langue
    var langGroup = optionsGroup.add("group");
    langGroup.add("statictext", undefined, "Langue:");
    var langDropdown = langGroup.add("dropdownlist", undefined, ["Auto-détection", "Français", "Anglais", "Autre"]);
    langDropdown.selection = 0;
    
    // Modèle Whisper
    var modelGroup = optionsGroup.add("group");
    modelGroup.add("statictext", undefined, "Modèle Whisper:");
    var modelDropdown = modelGroup.add("dropdownlist", undefined, ["base", "tiny", "small", "medium", "large"]);
    modelDropdown.selection = 0;
    
    // Taille police
    var fontGroup = optionsGroup.add("group");
    fontGroup.add("statictext", undefined, "Taille police:");
    var fontSizeInput = fontGroup.add("edittext", undefined, "36");
    fontSizeInput.characters = 5;
    
    // === ACTIONS ===
    var actionsGroup = myPanel.add("panel", undefined, "Actions");
    actionsGroup.orientation = "column";
    actionsGroup.margins = 10;
    actionsGroup.spacing = 8;
    
    // Bouton Export + Transcrire
    var btnExport = actionsGroup.add("button", undefined, "📤 Exporter + Transcrire", {name: "ok"});
    btnExport.helpTip = "Exporte l'audio en WAV et lance Whisper";
    
    // Bouton Import SRT manuel
    var btnImport = actionsGroup.add("button", undefined, "📥 Importer SRT");
    btnImport.helpTip = "Importe un fichier SRT existant";
    
    // === JOURNAL ===
    var logGroup = myPanel.add("panel", undefined, "Journal d'exécution");
    logGroup.orientation = "column";
    logGroup.margins = 10;
    var logText = logGroup.add("edittext", undefined, "", {multiline: true, readonly: true});
    logText.size = [300, 150];
    logText.text = "Démarrage...\n";
    
    // === FOOTER ===
    var footerGroup = myPanel.add("group");
    footerGroup.add("statictext", undefined, "v2.0 - Dev Gninoue © 2024");
    
    // === EVENT HANDLERS ===
    
    function updateStatus(msg, isError) {
        statusText.text = msg;
        if (isError) {
            statusText.graphics.foregroundColor = statusText.graphics.newPen(statusText.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);
        } else {
            statusText.graphics.foregroundColor = statusText.graphics.newPen(statusText.graphics.PenType.SOLID_COLOR, [0, 0.7, 0], 1);
        }
        addLog(msg);
    }
    
    function addLog(msg) {
        var timestamp = new Date().toLocaleTimeString();
        logText.text += "[" + timestamp + "] " + msg + "\n";
        logText.revealRange(logText.text.length - 1, logText.text.length - 1);
    }
    
    btnExport.onClick = function() {
        try {
            updateStatus("⏳ Exporte l'audio...", false);
            
            var outputFile = File.saveDialog("Choisir l'emplacement du fichier audio", "*.wav");
            if (!outputFile) {
                updateStatus("❌ Export annulé", true);
                return;
            }
            
            exportAudioFromActiveComp(outputFile.fsName, function() {
                addLog("✅ Audio exporté");
                updateStatus("⏳ Lance Whisper...", false);
                
                // Récupérer les paramètres
                var language = langDropdown.selection.index === 0 ? null : langDropdown.selection.text.toLowerCase();
                var model = modelDropdown.selection.text;
                
                transcribeWithWhisper(outputFile.fsName, language, model, function(srtFilePath) {
                    addLog("✅ Transcription terminée");
                    updateStatus("⏳ Importe les sous-titres...", false);
                    
                    var fontSize = parseInt(fontSizeInput.text) || 36;
                    importSRTtoTextLayers(srtFilePath, fontSize, function() {
                        updateStatus("✅ Terminé avec succès !", false);
                    });
                });
            });
        } catch (e) {
            updateStatus("❌ Erreur: " + e.message, true);
            addLog("ERREUR: " + e.message);
        }
    };
    
    btnImport.onClick = function() {
        try {
            var srtFile = File.openDialog("Choisir un fichier SRT", "*.srt");
            if (!srtFile) {
                updateStatus("❌ Import annulé", true);
                return;
            }
            
            updateStatus("⏳ Importe SRT...", false);
            var fontSize = parseInt(fontSizeInput.text) || 36;
            importSRTtoTextLayers(srtFile.fsName, fontSize, function() {
                updateStatus("✅ Import SRT réussi !", false);
            });
        } catch (e) {
            updateStatus("❌ Erreur: " + e.message, true);
            addLog("ERREUR: " + e.message);
        }
    };
    
    myPanel.layout.layout(true);
    return myPanel;
}

// === Export audio sans dépendance au template ===
function exportAudioFromActiveComp(outputPath, callback) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("❌ Sélectionnez une composition avant de lancer le script.");
        return;
    }

    app.beginUndoGroup("Exporter Audio");

    try {
        var rqItem = app.project.renderQueue.items.add(comp);
        var om = rqItem.outputModule(1);

        // Paramètres audio définis directement
        om.file = new File(outputPath);
        om.includeVideo = false; // Pas de vidéo
        om.includeAudio = true;  // Audio uniquement
        om.format = "WAV";       // Format WAV
        om.audioSampleRate = 48000; // 48 kHz standard
        om.audioSampleType = "16";  // 16 bits
        om.audioChannelsType = "Stereo"; // Stéréo

        app.project.renderQueue.queueInAME = false;
        app.project.renderQueue.render();

        if (callback) callback();
    } catch (e) {
        alert("❌ Erreur export: " + e.message);
    }

    app.endUndoGroup();
}

// === Transcription avec Whisper (auto-détection de langue) ===
function transcribeWithWhisper(audioPath, language, model, callback) {
    try {
        var audioFile = new File(audioPath);
        var outputDir = audioFile.parent.fsName;
        
        // Construire la commande Whisper
        var cmd = 'whisper "' + audioPath + '" --task transcribe --output_format srt --output_dir "' + outputDir + '" --model ' + model;
        
        // Ajouter la langue si spécifiée
        if (language && language !== "auto-détection") {
            cmd += ' --language ' + language;
        }

        // Exécuter Whisper
        system.callSystem(cmd);

        // Chercher le fichier .srt dans le dossier
        var folder = new Folder(outputDir);
        var files = folder.getFiles("*.srt");

        if (files.length > 0) {
            // Prendre le plus récent
            var srtFile = files[files.length - 1];
            callback(srtFile.fsName);
        } else {
            alert("❌ Aucun fichier SRT trouvé dans : " + outputDir);
        }
    } catch (e) {
        alert("❌ Erreur transcription : " + e.message);
    }
}

// === Import SRT avec formatage ===
function importSRTtoTextLayers(srtFilePath, fontSize, callback) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("❌ Sélectionnez une composition avant de lancer le script.");
        return;
    }

    var srtFile = new File(srtFilePath);
    if (!srtFile.exists) {
        alert("❌ Fichier SRT introuvable : " + srtFilePath);
        return;
    }
    
    srtFile.open("r");
    var content = srtFile.read();
    srtFile.close();

    var blocks = content.split(/\r?\n\r?\n/);
    var subtitleCount = 0;

    app.beginUndoGroup("Importer SRT");

    for (var i = 0; i < blocks.length; i++) {
        var lines = blocks[i].split(/\r?\n/);
        if (lines.length >= 3) {
            var times = lines[1].split("-->");
            var start = parseTimecode(times[0].trim());
            var end = parseTimecode(times[1].trim());
            var text = lines.slice(2).join("\r");

            var textLayer = comp.layers.addText(text);
            
            // Formatage : texte blanc, centré
            var textProp = textLayer.text;
            var textDocument = textProp.value;
            
            textDocument.fontSize = fontSize;
            textDocument.fillColor = [1, 1, 1]; // Blanc
            textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
            textDocument.font = "Arial";
            
            textProp.setValue(textDocument);
            
            // Positionnement au centre horizontalement
            textLayer.position.setValue([comp.width / 2, comp.height - 100]);
            textLayer.anchorPoint.setValue([textLayer.source.width / 2, 0]);
            
            // Timecode
            textLayer.inPoint = start;
            textLayer.outPoint = end;
            
            subtitleCount++;
        }
    }

    app.endUndoGroup();
    
    if (callback) callback();
    alert("✅ Import terminé ! " + subtitleCount + " sous-titre(s) ajouté(s)");
}

// === Parse timecode ===
function parseTimecode(tc) {
    var parts = tc.split(":");
    var secs = parts[2].split(",");
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var s = parseInt(secs[0], 10);
    var ms = parseInt(secs[1], 10);
    return h * 3600 + m * 60 + s + ms / 1000;
}

// === Lancer le panneau ===
var myToolsPanel = buildUI(this);
if (myToolsPanel instanceof Window) {
    myToolsPanel.center();
    myToolsPanel.show();
}
