#!/bin/bash
# Obtenir le packetage mobile de cette application avec l'outil capacitor-cli

# Usage: ./package.sh <appNom> <appId>
# - appNom: Un nom public facile pour l'application, qui sera vue dans le "App Store".
# - appId: Identifiants de paquets ("Bundle ID" pour iOS et "Application ID" pour Android). 
#           Ces identifiants doivent:
#           - Être uniques pour chaque application.
#           - Correspondre à des noms de domaines inversés ("reverse-DNS"). Par exemple domain de la compagnie: "exemple.com", alors l'identifiant du paquet de l'application pourrait être "exemple.com.monproduit"

# Installer @capacitor cli et @capactor core
echo "Installation de @capacitor/cli"
npm install @capacitor/cli @capacitor/core

# Effacer le fichier de configuration du capacitor s'il existe
rm -f capacitor.config.ts;

# Initialiser capacitor
echo "Initialiser capacitor"
npx cap init $1 $2;

# Installer les plugins capacitor d'android et ios
npm install @capacitor/android @capacitor/ios;
npx cap add android;
npx cap add ios;

npx cap sync;

cd android;
./gradlew bundle;