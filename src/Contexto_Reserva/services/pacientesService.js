import { api } from './helpers/api.js';

const basePath = 'api';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/pacientes`); }

function show(pacienteId) { return api.get(`${basePath}/?id=${pacienteId}`); }

function create(data) { return api.post(`${basePath}/pacientes`, data,config); }


const pacientesService = { getAll, show, create };
export default pacientesService;