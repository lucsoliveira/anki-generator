"use client";
import { useEffect, useState } from "react";
import { HealthStatusItem, HealthStatusStyle, StatusCircle } from "./styles";
import { Box } from "@/shared/UI/Box";
import { useServices } from "@/shared/hooks";
import { Typography } from "@mui/material";

export function HealthStatus() {
  const [servicesStatus, setServicesStatus] = useState({
    api: false,
    ankiConnect: false,
  });

  const { getHealth } = useServices();
  useEffect(() => {
    getHealth()
      .then((res) => {
        setServicesStatus({
          ankiConnect: res.ankiConnect,
          api: res.api,
        });
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  const getColor = (status: boolean) => {
    if (status) {
      return "green";
    } else {
      return "red";
    }
  };
  return (
    <Box title="Status">
      <HealthStatusStyle>
        <HealthStatusItem>
          <StatusCircle
            style={{
              backgroundColor: getColor(servicesStatus.api),
            }}
          />
          <Typography>API</Typography>
        </HealthStatusItem>
        <HealthStatusItem>
          <StatusCircle
            style={{
              backgroundColor: getColor(servicesStatus.ankiConnect),
            }}
          />
          <Typography>Anki Connect</Typography>
        </HealthStatusItem>
      </HealthStatusStyle>
    </Box>
  );
}
