import Box from "@mui/material/Box";
import * as React from "react";
import CardImage from "./CardImage";

export interface ImageData {
  url: string;
  title: string;
}

export interface ImageListProps {
  images: ImageData[];
}

export default function CardList(props: ImageListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "wrap",
        flexDirection: "row",
        width: "100%",
        mb: "2rem",
      }}
    >
      {props.images.map(({ url, title }) => (
        <CardImage url={url} title={title} />
      ))}
    </Box>
  );
}
