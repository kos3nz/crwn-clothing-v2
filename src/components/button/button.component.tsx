import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  default: 'default',
  inverted: 'inverted',
  'google-sign-in': 'google-sign-in',
} as const;

const Button = ({
  buttonType = BUTTON_TYPE_CLASSES.default,
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      style={{ cursor: isLoading ? 'not-allowed' : 'default' }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <span className="button-spinner" /> : children}
    </button>
  );
};

export default Button;

// Types
export type ButtonProps = {
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'disabled'>;
