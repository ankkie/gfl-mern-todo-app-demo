const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require("./models/Todo");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET all todos
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Error fetching todos", error: err.message });
  }
});

// UPDATE todo status
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  try {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await todo.toggleCompleted();
    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE todo
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Error deleting todo", error: err.message });
  }
});

// ADD new todo
app.post('/add', async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== 'string' || task.trim().length === 0) {
    return res.status(400).json({ message: "Invalid task" });
  }

  try {
    const newTodo = await TodoModel.create({ task: task.trim() });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ message: "Error adding todo", error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
