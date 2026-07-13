"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

// New Cairo — the default map centre matches Zidan Development's operating area.
const DEFAULT_CENTER: [number, number] = [30.0279, 31.4913];
const DEFAULT_ZOOM = 13;

function toNum(v: number | null | undefined): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/**
 * Captures map clicks to drop/move the pin. Defined at module scope (not inside
 * the parent component) so it isn't recreated on every render.
 */
function ClickHandler({ onPick }: { onPick: (latlng: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

/**
 * Admin OpenStreetMap picker.
 *
 * The admin clicks anywhere on the map to drop the pin, or drags the existing
 * pin to fine-tune. The chosen lat/lng are written into two hidden inputs
 * (`mapLat` / `mapLng`) so the existing FormData → Server Action flow on
 * `ProjectForm` keeps working unchanged.
 *
 * Leaflet needs a `window`, so this component is always loaded through
 * `next/dynamic({ ssr: false })` from the (already client) `ProjectForm`.
 */
export function MapPicker({
  mapLat,
  mapLng,
}: {
  mapLat?: number | null;
  mapLng?: number | null;
}) {
  const t = useTranslations("admin");
  const initialLat = toNum(mapLat);
  const initialLng = toNum(mapLng);
  const hasInitial = initialLat !== null && initialLng !== null;

  const [pos, setPos] = useState<[number, number] | null>(
    hasInitial ? [initialLat, initialLng] : null,
  );

  // Inline SVG pin via a L.divIcon — avoids bundler/asset path issues with the
  // default Leaflet marker images.
  const pinIcon = useMemo(
    () =>
      L.divIcon({
        className: "zidan-map-pin",
        html: `<span style="display:block;transform:translateY(-2px);color:#c8a45c;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
        </span>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      }),
    [],
  );

  return (
    <div className="space-y-2">
      {/* Scoped pin styles so no global CSS edits are needed. */}
      <style>{`.zidan-map-pin{background:transparent;border:0}`}</style>

      <div className="relative overflow-hidden rounded-lg border border-white/10">
        <MapContainer
          center={pos ?? DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom
          className="h-72 w-full"
          style={{ background: "#0b1220" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={(latlng) => setPos(latlng)} />
          {pos ? (
            <Marker
              position={pos}
              icon={pinIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const m = e.target as L.Marker;
                  const { lat, lng } = m.getLatLng();
                  setPos([lat, lng]);
                },
              }}
            />
          ) : null}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
        <MapPin className="h-3.5 w-3.5 text-gold-400" />
        <span>{t("forms.hints.mapPicker")}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-ink-300">
        <span>
          <span className="text-ink-500">{t("forms.fields.latitude")}: </span>
          {pos ? pos[0].toFixed(6) : "—"}
        </span>
        <span>
          <span className="text-ink-500">{t("forms.fields.longitude")}: </span>
          {pos ? pos[1].toFixed(6) : "—"}
        </span>
        {pos ? (
          <button
            type="button"
            onClick={() => setPos(null)}
            className="text-red-400 underline-offset-2 hover:underline"
          >
            {t("actions.clearLocation")}
          </button>
        ) : null}
      </div>

      {/* Hidden inputs read by the saveProject Server Action via FormData. */}
      <input type="hidden" name="mapLat" value={pos ? pos[0] : ""} readOnly />
      <input type="hidden" name="mapLng" value={pos ? pos[1] : ""} readOnly />
    </div>
  );
}
