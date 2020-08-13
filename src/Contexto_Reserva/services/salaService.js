import { api } from './helpers/apiSalas.js';

const basePath = 'api';

let config = {
    headers: {
       'Content-Type': 'application/json',
    } 
}

function getAll() { return api.get(`${basePath}/salas`); }



const salaService = { getAll };
export default salaService;