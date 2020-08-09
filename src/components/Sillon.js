import React, { useState, useEffect } from "react";
import SillonDataService from "../services/SillonService";
import { Link } from "react-router-dom";

const Sillon = props => {
    const initialSillonState = {
        id: null,
        codigo: "",
        tipo: "",
        activo: true
    };
    const [currentSillon, setCurrentSillon] = useState(initialSillonState);

    const getSillon = id => {
        SillonDataService.get(id)
            .then(response => {
                setCurrentSillon(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getSillon(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentSillon({ ...currentSillon, [name]: value });
    };

    const updateSillon = () => {
        SillonDataService.update(currentSillon.id, currentSillon)
            .then(response => {
                console.log(response.data);
                props.history.push("/sillones");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <h1>Editar Sillón</h1>
            {currentSillon.id ? (
                <div className="edit-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="codigo">Nombre Sillón</label>
                            <input
                                type="text"
                                className="form-control"
                                id="codigo"
                                name="codigo"
                                value={currentSillon.codigo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo de Sillón</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipo"
                                name="tipo"
                                value={currentSillon.tipo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Estado: </strong>
                            </label>
                            {currentSillon.activo ? " Activo" : " No Activo"}
                        </div>
                    </form>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={updateSillon}>
                        Actualizar
                        </button>
                    <Link
                        to={"/sillones"}
                        className="btn btn-outline-dark m-2"
                    >
                        Volver
                    </Link>
                </div>
            ) : (
                    <div>
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border text-primary mx-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <strong>Cargando, un momento...</strong>
                            <br />
                        </div>
                        <Link
                            to={"/sillones"}
                            className="btn btn-outline-dark m-2"
                        >
                            Volver
                        </Link>
                    </div>
                )}
        </div>
    );



};

export default Sillon;