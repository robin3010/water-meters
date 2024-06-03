import { IMeterArea, IMeterNode } from 'store/types/types';

export const getOffset = (offset: number | null) => {
  return typeof offset === 'number' ? `offset=${offset}` : '';
};

export const getUniqueAddrIds = (meters: IMeterNode[]) => {
  const addrIds = meters.map((meter) => meter.area.id);

  const uniqueAddrIds = [...new Set(addrIds)];

  return uniqueAddrIds;
};

export const getUniqueAddrToFetch = (
  areas: IMeterArea[],
  areaIds: string[]
) => {
  const uniqueIds = areaIds.reduce((acc, id) => {
    const check = areas.map((area) => area.id);

    if (check.every((idFromStore) => idFromStore !== id)) acc.push(id);
    return acc;
  }, [] as string[]);
  return uniqueIds;
};

export const combineAreas = (
  fetchedAreas: IMeterArea[],
  storedAreas: IMeterArea[]
) => {
  if (!fetchedAreas.length) return storedAreas;

  const uniqueAreas = fetchedAreas.reduce((acc, fetched) => {
    if (fetched !== undefined) {
      if (acc.every((stored) => stored.id !== fetched.id)) acc.push(fetched);
    }

    return acc;
  }, storedAreas);

  return uniqueAreas;
};
