import { useNavigate,useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FaceAPI from "../api/FaceAPI";
import { useEffect, useState } from 'react'

function EditFaceDetailPage(props) {

  const navigate = useNavigate();
  const [face, setFace] = useState(null);
  const params = useParams()


  const fetchFaceToBeEdited = async () => {
    const data = await FaceAPI.fetchFaceByID(params.faceID);
    setFace(data)
  }

  useEffect(() => {
      if (face === null) {
        fetchFaceToBeEdited()
      }
  }, [face])


  const getNewObject = async (event) => {
    event.preventDefault()
    
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
    }

    const data = await FaceAPI.editFace(objectData, params.faceID)

    if (data) {
      navigate('/home')
    }
  }

  return (


    <div className="container">
      <h2>Edit Face Detection Page</h2>
      {  face && <img src={ face.face_url } alt="pic" />}
      <div className="row justify-content-center">
        <Form onSubmit={(event) => getNewObject(event)} className="form-group col-md-6">
          <Form.Group>
            <Form.Label>Face ID</Form.Label>
            <Form.Control placeholder="object id" plaintext readOnly defaultValue={face && face.id}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Scan Type</Form.Label>
            <Form.Control placeholder="scan type" plaintext readOnly defaultValue={face && face.scan_type}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face URL</Form.Label>
            <Form.Control placeholder="face url" plaintext readOnly defaultValue={face && face.face_url}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Name</Form.Label>
            <Form.Control placeholder="face name" defaultValue={face && face.face_name}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Gender</Form.Label>
            <Form.Control placeholder="face gender" plaintext readOnly defaultValue={face && face.face_gender}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Age</Form.Label>
            <Form.Control placeholder="face age" plaintext readOnly defaultValue={face && face.face_age}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Hair Color</Form.Label>
            <Form.Control placeholder="face hair color 1" defaultValue={face && face.face_hair_color1}/>
            <Form.Control placeholder="face hair color 2" defaultValue={face && face.face_hair_color2}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Anger</Form.Label>
            <Form.Control placeholder="face anger" plaintext readOnly defaultValue={face && face.face_anger}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Contempt</Form.Label>
            <Form.Control placeholder="face contempt" plaintext readOnly defaultValue={face && face.face_contempt}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Disgust</Form.Label>
            <Form.Control placeholder="face disgust" plaintext readOnly defaultValue={face && face.face_disgust}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Fear</Form.Label>
            <Form.Control placeholder="face fear" plaintext readOnly defaultValue={face && face.face_fear}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Happiness</Form.Label>
            <Form.Control placeholder="face happiness" plaintext readOnly defaultValue={face && face.face_happiness}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Neutral</Form.Label>
            <Form.Control placeholder="face neutral" plaintext readOnly defaultValue={face && face.face_neutral}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Sadness</Form.Label>
            <Form.Control placeholder="face sadness" plaintext readOnly defaultValue={face && face.face_sadness}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Surprise</Form.Label>
            <Form.Control placeholder="face anger" plaintext readOnly defaultValue={face && face.face_surprise}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Face Notes</Form.Label>
            <Form.Control placeholder="face notes" defaultValue={face && face.face_notes}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Edit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditFaceDetailPage;
