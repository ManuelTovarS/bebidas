import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  //Hook useContext que permite que se consuman los datos que fluyen desde el context component
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //función para leer los datos contenidos
  const obtenerReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        buscarRecetas(busqueda);
        guardarConsultar(true);
      }}
    >

      <fieldset className="text-center">
        <legend>Busca bebidas por Categoría o Ingrediente </legend>
      </fieldset>

      <div className="row mt-4">

        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            placeholder="Busca por Ingrediente"
            className="form-control"
            onChange={obtenerReceta}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerReceta}
          >
            <option value="">--Selecciona Categoría--</option>

            {categorias.map((categoria) => (
              <option
                key={categoria.strCategory}
                value={categoria.strCategory}
              >
                {categoria.strCategory}
              </option>
            ))}

          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Bebidas"
          />
        </div>

      </div>
    </form>
  );
};

export default Formulario;
