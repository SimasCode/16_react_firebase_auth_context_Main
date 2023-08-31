import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useState } from 'react';

export default function TodoPage() {
  const [bookArr, setBookArr] = useState([]);
  async function getBooksFb() {
    console.log('lets get some books');

    const querySnapshot = await getDocs(collection(db, 'books'));
    console.log('querySnapshot ===', querySnapshot);
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `);
      //   console.log('doc.data() ===', doc.data());
      //   const singleBookObj = doc.data();
      //   singleBookObj.id = doc.id;
      const singleBookObj = { id: doc.id, ...doc.data() };
      console.log('singleBookObj ===', singleBookObj);
      dataBack.push(singleBookObj);
    });
    console.log('dataBack ===', dataBack);
    setBookArr(dataBack);
  }

  return (
    <div className='container'>
      <h1>todo Page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={getBooksFb}>get books data</button>
      </div>
      <ul>
        {bookArr.map((bObj) => (
          <li key={bObj.id}>
            title: {bObj.title}, author: {bObj.author}, year: {bObj.year}.
          </li>
        ))}
      </ul>
    </div>
  );
}
