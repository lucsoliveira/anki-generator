import { useEffect, useState } from 'react';
import { Box } from '../../shared/UI/Box';
import { useFetch } from '../../shared/hooks/useFetch';
import { API_PATHS } from '../../shared/constants/paths';
import { HealthStatusItem, HealthStatusStyle, StatusCircle } from './styles';

export function HealthStatus() {
  const [servicesStatus, setServicesStatus] = useState({
    api: false,
    ankiConnect: false,
  });

  const { get } = useFetch();
  async function fetchServicesStatus() {
    try {
      const result = await get(API_PATHS.HEALTH);
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
    <Box title="Status" padding={10}>
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
