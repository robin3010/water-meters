import { FETCH_LIMIT_PARAM } from 'consts/consts';

export const fetchMeters = (offsetStr: string, methods?: RequestInit) => {
  return fetch(
    `/baseUrl/api/v4/test/meters/?limit=${FETCH_LIMIT_PARAM}&${offsetStr}`,
    methods
  );
};

export const removeMeter = (id: string) => {
  return fetch(`/baseUrl/api/v4/test/meters/${id}/`, { method: 'DELETE' });
};

export const fetchAreaById = (id: string) => {
  return fetch(`/baseUrl/api/v4/test/areas/${id}/`);
};
