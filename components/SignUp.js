import { useRouter } from "next/router";

import { useAuth } from "../context/AuthUserContext";

import { Box, TextInput, PasswordInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

const SignUp = ({ setOpened }) => {
  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const form = useForm({
    initalValues: {
      email: "",
      passwordOne: "",
      passwordTwo: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Ungültige Email"),
      passwordOne: (value) =>
        value.length < 6
          ? "Passwort muss aus mindestens 6 Zeichen bestehen"
          : null,
      passwordTwo: (value) =>
        form.values.passwordOne === value
          ? null
          : "Passwörter müssen übereinstimmen",
    },
  });

  const onSubmit = () => {
    form.clearErrors();
    form.validate();
    createUserWithEmailAndPassword(form.values.email, form.values.passwordOne)
      .then((authUser) => {
        setOpened(false);
        router.push("/profile");
      })
      .catch((error) => {
        form.setErrors({ email: error.message });
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
          {...form.getInputProps("passwordOne")}
        />
        <PasswordInput
          withAsterisk
          label="Passwort wiederholen"
          placeholder="Passwort"
          {...form.getInputProps("passwordTwo")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Registrieren</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUp;
