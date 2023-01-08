import {
  Button,
  Center,
  CloseButton,
  Space,
  Stack,
  Textarea,
  Group,
  MediaQuery,
} from "@mantine/core";

const StepsDisplay = ({ steps, setSteps, error }) => {
  const onChange = (event, i) => {
    const value = event.currentTarget.value;
    const newSteps = [...steps];
    newSteps[i] = value;
    setSteps(newSteps);
  };

  const addStep = (ev) => {
    const newSteps = [...steps];
    newSteps.push("");
    setSteps(newSteps);
  };

  const onClose = (index) => {
    const newSteps = [...steps];
    const filtered = newSteps.filter((v, i) => i !== index);
    setSteps(filtered);
  };

  return (
    <>
      <Stack>
        {steps.map((step, i) => {
          const schritt = (i + 1).toString();
          return (
            <Group grow position="apart" spacing="xs" key={i}>
              <Textarea
                sx={{
                  minWidth: "94%",
                  "@media (max-width: 950px)": {
                    minWidth: "90%",
                    maxWidth: "90%",
                  },
                  maxWidth: "94%",
                }}
                label={"Schritt " + schritt}
                placeholder="Anleitung"
                autosize
                error={i === 0 && error}
                withAsterisk={i === 0}
                value={step}
                onChange={(event) => onChange(event, i)}
                minRows={2}
              />
              {i !== 0 && (
                <>
                  <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <CloseButton
                      sx={{ maxWidth: 20 }}
                      onClick={(event) => onClose(i)}
                      title={"Schritt " + schritt + " löschen"}
                      size="xl"
                      iconSize={20}
                    />
                  </MediaQuery>
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <CloseButton
                      sx={{ maxWidth: 20 }}
                      onClick={(event) => onClose(i)}
                      title={"Schritt " + schritt + " löschen"}
                      size="sm"
                    />
                  </MediaQuery>
                </>
              )}
            </Group>
          );
        })}
      </Stack>
      <Space h="md" />
      <Center>
        <Button variant="subtle" onClick={addStep}>
          Schritt hinzufügen
        </Button>
      </Center>
    </>
  );
};

export default StepsDisplay;
