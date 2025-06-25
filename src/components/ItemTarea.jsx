import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = ({nombreTarea, posicion, borrarTarea}) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">{posicion+1}. {nombreTarea}<Button type="button" variant="danger" onClick={()=> borrarTarea(nombreTarea)}>Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
