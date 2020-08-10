import React, { useState } from "react";
import SillonDataService from "../services/SillonService";
import { Link } from "react-router-dom";

const AddSillon = props => {
    const initialSillonState = {
        id: null,
        tipo: "",
        activo: true,
        codigo: ""
    };
    const [sillon, setSillon] = useState(initialSillonState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSillon({ ...sillon, [name]: value });
    };

    const saveSillon = () => {
        var data = {
            tipo: sillon.tipo,
            activo: sillon.activo,
            codigo: sillon.codigo
        };

        SillonDataService.create(data)
            .then(response => {
                setSillon({
                    id: response.data.id,
                    tipo: response.data.tipo,
                    activo: response.data.activo,
                    codigo: response.data.codigo
                });
                console.log(response.data);
                props.history.push("/sillones");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <h1>Nuevo Sillón</h1>
                <div className="edit-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="codigo">Nombre Sillón</label>
                            <input
                                type="text"
                                className="form-control"
                                id="codigo"
                                name="codigo"
                                value={sillon.codigo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo de Sillón</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipo"
                                name="tipo"
                                value={sillon.tipo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={saveSillon}>
                        Guardar
                        </button>
                    <Link
                        to={"/sillones"}
                        className="btn btn-outline-dark m-2"
                    >
                        Volver
                    </Link>
                </div>
        </div>
    );
};

export default AddSillon;