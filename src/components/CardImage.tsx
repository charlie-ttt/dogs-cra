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
  showButton,
}: {
  url: string;
  title: string;
  onClick?: () => void;
  liked: boolean;
  showButton: boolean;
}) {
  return (
    <Card sx={{ width: 300, margin: "1rem" }}>
      <CardMedia component="img" height="194" image={url} alt={title} />
      <CardActions disableSpacing>
        {showButton && (
          <IconButton aria-label="add to favorites" onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={liked ? "#FF0000" : "#171717"}
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />{" "}
            </svg>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
