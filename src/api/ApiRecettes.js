const url = "https://react-19-20.cleverapps.io/e175938m";
export const getRecettes = () => {
    return fetch(`${url}/recettes`, {
        method: "get"
    }).then(res => res.json());
};
export const getRecettesById = id => {
    return fetch(`${url}/recettes/${id}`, {
        method: "get"
    }).then(res => res.json());
};
export const saveRecipe = recette => {
    return fetch(`${url}/recettes/${recette.id}`, {
        method: "put",
        body: JSON.stringify(recette),
        headers: {
            "Content-Type": "application/json"
        }
    });
};
export const addRecipe = recette => {
    return fetch(`${url}/recettes`, {
        method: "post",
        body: JSON.stringify(recette),
        headers: {
            "Content-Type": "application/json"
        }
    });
};
export const deleteRecette = id => {
    console.log("suppression de recette");
    return fetch(`${url}/recettes/${id}`, {
        method: "delete"
    }).then(res => res.json());
};
export const getIngredients = () => {
    return fetch(`${url}/ingredients`, {
        method: "get"
    }).then(res => res.json());
}
export const createIngredient = (ingredient) => {
    return fetch(`${url}/ingredients`, {
        method: "post",
        body: JSON.stringify(ingredient),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}
export const getListes = () => {
    return fetch(`${url}/listes`, {
        method: "get"
    }).then(res => res.json());
}
export const createListe = (liste) => {
    return fetch(`${url}/listes`, {
        method: "post",
        body: JSON.stringify(liste),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}
export const getListeById = (id) => {
    return fetch(`${url}/listes/${id}`, {
        method: "get"
    }).then(res => res.json());
}
export const deleteListe = (id) => {
    console.log("suppression de recette");
    return fetch(`${url}/listes/${id}`, {
        method: "delete"
    }).then(res => res.json())
        .catch(err => console.log(err))

}
export const saveListe = (id, liste) => {
    return fetch(`${url}/listes/${id}`, {
        method: "put",
        body: JSON.stringify(liste),
        headers: {
            "Content-Type": "application/json"
        }
    });
}