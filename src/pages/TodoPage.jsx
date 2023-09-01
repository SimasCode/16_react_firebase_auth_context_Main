import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import './TodoPage.module.scss';

export default function TodoPage() {
  const [todoArr, setTodoArr] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const initTodos = [
    { title: 'Buy Eggs', done: false, date: '' },
    { title: 'Go to Shopping', done: true, date: '' },
    { title: 'Do a 100 pushups', done: false, date: '' },
  ];

  //READ firebase https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=1#read_data

  async function getTodosFromFireBase() {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const dataBackFromDb = [];
    querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      const singleTodoObj = {
        id: doc.id,
        ...doc.data(),
      };
      dataBackFromDb.push(singleTodoObj);
    });
    setTodoArr(dataBackFromDb);
  }

  useEffect(() => {
    getTodosFromFireBase();
  }, []);

  async function createBook() {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'todos'), initTodos[2]);
      console.log('Document written with ID: ', docRef.id);
      getTodosFromFireBase();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async function handleDelete(idForDelete) {
    // await deleteDoc(doc(db, "kolekcija", "dokumento id"));
    try {
      await deleteDoc(doc(db, 'todos', idForDelete));
      getTodosFromFireBase();
    } catch (error) {
      // nesekme
      console.warn('handleDelete error ===', error);
    }
  }

  /**
   *
   * @param {SubmitEvent} event
   */
  function handleSubmit(event) {
    event.preventDefault();
  }

  function todoInput(event) {
    setTodoValue(event.target.value);
    console.log('event.target.value ===', event.target.value);
  }

  async function newTodoCreate() {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todoValue,
        done: false,
      });
      console.log('Document written with ID: ', docRef.id);
      getTodosFromFireBase();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  return (
    <div>
      <button onClick={createBook}>New todo</button>
      <form onSubmit={handleSubmit}>
        <input onChange={todoInput} type='text' placeholder='Enter todo' />
        <button onClick={newTodoCreate}>Submit</button>
      </form>
      <ul className=''>
        {todoArr.map((todoObj) => (
          <li className='flexItem' key={todoObj.id}>
            <p>{todoObj.title}</p>
            <button onClick={() => handleDelete(todoObj.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
