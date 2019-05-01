import { apiUrlHeroku } from '../config/config.json';

const getAllOffices = () => {
  return window
    .fetch(`${apiUrlHeroku}/offices`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'x-access-token': localStorage.token,
      },
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
};

const postOffice = formData => {
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
    .fetch(`${apiUrlHeroku}/offices`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  getAllOffices,
  postOffice,
};
