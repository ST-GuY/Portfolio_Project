# Portfolio - Software Engineering Project

Ce repository contient mon projet portfolio développé dans le cadre de ma formation.

## Projet principal

### Dégust&Moi

Dégust&Moi est une application web éducative permettant de découvrir des alcools en fonction des préférences de l'utilisateur.

Fonctionnalités principales :
- Questionnaire interactif
- Système de recommandation
- Authentification utilisateur
- Sauvegarde des favoris
- Intégration API externe

📂 Code du projet :
/degust-moi

📖 Documentation complète :
voir README dans le dossier du projet.

## Stack technique

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL

## Diagramme d’architecture globale
```text
                User
                 │
                 ▼
        Next.js Frontend (React)
                 │
                 ▼
         Next.js API Routes
                 │
        ┌────────┴────────┐
        ▼                 ▼
  TheCocktailDB API     Supabase
        │                 │
        ▼                 ▼
                   PostgreSQL Database
```

- Frontend : interface utilisateur (Next.js + React)
- API Routes : centralisent la logique et les appels externes
- Supabase : authentification + base de données
- TheCocktailDB : enrichit les recommandations

## Flux de fonctionnement de l'application

```text
Utilisateur arrive sur l'application
            │
            ▼
     Remplit le questionnaire
            │
            ▼
  Analyse des préférences utilisateur
            │
            ▼
    Calcul du score des alcools
            │
            ▼
 Sélection des meilleures recommandations
            │
            ▼
   Appel API TheCocktailDB
            │
            ▼
     Affichage des résultats
```

## Diagramme de base de données

```text
Users
-----
id (Primary Key)
email

Favorites
---------
id (Primary Key)
user_id (Foreign Key)
alcohol_id
```

- Un utilisateur peut avoir plusieurs favoris
- Chaque favori appartient à un seul utilisateur

## Flux d'authentification

```text
Utilisateur
    │
    ▼
Formulaire Login / Register
    │
    ▼
Supabase Auth
    │
    ▼
Token de session
    │
    ▼
Utilisateur authentifié
    │
    ▼
Accès aux favoris
```
### Sécurité

Row Level Security :
```text
user_id = auth.uid()
```
Chaque utilisateur ne peut accéder qu'à ses propres favoris.
