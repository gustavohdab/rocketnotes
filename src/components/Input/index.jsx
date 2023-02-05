import { Container } from "./styles";

export function Input({ label, icon: Icon, ...rest }) {
  return (
    <Container>
      {Icon && <Icon />}
      <input placeholder={label} {...rest} />
    </Container>
  );
}
