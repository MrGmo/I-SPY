import { useNavigate,useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ObjectAPI from "../api/ObjectAPI";
import { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image'

function EditObjectDetailPage(props) {

  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const params = useParams()


  const fetchObjectToBeEdited = async () => {
    const data = await ObjectAPI.fetchObjectByID(params.objectID);
    setObject(data)
  }

  useEffect(() => {
      if (object === null) {
        fetchObjectToBeEdited()
      }
  }, [object])


  const getNewObject = async (event) => {
    event.preventDefault()

    const objectData = {
      scan_type: event.target.elements[1].value,
      object_notes: event.target.elements[5].value,
      object_url: event.target.elements[2].value,
      object_name: event.target.elements[3].value,
      object_confidence_level: event.target.elements[4].value
    }

    const data = await ObjectAPI.editObject(objectData, params.objectID)
    if (data) {
      navigate('/home')
    }
  }

  console.log(object)
  return (

    <div className="container">
      <h2>Edit Object Page</h2>
      <div className="row justify-content-center">
        <Form onSubmit={(event) => getNewObject(event)} className="form-group col-md-6">
          <Form.Group>
            <Form.Label>Object ID</Form.Label>
            <Form.Control placeholder="object id" plaintext readOnly defaultValue={object && object.id}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Scan Type</Form.Label>
            <Form.Control placeholder="scan type" plaintext readOnly defaultValue={object && object.scan_type}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Object URL</Form.Label>
            <Form.Control placeholder="object url" defaultValue={object && object.object_url}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Object Name</Form.Label>
            <Form.Control placeholder="object url" defaultValue={object && object.object_name}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Confidence Level</Form.Label>
            <Form.Control placeholder="confidence level" plaintext readOnly defaultValue={object && object.object_confidence_level}/>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Object Noes</Form.Label>
            <Form.Control placeholder="object notes" defaultValue={object && object.object_notes}/>
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit Edit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditObjectDetailPage;
