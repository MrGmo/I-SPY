import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FaceAPI from "../api/FaceAPI";
import { Image } from 'react-bootstrap'

function FaceDetailPage(props) {
  const [face, setFace] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    const getFace = async () => {
      const data = await FaceAPI.fetchFaceByID(params.faceID);
      if (data) {
        setFace(data);
      }
    };

    getFace();
  }, [params.faceID]);

  
  const renderFace = () => {
    if (!face) return null;
    return (
      <div>
        <ul style={{ listStyleType: "none"  }}>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Name: {face.face_name}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Gender: {face.face_gender}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Age: {face.face_age}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
            Hair Color: {face.face_hair_color1}, {face.face_hair_color2}
          </li>
          <hr/>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Emotional Profile:</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Anger: {face.face_anger}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Contempt: {face.face_contempt}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Disgust: {face.face_disgust}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Fear: {face.face_fear}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Happiness: {face.face_happiness}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Neutral: {face.face_neutral}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Sadness: {face.face_sadness}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Surprise: {face.face_surprise}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Notes: {face.face_notes}</li>
        </ul>
      </div>
    );
  };

  const deleteFace = async faceID => {
    const data = await FaceAPI.deleteFace(faceID);
    if (data) {
      setFace(data);
      navigate("/home");
    }
  };

  const editFace = faceID => {
    navigate(`/face-detection/${faceID}/edit`);
  };

  return (

    <div className="container d-flex justify-content-center" style={{ marginTop: "5REM" }}>
    <div className="card container d-flex justify-content-center" style={{ width: "39.1REM" }}>
    <h2>Face Detection Details</h2>
      {face && (
        <Image src={face.face_url} width={600} height={360} mode="fit" />
      )}
      <div className="card-body">
        {renderFace()}
        <button
          style={{ margin: "1REM" }} onClick={() => editFace(params.faceID)}
          className="btn btn-dark"
        >
          Edit Image
        </button>
        <button
        style={{ margin: "1REM" }}
          onClick={() => deleteFace(params.faceID)}
          className="btn btn-danger"
        >
          Delete Image
        </button>
      </div>
    </div>
  </div>
  );
}

export default FaceDetailPage;
