import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdultAPI from "../api/AdultAPI";
import { Image } from "react-bootstrap";

function AdultDetailPage(props) {
  const [adult, setAdult] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAdult = async () => {
      const data = await AdultAPI.fetchAdultByID(params.adultID);
      if (data) {
        setAdult(data);
      }
    };

    getAdult();
  }, [params.adultID]);

  const renderObject = () => {
    if (!adult) return null;
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Name: {adult.adult_name}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Adult Score: {adult.adult_adult_score}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Racy Score: {adult.adult_racy_score}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Gore Score: {adult.adult_gore_score}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Notes: {adult.adult_notes}</li>
        </ul>
      </div>
    );
  };

  const deleteAdult = async adultID => {
    const data = await AdultAPI.deleteAdult(adultID);
    if (data) {
      setAdult(data);
      navigate("/home");
    }
  };

  const editAdult = async adultID => {
    navigate(`/adult/${adultID}/edit`);
  };

  return (
    
    <div className="container d-flex justify-content-center" style={{ marginTop: "5REM" }}>
      <div className="card container d-flex justify-content-center" style={{ width: "39.1REM" }}>
      <h2>Adult Content Details</h2>
        {adult && (
          <Image src={adult.adult_url} width={600} height={360} mode="fit" />
        )}
        <div className="card-body">
          {renderObject()}
          <button
            style={{ margin: "1REM" }} onClick={() => editAdult(params.adultID)}
            className="btn btn-dark"
          >
            Edit Image
          </button>
          <button
          style={{ margin: "1REM" }}
            onClick={() => deleteAdult(params.adultID)}
            className="btn btn-danger"
          >
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdultDetailPage;
