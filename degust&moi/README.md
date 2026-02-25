# 🍷 Dégust&Moi

Dégust&Moi est une application web éducative et non commerciale qui aide les utilisateurs à découvrir des alcools correspondant à leurs goûts, leur humeur ou leur contexte.

Le projet se concentre sur la découverte, la compréhension et la culture des alcools, sans vente, sans publicité et sans incitation à la consommation excessive.

Il s’agit d’un MVP évolutif développé dans le cadre d’un portfolio, intégrant désormais une authentification sécurisée et une base de données.

---

## 🎯 Objectif du projet

De nombreux utilisateurs rencontrent des difficultés lorsqu’ils doivent choisir un alcool,
par manque de connaissances ou face à des descriptions trop expertes ou commerciales.

Dégust&Moi vise à :
- simplifier la découverte des alcools
- proposer des recommandations compréhensibles
- expliquer clairement pourquoi un alcool est suggéré
- promouvoir une approche responsable et pédagogique

L’objectif n’est pas de vendre, mais d’éduquer et d’accompagner.

---

## 👥 Public cible

- Débutants
- Utilisateurs curieux
- Consommateurs occasionnels
- Personnes souhaitant apprendre sans pression commerciale

---

## ⚙️ Fonctionnalités (MVP)

### Fonctionnalités incluses
- Page d’accueil présentant le concept
- Questionnaire court (moins de 2 minutes)
  - préférences de goût
  - intensité souhaitée
  - contexte ou humeur
- Génération de **maximum 4 recommandations**
- Explication éducative pour chaque recommandation
- Affichage de cocktails associés (via API externe)
- Interface moderne avec micro-interactions
- Collection SVG premium personnalisée

---

## 🧠 Logique de recommandation

La recommandation repose sur :
- un système de scoring pondéré (goût + intensité + contexte)
- gestion des oppositions d’intensité (léger vs fort)
- diversification automatique par type d’alcool
- légère variation contrôlée pour éviter les résultats identiques

L’objectif n’est pas la complexité algorithmique, mais une logique claire, explicable et maintenable.

---

## 🔐 Authentification & gestion des favoris

Le projet intègre un système d’authentification sécurisé via Supabase.

Fonctionnalités :

- Création de compte (email + mot de passe)
- Connexion / Déconnexion
- Sauvegarde des favoris en base de données
- Synchronisation multi-appareils
- Accès aux favoris uniquement pour l’utilisateur connecté

---

## 🛡️ Sécurité

Le projet implémente :

- Row Level Security (RLS)
- Politiques d’accès par utilisateur
- Isolation stricte des favoris par utilisateur

  Chaque utilisateur ne peut consulter, modifier ou supprimer que ses propres données.

---

## 🌐 Données & API externe

Dégust&Moi utilise l’API publique suivante :

TheCocktailDB

🔗 https://www.thecocktaildb.com/api.php

Cette API permet d’afficher :

- un exemple réel et représentatif
- une image
- un nom
- des instructions
- des ingrédients

Les appels API sont centralisés via des API Routes Next.js afin de :

- Maintenir une architecture propre
- Sécuriser les appels externes
- Faciliter l’évolution du projet

Les données sont utilisées à titre informatif et pédagogique uniquement.

---

## 🧱 Stack technique

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- API Routes Next.js
- Supabase

### Base de données

- PostgreSQL (via Supabase)

### Authentification

- Supabase Auth (email / mot de passe)

---

## 🗂️ Architecture simplifiée

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ auth/
│  │  └─ page.tsx
│  ├─ questionnaire/
│  │  └─ page.tsx
│  ├─ resultats/
│  │  └─ page.tsx
│  ├─ favoris/
│  │  └─ page.tsx
│  └─ api/
│     └─ alcohol/
│        └─ route.ts
├─ lib/
│  ├─ recommendation.ts
│  ├─ spiritMapping.ts
│  └─ supabase.ts
└─ data/
   └─ generatedAlcohols.json
```

---

## 💼 Compétences démontrées

- Conception d’un MVP produit
- Architecture full-stack moderne
- Intégration d’une API tierce
- Sécurisation d’une base de données avec RLS
- Logique métier structurée et maintenable
- Création d’un design system SVG personnalisé
- Approche UX orientée pédagogie

---

## ▶️ Lancer le projet en local

### Prérequis
- Node.js ≥ 18
- npm

### Installation
```bash
npm install
```

### Lancer le serveur de développement
```bash
npm run dev
```

L’application est accessible à l’adresse :
http://localhost:3000

---

## 🚀 Évolution future possible

- Sauvegarde de l’historique des questionnaires
- Profil utilisateur avancé
- Recommandations plus dynamiques
- Internationalisation complète
- Déploiement production sur Vercel

---

## 📌 Remarque importante

Dégust&Moi est un projet éducatif non commercial.
Il ne vend pas d’alcool et ne promeut aucune marque spécifique.

La consommation d’alcool doit toujours rester responsable.

---

## 🎯 Conclusion

Dégust&Moi est un MVP portfolio combinant :

- Logique métier claire
- API externe
- Authentification sécurisée
- Base de données relationnelle
- Micro-interactions UI modernes
- Architecture évolutive

Un projet démontrant des compétences full-stack modernes dans un contexte produit réaliste.

---