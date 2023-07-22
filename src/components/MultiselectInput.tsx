import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiselectInputProps {
  allOptions: string[];
  selected: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  maxlimit: number;
}

export default function MultiselectInput({
  allOptions,
  selected,
  handleChange,
  maxlimit,
}: MultiselectInputProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <FormControl sx={{ m: 1, width: "500px" }}>
        <InputLabel id="multiple-checkbox-label">Dog breeds</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label="" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {allOptions.map((name) => (
            <MenuItem
              key={name}
              value={name}
              disabled={
                selected.length > maxlimit - 1 && selected.indexOf(name) == -1
              }
            >
              <Checkbox checked={selected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
