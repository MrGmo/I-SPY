import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import AdultAPI from "../api/AdultAPI";
import { useEffect, useState } from "react";

function EditAdultDetailPage(props) {
  const navigate = useNavigate();
  const [adult, setAdult] = useState(null);
  const params = useParams();

  const fetchAdultToBeEdited = async () => {
    const data = await AdultAPI.fetchAdultByID(params.adultID);
    setAdult(data);
  };

  useEffect(() => {
    if (adult === null) {
      fetchAdultToBeEdited();
    }
  }, [adult]);

  const getNewObject = async event => {
    event.preventDefault();

    const objectData = {
      scan_type: event.target.elements[1].value,
      adult_url: event.target.elements[2].value,
      adult_name: event.target.elements[3].value,
      adult_adult_score: event.target.elements[4].value,
      adult_racy_score: event.target.elements[5].value,
      adult_gore_score: event.target.elements[6].value,
      adult_notes: event.target.elements[7].value,
    };

    const data = await AdultAPI.editAdult(objectData, params.adultID);
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
        <h2>Edit Adult Details</h2>
        {adult && (
          <Image src={adult.adult_url} width={600} height={360} mode="fit" />
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
                  <Form.Label>Adult ID</Form.Label>
                  <Form.Control
                    placeholder="object id"
                    plaintext
                    readOnly
                    defaultValue={adult && adult.id}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Scan Type</Form.Label>
                  <Form.Control
                    placeholder="scan type"
                    plaintext
                    readOnly
                    defaultValue={adult && adult.scan_type}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Adult URL</Form.Label>
                  <Form.Control
                    placeholder="adult url"
                    plaintext
                    readOnly
                    defaultValue={adult && adult.adult_url}
                  />
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
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
                          textAlign: "left",
                        }}
                        placeholder="Name"
                        defaultValue={adult && adult.adult_name}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right", marginLeft: "8REM" }}>
                      <Form.Label>Adult Score:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="adult score"
                        plaintext
                        readOnly
                        defaultValue={adult && adult.adult_adult_score}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right", marginLeft: "8REM" }}>
                      <Form.Label>Racy Score:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="adult score"
                        plaintext
                        readOnly
                        defaultValue={adult && adult.adult_racy_score}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right", marginLeft: "8REM" }}>
                      <Form.Label>Gore Score:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="adult score"
                        plaintext
                        readOnly
                        defaultValue={adult && adult.adult_gore_score}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Form.Label>Notes:</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="object notes"
                    defaultValue={adult && adult.adult_notes}
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

export default EditAdultDetailPage;
