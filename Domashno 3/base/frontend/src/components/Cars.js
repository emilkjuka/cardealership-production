import React, { Component, useEffect, useState } from "react";
import { Link, Location } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import TextField from '@mui/material/TextField';

export default class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      pageNumber: 1,
      itemsPerPage: 10,
      numberOfItems: 350,
      allItems: 350,
      page_prefix: "?page=",
      query: "http://127.0.0.1:8000/api/list_cars",
      searchTerm: 0,
      dealershipID: -1,
      currentSearchPage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(event, value) {
    if (this.state.searchTerm == 0) {
      this.setState({
        pageNumber: value,
      });
    } else if (this.state.searchTerm.length > 0) {
      this.setState({
        currentSearchPage: value,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.currentSearchPage);
    console.log(this.state.pageNumber);
    if (this.state.searchTerm != 0) {
      console.log("searchame");
      if (prevState.currentSearchPage != this.state.currentSearchPage) {
        console.log(
          this.state.query
            .concat("/")
            .concat(this.state.searchTerm)
            .concat("/")
            .concat(this.state.page_prefix)
            .concat(this.state.currentSearchPage)
        );
        fetch(
          this.state.query
            .concat("/")
            .concat(this.state.searchTerm)
            .concat("/")
            .concat(this.state.page_prefix)
            .concat(this.state.currentSearchPage)
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              cars: result["results"],
              numberOfItems: result["count"],
              isSearching: true,
            });
          })
          .catch((err) => {
            console.log("Error:".concat(err));
          });
      }
      if (prevState.searchTerm != this.state.searchTerm) {
        console.log(
          this.state.query
            .concat("/")
            .concat(this.state.searchTerm)
            .concat("/")
            .concat(this.state.page_prefix)
            .concat(this.state.currentSearchPage)
        );
        fetch(
          this.state.query
            .concat("/")
            .concat(this.state.searchTerm)
            .concat("/")
            .concat(this.state.page_prefix)
            .concat(this.state.currentSearchPage)
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              cars: result["results"],
              numberOfItems: result["count"],
              isSearching: true,
            });
          })
          .catch((err) => {
            console.log("Error:".concat(err));
          });
      }
      if (prevState.searchTerm.length > this.state.searchTerm.length) {
        this.setState({
          pageNumber: 1,
          currentSearchPage: 1,
        });
      }
      if (this.state.searchTerm.length == 0) {
        this.setState({
          searchTerm: 0,
          pageNumber: 1,
          currentSearchPage: 1,
        });
      }
    }
    if (this.state.searchTerm == 0 || this.state.searchTerm == "") {
      console.log("ne searchame");
      if (
        prevState.searchTerm.length > this.state.searchTerm.length &&
        this.state.searchTerm === ""
      ) {
        fetch(
          this.state.query
            .concat(this.state.page_prefix)
            .concat(this.state.pageNumber)
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              cars: result["results"],
              numberOfItems: result["count"],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // This is called once the page number is changed from the pagination
      if (prevState.pageNumber != this.state.pageNumber) {
        console.log(
          this.state.query
            .concat(this.state.page_prefix)
            .concat(this.state.pageNumber)
        );
        fetch(
          this.state.query
            .concat(this.state.page_prefix)
            .concat(this.state.pageNumber)
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              cars: result["results"],
              numberOfItems: result["count"],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  componentDidMount() {
    if (location.search != "" && location.search.includes("?id=")) {
      const id = location.search.split("=")[1];
      this.setState({
        searchTerm: ("dealership=").concat(id),
      });
    }
    fetch(
      this.state.query
        .concat(this.state.page_prefix)
        .concat(this.state.pageNumber)
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result["results"],
          allItems: result["count"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        
        <TextField type="text"
          placeholder="Search..."
          onChange={(event) =>
            this.setState({
              searchTerm: event.target.value,
              pageNumber: 1,
              currentSearchPage: 1,
            })
          }
          id="outlined-basic" label="Search" variant="outlined" />
        <div className="cars_wrapper">
          <div className="cardContainer">
            {this.state.cars.map((car, index) => (
              <Card
                sx={{ maxWidth: 400 }}
                style={{ margin: "10px" }}
                key={car.id}
              >
                <CardMedia
                  component="img"
                  alt="carImage"
                  height="140"
                  image={car.car_image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.car_brand} {car.car_model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {car.car_price} <span>&#8364;</span>
                  </Typography>
                </CardContent>
                <Link to={`/cars/${car.id}`}>
                  <CardActions>
                    <Button size="small">Show More</Button>
                  </CardActions>
                </Link>
              </Card>
            ))}
          </div>
          <div className="pagination_wrapper">
            <Pagination
              count={Math.round(
                parseInt(this.state.numberOfItems) /
                  parseInt(this.state.itemsPerPage)
              )}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
