import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const AddQuestionForm = ({onQuestionAdded}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [mark, setMark] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/questions", {
        name,
        category,
        subcategory,
        mark,
        expectedTime,
        correctAnswers,
        createdBy,
        answers,
      });
      console.log(response.data);
      // Reset form values
      setName("");
      setCategory("");
      setSubcategory("");
      setMark("");
      setExpectedTime("");
      setCorrectAnswers("");
      setCreatedBy("");
      setAnswers([]);
      setShowModal(false);
      onQuestionAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <Button className="btn btn-primary me-2" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Question
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Question:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Write a Question'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Category Name'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Subcategory:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='SubCategory'
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mark:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder='Mark'
                      value={mark}
                      onChange={(e) => setMark(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Expected Time:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder='Expected Time in Minutes'
                      value={expectedTime}
                      onChange={(e) => setExpectedTime(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correct Answer:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Correct Answer'
                      value={correctAnswers}
                      onChange={(e) => setCorrectAnswers(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Created By:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Add your Username'
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Answers:</Form.Label>
                    {answers.map((answer, index) => (
                      <div key={index}>
                      <Form.Control
                          type="text"
                          value={answers[index]?.name || ""}
                          placeholder="Answer Name"
                          onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[index] = { ...newAnswers[index], name: e.target.value };
                            setAnswers(newAnswers);
                          }}
                          required
                        />
                        <Form.Control
                          type="text"
                          value={answers[index]?.description || ""}
                          placeholder="Answer Description"
                          onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[index] = {
                              ...newAnswers[index],
                              description: e.target.value,
                            };
                            setAnswers(newAnswers);
                          }}
                          required
                        />
                      </div>
                    ))}
                  </Form.Group>


                </Col>
              </Row>
              <Button type="button" onClick={() => setAnswers([...answers, ""])}>
                Add Answer
              </Button>{" "}
              <Button type="submit" variant="primary">
                Add Question
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

AddQuestionForm.propTypes = {
  onQuestionAdded: PropTypes.func.isRequired,
 };

export default AddQuestionForm;
