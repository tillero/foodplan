import {
  Card,
  Skeleton,
  Group,
  Text,
  NumberInput,
  CloseButton,
  NativeSelect,
  Stack,
  Container,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

const IngredientCard = ({ product, onClose, onUpdate, index }) => {
  const { image, label, name, quantity } = product;
  const initialWeight = quantity ? parseInt(quantity.split(" ")[0]) : 1;
  const initialScale = quantity ? quantity.split(" ")[1] : "Stk.";
  const [scale, setScale] = useState(
    initialScale === "Stück" ? "Stk." : initialScale
  );
  const [weight, setWeight] = useState(initialWeight);

  const onCloseClick = (event) => {
    onClose(product);
  };

  const onScaleChange = (value) => {
    setScale(value);
    if (["g", "ml"].includes(value) && weight < 10) {
      setWeight(100);
    } else if (weight > 10) {
      setWeight(1);
    }
    onChange();
  };

  const onChange = () => {
    product.weight = weight;
    product.scale = scale;
    onUpdate(product, index);
  };

  return (
    <Card
      shadow="sm"
      p="4px 6px"
      radius="md"
      withBorder
      sx={{ height: 110, width: 210 }}
    >
      <Group position="center" spacing={0}>
        {image ? (
          <Image
            src={image.replace(/\{stack\}/, "mo-boxed/v-w-96-h-96")}
            alt={label}
            width={72}
            height={72}
          />
        ) : (
          <Skeleton animate={false} height={72} width={72} radius="xl" />
        )}
        <Container size={170} p={0}>
          <Stack justify="space-between" spacing={5}>
            <Stack justify="flex-start" spacing={0}>
              <Group position="right">
                <CloseButton onClick={onCloseClick} size="sm" />
              </Group>
              <Text
                size={name.length > 16 ? "xs" : "sm"}
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "120px",
                  height: "37px",
                }}
                lineClamp={2}
              >
                {name}
              </Text>
            </Stack>
            {quantity ? (
              <NumberInput
                step={scale === "Stk." ? 1 : 5}
                sx={{ maxWidth: "90px" }}
                size="xs"
                stepHoldDelay={500}
                min={1}
                value={weight}
                onChange={(val) => {
                  setWeight(val);
                  onChange();
                }}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                parser={(value) =>
                  value.replace(/[\p{Letter}\p{Mark}\s-]+/gu, "")
                }
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `${value} ${scale}`
                    : ` ${scale}`
                }
              ></NumberInput>
            ) : (
              <Group position="center" spacing={3}>
                <NumberInput
                  sx={{ maxWidth: "60px" }}
                  stepHoldDelay={500}
                  stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                  size="xs"
                  min={1}
                  step={["g", "ml"].includes(scale) ? 5 : 1}
                  value={weight}
                  onChange={(val) => {
                    setWeight(val);
                    onChange();
                  }}
                />
                <NativeSelect
                  sx={{ maxWidth: "60px" }}
                  size="xs"
                  value={scale}
                  data={["Stk.", "g", "ml", "dl", "EL", "TL"]}
                  onChange={(event) => onScaleChange(event.currentTarget.value)}
                />
              </Group>
            )}
          </Stack>
        </Container>
      </Group>
    </Card>
  );
};

export default IngredientCard;
