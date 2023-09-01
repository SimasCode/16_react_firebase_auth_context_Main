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
import { BsCircle } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai';
import './Todo.css';

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
    try {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      console.log('querySnapshot ===', querySnapshot);
      // sekme
      console.log('success');
      const todosBack = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} =>`, doc.data());
        todosBack.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log('todosBack ===', todosBack);
      setTodoArr(todosBack);
    } catch (error) {
      console.warn('error geting todos', error);
    }
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

      // arba delete galima padaryti lokaliai su state
      // const filtered = todoArr.filter((tObj) => tObj.id !== idForDelete);
      // setTodoArr(filtered);
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
      if (!todoValue) return; // tuscio laukelio validacija
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todoValue,
        done: false,
        date: new Date().toLocaleTimeString(),
      });
      console.log('Document written with ID: ', docRef.id);
      getTodosFromFireBase();
      setTodoValue(''); // turi isvalyti reikme po ivedimo, bet neveikia !!!!!
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  function handleEnterKey(event) {
    console.log('enter yvyko', event);
    if (event.key === 'Enter') {
      console.log('enter buvo paspaustas');
      newTodoCreate();
    }
  }

  async function handleToggleDone(idToEdit) {
    console.log('idToEdit ===', idToEdit);

    const todoEdit = doc(db, 'todos', idToEdit);
    const todoObjClick = todoArr.find((todoObj) => todoObj.id === idToEdit);
    console.log('todoObjClick ===', todoObjClick);

    const doneReiksme = todoObjClick.done;
    try {
      await updateDoc(todoEdit, {
        done: !doneReiksme, // gauti elemento kuris turi id idToEdit done reiksme
      });
      getTodosFromFireBase();
    } catch (error) {
      console.log('handleToggleDone Error ===', error);
    }
    // Set the "capital" field of the city 'DC'
  }

  return (
    <div>
      <button onClick={createBook}>New todo</button>
      <form onSubmit={handleSubmit}>
        <input
          onKeyUp={handleEnterKey}
          onChange={todoInput}
          type='text'
          placeholder='Enter todo'
        />
        <button onClick={newTodoCreate}>Submit</button>
      </form>
      <ul className='unlisted'>
        {todoArr.map((todoObj) => (
          <li className='todoItem  gap-10 mb-10' key={todoObj.id}>
            {todoObj.done ? (
              <BsCircle size={20} />
            ) : (
              <AiFillCheckCircle size={20} />
            )}
            <span
              onClick={() => handleToggleDone(todoObj.id)}
              className={todoObj.done ? 'doneItem' : ''}
            >
              {todoObj.title}
            </span>

            <button
              className='deleteBtn'
              onClick={() => handleDelete(todoObj.id)}
            >
              <AiFillDelete />
            </button>
            <button>
              <FiEdit />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
