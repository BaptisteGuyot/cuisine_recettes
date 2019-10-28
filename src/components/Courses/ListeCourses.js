import React, {useEffect, useState} from "react";
import {
    getListes,
    createListe
} from "../../api/ApiRecettes";
import {Modal, Button} from "react-materialize";
import M from "materialize-css";
import Course from "./Course";

const ListeCourses = () => {
    /*
  {name : "",
  ingredients : [{name: "", qte: Number}, {name: "", qte: Number}]
  recettes : [id,id]
  }
  */
    const [newListName, setNewListName] = useState("");
    const [listes, setListes] = useState([]);
    const [viewForListes, setViewForListes] = useState([]);

    const update = () => {
        console.log("update")
        getListes().then(res => {
            console.log(res)
            if (res.length)
                setListes(res)
        });
    };

    useEffect(() => { // Au demarrage et a chaque ajout/Suppression de liste
        if (listes.length) {
            let lignesList = [];
            lignesList = listes.map((liste, index) => (
                <Course index={index} liste={liste} update={update}/>
            ));
            setViewForListes(lignesList);
        } else {
            update();
        }
    }, [listes]);

    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <h4>Listes de courses</h4>
                    <ul className="collection">{viewForListes}</ul>
                </div>
            </div>

            <div className="row">
                <Modal // continuer la modale avec le parametre actions pour ajouter la nouvelle liste a la base
                    header="Nouvelle liste de courses"
                    fixedFooter
                    trigger={
                        <span className="waves-effect waves-light btn col s12">
              Nouvelle liste
            </span>
                    }
                    actions={
                        <Button
                            modal="close"
                            className="waves-effect waves-light btn"
                            onClick={() => {
                                console.log(newListName);
                                createListe({
                                    nom: newListName,
                                    recettes: []
                                }).then(update);
                            }}
                        >
                            Créer la liste
                        </Button>
                    }
                >
                    <div className="input-field col s6">
                        <input
                            value={newListName}
                            id="list_name"
                            type="text"
                            className="validate"
                            onChange={event => setNewListName(event.target.value)}
                        />
                        <label htmlFor="list_name">Nom de la liste</label>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ListeCourses;
