import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TagAPI from "../api/TagAPI";
import { Image } from "react-bootstrap";

function TagDetailPage(props) {
  const [tag, setTag] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTag = async () => {
      const data = await TagAPI.fetchTagByID(params.tagID);
      if (data) {
        setTag(data);
      }
    };
    getTag();
  }, [params.tagID]);

  const renderObject = () => {
    if (!tag) return null;
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Name: {tag.tag_name}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Description: {tag.tag_description}</li>
          <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>Confidence Level: {tag.tag_confidence}</li>
          <li style={{ fontSize: "1.2REM", color: "black", fontWeight: "normal" }}>Notes: {tag.tag_notes}</li>
        </ul>
      </div>
    );
  };

  const deleteObject = async tagID => {
    const data = await TagAPI.deleteTag(tagID);
    if (data) {
      setTag(data);
      navigate("/home");
    }
  };

  const editTag = async tagID => {
    navigate(`/tag/${tagID}/edit`);
  };

  return (
    
    <div class="container d-flex justify-content-center" style={{ marginTop: "5REM" }}>
      <div class="card container d-flex justify-content-center" style={{ width: "39.1REM" }}>
      <h2>Tag Details</h2>
        {tag && (
          <Image src={tag.tag_url} width={600} height={360} mode="fit" />
        )}
        <div class="card-body">
          {renderObject()}
          <button
            style={{ margin: "1REM" }} onClick={() => editTag(params.tagID)}
            className="btn btn-dark"
          >
            Edit Image
          </button>
          <button
          style={{ margin: "1REM" }}
            onClick={() => deleteObject(params.tagID)}
            className="btn btn-danger"
          >
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagDetailPage;