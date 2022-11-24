import React, { useEffect, useState } from 'react';
import './App.css';
import { FaCheck, FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { IoMdDoneAll } from 'react-icons/io'
import { MdEdit, MdDeleteForever, MdCancel } from 'react-icons/md';


function App() {

  const [todos, setTodos] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({})

  // useEffect(() => {

  // }, [todos, pendings, completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: new Date().getTime(),
      text: input
    }
    setTodos((data) => {
      const updatedList = [...data, todo]
      setInput('')
      return updatedList
    })

    // setTodos([todo, ...todos]);
  }

  const addToPending = (uid) => {
    const item = todos.find(x => x.id === uid);
    setPendings([item, ...pendings]);
    const filteredArray = todos.filter(x => x.id !== uid);
    setTodos(filteredArray);

  }
  const deleteTodo = (uid) => {
    const filteredArray = todos.filter(x => x.id !== uid);
    setTodos(filteredArray);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo)
  }

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }
  const eidtTodo = (todo) => {
    setEdit(true);
    setCurrentTodo({ ...todo });
  }
  const handleUpdateTodo = (id, updateTodo) => {
    const updateItem = todos.map((todo, i) =>
      todo.id === id ? updateTodo : todo
    );
    setEdit(false);
    setTodos(updateItem)
  }


  const addToComplete = (uid) => {
    const item = pendings.find(x => x.id === uid);
    setCompleted([item, ...completed]);
    const filteredArray = pendings.filter(x => x.id !== uid);
    setPendings(filteredArray);
  }
  const deleteAll = () => {
    setTodos([]);
    setPendings([]);
    setCompleted([]);

  }
  return (
    <div className="App">
      <div className='container'>
        <h3 className='title'>ToDo List App</h3>
        {edit ? (<form className='todo-form test1' onSubmit={handleEditSubmit}>
          <input type='text' name='editTodo' placeholder='Edit Task..' className='form-control' value={currentTodo.text} onChange={handleEditInputChange} />
          <button type='submit' className='add-btn' ><MdEdit className='add-icon' /></button>
          <button className='add-btn' onClick={() => setEdit(false)}><MdCancel className='add-icon' /></button>
        </form>
        ) : <form className='todo-form test2' onSubmit={handleSubmit}>
          <button type='button' className='allDelete-btn add-btn' onClick={deleteAll} ><MdDeleteForever className='allDelete-icon' /></button>
          <input type='text' name='text' placeholder='Enter Your Task..' className='form-control' value={input} onChange={(e) => setInput(e.target.value)} />
          <button type='submit' className='add-btn' ><FaPlusCircle className='add-icon' /></button>
        </form>}
        <div>
          {/* {
            (() => {
              if (todos.length && pendings.length && completed.length < 1) {
                <p className='blank-msg'>No Records Found !</p>
              }
            })()
          } */}
        </div>
        <div className='todos-wrapper'>


          <div className='todos-list'>
            <h3 className='todo-title'>List of Tasks</h3>
            {todos.map((item, i) =>
              <div className='todo-card' key={item.id}>
                <p className='card-text'>{item.text}</p>
                <FaCheck className='todo-check-icon' onClick={() => addToPending(item.id)} />
                <FaEdit className='todo-edit-icon' onClick={() => eidtTodo(item)} />
                <FaTrash className='todo-trash-icon' onClick={() => deleteTodo(item.id)} />
              </div>
            )}
          </div>
          <div className='todos-list'>
            <h3 className='todo-title'>Pending Tasks</h3>
            {pendings.map((item, i) =>
              <div className='pending-card' key={item.id}>
                <p className='card-text'>{item.text}</p>
                <FaCheck className='todo-pending-icon' onClick={() => addToComplete(item.id)} />
              </div>
            )}
          </div>
          <div className='todos-list'>
            <h3 className='todo-title'>Completed Tasks</h3>
            {completed.map((item, i) =>
              <div className='completed-card' key={item.id}>
                <p className='card-text'>{item.text}</p>
                <IoMdDoneAll className='todo-completed-icon' />
              </div>)}

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
