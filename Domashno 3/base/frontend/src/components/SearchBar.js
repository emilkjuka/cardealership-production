import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <form >
            <div className="searchbar_wrapper">
          <TextField
            id="searchbar"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Search</InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ m: 2, width: "5ch" }} >
              <SearchIcon />
          </IconButton>
      </div>
        </form>
    );
  }
}
