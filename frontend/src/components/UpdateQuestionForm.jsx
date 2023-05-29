
import { useState, useEffect } from 'react';
import UpdateQuestionForm from './UpdateQuestionForm';
import axios from 'axios';

const ParentComponent = () => {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = async () => {
    try {
      const response = await axios.get('/api/questions');
      setQuestionData(response.data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error state or display an error message
    }
  };

  const handleQuestionUpdate = (questionId, question, answer) => {
    // Update the question data in the state
    const updatedQuestionData = questionData.map((item) => {
      if (item.id === questionId) {
        return {
          ...item,
          question,
          answer,
        };
      }
      return item;
    });
    setQuestionData(updatedQuestionData);
  };

  return (
    <div>
      {questionData && (
        <div>
          {questionData.map((question) => (
            <UpdateQuestionForm
              key={question.id}
              questionId={question.id}
              initialQuestion={question.question}
              initialAnswer={question.answer}
              onUpdate={handleQuestionUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
