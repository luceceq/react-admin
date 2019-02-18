import { toast } from 'react-toastify';
import { history } from "./store";
const axios = require('axios');

let baseURL = `${process.env.REACT_APP_BACKEND_URL}/release-manager/v1/`;
let AdminBaseURL = `${process.env.REACT_APP_BACKEND_URL}/cloud-entity/admin/v1/`;

export default function Request({ url, method, token, data, admin }) {
  if (parseInt((new Date()).getTime() / 1000, 10) > token.payload.exp) {
    toast.error("Your token has expired.");
    history.push('/logout');
    return Promise.reject("Your token has expired.");
  }

  let requestBaseUrl = admin ? AdminBaseURL : baseURL;

  return axios({
    baseURL: requestBaseUrl,
    url: `${url}`,
    method: method,
    data: data,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.jwtToken}`,
    },
  })
  .then(response => response)
  .catch(error => {
    if (error.request.status === 500 && error.request.status > 400) {
      toast.error("Something went wrong, try again!");
      return Promise.reject(false);
    } else {
      switch (error.request.status) {
        case 400:
          if (error.response && (error.response.data.errors || error.response.data.error)) {
            let errors = error.response.data.errors;

            if (error.response.data.error) {
              toast.warn(error.response.data.error);
            } else {
              for (let key in errors) {
                errors[key].map(i => toast.warn(`${key}: ${i}`));
              }
            }
          } else {
            toast.warn("You’re not able to select this item.");
          }
          break;

        case 401:
          toast.error("Your token has expired.");
          history.push('/logout');
          break;

        case 403:
          toast.error("Access Denied!");
          return Promise.reject(error);

        case 422:
          if (error.response && error.response.data.error) {
            toast.warn(error.response.data.error);
          } else {
            toast.warn("You’re not able to delete this item.");
          }
          break;

        default:
          toast.error(error.response.data.error.message || error.message);
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  });
}
