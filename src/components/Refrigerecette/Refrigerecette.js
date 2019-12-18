import React, {useState, useEffect} from "react"
import {getIngredients, getRecettes} from "../../api/ApiRecettes";
import {Dropdown, Modal} from "react-materialize";
import InfoRecette from "./InfoRecette";
import Loader from "../Loader";

const Refrigerecette = () => {
    const [ingredients, setIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [recettes, setRecettes] = useState([])
    useEffect(() => {
        getIngredients().then((res) => {
            setIngredients(res)
        })
        getRecettes().then((res) => {
            setRecettes(res)
        })
    }, [setIngredients])

    return (<div className="container">
        <div className="row">
            <div className="col s12">
                <h3>Quelles recettes avec mes ingrédients ?</h3>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m5">
                <h4>Mes ingrédients</h4>
                <ul className="collection">
                    {
                        selectedIngredients.map((selectedIngredient, index) => {
                            return <li key={index} className="collection-item avatar row">
                                <i className="material-icons green circle">grain</i>
                                <span className="title col s4">{selectedIngredient.name}</span>
                                <div className=" col s6">
                                    <input
                                        value={selectedIngredient.qte}
                                        id={selectedIngredient.name}
                                        type="number"
                                        className="validate"
                                        onChange={event => {
                                            if (event.target.value > 0) {
                                                let newIngrList = selectedIngredients.map((current) => {
                                                    if (current.name === selectedIngredient.name) {
                                                        return {
                                                            name: current.name,
                                                            qte: parseInt(event.target.value),
                                                            id: current.id
                                                        };
                                                    } else {
                                                        return current;
                                                    }
                                                });
                                                setSelectedIngredients(newIngrList);
                                            }
                                        }}
                                    />
                                    <label className="active" htmlFor={selectedIngredient.name}>
                                        Quantité
                                    </label>
                                </div>
                                <a href="#!"
                                   onClick={() => {
                                       let tmp = selectedIngredients
                                       tmp.splice(index, 1)
                                       setSelectedIngredients([...tmp]) // Spread operator pour bien tout mettre a jour
                                       setIngredients([...ingredients, selectedIngredient])
                                   }}
                                   className="col s2 material-icons white red-text right">remove
                                </a>
                            </li>
                        })
                    }
                </ul>
                <div className="center">
                    <Dropdown trigger={<span
                        className={"btn waves-effect waves-light " + (!selectedIngredients.length ? "pulse" : "")}>{ingredients.length ? "Ajouter un ingrédient" : <Loader/>} <i
                        className="material-icons">arrow_drop_down</i></span>}>
                        {ingredients.map((ingr, index) => <span key={ingr.id}
                                                                onClick={() => {
                                                                    ingr.qte = 1;
                                                                    setSelectedIngredients([...selectedIngredients, ingr])
                                                                    let tmp = ingredients
                                                                    tmp.splice(index, 1)
                                                                    setIngredients([...tmp]);
                                                                }}>{ingr.name}</span>)

                        }
                    </Dropdown>
                </div>
            </div>
            <div className="col s12 m5 offset-m2">
                <h4>Recettes possibles</h4>
                <ul className="collection">
                    {recettes.map((recette, index) => canDoRecipe(recette, selectedIngredients) ?
                        <li className="collection-item" key={index} >
                            {recette.name}
                            <Modal
                                header={recette.name}
                                trigger={
                                    <span className=" waves-effect right teal-text">
                                        Infos
                                    </span>
                                }
                                fixedFooter>
                                <InfoRecette recette={recette}/>
                            </Modal>
                        </li>
                        :
                        <></>
                    )}
                </ul>


            </div>
        </div>
        <div className="row">
            <div className="col s12 center italic">
                <span className="flow-text">Indiquez les ingrédients que vous possédez pour voir les recettes réalisables.</span>
            </div>
        </div>
    </div>)
}

const canDoRecipe = (recette, ingredientsPossedes) => {
    let nbIngrAValider = recette.ingredients.length;
    let nbIngrValides = 0
    recette.ingredients.forEach(ingredientNecessaire => {
        ingredientsPossedes.forEach(ingredientPossede => {
            if (ingredientNecessaire.name === ingredientPossede.name && ingredientPossede.qte >= ingredientNecessaire.qte)
                nbIngrValides++;
        })
    })
    return nbIngrValides === nbIngrAValider
}
export default Refrigerecette
