import { useRouter } from "next/router";

import {
  Box,
  TextInput,
  Group,
  Button,
  Title,
  Space,
  MediaQuery,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import IngredientList from "./IngredientList";
import StepsDisplay from "./StepDisplay";
import { useState } from "react";

const CreateRecipeForm = ({ saveRecipe, recipe }) => {
  const router = useRouter();
  const [steps, setSteps] = useState(recipe.steps);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const form = useForm({
    initialValues: {
      title: recipe.title,
      steps: steps,
      portions: recipe.portions,
      duration: recipe.duration,
    },
    validate: {
      title: (value) =>
        value.length > 0 ? null : "Titel darf nicht leer sein",
      steps: (value) =>
        steps.length < 2 && steps[0] === ""
          ? "Schritt 1 darf nicht leer sein"
          : null,
    },
  });

  const onSubmit = () => {
    form.clearErrors();
    form.validate();
    const recipe = {
      title: form.values.title,
      steps,
      ingredients,
      portions: form.values.portions,
      duration: form.values.duration,
    };
    saveRecipe(recipe);
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
        <IngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <Space h="md" />
        <StepsDisplay
          steps={steps}
          setSteps={setSteps}
          {...form.getInputProps("steps")}
        />
        <Space h="md" />
        <Group spacing="xl">
          <NumberInput
            sx={{ width: "150px" }}
            label="Anzahl Portionen"
            placeholder="Portionen"
            min={1}
            max={100}
            {...form.getInputProps("portions")}
          />
          <NumberInput
            sx={{ width: "150px" }}
            label="Zubereitungsdauer"
            min={5}
            max={995}
            step={5}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            placeholder="hh:mm"
            {...form.getInputProps("duration")}
            parser={(value) => {
              if (value.includes("h")) {
                const hour = parseInt(value.split("h")[0]);
                const minute = parseInt(value.split("h")[1]);
                return toString(minute + hour * 60);
              } else {
                return value;
              }
            }}
            formatter={(value) => {
              const number = parseInt(value);
              if (Number.isNaN(number)) return "";
              else {
                const hour = parseInt(number / 60).toLocaleString("de-CH", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                });
                const minute = (number % 60).toLocaleString("de-CH", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                });
                return `${hour}h${minute}m`;
              }
            }}
          />
        </Group>
        <Space h="md" />
        <Group position="left" mt="md">
          <Button type="submit">Speichern</Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateRecipeForm;
