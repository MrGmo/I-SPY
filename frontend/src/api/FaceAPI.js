const BASE_URL = process.env.REACT_APP_FACE_API_URL

const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Bad response: ${response.status} ${response.statusText}`
      );
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchFaces = async () => {
  const url = BASE_URL;
  return await tryCatchFetch(url);
};

const fetchFaceByID = async faceID => {
  const url = BASE_URL + `${faceID}/`;
  return await tryCatchFetch(url);
};


const addFace = async faceObj => {
  const url = BASE_URL;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faceObj),
  };
  return await tryCatchFetch(url, init);
};


const deleteFace = async faceID => {
  const url = BASE_URL + `${faceID}/`;
  const init = {
    method: "DELETE",
  };

  try {
    const response = await fetch(url, init);
    if (response.ok) {
      return await response
    } else {
      throw new Error(
        `Bad response: ${response.status} ${response.statusText}`
      );
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};


const editFace = async (faceObj, faceID) => {
  const url = BASE_URL + `${faceID}/`;
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faceObj),
  };
  return await tryCatchFetch(url, init);
};



const exportItems = {
  fetchFaces,
  fetchFaceByID,
  addFace,
  deleteFace,
  editFace
};

export default exportItems;