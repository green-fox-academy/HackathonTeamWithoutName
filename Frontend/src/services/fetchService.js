export const fetchService = {
  async fetchData(path, method, body, accessToken) {
    let fetchAttributes = {
      method,
      headers: { 
        'Content-Type': 'application/json',
      },
    };
    if (accessToken) {
      fetchAttributes.headers.Authorization = `Bearer ${accessToken}`;
    };
    if (body) {
      fetchAttributes.body = JSON.stringify(body);
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, fetchAttributes);
    const responseBody = await response.json();
    if (response.status !== 200) {
      throw Error(responseBody.error);
    }
    return responseBody;
  },
};
