import ListGroup from "react-bootstrap/ListGroup";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({tareas, borrarTarea}) => {
  return (
    <ListGroup>
      {
        tareas.map((item, indice)=> <ItemTarea key={indice} nombreTarea={item} posicion={indice} borrarTarea={borrarTarea}></ItemTarea>)
      }
    </ListGroup>
  );
};

export default ListaTareas;
