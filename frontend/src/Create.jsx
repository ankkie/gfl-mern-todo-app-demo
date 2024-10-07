import React, { useState } from 'react'
import axios from 'axios'

// Define the backend URL
const BACKEND_URL = window.ENV?.BACKEND_URL || 'http://localhost:5000';

function Create() {
  const [task, setTask] = useState('')

  const handleAdd = () => {
    axios.post(`${BACKEND_URL}/add`, { task: task })
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="create_form">
      <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
