import React, { useState, useEffect } from "react";
import { Chip } from "react-materialize";
import { getIngredients, createIngredient } from "../../api/ApiRecettes"

const Ingredients = ({ value = [], onChange }) => {
    const [autoComp, setAutoComp] = useState({})
    useEffect(() => {
        getIngredients().then(res => {
            console.log(res);
            let tmpAutoComp = autoComp;
            res.forEach((val) => {
                tmpAutoComp[val.name]=null;
            })
            setAutoComp(tmpAutoComp)
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAutoComp])

    return (
        <Chip
            options={{
                data: value.map((str) => {
                    return { tag: str.name };
                }),
                placeholder: "Ingrédients",
                secondaryPlaceholder: "+Ingrédient",
                autocompleteOptions: {
                    data: autoComp,
                    limit: Infinity,
                    minLength: 1
                },
                limit: 100,
                onChipAdd: function(event) {
                    console.log(event[0].M_Chips.chipsData);
                    let autocompkey = Object.keys(autoComp)
                    let toAdd = []
                    event[0].M_Chips.chipsData.map((val, index) => {
                        if(!autocompkey.includes(val.tag)){
                            createIngredient({name:val.tag})
                        }
                        toAdd.push(val)
                        return 0
                    })
                    console.log(toAdd)
                    onChange(toAdd);
                },
                onChipDelete: function(event, chip) {
                    onChange(event[0].M_Chips.chipsData);
                }
            }}
        />
    );
};
export default Ingredients;
