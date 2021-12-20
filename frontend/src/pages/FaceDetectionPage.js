import { useState, useEffect, useRef } from "react";
import FaceAPI from "../api/FaceAPI.js";
import imageHolder from "../img/imageHolder.png";


function FaceDetectionPage(props) {
  const { setFaces } = props;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [genderState, setGenderState] = useState(null);
  const [ageState, setAgeState] = useState(null);
  const [hairColorOneState, setHairColorOneState] = useState(null);
  const [hairColorTwoState, setHairColorTwoState] = useState(null);
  const [angerState, setAngerState] = useState(null);
  const [contemptState, setContempState] = useState(null);
  const [disgustState, setDisgustState] = useState(null);
  const [fearState, setFearState] = useState(null);
  const [happinessState, setHappinessState] = useState(null);
  const [neutralState, setNeutralState] = useState(null);
  const [sadnessState, setSadnessState] = useState(null);
  const [surpriseState, setSurpriseState] = useState(null);

  
  const firstUpdate = useRef(true);
  
  useEffect(() => {
    
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

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    uploadImage();
    setGenderState(null);
    setAgeState(null);
    setHairColorOneState(null);
    setHairColorTwoState(null);
    setAngerState(null);
    setContempState(null);
    setDisgustState(null);
    setFearState(null);
    setHappinessState(null);
    setNeutralState(null);
    setSadnessState(null);
    setSurpriseState(null);
  }, [image]);

  const fetchImageData = async () => {
    try {
      const fetchAzureData = await fetch(
        process.env.REACT_APP_AZURE_FACE_RECOGNITION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key":
              process.env.REACT_APP_AZURE_SUB_KEY_FACE,
          },
          body: JSON.stringify({ url: url }),
        }
      );
      const azureResponse = await fetchAzureData.json();
      const gender = azureResponse[0].faceAttributes.gender.toUpperCase();
      const age = azureResponse[0].faceAttributes.age;
      const hairColorOne =
        azureResponse[0].faceAttributes.hair.hairColor[0].color.toUpperCase();
      const hairColorTwo =
        azureResponse[0].faceAttributes.hair.hairColor[1].color.toUpperCase();
      const anger = azureResponse[0].faceAttributes.emotion.anger.toFixed(2);
      const contempt =
        azureResponse[0].faceAttributes.emotion.contempt.toFixed(2);
      const disgust =
        azureResponse[0].faceAttributes.emotion.disgust.toFixed(2);
      const fear = azureResponse[0].faceAttributes.emotion.fear.toFixed(2);
      const happiness =
        azureResponse[0].faceAttributes.emotion.happiness.toFixed(2);
      const neutral =
        azureResponse[0].faceAttributes.emotion.neutral.toFixed(2);
      const sadness =
        azureResponse[0].faceAttributes.emotion.sadness.toFixed(2);
      const surprise =
        azureResponse[0].faceAttributes.emotion.surprise.toFixed(2);

      setGenderState(gender);
      setAgeState(age);
      setHairColorOneState(hairColorOne);
      setHairColorTwoState(hairColorTwo);
      setAngerState(anger);
      setContempState(contempt);
      setDisgustState(disgust);
      setFearState(fear);
      setHappinessState(happiness);
      setNeutralState(neutral);
      setSadnessState(sadness);
      setSurpriseState(surprise);
      document.querySelector("#file-input").value = null;
    } catch (e) {
      alert('Please upload a picture of a human face. :)')
      console.log(e);
    }
  };


  const addFace = async () => {
    const init = {
      scan_type: 1,
      face_url: url,
      face_name: "edit to add name",
      face_gender: genderState,
      face_age: ageState,
      face_hair_color1: hairColorOneState,
      face_hair_color2: hairColorTwoState,
      face_anger: angerState,
      face_contempt: contemptState,
      face_disgust: disgustState,
      face_fear: fearState,
      face_happiness: happinessState,
      face_neutral: neutralState,
      face_sadness: sadnessState,
      face_surprise: surpriseState,
      face_notes: "edit to add notes",
    };
    const data = await FaceAPI.addFace(init);
    if (data) {
      setFaces(data);
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
          <h2>Face Detection</h2>
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
                {genderState && `Gender: ${genderState}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {ageState && `Age: ${ageState}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {hairColorOneState && `Hair Color 1: ${hairColorOneState}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {hairColorTwoState && `Hair Color 2: ${hairColorTwoState}`}
              </li>
              <hr />
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}> {angerState && 'Emotional Profile'} </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {angerState && `Anger: ${angerState}`}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {contemptState && `Contempt: ${contemptState}`}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {disgustState && `Disgust: ${disgustState}`}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {fearState && `Fear: ${fearState}`}{" "}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {happinessState && `Happiness: ${happinessState}`}{" "}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {neutralState && `Neutral: ${neutralState}`}{" "}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {sadnessState && `Sadness: ${sadnessState}`}{" "}
              </li>
              <li style={{ fontSize: "1.2REM", color: "black" }}>
                {surpriseState && `Surprise: ${surpriseState}`}{" "}
              </li>
            </ul>

            {!genderState && (
              <button
                style={{ margin: "1REM" }}
                onClick={fetchImageData}
                className="btn btn-secondary"
              >
                Check Image
              </button>
            )}
            {genderState && (
              <button
                style={{ margin: "1REM" }}
                onClick={addFace}
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

export default FaceDetectionPage;
