import React, { useEffect, useState } from "react";
import {
  Grid,
  TextInput,
  Select,
  FileButton,
  Avatar,
  Button,
  ActionIcon,
  Group,
  Flex,
  Text,
  Table,
  Badge,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  IconPhone,
  IconIndentDecrease,
  IconUser,
  IconCalendar,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { QrScanner } from "@yudiel/react-qr-scanner";

import { getRules, selectRules } from "../../app/slices/RuleSlice";
import { getStations, selectStations } from "../../app/slices/PSSlice";
import VehicleData from "../../Data/vehicle.json";

function PSDriver() {
  const dispatch = useDispatch();
  const rules = useSelector(selectRules);
  const stations = useSelector(selectStations);

  useEffect(() => {
    dispatch(getRules());
  }, []);
  useEffect(() => {
    dispatch(getStations());
  }, []);

  useEffect(() => {
    console.log("Rules...........", rules);
  }, [rules]);

  useEffect(() => {
    console.log("stations...........", stations);
  }, [stations]);

  useEffect(() => {
    console.log("vehicles...........", VehicleData);
  }, [VehicleData]);

  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>
        <Flex direction="column" gap="sm">
          <Badge>Driving without a valid fitness certificate</Badge>
          <Badge>Driving without registration</Badge>
        </Flex>
      </td>
      <td>Wp KD 7826</td>
      <td>A1</td>
      <td>Kandy Police Area</td>
      <td>2023/08/04</td>
      <td>2023/08/04</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>
        <Button>Close</Button>
      </td>
    </tr>
  ));
  return (
    <div>
      <Grid
        style={{
          marginTop: 10,
          marginBottom: 20,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <Grid.Col md={3}>
          <QrScanner
            onDecode={(result) => console.log(result)}
            onError={(error) => console.log(error?.message)}
          />
        </Grid.Col>
        <Grid.Col md={9}>
          <Grid>
            <Grid.Col md={3}>
              <Avatar
                mt="xl"
                src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                size={"100%"}
                radius="xl"
              />
            </Grid.Col>
            <Grid.Col md={9}>
              <Grid>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Name"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Other Name"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Gender"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Mobile Number"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Birth Day"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Blood Type"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Address"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Issued Date"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
                <Grid.Col md={4}>
                  <TextInput
                    mt="xl"
                    label="Expired Date"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    variant="default"
                    icon={<IconUser size={20} />}
                    value="value"
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid
        style={{
          marginTop: 10,
          marginBottom: 20,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <Grid.Col md={12}>
          <Table
            withColumnBorders
            withBorder
            highlightOnHover
            striped
            style={{ overflowX: "scroll" }}
          >
            <thead>
              <tr>
                <th>Penalty ID</th>
                <th>Penalty</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Police Area</th>
                <th>Issued Date</th>
                <th>Expire Date</th>
                <th>Is Court</th>
                <th>Is Active</th>
                <th>Button</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default PSDriver;
