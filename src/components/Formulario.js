import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    //Crear State de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, setError] = useState(false)

    //Funcion que se ejecuta cada que el usuario escribe en un input

    const handleChange = (e) => {
        //console.log(e.target.name)
        setCita({
            ...cita,  //Este wey es el de la magia !!!!
            [e.target.name]: e.target.value
        })
    }
    //Extraer los valores de cita
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //cuando el usuario presione el botón de crear cita

    const submitCita = (e) => {
        e.preventDefault();
        //Validar

        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            setError(true)
            return;
        }

        //Elminar mensaje previo
        if (error) {
            setError(false)
        }

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        setCita({

            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''

        });
    }



    return (

        <Fragment>
            <h2> Crear cita </h2>
            {
                error
                    ? <p className="alerta-error"> Todos los campos son obligatorios</p>
                    : null
            }

            <form
                onSubmit={submitCita}
            >
                <label> Nombre Mascota </label>

                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label> Nombre del dueño </label>

                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label> Fecha </label>

                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label> Hora </label>

                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label> Sintomas </label>

                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                >

                </textarea>


                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>

            </form>
        </Fragment>

    );
};


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}


export default Formulario;