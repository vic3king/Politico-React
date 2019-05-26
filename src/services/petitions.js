import { apiUrlHeroku } from '../config/config.json';

const postPetition = formData => {
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify(formData),
  };

  return window
    .fetch(`${apiUrlHeroku}/petitions`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  postPetition,
};
