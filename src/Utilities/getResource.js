import axios from "axios";
export const getResource = (setState, resourceName) => {
    const port = process.env.PORT || 8080;
    axios
      .post(`http://127.0.0.1:${port}/get_resource`, {
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