import { useState, useEffect, useRef } from 'react'
import FaceAPI from "../api/FaceAPI.js";


function FaceRecognitionPage(props) {

  const { faces, setFaces } = props
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [genderState, setGenderState] = useState(null)
  const [ageState, setAgeState] = useState(null)
  const [hairColorOneState, setHairColorOneState] = useState(null)
  const [hairColorTwoState, setHairColorTwoState] = useState(null)
  const [angerState, setAngerState] = useState(null)
  const [contemptState, setContempState] = useState(null)
  const [disgustState, setDisgustState] = useState(null)
  const [fearState, setFearState] = useState(null)
  const [happinessState, setHappinessState] = useState(null)
  const [neutralState, setNeutralState] = useState(null)
  const [sadnessState, setSadnessState] = useState(null)
  const [surpriseState, setSurpriseState] = useState(null)



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
      console.log(response.url);
      setUrl(response.url);
    } catch (e) {
      console.log(e);
    }
  };

  const firstUpdate = useRef(true)

  useEffect(() => {
      if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
      }
      uploadImage()
      setGenderState(null)
      setAgeState(null)
      setHairColorOneState(null)
      setHairColorTwoState(null)
      setAngerState(null)
      setContempState(null)
      setDisgustState(null)
      setFearState(null)
      setHappinessState(null)
      setNeutralState(null)
      setSadnessState(null)
      setSurpriseState(null)
  }, [image])


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
      console.log(azureResponse[0])
      const gender = azureResponse[0].faceAttributes.gender.toUpperCase();
      const age = azureResponse[0].faceAttributes.age;
      const hairColorOne = azureResponse[0].faceAttributes.hair.hairColor[0].color.toUpperCase();
      const hairColorTwo = azureResponse[0].faceAttributes.hair.hairColor[1].color.toUpperCase();
      const anger = azureResponse[0].faceAttributes.emotion.anger.toFixed(2);
      const contempt = azureResponse[0].faceAttributes.emotion.contempt.toFixed(2);
      const disgust = azureResponse[0].faceAttributes.emotion.disgust.toFixed(2);
      const fear = azureResponse[0].faceAttributes.emotion.fear.toFixed(2);
      const happiness = azureResponse[0].faceAttributes.emotion.happiness.toFixed(2);
      const neutral = azureResponse[0].faceAttributes.emotion.neutral.toFixed(2);
      const sadness = azureResponse[0].faceAttributes.emotion.sadness.toFixed(2);
      const surprise = azureResponse[0].faceAttributes.emotion.surprise.toFixed(2);

      setGenderState(gender)
      setAgeState(age)
      setHairColorOneState(hairColorOne)
      setHairColorTwoState(hairColorTwo)
      setAngerState(anger)
      setContempState(contempt)
      setDisgustState(disgust)
      setFearState(fear)
      setHappinessState(happiness)
      setNeutralState(neutral)
      setSadnessState(sadness)
      setSurpriseState(surprise)
      
      document.querySelector("#file-input").value = null;
    } catch (e) {
      console.log(e);
    }
  };


  const emotionArray = [angerState, contemptState, disgustState, fearState, happinessState, neutralState, sadnessState, surpriseState]
  console.log(emotionArray)


  const addFace = async () => {
    const init = {
      scan_type: 2,
      face_url: url,
      face_name: 'edit to add name',
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
      face_notes: 'edit to add notes'
    }
    const data = await FaceAPI.addFace(init)
    console.log(data)
    if (data) {
      setFaces(data)
    }
  }


  return (
    <div>
      <h1>Face Recogniton Page</h1>
      <input type="file" id="file-input" onChange={e => setImage(e.target.files[0])} />
      <button type="button" onClick={fetchImageData}>
        Check Image
      </button>
      <h4>Uploaded Image</h4>
      <img src={url} alt="" width="400px"/>
      <h6>{ genderState && `Gender: ${ genderState }` }</h6>
      <h6>{ ageState && `Age: ${ ageState }`}</h6>
      <h6>{ hairColorOneState && `Hair Color: ${ hairColorOneState }, ${ hairColorTwoState }` }</h6>
      <ul style={{"listStyleType": "none"}}>{genderState && `Emotion Profile: `}
          <li>{ angerState && `Anger: ${ angerState }` }</li>
          <li>{ contemptState && `Contempt: ${ contemptState }` }</li>
          <li>{ disgustState && `Disgust: ${ disgustState }` }</li>
          <li>{ fearState && `Fear: ${ fearState }`} </li>
          <li>{ happinessState && `Happiness: ${ happinessState }`} </li>
          <li>{ neutralState && `Neutral: ${ neutralState }`} </li>
          <li>{ sadnessState && `Sadness: ${ sadnessState }`} </li>
          <li>{ surpriseState && `Surprise: ${ surpriseState }`} </li>
      </ul>
      { genderState && <button onClick={ addFace }>Save Scan</button>}
    </div>
  );
}

export default FaceRecognitionPage;