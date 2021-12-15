import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function FaceList (props) {

  const { faces } = props

  console.log(faces)

  const createLists = () => {
    if (!faces) return null;

    return faces.map((face,index) => {
      return (
        <ul style={{listStyleType: "none"}}>
          <li>Scan Type: { face.scan_type }</li>
          <li>Face Id: { face.id }</li>
          <li>Face URL: { face.face_url }</li>
          <li>Face Name: { face.face_name }</li>
          <li>Face Gender: { face.face_gender }</li>
          <li>Face Age: { face.face_age }</li>
          <li>Face Hair Color: { face.face_hair_color1 }, { face.face_hair_color2 }</li>
          <li>Face Anger: { face.face_anger }</li>
          <li>Face Contempt: { face.face_contempt }</li>
          <li>Face Disgust: { face.face_disgust }</li>
          <li>Face Fear: { face.face_fear }</li>
          <li>Face Happiness: { face.face_happiness }</li>
          <li>Face Neutral: { face.face_neutral }</li>
          <li>Face Sadness: { face.face_sadness }</li>
          <li>Face Surprise: { face.face_surprise }</li>
          <li>Face Notes: { face.face_notes }</li>
        </ul>

      )
    })
  }

  return (
    <div>
      { createLists() }
    </div>
  );
}

export default FaceList;
