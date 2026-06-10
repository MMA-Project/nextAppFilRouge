# League Tracker

League Tracker est une application fil rouge realisee avec Next.js autour de
l'univers de League of Legends.

L'objectif du projet est de construire progressivement une application permettant
de consulter des champions, d'acceder a leurs fiches detaillees et de suivre les
champions que l'utilisateur souhaite apprendre ou maitriser.

## Contexte du projet

Le projet prend la forme d'une petite encyclopedie et d'un tableau de bord pour
joueurs de League of Legends.

L'application pourra permettre de :

- consulter une liste de champions ;
- afficher le detail d'un champion avec une route dynamique ;
- filtrer les champions par role ;
- suivre des champions dans un dashboard ;
- ajouter une progression personnelle : a tester, en apprentissage, maitrise ;
- afficher des pages d'erreur, de chargement et de contenu introuvable.

## Objectifs pedagogiques

Ce projet sert de support pour pratiquer les fonctionnalites principales de
Next.js avec l'App Router :

- organisation du dossier `app/` ;
- layouts imbriques ;
- routes dynamiques avec `[id]` ;
- pages speciales `loading.tsx`, `error.tsx` et `not-found.tsx` ;
- navigation entre les pages ;
- structuration progressive d'une application web.

## Structure prevue

```txt
app/
  layout.tsx
  page.tsx
  loading.tsx
  error.tsx
  not-found.tsx

  champions/
    page.tsx
    [id]/
      page.tsx

  dashboard/
    layout.tsx
    page.tsx
    champions/
      page.tsx
      [id]/
        page.tsx
```

## Lancer le projet

Installer les dependances :

```bash
pnpm install
```

Lancer le serveur de developpement :

```bash
pnpm dev
```

Ouvrir ensuite l'application dans le navigateur :

```txt
http://localhost:3000
```
