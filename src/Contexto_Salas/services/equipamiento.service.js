import axios from 'axios';
import equipamientoService from '../../Contexto_Reserva/services/equipamientoService';

const API_URL = "https://inf225-equipamiento.herokuapp.com/equipamientos"

const getAll = () => {
  let url = `${API_URL}`;
  console.log('fecthing Equipamiento');
  return axios.get(url);
}


const salasService = {
    getAll,
};

export default equipamientoService;