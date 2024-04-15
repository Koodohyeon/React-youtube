import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup, signOut, updateProfile,
        signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function register({ email, password, name, photo }) {
    console.log('firebase:register():', email, password);
    return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    })
    // .then((result) => result.user) register logout 이전
    .then(() => {logout()})
    .catch(console.error);
}

// updateProfile(auth.currentUser, {
//     displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
//   }).then(() => {
//     // Profile updated!
//     // ...
//   }).catch((error) => {
//     // An error occurred
//     // ...
//   });

// export async function login({email, password}) {
//     return signInWithEmailAndPassword(auth, email, password)
//         .then(result => result.user)
//         .catch(console.error);
// }

export function login({email, password}) {
    signInWithEmailAndPassword(auth, email, password)
        .catch(console.error);
}

// export async function loginWithGithub() {
//     const provider = new GithubAuthProvider();
//     return signInWithPopup(auth, provider)
//     .then(result => result.user)
//     .catch(console.error);
// }

export function loginWithGithub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
    .catch(console.error);
}

// export async function logout() {
//     return signOut(auth)
//     .then(() => null) 
//     .catch(console.error);
// }

export function logout() {
    signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}
