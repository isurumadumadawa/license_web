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
import { useForm } from "@mantine/form";
import moment from "moment";
import {
  IconPhone,
  IconIndentDecrease,
  IconUser,
  IconCalendar,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { notifications } from "@mantine/notifications";

import { getRules, selectRules } from "../../app/slices/RuleSlice";
import { getStations, selectStations } from "../../app/slices/PSSlice";
import { getDriverByMobile, selectDriver } from "../../app/slices/DriverSlice";
import { getPenalties, selectPenalty } from "../../app/slices//PenaltySlice";
import { updatePenaltyService } from "../../Services/PenaltyAPI";
import VehicleData from "../../Data/vehicle.json";

function PSDriver() {
  const dispatch = useDispatch();
  const rules = useSelector(selectRules);
  const stations = useSelector(selectStations);
  const driver = useSelector(selectDriver);
  const penalties = useSelector(selectPenalty);

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

  useEffect(() => {
    console.log("driver...........", driver);
    if (driver?.id) dispatch(getPenalties({ driverId: driver?.id }));
  }, [driver]);

  useEffect(() => {
    console.log("penalties...........", penalties);
  }, [penalties]);

  const form = useForm({
    initialValues: {
      mobileNumber: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      mobileNumber: (value) =>
        value.trim().length == 10 ? null : "Mobile number is required!",
    },
  });

  const onGetDriver = () => {
    dispatch(getDriverByMobile({ mobileNumber: form?.values?.mobileNumber }));
  };

  const onUpdatePenalty = async ({ penatyId, driverId }) => {
    try {
      const result = await updatePenaltyService({ penatyId });

      dispatch(getPenalties({ driverId }));
    } catch (error) {
      notifications.show({
        title: "Something Wrong !",
        message: "Can't Update Penalty",
        color: "red",
      });
    }
  };

  const rows = penalties?.map((penalty) => {
    let totPenalty = 0;

    penalty?.panelties?.map((p, i) => (totPenalty = totPenalty + p?.penalty));

    return (
      <tr key={penalty?.id}>
        <td>{penalty?.id}</td>
        <td>
          <Flex direction="column" gap="sm">
            {penalty?.panelties?.map((p, i) => {
              return <Badge key={i}>{p?.name}</Badge>;
            })}
          </Flex>
        </td>
        <td>{`RS ${totPenalty}.00`}</td>
        <td>{penalty?.vehicle?.category}</td>
        <td>{penalty?.vehicleNumber}</td>
        <td>{penalty?.policeArea?.name}</td>
        <td>
          {penalty?.issuedDate
            ? moment(new Date(penalty?.issuedDate)).format("MM-DD-YYYY")
            : ""}
        </td>
        <td>
          {penalty?.expireDate
            ? moment(new Date(penalty?.expireDate)).format("MM-DD-YYYY")
            : ""}
        </td>
        <td>{penalty?.isClosed ? "Completed" : "Pending"}</td>

        <td>
          {penalty?.isClosed ? null : (
            <Button
              type="button"
              onClick={() => {
                onUpdatePenalty({
                  driverId: penalty?.driverId,
                  penatyId: penalty?.id,
                });
              }}
            >
              Finalize
            </Button>
          )}
        </td>
      </tr>
    );
  });
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
        <Grid.Col md={12}>
          <form style={{ width: "100%" }} onSubmit={form.onSubmit(onGetDriver)}>
            <Grid>
              <Grid.Col md={9}>
                <TextInput
                  mt="xl"
                  //label="Use Name"
                  inputWrapperOrder={["label", "input", "description", "error"]}
                  variant="default"
                  {...form.getInputProps("mobileNumber")}
                  icon={<IconUser size={20} />}
                />
              </Grid.Col>
              <Grid.Col md={3}>
                <Button
                  style={{
                    marginTop: 25,
                  }}
                  fullWidth
                  disabled={!form.isValid()}
                  type="submit"
                >
                  Search Driver
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Grid.Col>
        <Grid.Col
          md={3}
          style={{
            marginTop: 10,
            marginBottom: 20,
          }}
        >
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
                src={
                  driver?.image
                    ? driver?.image
                    : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                }
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
                    value={driver?.name}
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
                    value={driver?.otherName}
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
                    value={driver?.gender}
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
                    value={driver?.mobileNumber}
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
                    value={
                      driver?.dob
                        ? moment(new Date(driver?.dob)).format("MM-DD-YYYY")
                        : ""
                    }
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
                    value={driver?.bloodType}
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
                    value={driver?.address}
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
                    value={
                      driver?.dob
                        ? moment(new Date(driver?.issuedDate)).format(
                            "MM-DD-YYYY"
                          )
                        : ""
                    }
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
                    value={
                      driver?.dob
                        ? moment(new Date(driver?.expireDate)).format(
                            "MM-DD-YYYY"
                          )
                        : ""
                    }
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
                <th>Amount</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Police Area</th>
                <th>Issued Date</th>
                <th>Expire Date</th>
                <th>Status</th>
                <th></th>
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
