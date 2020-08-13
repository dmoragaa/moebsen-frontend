import React, { useState, useEffect } from "react";
import SillonDataService from "../services/SillonService";
import { Link } from "react-router-dom";

const SillonList = props => {
    const [sillones, setSillones] = useState([]);
    const [waitingQuery, setWaitingQuery] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [tipoFilter, setTipoFilter] = useState("");
    const [activoFilter, setActivoFilter] = useState(true);

    useEffect(() => {
        retrieveSillones();
    }, []);

    const retrieveSillones = () => {
        SillonDataService.getAll()
            .then(response => {
                setSillones(response.data);
                setWaitingQuery(false);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveFiltered = () => {
        setWaitingQuery(true);
        var data;
        if(tipoFilter !== ""){
            data = {
                tipo: tipoFilter,
                activo: activoFilter
            }
        }else{
            data = {
                activo: activoFilter
            }
        }
        SillonDataService.getFiltered(data)
        .then(response => {
            setSillones(response.data);
            setWaitingQuery(false);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
        setIsDeleted(!activoFilter);
    }

    const handleTipoFilterChange = event => {
        const { value } = event.target;
        setTipoFilter(value);
    };
    const handleActivoFilterChange = event => {
        const { checked } = event.target;
        setActivoFilter(!checked);
    };

    const refreshList = () => {
        setWaitingQuery(true);
        retrieveFiltered();
    };

    const deleteSillon = id => {
        SillonDataService.remove(id)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActivoSillon = sillon => {
        var data = {
            id: sillon.id,
            tipo: sillon.tipo,
            activo: true,
            codigo: sillon.codigo
        };
        SillonDataService.update(sillon.id, data)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    /*
    const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
    */

    return (
        <div className="list row">
            <div className="col-md-12">
                <div className="mb-3">
                    <h1>Listado de Sillones</h1>
                    <h4>Filtros de Búsqueda</h4>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Tipo de Sillón:</div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tipo"
                                        name="tipo"
                                        placeholder="Deje en blanco para mostrar todos."
                                        value={tipoFilter}
                                        onChange={handleTipoFilterChange}
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="activo"
                                        name="activo"
                                        checked={!activoFilter}
                                        onChange={handleActivoFilterChange}
                                    />
                                    <label className="form-check-label" htmlFor="activo">
                                        Obtener Sillones Eliminados
                                    </label>
                                </div>
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={retrieveFiltered}>
                                    Buscar
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-md-12">
                {!waitingQuery ? (
                    <div className="overflow-auto table-sillones">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col" className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sillones &&
                                    sillones.map((sillon) => (
                                        <tr key={sillon.id}>
                                            <td>{sillon.codigo}</td>
                                            <td>{sillon.tipo}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    {isDeleted ? (
                                                        <div>
                                                            <button className="btn btn-warning m-1" onClick={() => setActivoSillon(sillon)}>
                                                                Restaurar
                                                            </button>
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                <Link
                                                                    to={"/sillones/" + sillon.id}
                                                                    className="btn btn-primary m-1"
                                                                >
                                                                    Editar
                                                                </Link>
                                                                <button className="btn btn-danger m-1" onClick={() => deleteSillon(sillon.id)}>
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                        <div className="d-flex justify-content-center m-2">
                            <div className="spinner-border text-primary mx-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <strong>Cargando, un momento...</strong>
                            <br />
                        </div>
                    )
                }

                <Link to={"/sillones/add"} className="btn btn-primary mt-2">
                    Nuevo Sillón
              </Link>
            </div >
        </div >
    );
};

export default SillonList;