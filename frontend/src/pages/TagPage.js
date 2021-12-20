import { useState, useEffect, useRef } from "react";
import TagAPI from "../api/TagAPI.js";
import imageHolder from "../img/imageHolder.png";


function TagPage(props) {
  const { setTags } = props;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [description, setDescription] = useState(null)
  const [confidenceLevel, setConfidenceLevel] = useState(null);


  
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    const uploadImage = async () => {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "my_images");
        data.append("cloud_name", "gmo1");
  
        const fetchData = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
          method: "POST",
          body: data,
        });
        const response = await fetchData.json();
        setUrl(response.url);
      } catch (e) {
        console.log(e);
      }
    };

    uploadImage();
    setDescription(null);
    setConfidenceLevel(null);
  }, [image]);


  const fetchImageData = async () => {
    try {
      const fetchAzureData = await fetch(
        process.env.REACT_APP_AZURE_TAG_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key":
              process.env.REACT_APP_AZURE_SUB_KEY_TAG,
          },
          body: JSON.stringify({ url: url }),
        }
      );
      const azureResponse = await fetchAzureData.json();
      const textDescription = azureResponse.description.captions[0].text.toUpperCase() + '.'
      const imageConfidence = azureResponse.description.captions[0].confidence.toFixed(2)
      setDescription(textDescription);
      setConfidenceLevel(imageConfidence);
      document.querySelector("#file-input").value = null;
    } catch (e) {
      console.log(e);
    }
  };

  const addObject = async () => {
    const init = {
      scan_type: 1,
      tag_url: url,
      tag_name: 'edit to add name',
      tag_description: description,
      tag_confidence: confidenceLevel,
      tag_notes: "edit to add notes",
    };
    const data = await TagAPI.addTag(init);
    if (data) {
      setTags(data);
      alert("Saved scan to database");
      window.location.reload();
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "5REM" }}
      >
        <div
          className="card container d-flex justify-content-center"
          style={{ width: "39.1REM" }}
        >
          <h2>Tag Detection</h2>
          <input
            type="file"
            id="file-input"
            onChange={e => setImage(e.target.files[0])}
          />
          {image === null ? (
            <img
              src={imageHolder}
              alt="Loading..."
              width={600}
              height={360}
              mode="fit"
            />
          ) : (
            <img src={url} width={600} height={360} mode="fit" alt="upload"/>
          )}

          <div className="card-body">
            <ul style={{ listStyleType: "none" }}>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                { description && `Description: ${description}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {confidenceLevel && `Confidence Level: ${confidenceLevel}`}
              </li>
            </ul>

            {!description && (
              <button
                style={{ margin: "1REM" }}
                onClick={fetchImageData}
                className="btn btn-secondary"
              >
                Check Image
              </button>
            )}
            {description && (
              <button
                style={{ margin: "1REM" }}
                onClick={addObject}
                className="btn btn-dark"
              >
                Save Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TagPage;
