import { api } from './helpers/apiSillon.js';

const basePath = '';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/sillones`); }

function show(sillonId) { return api.get(`${basePath}/?id=${sillonId}`); }

function create(data) { return api.post(`${basePath}/sillones`, data,config); }

function updt(sillonId,data) {return api.put(`${basePath}/sillones/update/${sillonId}`,data,config)}



const sillonService = { getAll, show, create,updt };
export default sillonService;