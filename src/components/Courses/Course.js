import React from "react"
import {deleteListe} from "../../api/ApiRecettes";
import {Link} from "@reach/router";

const Course = ({liste, update}) => {

    return (
        <li  className="collection-item avatar">
            <i className="material-icons circle teal">shopping_cart</i>
            <Link to={`/courses/${liste.id}`} className="title">
                {liste.nom}
            </Link>
            <a
                href="#!"
                onClick={() => {
                    deleteListe(liste.id).then(() => {
                        update(); // Va mettre à jour la liste
                    });
                }}
                className="material-icons white red-text right"
            >
                delete
            </a>
        </li>)
}
export default Course