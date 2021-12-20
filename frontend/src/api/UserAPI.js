const BASE_URL = process.env.REACT_APP_USER_API_URL


const login = (userObject) => {
    return fetch(BASE_URL + 'token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };
  
  const getLoggedInUser = (token) => {
    return fetch(BASE_URL + 'ispy/current_user/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }).then(res => res)
  };
  
  const signupUser = (userObject) => {
    return fetch(BASE_URL + 'ispy/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };
  
  export { login, getLoggedInUser, signupUser }