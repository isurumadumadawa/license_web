import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Table,
  ScrollArea,
  TextInput,
  Pagination,
  Flex,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconArrowUpRightCircle } from "@tabler/icons-react";

import { getDrivers, selectDrivers } from "../../app/slices/DriverSlice";
import { useStyles } from "./styles";
import DriverView from "../DriverView";

function DriversTable() {
  const dispatch = useDispatch();
  const drivers = useSelector(selectDrivers);

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  const rows = drivers.map((driver) => (
    <tr key={driver.uuid}>
      <td>
        <Avatar size={50} src={driver.driver.image} />
      </td>
      <td>{driver.driver.name}</td>
      <td>{driver.driver.otherName}</td>
      <td>{driver.driver.mobileNumber}</td>
      <td>{driver.driver.issuedDate}</td>
      <td>{driver.driver.expireDate}</td>
      <td>{driver.driver.gender}</td>

      <td>{driver.driver.bloodType}</td>
      <td>
        <ActionIcon
          variant="gradient"
          onClick={() => {
            setSelectedDriver(driver);
            open();
          }}
        >
          <IconArrowUpRightCircle size="1rem" />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        // value={search}
        onChange={() => {}}
      />
      <ScrollArea
        h={350}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th></th>
              <th>name</th>
              <th>otherName</th>
              <th>mobileNumber</th>
              <th>Issued Date</th>
              <th>Expire Date</th>
              <th>gender</th>
              <th>bloodType</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Flex align="center" justify="center">
        <Pagination total={3} style={{ marginTop: 30 }} />
      </Flex>
      <Modal size="xl" opened={opened} onClose={close}>
        <DriverView driver={selectedDriver} />
      </Modal>
    </>
  );
}

export default DriversTable;
