import { api } from './helpers/apiEquipamiento.js';

const basePath = '';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/equipamientos`); }




const equipamientoService = { getAll };
export default equipamientoService;