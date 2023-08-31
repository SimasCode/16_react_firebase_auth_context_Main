import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase/firebase';

export default function Login() {
  const [emailValue, setEmailValue] = useState('james@bond.com');
  const [passwordValue, setPasswordValue] = useState('123456');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('ar veikia?');
    // atspausdinti email ir passwor cia
    console.log('emailValue ===', emailValue);
    console.log('passwordValue ===', passwordValue);

    // nutraukti funkcijo vykdyma jei tuscias email arba password
    if (!emailValue || !passwordValue) {
      console.warn('email or password not entered');
      return;
    }

    loginWithFireBase();
    console.log('forma ok');
  }

  function loginWithFireBase() {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user ===', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode ===', errorCode);
        console.log('errorMessage ===', errorMessage);
      });
  }

  return (
    <div>
      <h2>Login here</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setEmailValue(event.target.value)}
          value={emailValue}
          type='text'
          placeholder='your email'
        />
        <input
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
          type='password'
          placeholder='your password'
        />
        <button type='submit'>Login</button>
      </form>
      <div>
        <p>Entered email: {emailValue}</p>
        <p>Entered password: {passwordValue}</p>
      </div>
    </div>
  );
}
