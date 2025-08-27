import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({tareas, borrarTarea, setTareas}) => {
  return (
    <ListGroup>
      {
        tareas.map((tarea, indice)=> <ItemTarea key={tarea._id} tarea={tarea} posicion={indice} borrarTarea={borrarTarea} setTareas={setTareas}></ItemTarea>)
      }
    </ListGroup>
  );
};

export default ListaTareas;
