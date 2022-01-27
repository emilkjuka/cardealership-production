import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import emailjs from 'emailjs-com';
import { send } from 'emailjs-com';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [],
    };

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('contact_service', 'cardealership', e.target, 'user_noNPU1eRJRT5CoJb7YHnj')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    }

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/api/car/${location.pathname.substring(6)}`)
      .then((response) => response.json())
      .then((list) => {
        this.setState({ cars: list });
      });
  }

  render() {
    console.log(this.state.cars);
    return (
      <div className="itemDetailContainer">
      <div className="carDetailContainer">
        <div className="carDetailImage">
          <img src={this.state.cars.car_image}></img>
        </div>
        <div className="carDetailInfo">
          <div>
            <h1>{this.state.cars.car_brand} {this.state.cars.car_model}</h1>
          </div>
          <div>
            <h3>Year:{this.state.cars.car_production_year}</h3>
          </div>
          <div>
            <h3>Car Type:{this.state.cars.car_type}</h3>
          </div>
          <div>
            <h3>Color:{this.state.cars.car_color}</h3>
          </div>
          <div>
            <h3>State:{this.state.cars.car_state}</h3>
          </div>
          <div>
            <h3>Price:{this.state.cars.car_price}€</h3>
          </div>
        </div>
        {/* <Card
          sx={{ maxWidth: 400 }}
          style={{ margin: "10px" }}
          key={this.state.cars.id}
        >
          <CardMedia
            component="img"
            alt="carImage"
            height="140"
            image={this.state.cars.car_image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.state.cars.car_brand} {this.state.cars.car_model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.state.cars.car_price} <span>&#8364;</span>
            </Typography>
          </CardContent>
        </Card>*/ }
      </div>
      <div className="testDriveContact">
        <h1>Interested in a Test Drive?</h1>
        <h3>Our team will contact you after you've shown interest with the form bellow</h3>
        <form  onSubmit={this.sendEmail}>
          <TextField name = "firstName" required label="First Name" />
          <br/>
          <TextField name ="surname" label="Surname"/>
          <br/>
          <TextField name = "email" required label="Email"/>
          <br/>
          <TextField name = "number" required label="Telephone Number"/>
          <br/>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
      </div>
    </div>
    );
  }
}
