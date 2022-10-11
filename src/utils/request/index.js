import axios from "axios";
import request from "request";

export const apiPost = (url, data) => {
  return request({
    url: url,
    method: "post",
    data: data,
  });
};

export const apiGet = (url) => {
  return request({
    url: url,
    method: "get",
  });
};
