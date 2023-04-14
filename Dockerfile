# Utiliser l'image officielle Node.js LTS (Long Term Support) comme base
FROM node:18-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm ci

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port utilisé par l'application (3000 dans votre cas)
EXPOSE 3000

# Lancer l'application avec la commande "node api.js"
CMD ["node", "src/api.js"]