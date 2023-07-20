import React from "react";
import { Button, Header, Flex, Avatar, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectAuth } from "../../app/slices/LoginSlice";

function HeaderComponent() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  return (
    <Header height={80} p="xs" style={{ backgroundColor: "#f0f1fa" }}>
      <Flex direction="row" align="center" justify="space-between">
        <Flex direction="row" align="center" justify="flex-start">
          {sessionStorage.getItem("roleId") == 2 ? (
            <>
              <Avatar
                size={60}
                src="https://logowik.com/content/uploads/images/sri-lanka-government8434.logowik.com.webp"
                style={{ marginLeft: 30 }}
                radius="xl"
              />
              <Text fw={700} fz="xl" c="blue" style={{ marginLeft: 30 }}>
                Department of Motor Traffic - Sri Lanka
              </Text>
            </>
          ) : null}
        </Flex>
        <Flex direction="row" align="center" justify="flex-end">
          <Avatar color="cyan" radius="xl" style={{ marginRight: 20 }}>
            {JSON.stringify(auth.user.userName)[1]}
          </Avatar>
          <Text fw={700} fz="md" c="blue" style={{ marginRight: 20 }}>
            {auth.user.userName}
          </Text>
          <Button onClick={() => dispatch(logout())}>Sign Out</Button>
        </Flex>
      </Flex>
    </Header>
  );
}

export default HeaderComponent;
