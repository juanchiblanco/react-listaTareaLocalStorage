import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { crearTarea, leerTareas } from "../helpers/queries";
import Swal from "sweetalert2";

const FormularioTarea = () => {

  const [tareas, setTareas] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    obtenerTareas()
  },[])

  const obtenerTareas = async () =>{
    const respuesta = await leerTareas()
    if(respuesta.status===200){
      const datos = await respuesta.json()
      setTareas(datos)
    }else{
      console.info('Ocurrio un error al buscar las tareas')
    }
  }

  const agregarTareas = async (tarea) => {
    const respuesta = await crearTarea(tarea);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Tarea agregada!",
          text: `Se agrego ${tarea.inputTarea} a la lista.`,
          icon: "success",
        });
        reset();
        obtenerTareas()
      }
  };

  const borrarTarea = (nombreTarea) => {
    const tareasFiltradas = tareas.filter((item) => item !== nombreTarea);
    setTareas(tareasFiltradas);
  };

  return (
    <section>
      <Form onSubmit={handleSubmit(agregarTareas)} className="mb-4">
        <Form.Group className="mb-3 d-flex gap-2">
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
          <Button variant="success" type="submit">
            Enviar
          </Button>
        </Form.Group>
        <Form.Text className="text-danger">
          {errors.inputTarea?.message}
        </Form.Text>
      </Form>
      <ListaTareas tareas={tareas} borrarTarea={borrarTarea} setTareas={setTareas}></ListaTareas>
    </section>
  );
};

export default FormularioTarea;
