export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Username wajib";
  }
  
  if (!values.password) {
    errors.password = "Password is wajib";
  }
  return errors;
}
