// === PANEL DOCKABLE POUR AFTER EFFECTS ===
// Exporter audio, lancer Whisper, importer SRT

function buildUI(thisObj) {
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Transcription Tool", undefined, {resizeable:true});

    // Bouton Export + Transcrire
    var btnExport = myPanel.add("button", undefined, "Exporter + Transcrire");
    btnExport.onClick = function() {
        var outputFile = File.saveDialog("Choisir l'emplacement du fichier audio", "*.wav");
        if (outputFile) {
            exportAudioFromActiveComp(outputFile.fsName);

            // Lancer Whisper en local
            transcribeWithWhisper(outputFile.fsName, function(srtFilePath) {
                importSRTtoTextLayers(srtFilePath);
            });
        }
    };

    // Bouton Import SRT manuel
    var btnImport = myPanel.add("button", undefined, "Importer SRT");
    btnImport.onClick = function() {
        var srtFile = File.openDialog("Choisir un fichier SRT", "*.srt");
        if (srtFile) {
            importSRTtoTextLayers(srtFile.fsName);
        }
    };

    myPanel.layout.layout(true);
    return myPanel;
}

// === Export audio sans dépendance au template ===
function exportAudioFromActiveComp(outputPath) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Faaaaaaaaaaah");
        alert("Sélectionne une composition avant de lancer le script.");
        return;
    }

    app.beginUndoGroup("Exporter Audio");

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

    app.endUndoGroup();
    alert("Export audio terminé : " + outputPath);
}

// === Transcription avec Whisper ===
// ⚠️ Nécessite Whisper installé en local
function transcribeWithWhisper(audioPath, callback) {
    try {
        var audioFile = new File(audioPath);
        var outputDir = audioFile.parent.fsName;

        // Forcer Whisper à produire un SRT
        var cmd = 'whisper "' + audioPath + '" --task transcribe --output_format srt --output_dir "' + outputDir + '"';
        system.callSystem(cmd);

        // Chercher le fichier .srt dans le dossier
        var folder = new Folder(outputDir);
        var files = folder.getFiles("*.srt");

        if (files.length > 0) {
            // Prendre le plus récent
            var srtFile = files[files.length - 1];
            callback(srtFile.fsName);
        } else {
            alert("Faaaaaaaaaaah");
            alert("Aucun fichier SRT trouvé dans : " + outputDir);
        }
    } catch (e) {
        alert("Faaaaaaaaaaah");
        alert("Erreur transcription : " + e);
    }
}

// === Import SRT ===
function importSRTtoTextLayers(srtFilePath) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Sélectionne une composition avant de lancer le script.");
        return;
    }

    var srtFile = new File(srtFilePath);
    if (!srtFile.exists) {
        alert("Faaaaaaaaaaah");
        alert("Fichier SRT introuvable : " + srtFilePath);
        return;
    }
    srtFile.open("r");
    var content = srtFile.read();
    srtFile.close();

    var blocks = content.split(/\r?\n\r?\n/);

    app.beginUndoGroup("Importer SRT");

    for (var i = 0; i < blocks.length; i++) {
        var lines = blocks[i].split(/\r?\n/);
        if (lines.length >= 3) {
            var times = lines[1].split("-->");
            var start = parseTimecode(times[0].trim());
            var end = parseTimecode(times[1].trim());
            var text = lines.slice(2).join("\r");

            var textLayer = comp.layers.addText(text);
            textLayer.inPoint = start;
            textLayer.outPoint = end;
        }
    }

    app.endUndoGroup();
    alert("Import SRT terminé !");
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
