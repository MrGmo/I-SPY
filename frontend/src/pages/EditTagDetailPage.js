import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import TagAPI from "../api/TagAPI";
import { useEffect, useState } from "react";

function EditTagDetailPage(props) {
  const navigate = useNavigate();
  const [tag, setTag] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchTagToBeEdited = async () => {
      const data = await TagAPI.fetchTagByID(params.tagID);
      setTag(data);
    };

    if (tag === null) {
      fetchTagToBeEdited();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  const getNewObject = async event => {
    event.preventDefault();

    const objectData = {
      scan_type: event.target.elements[1].value,
      tag_url: event.target.elements[2].value,
      tag_name: event.target.elements[3].value,
      tag_description: event.target.elements[4].value,
      tag_confidence: event.target.elements[5].value,
      tag_notes: event.target.elements[6].value,
    };

    const data = await TagAPI.editTag(objectData, params.tagID);
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
        <h2>Edit Tag Details</h2>
        {tag && <Image src={tag.tag_url} width={600} height={360} mode="fit" />}
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
                  <Form.Label>Tag ID</Form.Label>
                  <Form.Control
                    placeholder="tag id"
                    plaintext
                    readOnly
                    defaultValue={tag && tag.id}
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
                    defaultValue={tag && tag.scan_type}
                  />
                </Form.Group>
              </li>
              <li style={{ display: "none" }}>
                <Form.Group>
                  <Form.Label>Tag URL</Form.Label>
                  <Form.Control
                    placeholder="tag url"
                    plaintext
                    readOnly
                    defaultValue={tag && tag.tag_url}
                  />
                </Form.Group>
              </li>
              <li
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2REM",
                  color: "black",
                }}
              >
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Name:</Form.Label>
                    </Col>
                    <Col
                      style={{
                        padding: "0REM",
                        margin: "-0.3REM",
                        marginBottom: "1REM",
                      }}
                    >
                      <Form.Control
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2REM",
                          textAlign: "left",
                        }}
                        placeholder="Name"
                        defaultValue={tag && tag.tag_name}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </li>
              <li
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2REM",
                  color: "black",
                }}
              >
                <Form.Group>
                  <Row>
                    <Col style={{ textAlign: "right" }}>
                      <Form.Label>Description:</Form.Label>
                    </Col>
                    <Col style={{ padding: "0REM", margin: "-0.4REM" }}>
                      <textarea
                        cols="30"
                        rows="3"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1REM",
                          textAlign: "left",
                        }}
                        plaintext
                        readOnly
                        defaultValue={tag && tag.tag_description}
                      >
                        <Form.Control
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.2REM",
                            textAlign: "left",
                          }}
                        />
                      </textarea>
                    </Col>
                  </Row>
                </Form.Group>
              </li>
              <li
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2REM",
                  color: "black",
                }}
              >
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
                        placeholder="adult score"
                        plaintext
                        readOnly
                        defaultValue={tag && tag.tag_confidence}
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
                    defaultValue={tag && tag.tag_notes}
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

export default EditTagDetailPage;
