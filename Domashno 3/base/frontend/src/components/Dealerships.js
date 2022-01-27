import React, { Component } from "react";
import Map from "./Map";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default class Dealerships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cords: [
        [41.9787012, 21.4478089],
        [41.9922072, 21.4754564],
      ],

      dealerships: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/list_dealerships")
      .then((response) => response.json())
      .then((list) => {
        this.setState({ dealerships: list });
      });
  }

  render() {
    return (
      <div className="dealership_wrapper">
        <div className="dealership_list">
          <ul className="dealerships_ul">
            {this.state.dealerships.map((dealer) => (
              <Card
                sx={{ display: "flex", width: "90%", m: 1 }}
                className="dealership_card"
                key={dealer.id}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {dealer.dealership_name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dealer.id}
                  </Typography>
                  <div className="dealership_buttonContainer">
                    <Link
                      to={{
                        pathname: "/cars",
                        search: "id=".concat(dealer.id),
                      }}
                    >
                      <Button variant="contained">
                        <i class="fas fa-car"></i>
                      </Button>
                    </Link>
                    <a href={("https://www.google.com/maps/place/").concat(dealer.dealership_y_coordinate).concat(",").concat(dealer.dealership_x_coordinate)}>
                    <Button variant="contained">
                        <i class="fas fa-map-marker-alt"></i>
                    </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
        <div className="dealership_map_wrapper">
          <Map dealerships={this.state.dealerships} />
        </div>
      </div>
    );
  }
}
