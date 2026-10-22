export type VehicleId = "sedan" | "suv" | "hybrid";
export type RouteId = "cheapest" | "fastest" | "balanced";

export type RouteOption = {
  id: RouteId;
  name: string;
  via: string;
  distance: number;
  minutes: number;
  salik: number;
  traffic: string;
  color: string;
  path: string;
};

export const vehicles = {
  sedan: { name: "Sedan", efficiency: 12.5 },
  suv: { name: "SUV", efficiency: 8.8 },
  hybrid: { name: "Hybrid", efficiency: 20.2 },
} satisfies Record<VehicleId, { name: string; efficiency: number }>;

export const routeOptions: RouteOption[] = [
  {
    id: "cheapest",
    name: "Cheapest",
    via: "Al Khail Road",
    distance: 18.9,
    minutes: 31,
    salik: 0,
    traffic: "Moderate traffic",
    color: "#33D69F",
    path: "M 92 350 C 128 326, 130 264, 186 250 S 260 276, 300 220 S 345 132, 438 104 S 550 94, 642 54",
  },
  {
    id: "fastest",
    name: "Fastest",
    via: "Sheikh Zayed Road",
    distance: 15.8,
    minutes: 22,
    salik: 8,
    traffic: "Light traffic",
    color: "#3772FF",
    path: "M 92 350 C 150 320, 168 276, 225 248 S 300 204, 352 164 S 444 112, 642 54",
  },
  {
    id: "balanced",
    name: "Balanced",
    via: "Airport Road",
    distance: 17.1,
    minutes: 26,
    salik: 4,
    traffic: "Steady flow",
    color: "#A879FF",
    path: "M 92 350 C 122 302, 202 316, 244 266 S 284 190, 366 184 S 472 156, 642 54",
  },
];
