import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';



function App() {

  //Citas en localStorage

  let citasIniciales = localStorage.getItem('cita');

  if (!citasIniciales) {
    citasIniciales = []
  }

  //Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia

  useEffect(() => {


    let citasIniciales = localStorage.getItem('cita');
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que tome las citas actuales y agregue la nueva

  const crearCita = cita => {

    setCitas([
      ...citas,
      cita
    ])

  }


  //Funcion que eliminar una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }


  const titulo = citas.length > 0 ? 'Administra tus citas' : 'No hay citas'

  return (
    <Fragment>
      <div className="App">

        <h1> Administrador de Pacientes</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h1> {titulo} </h1>
              {
                citas.map(cita => (
                  <Cita
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))
              }
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
