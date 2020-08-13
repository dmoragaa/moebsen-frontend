import { api } from './helpers/api.js';

const basePath = 'api';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/Operativo`); }

function show(operativoId) { return api.get(`${basePath}/${operativoId}`); }

function create(data) { return api.post(`${basePath}/Operativo`, data,config); }

function del(operativoId) {return api.delete(`${basePath}/Operativo/delete/${operativoId}`); }

function updt(operativoId,data) {return api.put(`${basePath}/Operativo/update/${operativoId}`,data,config)}

const solicitudService = { getAll, show, create,del,updt };
export default solicitudService;