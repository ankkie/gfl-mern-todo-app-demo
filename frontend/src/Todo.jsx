import React, { useEffect, useState } from 'react'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs"
import Create from './Create'
import axios from 'axios'

// Define the backend URL
const BACKEND_URL = window.ENV?.BACKEND_URL || 'http://localhost:5000';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: BACKEND_URL
})

function Todo() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    api.get("/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    api.put(`/update/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    api.delete(`/delete/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="todo">
      <h2>Todo List</h2>
      <Create />
      {
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.completed ? 
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                : <BsCircleFill className="icon" />
              }
              <p className={todo.completed ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Todo
