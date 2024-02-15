import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import ITextFieldPassword from "../interfaces/textFieldPassword";
import { handleMouseDown } from "../utils/handleMouseDown";

export default function TextFieldPassword({
  password,
  showPassword,
  handleChange,
  setShowPassword,
  label,
  name,
  variant
} : ITextFieldPassword & TextFieldProps) {
  return (
    <TextField
      label={label}
      name={name}
      value={password}
      variant={variant || 'outlined'}
      type={showPassword ? 'text' : 'password'}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prevPassword) => !prevPassword)}
              edge="end"
              onMouseDown={handleMouseDown}
            >
              { showPassword ? <VisibilityOff /> : <Visibility /> }
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}