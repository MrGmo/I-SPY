import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FaceAPI from "../api/FaceAPI";

function FaceDetailPage(props) {
  const [face, setFace] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  console.log(face);

  // effects
  useEffect(() => {
    const getFace = async () => {
      const data = await FaceAPI.fetchFaceByID(params.faceID);
      if (data) {
        setFace(data);
      }
    };

    getFace();
  }, [params.faceID]);

  // render
  const renderFace = () => {
    if (!face) return null;
    console.log(face);
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          <li>Scan Type: {face.scan_type}</li>
          <li>Face Id: {face.id}</li>
          <li>
            Object URL: <img src={face.face_url} alt="pic" />
            {face.face_url}
          </li>
          <li>Face Name: {face.face_name}</li>
          <li>Face Gender: {face.face_gender}</li>
          <li>Face Age: {face.face_age}</li>
          <li>
            Face Hair Color: {face.face_hair_color1}, {face.face_hair_color2}
          </li>
          <li>Face Anger: {face.face_anger}</li>
          <li>Face Contempt: {face.face_contempt}</li>
          <li>Face Disgust: {face.face_disgust}</li>
          <li>Face Fear: {face.face_fear}</li>
          <li>Face Happiness: {face.face_happiness}</li>
          <li>Face Neutral: {face.face_neutral}</li>
          <li>Face Sadness: {face.face_sadness}</li>
          <li>Face Surprise: {face.face_surprise}</li>
          <li>Face Notes: {face.face_notes}</li>
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
    // console.log (faceID)
    // const data = await faceAPI.editFace(faceID);
    navigate(`/${faceID}/edit`);
  };

  return (
    <div>
      <h2>Face Detail Page</h2>
      <button
        onClick={() => deleteFace(params.faceID)}
        className="btn btn-primary"
      >
        Delete Face
      </button>
      <button
        onClick={() => editFace(params.faceID)}
        className="btn btn-warning"
      >
        Edit Face
      </button>
      {renderFace()}
    </div>
  );
}

export default FaceDetailPage;
