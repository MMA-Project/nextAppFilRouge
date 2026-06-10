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
- afficher le detail d'un champion ;
- utiliser les donnees et assets de Community Dragon ;
- filtrer les champions par role ;
- suivre des champions dans un dashboard ;
- proteger le dashboard avec une connexion GitHub ;

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

  api/
    champions/
      route.ts
      [id]/
        route.ts
    tracked-champions/
      route.ts
```

Pages data-driven :

- `/champions` affiche une liste de champions alimentee par un `fetch` serveur
  dans un Server Component depuis Community Dragon ;
- `/champions/[id]` affiche le detail d'un champion avec une route dynamique et
  un `fetch` serveur vers Community Dragon ;
- `/dashboard` affiche les champions suivis par l'utilisateur avec un `fetch`
  serveur.

Server Action :

- la fiche detail d'un champion contient un formulaire de suivi ;
- l'action `trackChampionAction` valide les champs cote serveur avec Zod ;
- les erreurs de validation sont renvoyees au formulaire pour afficher un
  feedback utilisateur ;
- la mutation cree ou modifie une entree en base Postgres via Prisma.

Strategie de cache et revalidation :

- les donnees de champions utilisent le tag `champions` avec une revalidation
  temporelle de `3600` secondes cote routes internes ;
- les appels Community Dragon utilisent le tag `cdragon` avec une revalidation
  temporelle de `86400` secondes, car les champions et assets changent surtout
  lors des patchs League of Legends ;
- les donnees de suivi utilisent le tag `tracked-champions` avec une
  revalidation temporelle de `300` secondes, car elles changent plus souvent ;
- apres une mutation, la Server Action appelle `updateTag("tracked-champions")`
  pour expirer immediatement le cache du dashboard ;
- l'action appelle aussi `revalidatePath("/dashboard")` et
  `revalidatePath("/champions/[id]")` pour rafraichir les routes concernees.

Authentification :

- `next-auth` est configure avec le provider GitHub ;
- le `SessionProvider` est branche dans le root layout ;
- les boutons de connexion utilisent `signIn("github")` ;
- la deconnexion utilise `signOut()`.

Protection des routes :

- le dashboard `/dashboard` est protege par `middleware.ts` avec le matcher
  `/dashboard/:path*` ;
- les pages `/champions` et `/champions/[id]` restent publiques ;
- la partie "Suivi personnel" d'une fiche champion n'est disponible que pour un
  utilisateur connecte.

Route Handler utilisateur :

- `/api/tracked-champions` expose `GET` et `POST` ;
- `GET` retourne uniquement les champions suivis de l'utilisateur connecte ;
- `POST` valide le body JSON avec Zod avant d'enregistrer le suivi ;
- l'API renvoie des codes HTTP explicites : `401`, `400`, `404`, `500` ou
  `200`.

Isolation des donnees :

- chaque suivi est stocke avec un `userId` issu de la session NextAuth ;
- la contrainte Prisma `@@unique([userId, championId])` empeche les doublons
  pour un meme utilisateur ;
- les lectures du dashboard filtrent toujours par `userId`, donc un utilisateur
  ne voit pas les donnees d'un autre.

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

## Base de donnees

L'application utilise PostgreSQL avec Prisma pour stocker le suivi personnel des
champions.

La base locale est lancee avec Docker Compose :

```bash
make up
```

Le service Postgres expose le port local `5433` pour eviter les conflits avec
une autre base deja lancee sur `5432`.

Variables d'environnement attendues :

```bash
DATABASE_URL="postgresql://league_tracker:league_tracker@localhost:5433/league_tracker?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-me"
GITHUB_CLIENT_ID="change-me"
GITHUB_CLIENT_SECRET="change-me"
```

Commandes utiles :

```bash
make up          # demarre Postgres
make down        # arrete Postgres
make logs        # affiche les logs Postgres
make db-generate # regenere le client Prisma
make db-migrate  # applique une migration Prisma en local
make db-studio   # ouvre Prisma Studio
```

## Donnees League of Legends

Les champions, icones et splash arts viennent de Community Dragon :

- liste : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`
- details : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/{id}.json`
- assets : chemins `lol-game-data/assets/...` retournes par Community Dragon
