// lib/serviceSuburbs.ts

export const SERVICE_SUBURBS = {
  Gauteng: [
    "Mondeor",
    "Suideroord",
    "Winchester Hills",
    "Ormonde",
    "Alan Manor",
    "Glenanda",
    "Glenvista",
    "Liefde en Vriede",
  ],
} as const;

export type ServiceProvince = keyof typeof SERVICE_SUBURBS;
export type ServiceSuburb = (typeof SERVICE_SUBURBS)[ServiceProvince][number];

/**
 * Check if a suburb is serviced
 */
export const isSuburbServiced = (province: string, suburb: string): boolean => {
  const suburbs = SERVICE_SUBURBS[province as ServiceProvince];
  if (!suburbs) return false;
  return suburbs.some((s) => s.toLowerCase() === suburb.toLowerCase());
};

/**
 * Get serviced suburbs for a specific province
 */
export const getServicedSuburbs = (province: string): string[] => {
  const suburbs = SERVICE_SUBURBS[province as ServiceProvince];
  return suburbs ? [...suburbs] : [];
};
