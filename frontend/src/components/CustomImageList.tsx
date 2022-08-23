import { ImageList, ImageListProps, styled } from "@mui/material";

const ImageListCustomization = styled(ImageList)<ImageListProps>(() => ({
  background: "linear-gradient(180deg,#9fa3f0,#6f75e8)",
  width: "30vw",
  height: "60vh",
}));

export function CustomImageList() {
  return <ImageListCustomization> asdf </ImageListCustomization>;
}
