import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../shared/UI/Box';
import axios from 'axios';
const HealthStatusStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;

const HealthStatusItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: baseline;
`;

const StatusCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
`;
export function HealthStatus() {
  const [servicesStatus, setServicesStatus] = useState({
    api: false,
    ankiConnect: false,
  });

  async function fetchServicesStatus() {
    try {
      const result = await axios.get('http://localhost:3001/health');
      const data: {
        data: {
          api: {
            status: string;
            uptime: number;
          };
          ankiConnect: {
            status: string;
          };
        };
      } = result.data;

      const statusAnkiConnect = data.data.ankiConnect.status === 'UP';
      const statusApi = data.data.api.status === 'UP';

      return {
        success: true,
        api: statusApi,
        ankiConnect: statusAnkiConnect,
      };
    } catch (error) {
      return {
        success: false,
        api: false,
        ankiConnect: false,
      };
    }
  }

  useEffect(() => {
    fetchServicesStatus()
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
      return 'green';
    } else {
      return 'red';
    }
  };
  return (
    <Box padding={15}>
      <HealthStatusStyle>
        <HealthStatusItem>
          <StatusCircle
            style={{
              backgroundColor: getColor(servicesStatus.api),
            }}
          />
          <p>API</p>
        </HealthStatusItem>
        <HealthStatusItem>
          <StatusCircle
            style={{
              backgroundColor: getColor(servicesStatus.ankiConnect),
            }}
          />
          <p>Anki Connect</p>
        </HealthStatusItem>
      </HealthStatusStyle>
    </Box>
  );
}