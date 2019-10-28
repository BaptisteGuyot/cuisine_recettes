import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { navigate } from "@reach/router"
import Ingredients from "../Shared/Ingredients";
import { getRecettesById, saveRecipe, addRecipe } from "../../api/ApiRecettes";
import { Modal } from "react-materialize";

const DetailRecette = ({ id }) => {
    const [recette, setRecette] = useState({});
    const [title, setTitle] = useState(id);
    const [note, setNote] = useState(2.5);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState(null);
    const [chip, setChip] = useState(<></>);
    const [newRecipe, setNewRecipe] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    useEffect(() => {
        if (Object.entries(recette).length === 0 && recette.constructor === Object)
            if (id !== "new") {
                getRecettesById(id).then(res => {
                    setRecette(res);
                    console.log(res);
                    setDescription(res["description"]);
                    setTitle(res["name"]);
                    setNote(res["note"]);
                    setIngredients(res["ingredients"]);
                });
            } else {
                setRecette({ ingredients: [] });
                setNewRecipe(true);
                setIngredients([]);
            }
    }, [setNote, setTitle, recette, id, setIngredients]);

    useEffect(() => {
        if (ingredients) {
            console.log(ingredients)
            setChip(
                <Ingredients
                    value={recette.ingredients}
                    onChange={newIngrs => {
                        console.log(newIngrs);
                        let ingrs = newIngrs.map((a, index) => {
                            let tmpQte = 1;
                            ingredients.map((ing, index) => { // Permet de récupérer la quantité (on ne peut pas la transmettre a cause des chips materialize)
                                if(ing.name === a.tag){
                                    tmpQte = ing.qte;
                                }
                            })

                            return { name: a.tag, id: index, qte: tmpQte };
                        });
                        setIngredients(ingrs);
                    }}
                />
            );
            setModalContent(
                ingredients.map((val, index) => (
                    <li key={index} className="collection-item avatar row">
                        <i className="material-icons green circle">grain</i>
                        <span className="title col s3">{val.name}</span>

                        <input
                            value={val.qte}
                            id={val.name}
                            type="number"
                            className="validate col s3"
                            onChange={event => {
                                if(event.target.value>0){
                                    let newIngrList = ingredients.map((current, index) => {
                                        if (current.name === val.name) {
                                            return {
                                                name: current.name,
                                                qte: event.target.value
                                            };
                                        } else {
                                            return current;
                                        }
                                    });
                                    setIngredients(newIngrList);
                                }}}
                        />
                        <label className="active" htmlFor={val.name}>
                            Quantité
                        </label>
                    </li>
                ))
            );
        }
    }, [ingredients, setChip, recette.ingredients]);

    return (
        <div className="container">
            <h3 className="center">{title}</h3>
            {newRecipe ? (
                <p className="teal-text center">Ajout d'une nouvelle recette</p>
            ) : (
                <></>
            )}
            <div className="row">
                <form>
                    <div className="input-field col s12 m6 l6">
                        <input
                            value={title}
                            id="titre"
                            type="text"
                            className="validate"
                            onChange={event => setTitle(event.target.value)}
                        />
                        <label className="active" htmlFor="titre">
                            Nom de la recette
                        </label>
                    </div>
                    <div className="range-field col s12 m6 l6">
                        <label htmlFor="note">Note : {note}</label>
                        <input
                            type="range"
                            id="note"
                            min="0"
                            step="0.5"
                            max="5"
                            value={note}
                            onChange={event => setNote(event.target.value)}
                        />
                    </div>
                    <div className="input-field col s12">
                        <input
                            value={description}
                            id="description"
                            type="text"
                            className="validate"
                            onChange={event => setDescription(event.target.value)}
                        />
                        <label className="active" htmlFor="description">
                            Description de la recette
                        </label>
                    </div>
                    <div className="col s12">{chip}</div>
                    {/*  */}
                    <Modal
                        header="Selectionner quantités"
                        trigger={
                            <span className="waves-effect waves-light btn right">
                Suivant
              </span>
                        }
                        actions={
                            <span
                                className="waves-effect waves-light btn right"
                                onClick={() => {
                                    let promise;
                                    if (newRecipe) {
                                        promise = addRecipe({
                                            name: title,
                                            note: note,
                                            description: description,
                                            ingredients: ingredients
                                        });
                                    } else {
                                        promise = saveRecipe({
                                            id: id,
                                            name: title,
                                            note: note,
                                            description: description,
                                            ingredients: ingredients
                                        });
                                    }
                                    promise.then(res => {
                                        res.text().then(ress => console.log(ress));
                                        M.toast({ html: "Recette enregistrée" });
                                        navigate("/")
                                    });
                                }}
                            >
            Sauvegarder
          </span>
                        }
                        fixedFooter
                    >
                        <ul className="collection">{modalContent}</ul>
                    </Modal>
                </form>
            </div>
        </div>
    );
};
export default DetailRecette;
