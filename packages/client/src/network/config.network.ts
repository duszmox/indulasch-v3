import axios, { isAxiosError } from 'axios';
import { Config, ConfigDto } from '../types/config.type';
import { API_URL } from '../config/environment.config';
import { useEffect, useState } from 'react';
import { useInterval } from '../utils/useInterval';

export function useConfigQuery(id: string) {
  const url = new URL(API_URL + '/' + id);
  const [config, setConfig] = useState<Config>();
  const [fail, setFail] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const request = () => {
    axios
      .get<ConfigDto>(url.toString())
      .then((response) => {
        setConfig(response.data.config);
        setFail(false);
        setNotFound(false);
        if (response.data.refreshNeeded) location.reload();
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          console.log(err.response);
          if (err.response?.status === 404) {
            setNotFound(true);
          } else setFail(true);
        } else {
          setFail(true);
        }
      });
  };
  useInterval(request, 30000);
  useEffect(request, [id]);
  return { config, fail, notFound, request };
}