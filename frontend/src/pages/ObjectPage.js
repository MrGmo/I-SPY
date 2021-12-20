import { useState, useEffect, useRef } from "react";
import ObjectAPI from "../api/ObjectAPI.js";
import imageHolder from "../img/imageHolder.png";


function ObjectPage(props) {
  const { setObjects } = props;
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [name, setName] = useState("");
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
    setName(null);
    setConfidenceLevel(null);
  }, [image]);

  const fetchImageData = async () => {
    try {
      const fetchAzureData = await fetch(
        process.env.REACT_APP_AZURE_OBJECT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key":
              process.env.REACT_APP_AZURE_SUB_KEY_OBJECT,
          },
          body: JSON.stringify({ url: url }),
        }
      );
      const azureResponse = await fetchAzureData.json();
      const objectName = azureResponse.objects[0].object.toUpperCase();
      const confidence = azureResponse.objects[0].confidence.toFixed(2);
      setName(objectName);
      setConfidenceLevel(confidence);
      document.querySelector("#file-input").value = null;
    } catch (e) {
      console.log(e);
    }
  };

  const addObject = async () => {
    const init = {
      scan_type: 1,
      object_url: url,
      name: 'edit to add name',
      object_name: name,
      object_confidence_level: confidenceLevel,
      object_notes: "edit to add notes",
    };
    const data = await ObjectAPI.addObject(init);
    if (data) {
      setObjects(data);
      alert("Saved scan to database");
      window.location.reload();
    }
  };



  const checkHotdog = (name) => {
    return name.toLowerCase().replace(/\s+/g, '') === 'hotdog'
  }


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
          <h2>Object Detection</h2>
          <input
            type="file"
            id="file-input"
            onChange={e => setImage(e.target.files[0])}
          />
          {name === "" ? (
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
                { name && ( checkHotdog(name) ? `What is this? ${name}` : `What is this? NOT A HOTDOG, but a ${name}`) }
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {confidenceLevel && `Confidence Level: ${confidenceLevel}`}
              </li>
            </ul>

            {!name && (
              <button
                style={{ margin: "1REM" }}
                onClick={fetchImageData}
                className="btn btn-secondary"
              >
                Check Image
              </button>
            )}
            {name && (
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

export default ObjectPage;
