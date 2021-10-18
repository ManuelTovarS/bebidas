import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

//Crear el context 
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //State del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [inforeceta, guardarReceta] = useState({});

    //Una vez que tenemos una receta, llamamos la api
    useEffect(() => {
        const obtenerReceta = async () => {
            if (!idreceta) return null;
             
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}
`;
            const resultadoReceta = await axios.get(url);

            guardarReceta(resultadoReceta.data.drinks[0]);
        }
        obtenerReceta(); 
    }, [idreceta]);

    return (
        <ModalContext.Provider
            value={{
                inforeceta,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
