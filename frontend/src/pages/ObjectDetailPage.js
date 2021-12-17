import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ObjectAPI from "../api/ObjectAPI";

function ObjectDetailPage(props) {

  const [object, setObject] = useState(null)

  const params = useParams();
  const navigate = useNavigate();

  console.log(object)

  // effects
  useEffect(() => {
    const getObject = async () => {
      const data = await ObjectAPI.fetchObjectByID(params.objectID);
      if (data) {
        setObject(data);
      }
    };

    getObject();
  }, [params.objectID]);

  // render
  const renderObject = () => {
    if (!object) return null;
    console.log(object)
    return (
      <div>
         <ul style={{listStyleType: "none"}}>
          <li><img src={ object.object_url } alt="pic" /></li>
          <li>Object Name: { object.object_name }</li>
          <li>Confidence Level: { object.object_confidence_level }</li>
          <li>Notes: { object.object_notes }</li>
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
    // console.log (objectID)
    // const data = await ObjectAPI.editObject(objectID);
    navigate(`/object/${objectID}/edit`)
  };

  return (
    <div>
      <h2>Object Detail Page</h2>
      <button
        onClick={() => deleteObject(params.objectID)}
        className="btn btn-primary"
      >
        Delete Object
      </button>
      <button
        onClick={() => editObject(params.objectID)}
        className="btn btn-warning"
      >
        Edit Object
      </button>
      {renderObject()}
    </div>
  );
}

export default ObjectDetailPage;
