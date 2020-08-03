import React, { useState } from "react";
import SillonDataService from "../services/SillonService";

//function AddSillon(){
//    return "Add Sillon";
//
const AddSillon = () => {
    const initialSillonState = {
        id: null,
        tipo: "",
        activo: true,
        id_sala: ""
    };
    const [sillon, setSillon] = useState(initialSillonState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSillon({ ...sillon, [name]: value });
    };

    const saveSillon = () => {
        var data = {
            tipo: sillon.tipo,
            activo: sillon.activo,
            id_sala: sillon.id_sala
        };

        SillonDataService.create(data)
            .then(response => {
                setSillon({
                    id: response.data.id,
                    tipo: response.data.tipo,
                    activo: response.data.activo,
                    id_sala: response.data.id_sala
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newSillon = () => {
        setSillon(initialSillonState);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Sillón ha sido añadido exitósamente!</h4>
                    <button className="btn btn-success" onClick={newSillon}>
                        Nuevo Sillón
                    </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo de Sillón</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipo"
                                required
                                value={sillon.tipo}
                                onChange={handleInputChange}
                                name="tipo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_sala">ID Sala</label>
                            <input
                                type="number"
                                className="form-control"
                                id="id_sala"
                                required
                                value={sillon.id_sala}
                                onChange={handleInputChange}
                                name="id_sala"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="activo">Activo</label>
                            <select
                                value={sillon.activo}
                                className="form-control"
                                id="activo"
                                required
                                onChange={handleInputChange}
                                name="activo">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <button onClick={saveSillon} className="btn btn-success">
                            Enviar
                        </button>
                    </div>
                )}
                </div>
    );
};

export default AddSillon;