import React, {useEffect, useState} from "react"
import {getListeById, getRecettes, saveListe} from "../../api/ApiRecettes";
import {Dropdown} from "react-materialize"
import M from "materialize-css"
import Loader from "../Loader";

const DetailCourse = ({id}) => {
    const [oldCourse, setOldCourse] = useState({})
    const [nom, setNom] = useState(id);
    const [received, setReceived] = useState(false)
    const [recettes, setRecettes] = useState([])
    const [toutesRecettes, setToutesRecettes] = useState([])
    const [viewIngredients, setViewIngredients] = useState(<></>)
    const [editName, setEditName] = useState(false)
    useEffect(() => {
        getListeById(id).then(course => {
            setNom(course.nom);
            setRecettes(course.recettes)
            setOldCourse({
                nom: course.nom,
                recettes: course.recettes
            })
        })
        getRecettes().then(res => {
            setToutesRecettes(res);
        });
    }, [id]);

    useEffect(() => {
        if(nom!==id && recettes && oldCourse.nom && oldCourse.recettes)
            setReceived(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[nom, recettes, oldCourse])
    useEffect(() => {
            // Sauvegarder a chaque modification des recettes
        if(received){
            let newCourse ={
                nom: nom,
                recettes: recettes
            }
            if(newCourse.nom !== oldCourse.nom || newCourse.recettes !== oldCourse.recettes) // Si la liste a changé de par son nom ou ses recettes

                saveListe(id, {
                    nom: nom,
                    recettes: recettes
                }).then(() => {
                    setOldCourse(newCourse)
                    M.toast({html: "Modifications sauvegardées", displayLength: 1000})
                })
            if (recettes.length) {
                let ingredients = [];
                recettes.forEach((recette) => {
                    recette.ingredients.forEach((ingredient) => {
                        ingredients[ingredient.name] = (isNaN(ingredient.qte + ingredients[ingredient.name]) ? ingredient.qte : ingredient.qte + ingredients[ingredient.name]);
                    })
                })
                setViewIngredients(Object.keys(ingredients).map((ingredient, index) => {
                    return <li key={index} className="collection-item">
                        {ingredient}<span className="badge teal-text">{ingredients[ingredient]}</span>
                    </li>
                }))
            } else {
                setViewIngredients(<em className="flow-text"> Cette liste de courses est vide, ajoutez des recettes pour
                    l'alimenter</em>)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recettes, editName, received]);
    return (<div className={"container"}>
        <h3 className={"center"}>{editName ? <input value={nom} onChange={(event) => setNom(event.target.value)} />: nom }
            <a href={"#!"} onClick={() => setEditName(!editName)} className="white waves-effect"><i className="material-icons  teal-text">edit</i></a>
        </h3>
        {
            received ?
                <div className="row">
                    <div className="col m5 s12">
                        <h4 className={"center"}>Recettes</h4>
                        <ul className="collection">
                            {/*Pour chaque recette, faire une ligne correspondante*/}
                            {recettes.map((recette, index) => {
                                return <li key={index} className="collection-item">
                                    {recette.name}
                                    <a
                                        href="#!"
                                        onClick={() => {
                                            let tmp = recettes
                                            tmp.splice(index, 1)
                                            setRecettes([...tmp]) // Spread operator pour bien tout mettre a jour
                                        }}
                                        className="material-icons white red-text right"
                                    >remove</a>
                                </li>
                            })}

                        </ul>
                        <div className="center">
                            {/*    Dropdown pour l'ajout d'une recette    */}
                            <Dropdown
                                trigger={<span
                                    className={"btn waves-effect waves-light " + (!recettes.length ? "pulse" : "")}>Ajouter une recette <i
                                    className="material-icons">arrow_drop_down</i></span>}>
                                {toutesRecettes.map((recette) => <span key={recette.id}
                                                                       onClick={() => setRecettes([...recettes, recette])}>{recette.name}</span>)}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="col m5 offset-m2 s12">
                        <h4 className={"center"}>Ingrédients requis</h4>
                        <ul className="collection">
                            {viewIngredients}
                        </ul>
                    </div>
                </div>
                :
                <div className={"center"}>
                    <Loader/>
                </div>
        }
        <div className="row">
            <div className="col s12 center italic">
                <span className="center flow-text">Ajoutez des recettes afin d'obtenir la liste des ingrédients nécessaires. Si vous souhaitez réaliser plusieurs fois la même recette, il suffit de l'ajouter plusieurs fois</span>
            </div>
        </div>
    </div>)
}
export default DetailCourse