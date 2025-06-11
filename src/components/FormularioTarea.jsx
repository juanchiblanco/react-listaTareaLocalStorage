import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormularioTarea = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 d-flex gap-2">
          <Form.Control type="text" placeholder="Ingresa una tarea" />
          <Button variant="success">Enviar</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FormularioTarea;
