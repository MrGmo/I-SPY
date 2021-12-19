import { useState, useEffect, useRef } from "react";
import AdultAPI from "../api/AdultAPI.js";
import imageHolder from "../img/imageHolder.png";


function AdultPage(props) {
  const { adults, setAdults } = props;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [adultScore, setAdultScore] = useState(null);
  const [racyScore, setRacyScore] = useState(null);
  const [goreScore, setGoreScore] = useState(null);


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

  const firstUpdate = useRef(true);

  useEffect(() => {

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    uploadImage()
    setAdultScore(null);
    setRacyScore(null);
    setGoreScore(null);
  }, [image]);

  const fetchImageData = async () => {
    try {
      const fetchAzureData = await fetch(
        process.env.REACT_APP_AZURE_ADULT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key":
              process.env.REACT_APP_AZURE_SUB_KEY_ADULT,
          },
          body: JSON.stringify({ url: url }),
        }
      );

      const azureResponse = await fetchAzureData.json();
      const adultAdultScore = azureResponse.adult.adultScore.toFixed(2)
      const adultRacyScore = azureResponse.adult.racyScore.toFixed(2);
      const adultGoreScore = azureResponse.adult.goreScore.toFixed(2);

      setAdultScore(adultAdultScore);
      setRacyScore(adultRacyScore);
      setGoreScore(adultGoreScore);

      document.querySelector("#file-input").value = null;
    } catch (e) {
      console.log(e);
    }
  };

  const addObject = async () => {
    const init = {
      scan_type: 1,
      adult_url: url,
      adult_name: 'edit to add name',
      adult_adult_score: adultScore,
      adult_racy_score: racyScore,
      adult_gore_score: goreScore,
      adult_notes: "edit to add notes",
    };
    const data = await AdultAPI.addAdult(init);
    console.log(data)
    if (data) {
      setAdults(data);
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
          <h2>Adult Content Detection</h2>
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
            <img src={url} width={600} height={360} mode="fit" />
          )}

          <div className="card-body">
            <ul style={{ listStyleType: "none" }}>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {adultScore && `Adult Score: ${adultScore}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {racyScore && `Racy Score: ${racyScore}`}
              </li>
              <li style={{ fontWeight: "bold", fontSize: "1.2REM", color: "black" }}>
                {racyScore && `Gore Score: ${racyScore}`}
              </li>
            </ul>

            {!adultScore && (
              <button
                style={{ margin: "1REM" }}
                onClick={fetchImageData}
                className="btn btn-secondary"
              >
                Check Image
              </button>
            )}
            {adultScore && (
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

export default AdultPage;
