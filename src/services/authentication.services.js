const currApiEndpoint = 'https://radiant-retreat-64120.herokuapp.com/api/v1';

const auth = (type = 'login', formData) => {
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  return window
    .fetch(`${currApiEndpoint}/auth/${type}`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  auth,
};
