"use client";

import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteId } from "@/data/routeWisePrototype";

const mapRoutes: Record<RouteId, { color: string; points: [number, number][] }> = {
  cheapest: {
    color: "#33D69F",
    points: [[25.1972,55.2744],[25.2076,55.2869],[25.2165,55.3044],[25.2268,55.3234],[25.2442,55.3449],[25.2532,55.3657]],
  },
  fastest: {
    color: "#3772FF",
    points: [[25.1972,55.2744],[25.2089,55.2898],[25.2184,55.3071],[25.2293,55.3268],[25.2398,55.3474],[25.2532,55.3657]],
  },
  balanced: {
    color: "#A879FF",
    points: [[25.1972,55.2744],[25.2053,55.2921],[25.2167,55.3145],[25.2314,55.3299],[25.2411,55.3498],[25.2532,55.3657]],
  },
};

export default function RouteWiseMap({ selected, onSelect }: { selected: RouteId; onSelect: (route: RouteId) => void }) {
  return <MapContainer center={[25.226,55.320]} zoom={13} zoomControl={false} attributionControl className="routewise-map h-full w-full">
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {(Object.entries(mapRoutes) as [RouteId, (typeof mapRoutes)[RouteId]][]).map(([id, route]) => <Polyline key={id} positions={route.points} pathOptions={{ color: route.color, weight: selected === id ? 8 : 4, opacity: selected === id ? 1 : .5 }} eventHandlers={{ click: () => onSelect(id) }} />)}
    <CircleMarker center={[25.1972,55.2744]} radius={8} pathOptions={{ color: "#33D69F", fillColor: "#080B12", fillOpacity: 1, weight: 4 }}><Tooltip direction="top" offset={[0,-8]}>Downtown Dubai</Tooltip></CircleMarker>
    <CircleMarker center={[25.2532,55.3657]} radius={8} pathOptions={{ color: "#3772FF", fillColor: "#080B12", fillOpacity: 1, weight: 4 }}><Tooltip direction="top" offset={[0,-8]}>Dubai International Airport</Tooltip></CircleMarker>
  </MapContainer>;
}
