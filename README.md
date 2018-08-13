# Khanapp

Khanapp it's a virtual gymkhana organizer made with the MEAN Stack. [TRY IT FOR FREE](https://gymkhanapp.herokuapp.com)

## Table of contents

- [What's Khanapp?](#what's-khanapp?)
- [Installation](#installation)
- [Usage](#usage)
- [Cool Features](#cool-features)
- [Tree View](#tree-view)

### What's Khanapp?

Khanapp is a platform where you can create khanas that are like gymkhanas composed of challenges, in each khana you select a game area, also select a date in which you want to play (for example a park near to you), and the number of challenges you want your khana to have.

The challenges are trivial type logical tests and you can select the topic of these and its difficulty when you create a khana.

---

Khanapp es una plataforma donde puedes crear khanas que son como gymkhanas compuestas de challenges, en cada khana tu seleccionas un area donde quieres jugar (por ejemplo un parque cerca de tu casa), tambien seleccionas una fecha en la que quieres jugar, y el numero de challenges que quieres que tenga tu khana.

Los challenges son pruebas logicas tipo trivial y tu puedes seleccionar el tema de estas y su dificultad cuando creas una khana.

### Installation

> You need to have node and npm installed.

```bash
git clone https://github.com/MonkeyAndres/Khanapp.git
cd Khanapp
npm install
```

### Usage

```bash
# Compile Angular
cd client
npm run build

# Move angular app to public (express)
cd ..
mv client/dist server/public

# Run express
cd server
npm start # Open localhost:3000
```

### Cool Features

* Native notifications (Node Sheduler, Socket IO, PushJS)
* Google Maps Drawing Tools (Google Maps API)
* Random challenge colocation (Turf, GeoJSON)
* Real time position tracking (Navigator API, Socket IO)
* P2P architecture for avoid saving a lot of positions in DB (Socket IO)
* Socket IO rooms for each khana (Socket IO)

### Tree View

```bash
├── client
│   ├── src
│   │   ├── app
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.component.html
│   │   │   │   ├── auth.component.scss
│   │   │   │   ├── auth.component.spec.ts
│   │   │   │   └── auth.component.ts
│   │   │   ├── challenge
│   │   │   │   ├── challenge.component.html
│   │   │   │   ├── challenge.component.scss
│   │   │   │   ├── challenge.component.spec.ts
│   │   │   │   ├── challenge.component.ts
│   │   │   │   └── challenge-multiple
│   │   │   │       ├── challenge-multiple.component.html
│   │   │   │       ├── challenge-multiple.component.scss
│   │   │   │       ├── challenge-multiple.component.spec.ts
│   │   │   │       └── challenge-multiple.component.ts
│   │   │   ├── gameboard
│   │   │   │   ├── gameboard.component.html
│   │   │   │   ├── gameboard.component.scss
│   │   │   │   ├── gameboard.component.spec.ts
│   │   │   │   └── gameboard.component.ts
│   │   │   ├── game-components
│   │   │   │   ├── create-game
│   │   │   │   │   ├── create-game.component.html
│   │   │   │   │   ├── create-game.component.scss
│   │   │   │   │   ├── create-game.component.spec.ts
│   │   │   │   │   └── create-game.component.ts
│   │   │   │   ├── find-game
│   │   │   │   │   ├── find-game.component.html
│   │   │   │   │   ├── find-game.component.scss
│   │   │   │   │   ├── find-game.component.spec.ts
│   │   │   │   │   └── find-game.component.ts
│   │   │   │   ├── game-info
│   │   │   │   │   ├── game-info.component.html
│   │   │   │   │   ├── game-info.component.scss
│   │   │   │   │   ├── game-info.component.spec.ts
│   │   │   │   │   └── game-info.component.ts
│   │   │   │   └── game-list
│   │   │   │       ├── game-list.component.html
│   │   │   │       ├── game-list.component.scss
│   │   │   │       ├── game-list.component.spec.ts
│   │   │   │       └── game-list.component.ts
│   │   │   ├── maps
│   │   │   │   ├── gamearea-drawer
│   │   │   │   │   ├── gamearea-drawer.component.html
│   │   │   │   │   ├── gamearea-drawer.component.scss
│   │   │   │   │   ├── gamearea-drawer.component.spec.ts
│   │   │   │   │   └── gamearea-drawer.component.ts
│   │   │   │   └── gamearea-viewer
│   │   │   │       ├── gamearea-viewer.component.html
│   │   │   │       ├── gamearea-viewer.component.scss
│   │   │   │       ├── gamearea-viewer.component.spec.ts
│   │   │   │       └── gamearea-viewer.component.ts
│   │   │   ├── material
│   │   │   │   ├── material.module.spec.ts
│   │   │   │   └── material.module.ts
│   │   │   ├── mykhanas
│   │   │   │   ├── mykhanas.component.html
│   │   │   │   ├── mykhanas.component.scss
│   │   │   │   ├── mykhanas.component.spec.ts
│   │   │   │   └── mykhanas.component.ts
│   │   │   ├── navbar
│   │   │   │   ├── navbar.component.html
│   │   │   │   ├── navbar.component.scss
│   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   └── navbar.component.ts
│   │   │   ├── profile
│   │   │   │   ├── edit-profile
│   │   │   │   │   ├── edit-profile.component.html
│   │   │   │   │   ├── edit-profile.component.scss
│   │   │   │   │   ├── edit-profile.component.spec.ts
│   │   │   │   │   └── edit-profile.component.ts
│   │   │   │   ├── info
│   │   │   │   │   ├── info.component.html
│   │   │   │   │   ├── info.component.scss
│   │   │   │   │   ├── info.component.spec.ts
│   │   │   │   │   └── info.component.ts
│   │   │   │   ├── profile.component.html
│   │   │   │   ├── profile.component.scss
│   │   │   │   ├── profile.component.spec.ts
│   │   │   │   └── profile.component.ts
│   │   │   ├── router
│   │   │   │   ├── routing.guards.ts
│   │   │   │   └── routing.module.ts
│   │   │   └── services
│   │   │       ├── auth.service.spec.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── challenges.service.spec.ts
│   │   │       ├── challenges.service.ts
│   │   │       ├── crud.interface.ts
│   │   │       ├── games.service.spec.ts
│   │   │       ├── games.service.ts
│   │   │       ├── player.service.spec.ts
│   │   │       ├── player.service.ts
│   │   │       ├── socket.service.spec.ts
│   │   │       └── socket.service.ts
│   │   ├── assets
│   │   ├── browserslist
│   │   ├── environments
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── karma.conf.js
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── styles.scss
│   │   ├── test.ts
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   └── tslint.json
│   ├── tsconfig.json
│   └── tslint.json
├── server
│   ├── app.js
│   ├── bin
│   │   └── www
│   ├── config
│   │   ├── cloudinary.js
│   │   └── passport.js
│   ├── middleware
│   │   └── loggedIn.js
│   ├── models
│   │   ├── Challenge.js
│   │   ├── Game.js
│   │   └── User.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   ├── api
│   │   │   ├── authRoutes.js
│   │   │   ├── challengeRouter.js
│   │   │   ├── chatRouter.js
│   │   │   ├── gameRouter.js
│   │   │   ├── index.js
│   │   │   └── userRouter.js
│   │   ├── index.js
│   │   └── utils
│   │       ├── buildChallenges.js
│   │       ├── pickRandomChallenges.js
│   │       └── randomPointsPolygon.js
│   └── socket.io
│       ├── khanaServer.js
│       └── notifications.js
└── tree.md

```

