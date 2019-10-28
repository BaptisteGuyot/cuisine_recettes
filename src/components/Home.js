import React from "react";
import ListeRecettes from "./Recettes/ListeRecettes";
import { Link } from "@reach/router";

const Home = () => {
    return (
        <div className="App container">
            <ListeRecettes />
            <Link to={`/recette/new`} className="title">
                <i className=" material-icons medium circle green white-text right">
                    add
                </i>
            </Link>
        </div>
    );
};

export default Home;
