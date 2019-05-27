import { apiUrlHeroku } from '../config/config.json';

const getCandidatesByOffice = officeId => {
  return window
    .fetch(`${apiUrlHeroku}/candidates/${officeId}`, {
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

const voteCandidate = formData => {
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
    .fetch(`${apiUrlHeroku}/votes`, fetchConfig)
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => err);
};
export default {
  getCandidatesByOffice,
  voteCandidate,
};
