import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT } from "../App";
import { KeyedMutator } from "swr";
import { Todo } from "../App";

const AddTodo = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  const createTodo = async (todo: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Todo"
            placeholder="Add more details"
            {...form.getInputProps("body")}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          ADD TODO
        </Button>
      </Group>
    </>
  );
};

export default AddTodo;
