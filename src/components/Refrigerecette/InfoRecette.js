import React from "react"
import Ingredients from "../Recettes/Ingredients";

const InfoRecette = ({recette}) => {
    return(<div>
            <p>{recette.description}</p>
            <h5>Ingrédients :</h5>
            <ul className="collection">
                {recette.ingredients.map((ingredient, index) =>
                    <li key={index} className="collection-item">
                        {ingredient.qte} {ingredient.name}
                    </li>
                )}
            </ul>

        </div>
    )
}
export default InfoRecette