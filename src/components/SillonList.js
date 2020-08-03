import React, { useState, useEffect } from "react";
import SillonDataService from "../services/SillonService";
import { Link } from "react-router-dom";

const SillonList = () => {
    const [sillones, setSillones] = useState([]);
    const [currentSillon, setCurrentSillon] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
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

    /*
    const refreshList = () => {
        retrieveSillones();
        setCurrentSillon(null);
        setCurrentIndex(-1);
    };
    */

    const setActiveSillon = (sillon, index) => {
        setCurrentSillon(sillon);
        setCurrentIndex(index);
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
            <div className="col-md-8">
                <div className="input-group mb-3">
                    Acá iría una busqueda
                </div>
            </div>
            <div className="col-md-6">
                <h4>Listado de Sillones</h4>

                <ul className="list-group">
                    {sillones &&
                        sillones.map((sillon, index) => (
                            <li
                                className={
                                    "list-group-item list-group-item-action " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveSillon(sillon, index)}
                                key={index}
                            >
                                {"Sillón " + sillon.id}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentSillon ? (
                    <div>
                        <h4> Sillón</h4>
                        <div>
                            <label>
                                <strong>ID:</strong>
                            </label>{" "}
                            {currentSillon.id}
                        </div>
                        <div>
                            <label>
                                <strong>ID Sala:</strong>
                            </label>{" "}
                            {currentSillon.id_sala}
                        </div>
                        <div>
                            <label>
                                <strong>Tipo:</strong>
                            </label>{" "}
                            {currentSillon.tipo}
                        </div>
                        <div>
                            <label>
                                <strong>Estado:</strong>
                            </label>{" "}
                            {currentSillon.activo ? "Activo" : "No Activo"}
                        </div>

                        <Link
                            to={"/sillones/" + currentSillon.id}
                            className="badge badge-warning"
                        >
                            Editar
                        </Link>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione un Sillón para ver más detalles</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default SillonList;