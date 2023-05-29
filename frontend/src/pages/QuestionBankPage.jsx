import { useState, useEffect } from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import DeleteQuestionForm from '../components/DeleteQuestionForm';
import EditQuestionForm from '../components/EditQuestionForm';
import axios from 'axios';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

const QuestionBankPage = () => {
  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [refreshQuestions, setRefreshQuestions] = useState(false); 
  const [questions, setQuestions] = useState([]); 

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Call this function whenever a new question is added
  const handleQuestionAdded = () => {
    setRefreshQuestions((prevValue) => !prevValue);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/questions');
        const totalItems = response.data.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
  
        // Slice the questions based on the current page and items per page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedQuestions = response.data.slice(startIndex, endIndex);
  
        setQuestions(slicedQuestions);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchQuestions();
  }, [refreshQuestions, currentPage]);


  const handleDeleteQuestion = async (questionId) => {
    try {
    await axios.delete(`http://localhost:4000/api/questions/${questionId}`);
    console.log('Question deleted successfully!');
    setRefreshQuestions((prevValue) => {
    console.log('Updating refreshQuestions state:', !prevValue);
    return !prevValue;
    });
    } catch (error) {
    console.error('Error deleting question:', error);
    }
   };
   
  
  
  
  
  return (
    <MDBContainer className="question-bank-container">
      <h1 className="mb-4 mt-4">Question Bank</h1>

      <div className="mb-4">
        <AddQuestionForm onQuestionAdded={handleQuestionAdded} />
      </div>

      <MDBTable responsive>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Questions</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Marks</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.name}</td>
              <td>{question.category}</td>
              <td>{question.subcategory}</td>
              <td>{question.mark}</td>
              <td>
              <DeleteQuestionForm
                  questionId={question._id}
                  onDeleteQuestion={() => handleDeleteQuestion(question._id)}
                />
              </td>
              <td>
                <EditQuestionForm
                  questionId={question._id}
                  onQuestionAdded={handleQuestionAdded}
                />
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination pagination-circle">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage}>
              <MDBIcon icon="angle-double-left" />
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              <MDBIcon icon="angle-double-right" />
            </button>
          </li>
        </ul>
      </nav>
    </MDBContainer>
  );
};



export default QuestionBankPage;
