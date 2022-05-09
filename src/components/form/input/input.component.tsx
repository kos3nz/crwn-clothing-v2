import './input.styles.scss';

const FormInput = ({ label, ...props }: FormInputProps) => {
  return (
    <div className="group">
      <input className="form-input" {...props} />
      {label && (
        <label
          htmlFor={props.id || ''}
          className={`${
            typeof props.value === 'string' && props.value.length && 'shrink'
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

// Types
export type FormInputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
// & React.ComponentPropsWithoutRef<'input'>;
