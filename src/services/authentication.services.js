import { apiUrlHeroku } from '../config/config.json';

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
    .fetch(`${apiUrlHeroku}/auth/${type}`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  auth,
};
