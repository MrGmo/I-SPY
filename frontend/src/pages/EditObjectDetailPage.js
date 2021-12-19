import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import ObjectAPI from "../api/ObjectAPI";
import { useEffect, useState } from "react";

function EditObjectDetailPage(props) {
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const params = useParams();

  const fetchObjectToBeEdited = async () => {
    const data = await ObjectAPI.fetchObjectByID(params.objectID);
    setObject(data);
  };

  useEffect(() => {
    if (object === null) {
      fetchObjectToBeEdited();
    }
  }, [object]);

  const getNewObject = async event => {
    event.preventDefault();

    const objectData = {
      scan_type: event.target.elements[1].value,
      object_url: event.target.elements[2].value,
      object_name: event.target.elements[4].value,
      object_confidence_level: event.target.elements[5].value,
      name: event.target.elements[3].value,
      object_notes: event.target.elements[6].value,
    };


    const data = await ObjectAPI.editObject(objectData, params.objectID);
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
        <h2>Edit Object Details</h2>
        {object && (
          <Image src={object.object_url} width={600} height={360} mode="fit" />
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
                  <Form.Label>Object ID</Form.Label>
                  <Form.Control
                    placeholder="object id"
                    plaintext
                    readOnly
                    defaultValue={object && object.id}
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
                    defaultValue={object && object.scan_type}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Object URL</Form.Label>
                  <Form.Control
                    placeholder="object url"
                    plaintext
                    readOnly
                    defaultValue={object && object.object_url}
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
                        placeholder="name"
                        defaultValue={object && object.name}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Object:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.3REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="object"
                        plaintext
                        readOnly
                        defaultValue={object && object.object_name}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>

              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right", marginLeft: "8REM" }}>
                      <Form.Label>Confidence Level:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="confidence level"
                        plaintext
                        readOnly
                        defaultValue={object && object.object_confidence_level}
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
                    defaultValue={object && object.object_notes}
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

export default EditObjectDetailPage;
