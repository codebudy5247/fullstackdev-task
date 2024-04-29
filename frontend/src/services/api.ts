import * as axios from "axios";

const apiURL = "http://localhost:1337/api";

interface ResponseData {
  data: any;
  status: any;
}
function normalizeServerResponse(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}
function normalizeServerError(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.response.data.message,
    status: serverResponse.status,
  };

  return response;
}

export async function register(
  name: string,
  contact: string,
  password: string,
  specialty: string
) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/auth/register`,
      data: {
        name: name,
        contact: contact,
        password: password,
        specialty: specialty,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function login(contact: string, password: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/auth/login`,
      data: {
        contact: contact,
        password: password,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function getProfile() {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/auth/me`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function updateProfile(
  id: string,
  name?: string,
  specialty?: string
) {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "put",
      url: `${apiURL}/doctor/update/${id}`,
      headers: { Authorization: "Bearer " + token },
      data: {
        name: name,
        specialty: specialty,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function getPateints() {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/doctor/pateints`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function addPateint(
  name: string,
  age: number,
  gender: string,
  bloodtype: string,
  address: string,
  phone: string,
  medicalHistory: string
) {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/doctor/create-pateint`,
      headers: { Authorization: "Bearer " + token },
      data: {
        name: name,
        age: age,
        gender: gender,
        bloodtype: bloodtype,
        address: address,
        phone: phone,
        medicalHistory: medicalHistory,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function getPateint(id: string) {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/doctor/pateint/${id}`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function updatePateint(
  id: string,
  name?: string,
  age?: number,
  gender?: string,
  bloodtype?: string,
  address?: string,
  phone?: string,
  medicalHistory?: string
) {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "put",
      url: `${apiURL}/doctor/pateint/${id}`,
      headers: { Authorization: "Bearer " + token },
      data:{
        name:name,
        age:age,
        gender:gender,
        bloodtype:bloodtype,
        address:address,
        phone:phone,
        medicalHistory:medicalHistory
      }
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function deletePateint(id: string) {
  try {
    let token: any = localStorage.getItem("access_token");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "delete",
      url: `${apiURL}/doctor/pateint/${id}`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
