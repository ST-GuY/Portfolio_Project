# 🍷 Dégust&Moi

Dégust&Moi est une application web éducative et non commerciale qui aide les utilisateurs
à découvrir des alcools correspondant à leurs goûts, leur humeur ou leur contexte.

Le projet se concentre sur la découverte, la compréhension et la culture des alcools,
sans vente, sans publicité et sans incitation à la consommation excessive.

---

## 🎯 Objectif du projet

De nombreux utilisateurs rencontrent des difficultés lorsqu’ils doivent choisir un alcool,
par manque de connaissances ou face à des descriptions trop expertes ou commerciales.

Dégust&Moi vise à :
- simplifier la découverte des alcools
- proposer des recommandations compréhensibles
- expliquer clairement pourquoi un alcool est suggéré
- promouvoir une approche responsable et pédagogique

Ce projet est développé dans le cadre d’un **MVP de portfolio**, avec un périmètre volontairement limité.

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
- Génération de **maximum 3 recommandations**
- Explication éducative pour chaque recommandation
- Navigation simple et fluide
- Aucune création de compte

### Hors périmètre (volontairement exclus)
- Vente d’alcool
- Publicité ou promotion de marque
- Comptes utilisateurs
- Avis ou notations communautaires
- Algorithmes complexes ou IA

---

## 🧠 Logique de recommandation

La recommandation repose sur :
- des règles simples et lisibles
- des correspondances entre préférences utilisateur et profils d’alcools
- une logique transparente et explicable

L’objectif n’est pas la précision algorithmique, mais la **compréhension et l’apprentissage**.

---

## 🧱 Stack technique

- **Framework** : Next.js (App Router)
- **UI** : React
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Backend** : API Routes Next.js (léger)
- **Données** : données mockées locales (MVP)
- **Déploiement** : Vercel (prévu)

Cette stack a été choisie pour :
- sa popularité sur le marché
- sa rapidité de mise en place
- sa pertinence pour un projet solo et un MVP

---

## 🗂️ Architecture simplifiée

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ questionnaire/
│  │  └─ page.tsx
│  └─ resultats/
│     └─ page.tsx
├─ data/
│  └─ alcohols.ts
└─ lib/
   └─ recommendation.ts
```

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
