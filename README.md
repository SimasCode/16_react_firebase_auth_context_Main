# Steps

1. `npm install firebase`
2. firebase/firebase.js

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
const firebaseConfig = {};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

# Praktika

## Profile page

1. Sukurti forma su displayName ir protoUrl
2. pateikiant forma paimti reiksmes is displayName ir protoUrl
3. updateProfile funkcijos pagalba atnaujinti reiksmes
   https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

4. paduoti i konteksta (AuthProvider) displayName ir protoUrl is fireUser
5. pasiimti displayName protoUrl info is konteksto ir jas panaudoti kaip pradines reiksmes displayName ir protoUrl.
6. graziai sustilizuoti profilio puslapi, nuotrauka, display name, email
7. puslapio apacioje prideti Logout mygtuka, padaryti kad veiktu

## Login page

1. Susikurti klaidai state.
2. Sureaguoti i klaida

   2.1 Atvaizduoti virs formos "wrong email or password"
   2.2 Jei klaida kad nerastas email, atvaizduoti "This email is not registered" kitais atvejais "wrong email or password"

## Register page

1. sukurti RegisterPage puslapi
2. sukurti forma su email, pass ir repeat_pass inputais
3. susieti inputus su state
4. sustabdyti forma nuo persiuntimo su funkcija.
5. pateikiant forma slaptazodis turetu buti min 5 simboliai
6. pateikiant forma palyginti ar slaptazodziai sutampa
7. jei sutampa createUserWithEmailAndPassword funkcijos pagalba uzregistruoti vartotoja
   https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
8. jei ne parodyti kad nesutampa slaptazodziai, arba kad per trumpa ivestis.

## Header

1. atvaizduoti prisijungusio userio email
2. atvaizduoti prisijungusio userio displayName jei ivestas, email jei nenustatytas

## Profile page

1. sukurti mygtuka 'Delete user'
2. jo paspaudimu istrinti vartotoja
   https://firebase.google.com/docs/auth/web/manage-users#delete_a_user

## Add firebase to project

1. pradeti nauja vite projekta
2. instaliuoti firebase
3. iskonsolinti firebase app konstanta.
4. naudoti .env kintamuosius savo prisijungimams
