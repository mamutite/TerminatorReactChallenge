import { Button, ButtonProps, styled } from "@mui/material";

const ButtonCustomization = styled(Button)<ButtonProps>(() => ({
  color: "white",
  background: "linear-gradient(180deg, #8b4744, #e8746f)",
  boxShadow: "0 8px 24px 0 rgba(228, 228, 228, 0.5)",
  borderRadius: "2rem",
  lineHeight: "3vh",
  fontWeight: "900",
  fontSize: "1.5vw",
  width: "12vw",
  cursor: "pointer",
}));

interface IntroButtonPropsI {
  value: string;
  onClick: (value: string) => void;
}

export function CustomButton(props: IntroButtonPropsI) {
  return (
    <ButtonCustomization
      variant="contained"
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </ButtonCustomization>
  );
}
