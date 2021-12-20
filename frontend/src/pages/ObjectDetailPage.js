import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ObjectAPI from "../api/ObjectAPI";
import { Image } from "react-bootstrap";

function ObjectDetailPage(props) {
  const [object, setObject] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getObject = async () => {
      const data = await ObjectAPI.fetchObjectByID(params.objectID);
      if (data) {
        setObject(data);
      }
    };

    getObject();
  }, [params.objectID]);

  const renderObject = () => {
    if (!object) return null;
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Name: {object.name}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Object: {object.object_name}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Confidence Level: {object.object_confidence_level}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Notes: {object.object_notes}</li>
        </ul>
      </div>
    );
  };

  const deleteObject = async objectID => {
    const data = await ObjectAPI.deleteObject(objectID);
    if (data) {
      setObject(data);
      navigate("/home");
    }
  };

  const editObject = async objectID => {
    navigate(`/object/${objectID}/edit`);
  };

  return (
    
    <div className="container d-flex justify-content-center" style={{ marginTop: "5REM" }}>
      <div className="card container d-flex justify-content-center" style={{ width: "39.1REM" }}>
      <h2>Object Details</h2>
        {object && (
          <Image src={object.object_url} width={600} height={360} mode="fit" />
        )}
        <div className="card-body">
          {renderObject()}
          <button
            style={{ margin: "1REM" }} onClick={() => editObject(params.objectID)}
            className="btn btn-dark"
          >
            Edit Image
          </button>
          <button
          style={{ margin: "1REM" }}
            onClick={() => deleteObject(params.objectID)}
            className="btn btn-danger"
          >
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ObjectDetailPage;
