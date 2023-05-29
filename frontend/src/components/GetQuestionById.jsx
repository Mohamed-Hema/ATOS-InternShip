import  { useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const GetQuestionById = ({ questionId }) => {
  useEffect(() => {
    const fetchQuestionById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/questions/${questionId}`);
        console.log(response.data._id); // Logging the question ID in the console
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchQuestionById();
  }, [questionId]);

  return null; // This component doesn't render anything
};

GetQuestionById.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default GetQuestionById;
