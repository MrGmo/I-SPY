import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import FaceAPI from "../api/FaceAPI";
import { useEffect, useState } from "react";

function EditFaceDetailPage(props) {
  const navigate = useNavigate();
  const [face, setFace] = useState(null);
  const params = useParams();

  const fetchFaceToBeEdited = async () => {
    const data = await FaceAPI.fetchFaceByID(params.faceID);
    setFace(data);
  };

  useEffect(() => {
    if (face === null) {
      fetchFaceToBeEdited();
    }
  }, [face]);

  const getNewObject = async event => {
    event.preventDefault();

    const objectData = {
      scan_type: event.target.elements[1].value,
      face_notes: event.target.elements[16].value,
      face_url: event.target.elements[2].value,
      face_name: event.target.elements[3].value,
      face_gender: event.target.elements[4].value,
      face_hair_color1: event.target.elements[6].value,
      face_age: event.target.elements[5].value,
      face_anger: event.target.elements[8].value,
      face_hair_color2: event.target.elements[7].value,
      face_contempt: event.target.elements[13].value,
      face_disgust: event.target.elements[9].value,
      face_fear: event.target.elements[11].value,
      face_happiness: event.target.elements[12].value,
      face_neutral: event.target.elements[10].value,
      face_sadness: event.target.elements[14].value,
      face_surprise: event.target.elements[15].value,
    };

    const data = await FaceAPI.editFace(objectData, params.faceID);

    if (data) {
      navigate("/home");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "5REM" }}
    >
      <div
        className="card container d-flex justify-content-center"
        style={{ width: "39.1REM" }}
      >
        <h2>Edit Face Details</h2>
        {face && (
          <Image src={face.face_url} width={600} height={360} mode="fit" />
        )}
        <div className="card-body" style={{ marginRight: "1.9REM" }}>
          <ul style={{ listStyleType: "none" }}>
            <Form
              onSubmit={event => getNewObject(event)}
              className="form-horizontal"
            >
              <li
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2REM",
                  display: "none",
                }}
              >
                <Form.Group>
                  <Form.Label>Face ID</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={face && face.id}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Scan Type</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={face && face.scan_type}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Face URL</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={face && face.face_url}
                  />
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Name:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.3REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left"
                        }}
                        placeholder="Name"
                        defaultValue={face && face.face_name}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Gender:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        plaintext
                        readOnly
                        defaultValue={face && face.face_gender}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Age:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        plaintext
                        readOnly
                        defaultValue={face && face.face_age}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Hair Color 1:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        plaintext
                        readOnly
                        defaultValue={face && face.face_hair_color1}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Hair Color 2:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        plaintext
                        readOnly
                        defaultValue={face && face.face_hair_color2}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <hr />
              <li style={{ fontWeight: "bold", fontSize: "1.2REM" }}>
                Emotional Profile:
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Anger:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_anger}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Contempt:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_contempt}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Disgust:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_disgust}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Fear:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_fear}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Happiness:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_happiness}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Neutral:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_neutral}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Sadness:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_sadness}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>
              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Surprise:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={face && face.face_surprise}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM" }}>
                <Form.Group>
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="object notes"
                    defaultValue={face && face.face_notes}
                  />
                </Form.Group>
              </li>
              <br />
              <Button variant="dark" type="submit">
                Submit Edit
              </Button>
            </Form>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditFaceDetailPage;
