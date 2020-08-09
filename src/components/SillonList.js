import React, { useState, useEffect } from "react";
import SillonDataService from "../services/SillonService";
import { Link } from "react-router-dom";

const SillonList = props => {
    const [sillones, setSillones] = useState([]);
    //dejado como idea, aun no sabemos como implementar busqueda.
    //const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveSillones();
    }, []);

    /*
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    */
    const retrieveSillones = () => {
        SillonDataService.getAll()
            .then(response => {
                setSillones(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const refreshList = () => {
        retrieveSillones();
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
                    Acá iría una busqueda
                </div>
            </div>
            <div className="col-md-12">
                {sillones.length !== 0 ? (
                    <div className="overflow-auto">
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
                    )}

                <Link to={"/add"} className="btn btn-primary mt-2">
                    Nuevo Sillón
              </Link>
            </div>
        </div>
    );
};

export default SillonList;