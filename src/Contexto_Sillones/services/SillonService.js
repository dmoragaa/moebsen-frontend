import http from "./http-common";

const getAll = () => {
  return http.get("/sillones");
};

const getFiltered = filters => {
  return http.get("/sillones", {
    params: filters
  })
}

const get = id => {
  return http.get(`/sillones/${id}`);
};

const create = data => {
  return http.post("/sillones", data);
};

const update = (id, data) => {
  return http.put(`/sillones/${id}`, data);
};

const remove = id => {
  return http.delete(`/sillones/${id}`);
};

export default {
  getAll,
  getFiltered,
  get,
  create,
  update,
  remove
};