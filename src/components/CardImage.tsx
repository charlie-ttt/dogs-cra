import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

export interface ImageData {
  url: string;
  title: string;
}

export default function CardImage({
  url,
  title,
  onClick,
  liked,
}: {
  url: string;
  title: string;
  onClick?: () => void;
  liked: boolean;
}) {
  return (
    <Card sx={{ width: 300, margin: "1rem" }}>
      <CardMedia component="img" height="194" image={url} alt={title} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 7.21187L10.6662 6.01806C9.95717 5.38348 9.02575 5 8 5C5.79086 5 4 6.79086 4 9C4 11.9996 5.33975 14.212 7.03224 15.8501C8.75438 17.5169 10.7798 18.5183 11.8857 18.9794C11.9626 19.0114 12.0374 19.0114 12.1143 18.9794C13.2202 18.5183 15.2456 17.5169 16.9678 15.8501C18.6602 14.2119 20 11.9996 20 9.00004C20 6.7909 18.2091 5 16 5C14.9742 5 14.0428 5.38348 13.3338 6.01806L12 7.21187ZM12 4.52779C10.9385 3.57771 9.53671 3 8 3C4.68629 3 2 5.68629 2 9C2 16.3511 8.67146 19.8061 11.116 20.8254C11.6855 21.0628 12.3145 21.0628 12.884 20.8254C15.3285 19.8061 22 16.3512 22 9.00005C22 5.68634 19.3137 3 16 3C14.4633 3 13.0615 3.57771 12 4.52779Z"
              fill={liked ? "#FF0000" : "#171717"}
            />
          </svg>
        </IconButton>
      </CardActions>
    </Card>
  );
}
