import { Marker, Popup } from 'react-leaflet';

interface CustomMarkerProps {
  text: string;
  position: [number, number];
}

export function CustomMarker({ text, position }: Readonly<CustomMarkerProps>) {
  return (
    <Marker position={position}>
      <Popup>{text}</Popup>
    </Marker>
  );
}
