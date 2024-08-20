import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado

interface FormField {
  name: string;
  type: string;
  placeholder?: string; // Hacer placeholder opcional porque no siempre es necesario
  label: string;
  options?: { label: string; value: string }[]; // Opciones para select si es necesario
}

interface GenericFormProps {
  fields: FormField[];
  onSubmit: SubmitHandler<FieldValues>;
  buttonLabel: string;
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, buttonLabel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              {...register(field.name, { required: 'This field is required' })}
              id={field.name}
              className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...register(field.name, { required: 'This field is required' })}
              type={field.type}
              placeholder={field.placeholder}
              id={field.name}
              className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
            />
          )}
          {errors[field.name]?.message && (
            <div className="invalid-feedback">
              {errors[field.name]?.message as string}
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        {buttonLabel}
      </button>
    </form>
  );
};

export default GenericForm;
