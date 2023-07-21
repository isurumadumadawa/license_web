import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Grid,
  TextInput,
  Select,
  Avatar,
  Button,
  ActionIcon,
  Text,
  Image,
  Flex,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconPhone,
  IconIndentDecrease,
  IconUser,
  IconCalendar,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import Resizer from "react-image-file-resizer";
import moment from "moment";
import { toPng } from "html-to-image";

import genderData from "../../Data/gender.json";
import bloodData from "../../Data/blood.json";
import VehicleData from "../../Data/vehicle.json";
import GovernmentLogo from "../../assets/images/GovernmentLogo.png";
import Flag from "../../assets/images/Flag.png";

import { getDriver, selectDriver } from "../../app/slices/DriverSlice";

function DriverView({ driver: driverProps }) {
  const dispatch = useDispatch();
  const driver = useSelector(selectDriver);
  const ref = useRef(null);

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(driver.image);
        const blob = await response.blob();
        const file = new File([blob], "image");
        const base64 = await blobToBase64(blob);
        const resizeImage = await resizeFile(file);

        setImage(resizeImage);
      } catch (error) {
        setImage(null);
      }
    };

    fetchImage();
  }, [driver]);

  useEffect(() => {
    console.log("image......", image);
  }, [image]);

  useEffect(() => {
    dispatch(
      getDriver({
        uuid: driverProps?.driver?.uuid ? driverProps?.driver?.uuid : "",
      })
    );
  }, [driverProps]);

  const onDownloadButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function getValueByLabel(arr, label) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].label === label) {
        return arr[i].value;
      }
    }
    return null; // Return null if no matching label is found
  }

  return (
    <>
      <Grid>
        <Grid.Col md={2} lg={2}>
          <Grid.Col md={12} lg={12}>
            <Avatar mt="xl" src={driver.image} size={"100%"} />
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
                value={driver.name}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Other Name"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconUser size={20} />}
                value={driver.otherName}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Select
                mt="xl"
                label="Gender"
                data={genderData}
                icon={<IconIndentDecrease size={20} />}
                value={getValueByLabel(genderData, driver.gender)}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Mobile Number"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconPhone size={20} />}
                value={driver.mobileNumber}
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
                value={driver.dob ? new Date(driver.dob) : ""}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Select
                mt="xl"
                label="Blood Type"
                data={bloodData}
                value={getValueByLabel(bloodData, driver.bloodType)}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <TextInput
                mt="xl"
                label="Address"
                inputWrapperOrder={["label", "input", "description", "error"]}
                variant="default"
                icon={<IconUser size={20} />}
                value={driver.address}
              />
            </Grid.Col>

            <Grid.Col md={6} lg={4}>
              <DateInput
                valueFormat="YYYY-MM-DD"
                mt="xl"
                allowDeselect
                label="Issued Date"
                mx="auto"
                icon={<IconCalendar size={20} />}
                value={driver.issuedDate ? new Date(driver.issuedDate) : ""}
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
                value={driver.expireDate ? new Date(driver.expireDate) : ""}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col
          style={{
            marginTop: 30,

            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Text size={15} color="blue">
            Allowed Vehicles
          </Text>
        </Grid.Col>
        {driver.vehicles &&
          driver.vehicles.map((vehicle, index) => (
            <Grid
              key={index}
              style={{
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              <Grid.Col md={12}></Grid.Col>
              <Grid.Col md={4}>
                <Select
                  label="Vehicle Type"
                  data={VehicleData}
                  icon={<IconIndentDecrease size={20} />}
                  value={vehicle?.DriverVehicle?.vehicleId}
                />
              </Grid.Col>
              <Grid.Col md={4}>
                <DateInput
                  valueFormat="YYYY-MM-DD"
                  allowDeselect
                  label="Issued Date"
                  mx="auto"
                  icon={<IconCalendar size={20} />}
                  value={
                    vehicle?.DriverVehicle?.issuedDate
                      ? new Date(vehicle?.DriverVehicle?.issuedDate)
                      : ""
                  }
                />
              </Grid.Col>
              <Grid.Col md={4}>
                <DateInput
                  valueFormat="YYYY-MM-DD"
                  allowDeselect
                  label="Issued Date"
                  mx="auto"
                  icon={<IconCalendar size={20} />}
                  value={
                    vehicle?.DriverVehicle?.expireDate
                      ? new Date(vehicle?.DriverVehicle?.expireDate)
                      : ""
                  }
                />
              </Grid.Col>
            </Grid>
          ))}
        <Grid.Col
          style={{
            marginTop: 30,

            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Text size={15} color="blue">
            Driving Licence
          </Text>
        </Grid.Col>
        <Grid.Col
          style={{
            marginTop: 30,

            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Grid
            style={{
              border: "1px solid black",
              padding: 20,
              borderRadius: 10,
              backgroundColor: "white",
            }}
            ref={ref}
          >
            <Grid.Col>
              <Grid>
                <Grid.Col sm={2}>
                  <Image size={100} src={Flag} style={{ width: 100 }} />
                </Grid.Col>
                <Grid.Col sm={8}>
                  <Flex align="center" justify="center" direction="column">
                    <Text size={20} c="blue" fw={500}>
                      DRIVING LICENCE
                    </Text>
                    <Text c="blue" fw={500}>
                      DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA
                    </Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col sm={2}>
                  <Image
                    size={100}
                    src={GovernmentLogo}
                    style={{ width: 100 }}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col>
              <Grid>
                <Grid.Col sm={2}>
                  <Avatar
                    size={100}
                    src={driver.image}
                    style={{ width: 100 }}
                    radius={50}
                  />
                </Grid.Col>
                <Grid.Col sm={6} style={{ paddingLeft: 50 }}>
                  <Flex align="flex-start" justify="center" direction="column">
                    <Text size={15} fw={500}>{`Name ${driver?.name}`}</Text>
                    <Text
                      size={15}
                      fw={500}
                    >{`Address - ${driver?.address}`}</Text>
                    <Text size={15} fw={500}>{`Date of birth - ${moment(
                      new Date(driver?.dob)
                    ).format("MM-DD-YYYY")}`}</Text>
                    <Text size={15} fw={500}>{`Issued Date -${moment(
                      new Date(driver?.issuedDate)
                    ).format("MM-DD-YYYY")}`}</Text>
                    <Text size={15} fw={500}>{`Expire Date - ${moment(
                      new Date(driver?.expireDate)
                    ).format("MM-DD-YYYY")}`}</Text>
                    <Text
                      size={15}
                      fw={500}
                    >{`Blood Type - ${driver?.bloodType}`}</Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col sm={4}>
                  <QRCode
                    style={{ height: "200", width: "200" }}
                    value={JSON.stringify({ ...driver, vehicles: [] })}
                    viewBox={`0 0 256 256`}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            {/* <Grid.Col>
              <Flex align="center" justify="flex-end">
                ewkjrerbg
              </Flex>
            </Grid.Col> */}
          </Grid>
        </Grid.Col>
        <Grid.Col>
          <Flex align="center" justify="flex-end" style={{ marginTop: 20 }}>
            <Button onClick={onDownloadButtonClick}>Download</Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default DriverView;
