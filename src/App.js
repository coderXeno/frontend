import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const [list,setList] = useState({});
  const [id,setId] = useState();
  const [task,setTask] = useState();
  const [method,setMethod] = useState();
  const [done,setDone] = useState(false);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/data/api/todoapi/')
      .then((res)=>{
        setList(prevState => ({
          ...prevState,
          ...res.data.map(obj => obj.entry)
        }))
      })
      .catch((err)=>{
        console.log(err)
      })
  },[]);

  const todolist = []
  const idlist = []
  Object.keys(list).map((key,value)=>{
    todolist.push(list[key])
    idlist.push(value+1)
    return value
  });

  function handleSubmit(event){
    event.preventDefault();
    setDone(true);
    
    if(method === "post"){
      axios.post('http://127.0.0.1:8000/data/api/todoapi/',{
        id: id,
        entry: task
      })
        .then((res)=>{
          window.location.reload();
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    if(method === "put"){
      axios.put(`http://127.0.0.1:8000/data/api/todoapi/${id}`,{
        id: id,
        entry: task
      })
        .then((res)=>{
          console.log(res)
          window.location.reload();
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    if(method === "delete"){
      axios.delete(`http://127.0.0.1:8000/data/api/todoapi/${id}`)
        .then((res)=>{
          console.log(res)
          window.location.reload();
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }

  return (
    <div className="App">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Task Id" onChange={event => setId(event.target.value)}></input>
          <input type="text" placeholder='Enter Task here' onChange={event => setTask(event.target.value)}></input>
          <select className="select" onChange={event => setMethod(event.target.value)}>
            <option value="default" selected defaultValue disabled>Choose</option>
            <option value="post">Add</option>
            <option value="put">Update</option>
            <option value="delete">Delete</option>
          </select>
          <button disabled={id && task && method ? false : true}>Submit</button>
        </form>
        <div className='display-data'>
          <span className='display-flex'>
            <span className='id'>{idlist.map(item => <p key={item}>{item}</p>)}</span>
            <span className='task'>{todolist.map(item => <p key={item}>{item}</p>)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
