import { Button, ListGroup } from "react-bootstrap";
import { leerTareas, borrarTareaID } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemTarea = ({tarea, posicion, setTareas}) => {

  const eliminarTarea = () => {
    Swal.fire({
      title: "Eliminar tarea",
      text: "No puedes revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#277a35ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarTareaID(tarea._id);
        if (respuesta.status===200) {
          Swal.fire({
            title: "Tarea eliminada!",
            text: `La tarea ${tarea.inputTarea} fue eliminada correctamente`,
            icon: "success",
          });
          const respuestaTareas = await leerTareas()
          const tareasActualizadas = await respuestaTareas.json()
          setTareas(tareasActualizadas)
        } else {
          Swal.fire({
            title: "Error al eliminar la tarea!",
            text: `La tarea ${tarea.inputTarea} no pudo ser eliminada`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">{posicion+1}. {tarea.inputTarea}
    <Button variant="warning" className="ms-auto me-2 btn btn-warning text-light">
          Editar
        </Button>
    <Button type="button" variant="danger" onClick={eliminarTarea}>Borrar</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
