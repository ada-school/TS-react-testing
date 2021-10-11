import { Box, Button, Checkbox, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Task } from "./models/Task";

const createTaskId = () => String(Math.floor(Math.random() * 1000));

export const App = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [taskName, setTaskName] = useState("");

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: createTaskId(), name: taskName, isCompleted: false },
    ]);
    setTaskName("");
  };

  const handleTaskChange = (taskId: string, isCompleted: boolean) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isCompleted };
        }

        return task;
      })
    );
  };

  return (
    <Flex justify="center">
      <Box w="800px">
        <Heading as="h1" size="sm" my="6">
          Create a Task
        </Heading>
        <Flex
          rounded="md"
          bg="white"
          padding="6"
          marginY="6"
          gridGap="1rem"
          shadow="md"
        >
          <Input
            value={taskName}
            onChange={handleTaskNameChange}
            placeholder="Your task name"
          />
          <Button onClick={handleAddTask} colorScheme="purple">
            Add Task
          </Button>
        </Flex>
        <Flex as="ul" gridGap="1" direction="column"></Flex>
        {tasks.map((task, index) => (
          <Box
            key={index}
            rounded="md"
            bg="white"
            padding="6"
            margin="1"
            shadow="md"
          >
            <Checkbox
              colorScheme="purple"
              onChange={() => handleTaskChange(task.id, task.isCompleted)}
            >
              {task.name}
            </Checkbox>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};
