import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { leerTareas, borrarTareaID, editarTarea } from "../helpers/queries";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ItemTarea = ({ tarea, posicion, setTareas }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValue("inputTarea", tarea.inputTarea);
    setShow(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Tarea eliminada!",
            text: `La tarea ${tarea.inputTarea} fue eliminada correctamente`,
            icon: "success",
          });
          const respuestaTareas = await leerTareas();
          const tareasActualizadas = await respuestaTareas.json();
          setTareas(tareasActualizadas);
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

  const actualizarTarea = async (data) => {
    const respuesta = await editarTarea(data, tarea._id);
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Tarea actualizada",
        text: `La tarea ${data.inputTarea} fue actualizada correctamente.`,
        icon: "success",
      });
      const respuestaTareas = await leerTareas();
      const tareasActualizadas = await respuestaTareas.json();
      setTareas(tareasActualizadas);

      handleClose();
    }
  };

  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between">
        {posicion + 1}. {tarea.inputTarea}
        <Button
          variant="warning"
          className="ms-auto me-2 btn btn-warning text-light"
          onClick={handleShow}
        >
          Editar
        </Button>
        <Button type="button" variant="danger" onClick={eliminarTarea}>
          Borrar
        </Button>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
            {...register("inputTarea", {
              required: "La tarea es un dato obligatorio",
              minLength: {
                value: 3,
                message: "La tarea debe tener 3 caracteres como minimo",
              },
              maxLength: {
                value: 50,
                message: "La tarea debe tener 50 caracteres como minimo",
              },
              pattern: {
                value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]{1,50}$/,
                message:
                  "La tarea debe contener caracteres alfa numericos, mayusculas o minusculas",
              },
            })}
          />
          <Form.Text className="text-danger">
          {errors.inputTarea?.message}
        </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit(actualizarTarea)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemTarea;
