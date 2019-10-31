import React, { useEffect, useState } from "react";
import Recette from "./Recette";
import { getRecettes } from "../../api/ApiRecettes";
import {Link} from "@reach/router";

const ListeRecettes = () => {
    const [recettes, setRecettes] = useState([]);
    const [result, setResult] = useState([]);

    const update = () => {
        // Utilisé lors de l'affichage mais aussi lors de la suppression d'une recette
        getRecettes().then(res => {
            setRecettes(res);
        });
    };
    useEffect(() => {
        if (!recettes[0]) {
            update();
        } else {
            setResult(
                recettes.map((recette, index) => {
                    return (
                        <Recette
                            key={index}
                            id={recette.id}
                            titre={recette.name}
                            description={recette.description}
                            note={recette.note}
                            handleDelete={update}
                        />
                    );
                })
            );
        }
    }, [recettes, setResult]);

    return (
        <div className="container">
            <ul className="collection">{result}</ul>
            <Link to={`/recette/new`} className="title">
                <i className=" material-icons medium circle green white-text right">
                    add
                </i>
            </Link>
        </div>
        );
};
export default ListeRecettes;

