import { apiUrlHeroku } from '../config/config.json';

const getAllParties = () => {
  return window
    .fetch(`${apiUrlHeroku}/parties`, {
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

const postParty = formData => {
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
    .fetch(`${apiUrlHeroku}/parties`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

const deleteParty = partyId => {
  const fetchConfig = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
  };

  return window
    .fetch(`${apiUrlHeroku}/parties/${partyId}`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

const updateParty = (partyId, formData) => {
  const fetchConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify(formData),
  };

  return window
    .fetch(`${apiUrlHeroku}/parties/${partyId}/name`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};

export default {
  getAllParties,
  postParty,
  deleteParty,
  updateParty,
};
