import React, { useState } from "react";
import { IconGauge, IconUser } from "@tabler/icons-react";
import { Navbar, NavLink, Box } from "@mantine/core";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

function NavbarComponent() {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const data = [
    {
      icon: IconGauge,
      label: "Dashboard",
      description: "Driver's List",
      path: "/dmt-dashboard",
    },
    {
      icon: IconUser,
      label: "Driver Registration",
      description: "Add driver details",
      path: "/dmt-driver-registration",
    },
  ];

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active && location.pathname === item.path}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        setActive(index);
        navigate(item.path);
      }}
    />
  ));
  return (
    <Navbar width={{ base: 230 }} p="xs">
      <Box w={220}>{items}</Box>
    </Navbar>
  );
}

export default NavbarComponent;
