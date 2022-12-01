import axios from "axios";
export const getResource = (setState, resourceName) => {
  const deployment = process.env["REACT_APP_DEPLOYMENT"];
  const baseUrl = deployment
    ? process.env["REACT_APP_BASE_URL"]
    : "http://127.0.0.1:8080";
  console.log(`POSTING DATA -> ${baseUrl}`);
  axios
    .post(`${baseUrl}/get_resource`, {
      resourceName: resourceName,
    })
    .then((res) => {
      setState(res.data);
      return res.data;
    })
    .catch((err) => {
      return {};
    });
};
