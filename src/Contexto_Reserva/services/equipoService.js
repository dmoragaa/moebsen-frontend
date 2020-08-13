import { api } from './helpers/apiEquipo.js';

const basePath = '';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/personal`); }



const equipoService = { getAll };
export default equipoService;