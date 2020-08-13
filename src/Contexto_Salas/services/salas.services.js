import axios from 'axios';

const API_URL = "https://plus-ultra-api.herokuapp.com/api/salas"

const getSalas = () => {
  let url = `${API_URL}`;
  console.log('fecthing salas');
  return axios.get(url);
}

const addSalas = (tipo,equipamiento,disponibilidad) => {
  let url = `${API_URL}`;
  return axios.post(url,{
    tipoSala: tipo,
    equipamiento: equipamiento,
    disponibilidad: disponibilidad
  });
}
const getSalasById =(id)=>{
    let url = `${API_URL}/${id}`;
    return axios.get(url);
}

const getSalasbyTipo =(tipo)=>{
  let url = `${API_URL}/tipo?tipoSala=${tipo}`;
  return axios.get(url);
}   


const salasService = {
    getSalas,
    addSalas,
    getSalasById,
    getSalasbyTipo
    
};

export default salasService;