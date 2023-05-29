// Global Requirements
const express = require('express');
const router = express.Router();
const {
  authMiddleware,
  isTeacher,
  isAdmin,
  isNotStudent
} = require('../middlewares/authMiddleware');
const {
  getQuestionById,
  createQuestion,
  getAllQuestions,
  updateQuestion,
  addAnswerToQuestion,
  deleteAnswerFromQuestion,
  deleteQuestion,
} = require('../controllers/controllers');



// Create and Save question
router.post("/questions", createQuestion);

// Get Question by ID
router.get("/questions/:id", getQuestionById);

// Get all questions
router.get("/questions", getAllQuestions);

// Update a question
router.put("/questions/:id", updateQuestion);

// Add answer to a question
router.post("/questions/:id/answers", addAnswerToQuestion);

// Delete an answer from a question
router.delete("/questions/:id/answers/:answerId", deleteAnswerFromQuestion);

// Delete a question
router.delete("/questions/:id", deleteQuestion);

module.exports = router;
