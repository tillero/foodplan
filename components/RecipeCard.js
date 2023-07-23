import { Text, Card, Center, Space, Stack } from "@mantine/core";

const RecipeCard = ({ recipe }) => {
  const { title, ingredients, duration, portions, _id } = recipe;
  const hour = parseInt(duration / 60).toLocaleString("de-CH", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minute = (duration % 60).toLocaleString("de-CH", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const durationFormatted = `${hour}h ${minute}m`;

  return (
    <Card
      shadow="sm"
      p="sm"
      radius="md"
      withBorder
      sx={{ height: 200, width: 180 }}
      component="a"
      href={"/rezepte/" + _id}
    >
      <Stack
        align="flex-start"
        justify="space-between"
        spacing="xs"
        sx={{ height: 170 }}
      >
        <div style={{ minWidth: 154 }}>
          <Center>
            <Text
              fw={500}
              lineClamp={1}
              truncate="true"
              size={title.length < 18 ? "md" : title.length < 25 ? "sm" : "xs"}
            >
              {title}
            </Text>
          </Center>
        </div>
        <Stack align="flex-start" spacing="xs" sx={{ height: 75 }}>
          {ingredients.length > 0 ? (
            ingredients.map((item, i) => {
              if (i > 2) {
                return;
              }
              return (
                <Text truncate="true" lineClamp={1} size="xs" key={i}>
                  {item.weight || item.scale
                    ? "-" + item.weight + " " + item.scale + " " + item.name
                    : item.quantity
                    ? "-" + item.quantity + " " + item.name
                    : "-" + item.name}
                </Text>
              );
            })
          ) : (
            <Text c="dimmed" size="sm">
              Keine Zutaten
            </Text>
          )}
        </Stack>
        <Stack align="flex-start">
          <Text size="sm">
            Portionen: {portions} <br />
            Dauer: {durationFormatted}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default RecipeCard;
