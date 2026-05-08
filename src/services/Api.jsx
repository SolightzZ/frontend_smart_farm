const localhost = import.meta.env.VITE_ENV;

const _ip = localhost + "/api";
const ip = _ip;

export const GET = (path) => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.log("error:", error);
        reject(error);
      });
  });
};

export const POST = (path, obj) => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.log("error:", error);
        reject(error);
      });
  });
};

export const PUT = (path, obj) => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.log("error:", error);
        reject(error);
      });
  });
};

export const DELETE = (path) => {
  return new Promise((resolve, reject) => {
    fetch(ip + path, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.log("error:", error);
        reject(error);
      });
  });
};

export const LOGIN = "/auth/login";

export const USER = "/users";
export const GETDATAUSER = "/users/:id";
export const POSTDATAUSER = "/users/:id";
export const PUTDATAUSER = "/users/";

export const FARM = "/getfarm";
export const PUTFARM = "/getfarm/";

export const PROFILE = "/getprofile";
export const PUTPROFILE = "/getprofile/";

export const PRODUCT = "/getproduct";
export const DASHBOARD = "/getdashboards";
