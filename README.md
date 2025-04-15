# recruitment-platform-nextjs# Recruitment Platform (Next.js)

Une plateforme web simple pour le recrutement avec Next.js, Ant Design, Prisma et i18n.

---

## 🚀 Lancer le projet

```bash

***********************************************************************
(Terminal) :
git clone https://github.com/MaximeMaheswaran/recruitment-platform-nextjs.git
cd recruitment-platform-nextjs/my-app
npm install



Créer un fichier .env et metter ce code dans le fichier :

DATABASE_URL="file:./dev.db"



Initialiser la base de données (Terminal) :

npx prisma migrate dev --name init
npx prisma generate



Créer le dossier uploads/ dans public/ (Terminal):

mkdir public/uploads



Lancer le serveur (Terminal):
npm run dev

Ouvrir (Navigateur): http://localhost:3000

****************************************************************************


✅ Fonctionnalités
Formulaire pour les candidats

Liste et détails pour les recruteurs

Thème personnalisé Ant Design

Traductions (FR 🇫🇷 / EN 🇬🇧)

Gestion des états avec Redux

API avec Prisma + SQLite

Upload de fichiers dans public/uploads

*****************************************************************************

📁 Structure

my-app/
├── prisma/              
├── public/
│   ├── locales/         # Traductions
│   └── uploads/         # Fichiers envoyés
├── src/
│   ├── app/             # Pages & routes
│   ├── components/      # UI
│   ├── store/           # Redux
│   └── themeConfig.ts   # Thème Ant Design
├── .env
├── next.config.ts
└── next-i18next.config.js


*****************************************************************************

🧪 Stack utilisée
Next.js 14

Ant Design

Redux Toolkit

Prisma ORM

SQLite

next-i18next (i18n)

*****************************************************************************


## 📘 Documentation

Les diagrammes UML sont disponibles dans le dossier `/docs` :
- Architecture de l’app
- Flux de données
- Pages principales


****************************************************************************


✏️ Auteur

Maxime Maheswaran

🔗 https://www.linkedin.com/in/maxime-maheswaran/