# Pruebas con React y TypeScript

# Laboratorio

## Instalación

1. Clona este repositorio e instala las depedencias con yarn o npm

```bash
yarn install
```

```bash
npm install
```

## Pruebas de Regresión: Snapshot testing

1. A partir del código HTML que se usa para mostrar una tarea en la lista, crea un componente para poder reusar la funcionalidad y probarla
1. Crea en la carpeta de `components` un nuevo archivo `TaskItem.tsx` con el siguiente contenido. Este será un componente que recibe una propiedad `task` de tipo `Task` y debe recibir otra una propiedad (callback) `onTaskSelected` que informe al componente padre cuando la tarea se haya checkeado.

```typescript
import { Checkbox } from "@chakra-ui/checkbox";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Task } from "../models/Task";

interface TaskItemProps {
  task: Task;
  onTaskChange?: (taskId: string, isCompleted: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskChange }) => {
  const handleTaskChange = () => {
    onTaskChange?.(task.id, !task.isCompleted);
  };

  return (
    <Box rounded="md" bg="white" padding="6" margin="1" shadow="sm">
      <Checkbox
        onChange={handleTaskChange}
        isChecked={task.isCompleted}
        colorScheme="purple"
      >
        {task.name}
      </Checkbox>
    </Box>
  );
};
```

1. Remplaza en el archivo `App.tsx` el listado antiguo y usa el componente que acabas de crear

1. En la carpeta de `components` crea un archivo para las pruebas del nuevo componente creado `TaskItem.test.tsx` con el siguiente contenido

```typescript
import { render } from "../test-utils";
import { TaskItem } from "./TaskItem";

describe("TaskItem", () => {
  test("should render correctly based on the provided props", () => {
    const component = render(
      <TaskItem task={{ id: "test-id", completed: false, name: "Test name" }} />
    );

    expect(component).toMatchSnapshot();
  });
});
```

> **Nota:** al crear snapshots, si el snapshot no existe se creará en la carpeta `snapshots`, si ya existe el contenido se comparará para hacer la prueba de regresión

1. Corre las pruebas usando el comando `yarn test`, esto creara un snapshot nuevo
1. Corre las pruebas de nuevo, esto comparará el snapshot presente con el resultado de renderizar el componente
1. Ajusta el estilo del componente, por ejemplo cambia el valor de la propiedad `shadow` de `md` a `sm`
1. Corre las pruebas de nuevo, en este caso las pruebas fallarán porque el snapshot del componente ha cambiado, como es un cambio esperado presiona `w` en la consola donde estas corriendo las pruebas, y despues presiona `u`. Esto actualizara los snapshots a la nueva versión, felicitaciones haz hecho tu primera prueba de regresión para componentes de react

## Interacción con componentes y Mocks

1. Ahora probaremos que al dar click al componente la función `onTaskChange` es llamada, para esto crea una nueva prueba en el archivo `TaskItem.test.tsx` con el siguiente contenido:

```typescript
import { screen, fireEvent } from "@testing-library/react";

...

test("should call the 'onTaskChange' function with false if the task is checked", async () => {
    const mockOnTaskChanged = jest.fn();
    render(
      <TaskItem
        task={{ id: "test-id", isCompleted: false, name: "Test name" }}
        onTaskChange={mockOnTaskChanged}
      />
    );

    const checkbox = await screen.findByText("Test name");
    fireEvent.click(checkbox);

    expect(mockOnTaskChanged).toHaveBeenCalled();
  });
```

> **Nota 1:** `jest.fn()` se usa para crear una funcion mock, que despues se puede usar para saber si fue llamada o no

> **Nota 2:** Para poder hacer click en componentes o usar el teclado debemos importar la libreria `fireEvent`
