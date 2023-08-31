import { getAuth, updateProfile } from 'firebase/auth';
import { useState } from 'react';

// paveiksliukas
// 'https://robohash.org/hicveldicta.png?size=200x200&set=set1'

export default function ProfilePage() {
  const auth = getAuth();
  const [dispName, setDispName] = useState(auth.currentUser.displayName);
  const [phUrl, setPhUrl] = useState(auth.currentUser.photoURL);
  const [updateHappened, setUpdateHappened] = useState(false);

  function enterDispName(event) {
    setDispName(event.target.value);
  }

  function enterPhotoUrl(event) {
    setPhUrl(event.target.value);
  }

  // pasiimti displayName protoUrl info is konteksto

  // TODO: pasidaryti kad atsinaujintu info be refresh

  /**
   *
   * @param {SubmitEvent} event
   */

  function handleSubmit(event) {
    event.preventDefault();

    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: dispName,
      photoURL: phUrl,
    })
      .then(() => {
        // Profile updated!
        console.log('update pavyko');
        console.log('auth.currentUser ===', auth.currentUser);
        // iskviesti getUserInfo() funkcija esancia kontekste
        // ctx.getUserInfo();
        setUpdateHappened(!updateHappened);
      })
      .catch((error) => {
        // An error occurred
        console.log('update nepavyko', error);
      });
  }

  return (
    <div className='container'>
      <h1>ProfilePage</h1>
      <h2>{auth.currentUser.displayName}</h2>
      <img src={auth.currentUser.photoURL} alt='Profile image' />
      <p>Welcome to Your own space</p>

      <p>
        Entered values: {dispName} {phUrl}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={dispName}
          onChange={enterDispName}
          type='text'
          placeholder='displayName'
        />

        <input
          value={phUrl}
          onChange={enterPhotoUrl}
          type='text'
          placeholder='protoUrl'
        />
        <button>Update</button>
      </form>

      <p>jei pavyksta pridet email atnaujinima</p>
    </div>
  );
}
