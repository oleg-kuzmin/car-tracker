import { useRef, useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Button, Modal, Spinner, TryAgainElement } from '@/shared/ui';
import { type Car, useCars, useDeleteCar, useEditCar } from '../model';
import { ConfirmDelete } from './ConfirmDelete';
import { EditForm } from './EditForm';
import { Footer } from './Footer';
import { MapTrack } from './MapTrack';
import { Table } from './Table';
import { TableSorting } from './TableSorting';
import styles from './HomePage.module.scss';

export function HomePage() {
  const idActiveRef = useRef<number | null>(null);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);

  const { isLoadingCars, errorLoadingCars, sortedCars, setSortedCars } = useCars();
  const { deleteCar } = useDeleteCar(setSortedCars);
  const { editCar } = useEditCar(setSortedCars);

  if (isLoadingCars) return <Spinner />;
  if (errorLoadingCars) return <TryAgainElement message={errorLoadingCars.message} />;

  // Delete
  function handleClickDelete(id: number) {
    idActiveRef.current = id;
    setisOpenDeleteModal(true);
  }
  function handleConfirmDelete(sortedCars: Car[]) {
    deleteCar({ id: idActiveRef.current as number, cars: sortedCars });
    setisOpenDeleteModal(false);
    idActiveRef.current = null;
  }

  // Edit
  function handleClickEdit(id: number) {
    idActiveRef.current = id;
    setIsOpenEditModal(true);
  }
  function handleSave(editedCar: Car, sortedCars: Car[]) {
    editCar({ id: idActiveRef.current as number, editedCar, cars: sortedCars });
    setIsOpenEditModal(false);
    idActiveRef.current = null;
  }

  // Track
  function handleClickTrack(id: number) {
    idActiveRef.current = id;
    setIsOpenMapModal(true);
  }
  function handleCloseModalTrack() {
    setIsOpenMapModal(false);
    idActiveRef.current = null;
  }

  return (
    <>
      <header className={styles.homePage__header}>
        <h1 className={styles.homePage__title}>Car tracker</h1>
        <Button color="info" onClick={() => setIsOpenMapModal(true)}>
          <HiOutlineMagnifyingGlass />
          Track all
        </Button>
        <TableSorting />
      </header>

      <main>
        <Table columns="1fr 1fr 1fr 1fr 85px 85px 85px">
          <Table.Legend>
            <div>Name</div>
            <div>Model</div>
            <div>Year</div>
            <div>Price</div>
            <div></div>
            <div></div>
            <div></div>
          </Table.Legend>
          <Table.Body
            data={sortedCars}
            render={car => (
              <Table.Row
                key={car.id}
                car={car}
                onDelete={() => handleClickDelete(car.id)}
                onEdit={() => handleClickEdit(car.id)}
                onTrack={() => handleClickTrack(car.id)}
              />
            )}
          />
        </Table>
      </main>

      <Modal active={isOpenMapModal} onClose={handleCloseModalTrack}>
        <MapTrack
          cars={sortedCars.filter(car => {
            if (idActiveRef.current !== null) {
              return car.id === idActiveRef.current;
            } else return true;
          })}
          onCancel={handleCloseModalTrack}
        />
      </Modal>
      <Modal active={isOpenDeleteModal} onClose={() => setisOpenDeleteModal(false)}>
        <ConfirmDelete
          onCancel={() => setisOpenDeleteModal(false)}
          onConfirm={() => handleConfirmDelete(sortedCars)}
        />
      </Modal>
      <Modal active={isOpenEditModal} onClose={() => setIsOpenEditModal(false)}>
        <EditForm
          editedCar={sortedCars.find(car => car.id === (idActiveRef.current as number))}
          onCancel={() => setIsOpenEditModal(false)}
          onSave={editedCar => handleSave(editedCar, sortedCars)}
        />
      </Modal>

      <Footer />
    </>
  );
}
