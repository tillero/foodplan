import { useRouter } from "next/router";

import {
  Box,
  TextInput,
  Group,
  Button,
  Title,
  Space,
  MediaQuery,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import IngredientList from "./IngredientList";

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
    form.clearErrors();
    form.validate();
    /*signInWithEmailAndPassword(form.values.email, form.values.password)
      .then((authUser) => {
        setOpened(false);
      })
      .catch((error) => {
        form.setErrors({ password: error.message });
      });*/
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
      }}
      mx="auto"
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Title order={4}>Rezept erstellen</Title>
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Title order={3}>Rezept erstellen</Title>
      </MediaQuery>
      <Space h="md" />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group position="left">
          <div style={{ width: "35%", minWidth: "250px" }}>
            <TextInput
              withAsterisk
              label="Titel"
              placeholder="Mein Rezept"
              {...form.getInputProps("title")}
            />
          </div>
        </Group>
        <Space h="md" />
        <IngredientList />
        <Group position="left" mt="md">
          <Button type="submit">Speichern</Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateRecipeForm;
