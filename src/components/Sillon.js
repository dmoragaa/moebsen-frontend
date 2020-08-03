import React, { useState, useEffect } from "react";
import SillonDataService from "../services/SillonService";

const Sillon = props => {
    const initialSillonState = {
        id: null,
        tipo: "",
        activo: true,
        id_sala: ""
    };
    const [currentSillon, setCurrentSillon] = useState(initialSillonState);
    const [message, setMessage] = useState("");

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

    const updateActivo = status => {
        var data = {
            id: currentSillon.id,
            tipo: currentSillon.tipo,
            id_sala: currentSillon.id_sala,
            activo: status
        };

        SillonDataService.update(currentSillon.id, data)
            .then(response => {
                setCurrentSillon({ ...currentSillon, activo: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateSillon = () => {
        SillonDataService.update(currentSillon.id, currentSillon)
            .then(response => {
                console.log(response.data);
                setMessage("El sillón ha sido actualizado correctamente.");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteSillon = () => {
        SillonDataService.remove(currentSillon.id)
            .then(response => {
                setCurrentSillon({ ...currentSillon, activo: !currentSillon.activo});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentSillon ? (
                <div className="edit-form">
                    <h4>Sillón</h4>
                    <form>
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
                            <label htmlFor="id_sala">ID Sala</label>
                            <input
                                type="number"
                                className="form-control"
                                id="id_sala"
                                name="id_sala"
                                value={currentSillon.id_sala}
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

                    {currentSillon.activo ? (
                        <button className="badge badge-danger mr-2" onClick={deleteSillon}>
                            Desactivar
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updateActivo(true)}
                            >
                                Activar
                            </button>
                        )}

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateSillon}>
                        Actualizar
                        </button>

                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Seleccione un Sillón para ver más detalles</p>
                    </div>
                )}
        </div>
    );



};

export default Sillon;