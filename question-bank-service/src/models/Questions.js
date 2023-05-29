const mongoose = require("mongoose");

// Define the schema for the answers
const answerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create the Answer model based on the answer schema
const Answer = mongoose.model("Answer", answerSchema);

// Define the schema for the questions
const questionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  mark: {
    type: Number
  },
  expectedTime: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: [String],
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  answers: {
    type: [answerSchema],
    required: true
  }
});

// Create the Question model based on the question schema
const Questions = mongoose.model("Question", questionSchema);

// Export the models
module.exports = {
  Questions,
  Answer
};


