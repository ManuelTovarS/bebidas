import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

//Crear el context, y almacenarlo en CategoriasContext se hace el export para que los componentes
//hijos tengan acceso a lo que tenga el componente contexto
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y el state 
    /*Si se omite los props del componente "CategoriasProvider" se pierde la referencia a los componentes 
    en este caso hijos (los componentes que esten dentro del context) en este caso el CategoriasProvider
    */
const CategoriasProvider = (props) => {

    //Crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la api
    useEffect( () => {
        
        const obtenerCategorias = async () => {
            const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, []);
    
    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );

}

export default CategoriasProvider;