import React, { useState, useEffect } from 'react';
import ListaT from './lista_T';
import './App.css';

function App() {
  // Estado para gestionar las tareas, inicializado desde localStorage
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  // Estados para gestionar el título y la descripción de la tarea
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [filtro, setFiltro] = useState('todas'); // Estado para el filtro
  const [mensajeVisible, setMensajeVisible] = useState(false); // Estado para mostrar/ocultar el mensaje de felicitaciones

  // Efecto que guarda las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Función para manejar el cambio del titulo
  const manejarCambioTitulo = (e) => {
    setTitulo(e.target.value);
  };
  // Función para manejar el cambio de la descripción
  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  // Función para agregar una nueva tarea o editar una existente
  const agregarTarea = () => {

    if (titulo.trim()) { // Verifica si el título no está vacío
      if (indiceEdicion !== null) {

        // Editar tarea existente
        const nuevasTareas = [...tareas];
        nuevasTareas[indiceEdicion] = { titulo, descripcion, completada: nuevasTareas[indiceEdicion].completada };
        setTareas(nuevasTareas);
        setIndiceEdicion(null); // Sale del modo de edición
      } else {
        // Agregar nueva tarea
        setTareas([...tareas, { titulo, descripcion, completada: false }]);
      }

      setTitulo(''); // Limpia el input del título
      setDescripcion(''); // Limpia el input de la descripción
    }
  };
  // Función para alternar el estado de completado de una tarea
  const toggleCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);

    // Muestra el mensaje de felicitaciones si la tarea se marca como completada
    if (nuevasTareas[index].completada) {
      setMensajeVisible(true);
      setTimeout(() => setMensajeVisible(false), 3000); 
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  // Estado para el índice de la tarea que se está editando
  const [indiceEdicion, setIndiceEdicion] = useState(null); 
  // Función para iniciar la edición de una tarea
  const iniciarEdicion = (index) => {
    setIndiceEdicion(index);
    setTitulo(tareas[index].titulo);
    setDescripcion(tareas[index].descripcion);
  };
  // Función para cambiar el filtro de las tareas (todas, completadas, pendientes)
  const cambiarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  // Filtra las tareas según el estado del filtro seleccionado
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true; // Muestra todas si el filtro es 'todas'
  });

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={titulo}
        onChange={manejarCambioTitulo}
        placeholder="Título"
      />
      <input
        type="text"
        value={descripcion}
        onChange={manejarCambioDescripcion}
        placeholder="Descripción"
      />
      <button className="boton_agregar_tarea" onClick={agregarTarea}>Agregar Tarea</button>

      {/* Botones para cambiar el filtro */}

      <div className='Filtros'>
        <h2>Filtrar: </h2>
        <button className='botonesFiltro' onClick={() => cambiarFiltro('todas')}>Todas</button>
        <button className='botonesFiltro' onClick={() => cambiarFiltro('completadas')}>Completadas</button>
        <button className='botonesFiltro' onClick={() => cambiarFiltro('pendientes')}>Pendientes</button>
      </div>

      {mensajeVisible && <div className="mensaje-felicitaciones">¡Felicidades por completar una tarea, sigue así!</div>}
      <ListaT tareas={tareasFiltradas} toggleCompletada={toggleCompletada} eliminarTarea={eliminarTarea} iniciarEdicion={iniciarEdicion} />
    </div>
  );
}

export default App;