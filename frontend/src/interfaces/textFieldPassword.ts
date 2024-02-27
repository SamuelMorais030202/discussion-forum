export default interface ITextFieldPassword {
  label: string;
  name: string;
  password: string;
  showPassword: boolean;
  variant: string;
  dataTestid: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}