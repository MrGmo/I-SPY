const BASE_URL = "http://localhost:8000/ispy/" + "adult/"


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

const fetchAdults = async () => {
  const url = BASE_URL;
  return await tryCatchFetch(url);
};

const fetchAdultByID = async adultID => {
  const url = BASE_URL + `${adultID}/`;
  return await tryCatchFetch(url);
};


const addAdult = async adultObj => {
  const url = BASE_URL;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adultObj),
  };
  return await tryCatchFetch(url, init);
};


const deleteAdult = async adultID => {
  const url = BASE_URL + `${adultID}/`;
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


const editAdult = async (adultObj, adultID) => {
  const url = BASE_URL + `${adultID}/`;
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adultObj),
  };
  return await tryCatchFetch(url, init);
};



const exportItems = {
  fetchAdults,
  fetchAdultByID,
  addAdult,
  deleteAdult,
  editAdult
};

export default exportItems;