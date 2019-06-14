import { apiUrlHeroku } from '../config/config.json';

const interestRequest = (formData, userId) => {
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
    .fetch(`${apiUrlHeroku}/office/${userId}/register`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

const processRequest = (formData, candidateId) => {
  const fetchConfig = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify(formData),
  };

  return window
    .fetch(`${apiUrlHeroku}/candidates/${candidateId}/status`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  interestRequest,
  processRequest,
};
