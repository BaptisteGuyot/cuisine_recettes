import React from "react";
import { Link } from "@reach/router";
import { deleteRecette } from "../../api/ApiRecettes";
const Recette = ({ id, titre, description, note, handleDelete }) => {
    return (
        <li key={id} className="collection-item avatar">
            <i className="material-icons circle teal">restaurant</i>
            <Link to={`/recette/${id}`} className="title">
                {titre}
            </Link>
            <p>{description}</p>
            <a href="#!" className="secondary-content">
                {note}/5
            </a>
            <a
                href="#!"
                onClick={() => {
                    deleteRecette(id).then(() => {
                        handleDelete(); // Va mettre à jour la liste
                    });
                }}
                className="material-icons white red-text right"
            >
        delete
      </a>
        </li>
    );
};
export default Recette;
