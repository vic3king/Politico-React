import { apiUrlHeroku } from '../config/config.json';

const getResults = id => {
  return window
    .fetch(`${apiUrlHeroku}/office/${id}/result`, {
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

export default {
  getResults,
};
