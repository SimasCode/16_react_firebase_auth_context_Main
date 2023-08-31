import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext({
  userEmail: '',
  isLoggedIn: false,
});

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState({});

  const userEmail = fireUser.email;
  let isLoggedIn = userEmail ? true : false;
  isLoggedIn = !!userEmail;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        console.log('Prisijungta');
        // console.log('user ===', user);
        setFireUser(user);
      } else {
        // User is signed out
        // ...
        console.log('Atsijungta');
        setFireUser({});
      }
    });
  }, []);

  const ctx = {
    userEmail: userEmail,
    isLoggedIn: isLoggedIn,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

// custom hook

export function useAuth() {
  return useContext(AuthContext);
}
