import React, {useContext, useState} from 'react'
import { ModalContext } from '../context/ModalContext';

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import shortid from "shortid";
import PropTypes from 'prop-types';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 500,
    display: "block"
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  }
}));

const Receta = ({ receta }) => {

    //Configuración del modal material-ui
    const [modalstyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };

    //Extracción de los valores del context
    const { inforeceta, guardarIdReceta, guardarReceta } = useContext(ModalContext);

    //Muestra y formateo de los ingredientes
    const mostrarIngredientes = (inforeceta) => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++){
            if (inforeceta[`strIngredient${i}`]) {
                ingredientes.push(
                  <li key={shortid.generate()}>
                    {inforeceta[`strIngredient${i}`]}
                    {inforeceta[`strMeasure${i}`]}
                  </li>
                );
            }
        }
        return ingredientes;
    }

    return (
      <div className="col-md-4 mb-3">
        <div className="card">
          <h2 className="card-header">{receta.strDrink} </h2>

          <img
            className="card-img-top"
            src={receta.strDrinkThumb}
            alt={`Imagen de ${receta.strDrink}`}
          />

          <div className="card-body">
            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={() => {
                guardarIdReceta(receta.idDrink);
                handleOpen();
              }}
            >
              Ver Receta
            </button>
            <Modal
              open={open}
              onClose={() => {
                guardarIdReceta(null);
                guardarReceta({});
                handleClose();
              }}
            >
              <div style={modalstyle} className={classes.paper}>
                <h2>{inforeceta.strDrink}</h2>
                <h3 className="mt-4">Instruciones</h3>
                <p>{inforeceta.strInstructions}</p>
                <img
                  className="img-fluid my-4"
                  src={inforeceta.strDrinkThumb}
                  alt={`Imagen de ${receta.strDrink}`}
                />
                <h3>Ingredientes y cantidades</h3>
                    <ul>
                        {mostrarIngredientes(inforeceta)}
                    </ul>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
}

Receta.propTypes = {
  receta: PropTypes.object.isRequired
}
 
export default Receta;