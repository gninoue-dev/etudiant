"""Génère les voix off de l'épisode 1 avec edge-tts (voix du narrateur + voix de Pixel)."""
import asyncio, os, subprocess, edge_tts

PROXY = os.environ.get("HTTPS_PROXY")
NARRATEUR = dict(voice="fr-FR-HenriNeural", rate="+15%", pitch="+0Hz")
PIXEL = dict(voice="fr-FR-VivienneMultilingualNeural", rate="+8%", pitch="+30Hz")

# (fichier, voix, texte, début en secondes, fin max en secondes)
LIGNES = [
    ("n1", NARRATEUR, "Lundi : quatre mille huit cents euros de facture !", 0.0, 3.4),
    ("p1", PIXEL, "Pas de souci, je gère !", 3.5, 5.3),
    ("n2", NARRATEUR, "Sa clé secrète est dans le code.", 5.3, 8.0),
    ("n3", NARRATEUR, "Il publie sur Guit-hub, en public. Cette clé, c'est la carte bancaire de son appli.", 8.0, 14.0),
    ("n4", NARRATEUR, "Des robots scannent Guit-hub toute la journée. Ils la trouvent en quelques minutes.", 14.0, 20.0),
    ("n5", NARRATEUR, "Ils utilisent son compte toute la nuit. Et c'est lui qui paie.", 20.0, 26.0),
    ("n6", NARRATEUR, "Jamais de clé dans le code. Mets-la dans un fichier point E N V.", 26.0, 30.4),
    ("p2", PIXEL, "Je range ça au coffre !", 30.4, 32.0),
]

async def main():
    for nom, v, texte, debut, fin in LIGNES:
        out = f"public/voix/{nom}.mp3"
        await edge_tts.Communicate(texte, v["voice"], rate=v["rate"], pitch=v["pitch"], proxy=PROXY).save(out)
        d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]))
        etat = "OK " if debut + d <= fin + 0.05 else "TROP LONG"
        print(f"{nom}: {d:.2f}s  fenêtre {fin-debut:.2f}s  {etat}")

asyncio.run(main())
