// Importing Question Structure form DB
const { Questions, Answer } = require('../models/Questions');

// Handling Errors
function handleError(res, error) {
  console.error(error);
  res.status(500).json({
    message: "Internal Server Error"
  });
}

//Create and Save question
exports.createQuestion = async function (req, res) {
  try {
    const {
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    } = req.body;

    const question = new Questions({
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    });

    const savedQuestion = await question.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while creating the question." });
  }
};



//Get Question by ID
exports.getQuestionById = async function (req, res) {
  try {
    const { id } = req.params;

    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while retrieving the question." });
  }
};


//Get all questions
exports.getAllQuestions = async function (req, res) {
  try {
    const questions = await Questions.find();

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while retrieving the questions." });
  }
};


//Update a question
exports.updateQuestion = async function (req, res) {
  try {
    const { id } = req.params;

    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    question.name = req.body.name;
    question.category = req.body.category;
    question.subcategory = req.body.subcategory;
    question.mark = req.body.mark;
    question.expectedTime = req.body.expectedTime;
    question.correctAnswers = req.body.correctAnswers;
    question.answers = req.body.answers;

    const updatedQuestion = await question.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while updating the question." });
  }
};


// Add answer to a question
exports.addAnswerToQuestion = async function (req, res) {
  try {
    const { id } = req.params;

    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const newAnswer = {
      name: req.body.name,
      description: req.body.description,
    };

    question.answers.push(newAnswer);

    const updatedQuestion = await question.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while adding the answer to the question." });
  }
};


// Delete answer from a question
exports.deleteAnswerFromQuestion = async function (req, res) {
  try {
    const { id, answerId } = req.params;

    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const answerIndex = question.answers.findIndex(answer => answer.id === answerId);

    if (answerIndex === -1) {
      return res.status(404).json({ error: "Answer not found." });
    }

    question.answers.splice(answerIndex, 1);

    const updatedQuestion = await question.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "An error occurred while deleting the answer from the question." });
  }
};

// Delete a question
exports.deleteQuestion = async function (req, res) {
  try {
    const { id } = req.params;

    const deletedQuestion = await Questions.findByIdAndDelete({_id: id})
    console.log(deletedQuestion)

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question and answers deleted successfully" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error occurred while deleting the question" });
  }
};

