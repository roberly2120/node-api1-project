import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Users from './components/Users';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios.get('http://localhost:9000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  const deleteUser = id => {
    // const updatedUsers = users.filter(user => {
    //     return(user.id != id)
    // });
    axios.delete(`http://localhost:9000/api/users/${id}`)
      .then(res => {
        getUsers();
      })
      .catch(err => console.error(err))

  }

  return (
    <div className="App">
    <h1>Users and Bios</h1>
    <Users users={users} delete={deleteUser}/>
    </div>
  );
}

export default App;
