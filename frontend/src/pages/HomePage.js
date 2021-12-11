import { useState, useEffect, useRef } from 'react'


function HomePage() {
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [name, setName] = useState('')
  const [confidenceLevel, setConfidenceLevel] = useState(null)

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
  }, [image])



  const fetchImageData = async () => {
    try {
      const fetchAzureData = await fetch(process.env.REACT_APP_AZURE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AZURE_SUB_KEY,
        },
        body: JSON.stringify({ url: url }),
      });
      const azureResponse = await fetchAzureData.json();
      const objectName = azureResponse.objects[0].object.toUpperCase();
      const confidence = azureResponse.objects[0].confidence.toFixed(2);

      setName(objectName);
      setConfidenceLevel(confidence);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>
      <h1>Home Page</h1>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="button" onClick={fetchImageData}>
        Check Image
      </button>
      <h4>Uploaded Image</h4>
      <img src={url} alt=""/>
      <h6>{ name && `What is this? ${ name }`}</h6>
      <h6>{confidenceLevel && `Confidence Level: ${ confidenceLevel }`}</h6>
    </div>
  );
}

export default HomePage;