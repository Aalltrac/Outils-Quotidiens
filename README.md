# Outils Quotidiens

Suite d'outils 100% HTML/CSS/JS, hébergeable gratuitement sur GitHub Pages. Aucun backend, aucun stockage de données. Design minimaliste et moderne, avec mode sombre.

## Structure
- index.html — page d'accueil
- /pages — une page par outil
- /css/style.css — styles globaux (Grid/Flex, variables CSS)
- /js/script.js — utilitaires et thème
- /js/tools/*.js — scripts des outils
- /sounds/beep.mp3 — bip pour le timer

## Déploiement sur GitHub Pages
1. Créez un repository sur GitHub.
2. Ajoutez tous les fichiers de ce projet.
3. Commit & push.
4. Allez dans Settings → Pages.
5. Source: "Deploy from a branch".
6. Branch: `main` (ou `master`), dossier `/root`.
7. Sauvegardez. Votre site sera disponible à l’URL GitHub Pages.

## Performances
- Aucun framework lourd.
- Scripts simples, chargés en module.
- Images traitées côté client via Canvas.
- Lazy (opportuniste): pas d’assets non utilisés chargés.
- Icônes via CDN (Font Awesome).

## Accessibilité
- HTML5 sémantique.
- Contrastes élevés en mode clair/sombre.
- Labels pour chaque champ.
- ARIA dans la navigation.

## Licence & Mentions
Contenus générés côté client, aucune donnée n’est stockée. Les convertisseurs salariaux sont des estimations. Vérifiez avec des sources officielles pour des cas spécifiques.

