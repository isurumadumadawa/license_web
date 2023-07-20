import React, { useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Grid,
  Flex,
  Title,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDoorEnter, IconLock, IconUser } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";

import { login, selectAuth } from "../../app/slices/LoginSlice";

function Login() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      userName: (value) =>
        value.trim().length > 0 ? null : "User name is required!",

      password: (value) =>
        value.trim().length >= 5
          ? null
          : value.trim().length == 0
          ? "Password is required!"
          : "Password has minimum 5 characters!",
    },
  });

  const onLogin = ({ userName, password }) => {
    dispatch(login({ userName, password }));
  };

  // useEffect(() => {
  //   console.log("auth....", auth);
  // }, [auth.status]);
  return (
    <Flex
      justify="center"
      align="center"
      style={{ backgroundColor: "#EBF2F2", height: "100%" }}
    >
      <form onSubmit={form.onSubmit(onLogin)}>
        <Grid style={{ border: "1px solid blue", padding: 20 }}>
          <Grid.Col>
            <Title order={1}>Sign In</Title>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              mt="xl"
              label="Use Name"
              inputWrapperOrder={["label", "input", "description", "error"]}
              variant="default"
              {...form.getInputProps("userName")}
              icon={<IconUser size={20} />}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              mt="xl"
              label="Password"
              inputWrapperOrder={["label", "input", "description", "error"]}
              variant="default"
              {...form.getInputProps("password")}
              icon={<IconLock size={20} />}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Flex justify="center" align="center">
              {auth.status == "loaing" ? <Loader /> : null}
            </Flex>
          </Grid.Col>
          <Grid.Col span={12} style={{ marginTop: 30, marginBottom: 10 }}>
            <Button
              leftIcon={<IconDoorEnter size={20} />}
              variant="gradient"
              style={{ width: "100%" }}
              type="submit"
              disabled={!form.isValid()}
            >
              Sign In
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Flex>
  );
}

export default Login;
