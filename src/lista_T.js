import React from 'react';

// Componente ListaT que recibe props para manejar las tareas y sus acciones
const ListaT = ({ tareas, toggleCompletada, eliminarTarea, iniciarEdicion }) => {
  return (
    <div>
      <ul>
        {tareas.length === 0 ? ( // Condicional para mostrar un mensaje si no hay tareas
          <li>No hay tareas.</li> 
        ):(
          // Mapea  cada tarea en la lista
          tareas.map((tarea, index) => (
            <li key={index} className={tarea.completada ? 'tarea-completada-fondo' : ''}> {/* Aplica una clase condicional si la tarea está completada */}
              <input 
                type="checkbox"
                checked={tarea.completada} // Controla el estado de la casilla de verificación
                onChange={() => toggleCompletada(index)} // Llama a la función para alternar el estado de completado
                className='checkbox'
              />
              {/* Contenedor para el título y descripción de la tarea */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>  
                <strong style={{ textDecoration: tarea.completada ? 'line-through' : 'none', textTransform: 'uppercase' }}>
                  {tarea.titulo} {/* Muestra el título de la tarea y lo transforma a mayúsculas si está completada */}
                </strong> 
                <span className="descripcion" style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                  {tarea.descripcion} {/* Muestra la descripción de la tarea y la tacha si está completada */}
                </span>
              </div>
              {/* Botones para editar y eliminar la tarea */}
              <div className='botones-acciones'>
              <button className="B-editar" onClick={() => iniciarEdicion(index)}>
                <i className="fas fa-pencil-alt icono-boton" ></i> 
              </button>
              <button className="B-eliminar" onClick={() => eliminarTarea(index)}>
                <i className="fas fa-trash icono-boton" ></i> 
              </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListaT;
