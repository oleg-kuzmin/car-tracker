import { MapContainer, TileLayer } from 'react-leaflet';
import cn from 'classnames';
import type { Car } from '@/pages/home/model';
import { NotFoundElement } from '@/shared/ui';
import { CustomMarker } from '../CustomMarker';
import styles from './MapTrack.module.scss';

interface MapTrackProps {
  cars: Car[];
  onCancel: VoidFunction;
  className?: string;
}

export function MapTrack({ cars, onCancel, className }: Readonly<MapTrackProps>) {
  if (cars.length === 0) return <NotFoundElement onCancel={onCancel} />;

  return (
    <div className={cn(styles.mapTrack, className)}>
      <MapContainer
        className={styles.mapContainer}
        center={[cars.at(-1)!.latitude, cars.at(-1)!.longitude]}
        zoom={cars.length > 1 ? 10 : 14}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cars.map(car => {
          return (
            <CustomMarker
              key={car.id}
              position={[car.latitude, car.longitude]}
              text={`${car.id}. ${car.model} ${car.name}`}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
