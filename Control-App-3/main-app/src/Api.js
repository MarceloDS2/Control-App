import axios from "axios";

export const fetchData = () => {
  const dataPromise = fetching();
  return {
    data: wrapPromise(dataPromise),
  };
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (res) => {
      status = "succes";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        console.log("status: pending");
        throw suspender;
      } else if (status === "error") {
        console.log("status: error");
        throw result;
      } else if (status === "succes") {
        console.log("status: succes");
        if (result == undefined) {
          result = {
            ilumination: "",
            moisture: "--",
            humidity: "--",
            temperature: "--",
            light: "--",
            pump: "",
          };
        }
        return result;
      }
    },
  };
};

const fetching = () => {
  console.log("fetching");
  return axios
    .get("http://192.168.1.130/api.php?task=select")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
