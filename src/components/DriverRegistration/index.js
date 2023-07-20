import React from "react";
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
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconPhone,
  IconIndentDecrease,
  IconUser,
  IconCalendar,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";

import { uploadProfileImage } from "../../Services/DriverAPI";
import {
  createDriver,
  selectCreatedDriver,
} from "../../app/slices/DriverSlice";

import genderData from "../../Data/gender.json";
import bloodData from "../../Data/blood.json";
import VehicleData from "../../Data/vehicle.json";

function DriverRegistration() {
  const form = useForm({
    initialValues: {
      name: "",
      otherName: "",
      gender: "",
      mobileNumber: "",
      dob: "",
      bloodType: "",
      address: "",
      issuedDate: "",
      expireDate: "",
      image:
        "https://res.cloudinary.com/di8mmuuyj/image/upload/v1689177182/jobSeeker/gd4eptbjd86gvwmsiafg.jpg",
      vehicles: [],
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required!"),
      otherName: (value) =>
        value.trim().length > 0 ? null : "Other name is required!",
      gender: (value) =>
        value.trim().length > 0 ? null : "Gender is required!",
      mobileNumber: (value) => {
        const isValid = /^0\d{9}$/.test(value);
        return isValid ? null : "Invalid mobile number!";
      },
      dob: (value) => {
        const date = new Date(value);
        return isNaN(date) ? "Invalid date of birth!" : null;
      },
      issuedDate: (value) => {
        const date = new Date(value);
        return isNaN(date) ? "Invalid issued date!" : null;
      },
      expireDate: (value) => {
        const date = new Date(value);
        return isNaN(date) ? "Invalid expire date!" : null;
      },
      bloodType: (value) =>
        value.trim().length > 0 ? null : "Blood type is required!",
      address: (value) =>
        value.trim().length > 0 ? null : "Address is required!",
      vehicles: {
        vehicleId: (value) =>
          value.trim().length > 0 ? null : "Vehicle type is required!",
        issuedDate: (value) => {
          const date = new Date(value);
          return isNaN(date) ? "Invalid issued date!" : null;
        },
        expireDate: (value) => {
          const date = new Date(value);
          return isNaN(date) ? "Invalid expire date!" : null;
        },
      },
    },
  });

  const dispatch = useDispatch();
  const driver = useSelector(selectCreatedDriver);

  const onDriverRegistration = (values) => {
    dispatch(
      createDriver({
        userName: form.values.mobileNumber,
        password: "123456",
        name: form.values.name,
        otherName: form.values.otherName,
        dob: form.values.dob,
        mobileNumber: form.values.mobileNumber,
        gender: form.values.gender,
        bloodType: form.values.bloodType,
        address: form.values.address,
        image: form.values.image,
        issuedDate: form.values.issuedDate,
        expireDate: form.values.expireDate,
        vehicles: form.values.vehicles,
      })
    );
    form.reset();
  };

  const onUploadImage = async (file) => {
    const profileUrl = await uploadProfileImage(file);
    form.setFieldValue("image", profileUrl);
  };

  const fields = form.values.vehicles.map((item, index) => (
    <Grid
      key={index}
      style={{
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      <Grid.Col md={3}>
        <Select
          label="Vehicle Type"
          data={VehicleData}
          icon={<IconIndentDecrease size={20} />}
          {...form.getInputProps(`vehicles.${index}.vehicleId`)}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <DateInput
          valueFormat="YYYY-MM-DD"
          allowDeselect
          label="Issued Date"
          mx="auto"
          icon={<IconCalendar size={20} />}
          {...form.getInputProps(`vehicles.${index}.issuedDate`)}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <DateInput
          valueFormat="YYYY-MM-DD"
          allowDeselect
          label="Issued Date"
          mx="auto"
          icon={<IconCalendar size={20} />}
          {...form.getInputProps(`vehicles.${index}.expireDate`)}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <ActionIcon
          color="red"
          onClick={() => form.removeListItem("vehicles", index)}
          variant="filled"
          radius="lg"
          size="sm"
        >
          <IconX size="15" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  ));

  return (
    <form onSubmit={form.onSubmit(onDriverRegistration)}>
      <Grid>
        <Grid.Col md={2} lg={2}>
          <Grid.Col md={12} lg={12}>
            <Avatar mt="xl" src={form.values.image} size={"100%"} />
          </Grid.Col>
          <Grid.Col md={12} lg={12}>
            <FileButton onChange={onUploadImage} accept="image/png,image/jpeg">
              {(props) => (
                <Button fullWidth {...props}>
                  Upload image
                </Button>
              )}
            </FileButton>
          </Grid.Col>
        </Grid.Col>
        <Grid.Col md={10} lg={10}>
          <Grid>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Name"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconUser size={20} />}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Other Name"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconUser size={20} />}
                {...form.getInputProps("otherName")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Select
                mt="xl"
                label="Gender"
                data={genderData}
                icon={<IconIndentDecrease size={20} />}
                {...form.getInputProps("gender")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Mobile Number"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconPhone size={20} />}
                {...form.getInputProps("mobileNumber")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <DateInput
                valueFormat="YYYY MM DD"
                mt="xl"
                allowDeselect
                label="Birth Day"
                mx="auto"
                icon={<IconCalendar size={20} />}
                {...form.getInputProps("dob")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Select
                mt="xl"
                label="Blood Type"
                data={bloodData}
                {...form.getInputProps("bloodType")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Address"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconUser size={20} />}
                {...form.getInputProps("address")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}></Grid.Col>
            <Grid.Col md={6} lg={4}></Grid.Col>

            <Grid.Col md={6} lg={4}>
              <DateInput
                valueFormat="YYYY-MM-DD"
                mt="xl"
                allowDeselect
                label="Issued Date"
                mx="auto"
                icon={<IconCalendar size={20} />}
                {...form.getInputProps("issuedDate")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <DateInput
                valueFormat="YYYY-MM-DD"
                mt="xl"
                allowDeselect
                label="Expired Date"
                mx="auto"
                icon={<IconCalendar size={20} />}
                {...form.getInputProps("expireDate")}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col
          md={12}
          lg={12}
          style={{ marginTop: 35, paddingLeft: 50, paddingRight: 100 }}
        >
          <Flex align="center">
            <Text tt="capitalize" fw={500}>
              Add Category of Vehicles{" "}
            </Text>
            <ActionIcon
              color="blue"
              onClick={() =>
                form.insertListItem("vehicles", {
                  issuedDate: "",
                  expireDate: "",
                  vehicleId: "",
                })
              }
              variant="filled"
              radius="xl"
              style={{ marginLeft: 30 }}
            >
              <IconPlus size="30" />
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>
      {fields}
      <Grid>
        <Grid.Col md={8} lg={8} style={{ marginTop: 40 }}></Grid.Col>
        <Grid.Col md={4} lg={4} style={{ marginTop: 40 }}>
          <Button
            type="submit"
            leftIcon={<IconPlus />}
            style={{ width: "100%" }}
          >
            Add Driver
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default DriverRegistration;
