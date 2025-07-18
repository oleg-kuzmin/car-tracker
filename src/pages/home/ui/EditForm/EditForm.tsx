import { useForm } from 'react-hook-form';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import cn from 'classnames';
import type { Car } from '@/pages/home/model';
import { Button, NotFoundElement } from '@/shared/ui';
import styles from './EditForm.module.scss';

interface InputTextProps {
  id: string;
  text: string;
  error?: string;
  type?: 'text' | 'number';
}

interface EditFormProps {
  editedCar: Car | undefined;
  onCancel: VoidFunction;
  onSave: (editedCar: Car) => void;
  className?: string;
}

function InputText({ id, text, error, type = 'text', ...otherProps }: Readonly<InputTextProps>) {
  return (
    <div className={styles.inputText}>
      <span className={styles.inputText__label}>{text}</span>
      <input
        autoComplete="off"
        className={styles.inputText__input}
        type={type}
        name={id}
        id={id}
        {...otherProps}
      />
      <span className={styles.inputText__error}>{error as string}</span>
    </div>
  );
}

export function EditForm({ editedCar, onCancel, onSave, className }: Readonly<EditFormProps>) {
  const { register, handleSubmit, formState } = useForm({ defaultValues: editedCar });
  const { errors } = formState;

  if (!editedCar) return <NotFoundElement onCancel={onCancel} />;

  function onSubmit(editedCar: Car) {
    onSave(editedCar);
  }

  return (
    <form className={cn(styles.editForm, className)} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="name"
        text="name"
        error={errors?.name?.message}
        {...register('name', { required: 'This field is required' })}
      />
      <InputText
        id="model"
        text="model"
        error={errors?.model?.message}
        {...register('model', { required: 'This field is required' })}
      />
      <InputText
        id="year"
        text="year"
        type="number"
        error={errors?.year?.message}
        {...register('year', { required: 'This field is required', valueAsNumber: true })}
      />
      <InputText
        id="price"
        text="price"
        type="number"
        error={errors?.price?.message}
        {...register('price', { required: 'This field is required', valueAsNumber: true })}
      />
      <div className={styles.editForm__buttons}>
        <Button color="neutral" onClick={onCancel} type="button">
          <HiOutlineArrowSmallLeft />
          Back
        </Button>
        <Button color="safe" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
