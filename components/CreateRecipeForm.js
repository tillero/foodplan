import { useRouter } from "next/router";
import { useState } from "react";

import {
  Box,
  TextInput,
  Text,
  Group,
  Button,
  Autocomplete,
} from "@mantine/core";
import ProductSearch from "./ProductSearch";
import { useForm } from "@mantine/form";
import Image from "next/image";

const CreateRecipeForm = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) =>
        value.length > 0 ? null : "Titel darf nicht leer sein",
    },
  });

  const onSubmit = () => {
    /*form.clearErrors();
    form.validate();
    signInWithEmailAndPassword(form.values.email, form.values.password)
      .then((authUser) => {
        setOpened(false);
      })
      .catch((error) => {
        form.setErrors({ password: error.message });
      });*/
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Titel"
          placeholder="Mein Rezept"
          {...form.getInputProps("title")}
        />
        <ProductSearch />
        <Group position="right" mt="md">
          <Button type="submit">Speichern</Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateRecipeForm;
