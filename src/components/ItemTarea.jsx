import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = ({nombreTarea, posicion, borrarTarea}) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">{posicion+1}. {nombreTarea}
    <Button variant="warning" className="ms-auto me-2 btn btn-warning text-light">
          Editar
        </Button>
    <Button type="button" variant="danger" onClick={()=> borrarTarea(nombreTarea)}>Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
