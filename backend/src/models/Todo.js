const mongoose = require("mongoose");

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task is required'],
    trim: true,
    minlength: [1, 'Task cannot be empty'],
    maxlength: [50, 'Task cannot exceed 50 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add an instance method to toggle completion status
TodoSchema.methods.toggleCompleted = function() {
  this.completed = !this.completed;
  return this.save();
};

// Create the model
const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
