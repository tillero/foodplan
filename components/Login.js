import { useRouter } from "next/router";

import { useAuth } from "../context/AuthUserContext";

import {
  Box,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const Login = ({ setOpened, setOpenedRegister }) => {
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Ungültige Email"),
      password: (value) =>
        value.length < 6
          ? "Passwort muss aus mindestens 6 Zeichen bestehen"
          : null,
    },
  });

  const onSubmit = () => {
    form.clearErrors();
    form.validate();
    signInWithEmailAndPassword(form.values.email, form.values.password)
      .then((authUser) => {
        setOpened(false);
      })
      .catch((error) => {
        form.setErrors({ password: error.message });
      });
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="deine@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Passwort"
          placeholder="Passwort"
          {...form.getInputProps("password")}
        />
        <Group position="apart" mt="md">
          <Anchor
            component="button"
            type="button"
            size="sm"
            onClick={() => {
              setOpened(false);
              setOpenedRegister(true);
            }}
          >
            Noch kein Account?
          </Anchor>
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Login;
