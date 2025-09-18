import axios from "axios";

class WebService {
  postAPICall(url, data) {
    return axios.post(url, data);
  }

  getAPICall(url, token) {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  }

  postAPICallWithToken(url, data, token) {
    return axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteAPICall(url, token, data) {
    return axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
      data: data, // axios delete requires data to be passed like this
    });
  }

  putAPICallWithToken(url, token, data) {
    return axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new WebService();
