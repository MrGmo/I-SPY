const BASE_URL = "http://localhost:8000/ispy/" + "object/"


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

const fetchObjects = async () => {
  const url = BASE_URL;
  return await tryCatchFetch(url);
};

const fetchObjectByID = async objectID => {
  const url = BASE_URL + `${objectID}/`;
  return await tryCatchFetch(url);
};


const addObject = async objectObj => {
  const url = BASE_URL;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectObj),
  };
  return await tryCatchFetch(url, init);
};


const deleteObject = async objectID => {
  const url = BASE_URL + `${objectID}/`;
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


const editObject = async (objectObj, objectID) => {
  const url = BASE_URL + `${objectID}/`;
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectObj),
  };
  return await tryCatchFetch(url, init);
};



const exportItems = {
  fetchObjects,
  fetchObjectByID,
  addObject,
  deleteObject,
  editObject
};

export default exportItems;
