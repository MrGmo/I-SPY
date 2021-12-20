const BASE_URL = "http://localhost:8000/ispy/" + "tag/"


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

const fetchTags = async () => {
  const url = BASE_URL;
  return await tryCatchFetch(url);
};

const fetchTagByID = async tagID => {
  const url = BASE_URL + `${tagID}/`;
  return await tryCatchFetch(url);
};


const addTag = async tagObj => {
  const url = BASE_URL;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagObj),
  };
  return await tryCatchFetch(url, init);
};


const deleteTag = async tagID => {
  const url = BASE_URL + `${tagID}/`;
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


const editTag = async (tagObj, tagID) => {
  const url = BASE_URL + `${tagID}/`;
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagObj),
  };
  return await tryCatchFetch(url, init);
};



const exportItems = {
  fetchTags,
  fetchTagByID,
  addTag,
  deleteTag,
  editTag
};

export default exportItems;