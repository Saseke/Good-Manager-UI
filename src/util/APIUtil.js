import {API_BASE_URL} from '../constants';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};

/*

export function getAllItems(page, rows) {
  page = page || 1;
  rows = rows || 10;
  return request({
    url: API_BASE_URL,
    method: 'POST',
    body: JSON.stringify({query: `{allItem(page:${page},rows:${rows})}`})
  });
}*/
export function getAllItems() {
  return request({
    url: API_BASE_URL,
    method: 'POST',
    body: JSON.stringify({query: '{allItem{id,num,limitNum,price,title}}'})
  });
}