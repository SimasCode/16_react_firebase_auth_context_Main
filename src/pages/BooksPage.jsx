import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function TodoPage() {
  const [booksArr, setBooksArr] = useState([]);
  console.log('booksArr ===', booksArr);

  async function getBooksFb() {
    // console.log('lets get some books');

    //READ firebase https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=1#read_data

    const querySnapshot = await getDocs(collection(db, 'books'));
    // console.log('querySnapshot ===', querySnapshot);
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      const singleBookObj = {
        id: doc.id,
        ...doc.data(),
      };
      // singleBookObj.id = doc.id;
      // console.log('singleBookObj ===', singleBookObj);
      dataBack.push(singleBookObj);
    });
    // console.log('dataBack ===', dataBack);
    setBooksArr(dataBack);
  }
  useEffect(() => {
    getBooksFb();
  }, []);

  const newBook = {
    title: 'To Kill a Dublicate',
    year: 1960,
    author: 'Harper Lee',
    isOnSale: false,
  };

  async function createBook() {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'books'), newBook);
      console.log('Document written with ID: ', docRef.id);
      getBooksFb();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    // await deleteDoc(doc(db, "kolekcija", "dokumento id"));
    try {
      const rez = await deleteDoc(doc(db, 'books', idToDelete));
      // sekme
      console.log('pavyko istrinti', rez);
      getBooksFb();
    } catch (error) {
      // nesekme
      console.warn('handleDelete error ===', error);
    }
  }
  // atspausdinti console, ar pavyko ar ne

  async function turnOnSale(bookid) {
    const washingtonRef = doc(db, 'books', bookid);

    await updateDoc(washingtonRef, {
      isOnSale: true,
    });
    getBooksFb();
  }

  return (
    <div className='container'>
      <h1>Todo page</h1>
      <p>make your todos</p>
      <div>
        <button onClick={() => {}}>get books data</button>
        <button onClick={createBook}>Create book</button>
      </div>

      <ul>
        {booksArr.map((bookObj) => (
          <li key={bookObj.id}>
            <h3>
              title: {bookObj.title}{' '}
              {bookObj.isOnSale ? (
                <span className='tomato'> -- onSale</span>
              ) : (
                <span className='blue'> -- NOTSale</span>
              )}
            </h3>
            <p>
              <i>author: {bookObj.author}</i>
            </p>

            <button onClick={() => handleDelete(bookObj.id)}>Delete</button>
            <button onClick={() => turnOnSale(bookObj.id)}>turn sale on</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
