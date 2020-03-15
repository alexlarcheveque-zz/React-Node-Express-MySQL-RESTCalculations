import React from "react";
import axios from "./API/axios";
import "./Calculations.css";

class Calculations extends React.Component {
  state = {
    firstNum: "",
    secondNum: "",
    sum: "",
    product: "",
    power: "",
    isSubmitted: false,
    isLoaded: false
  };

  handleChange = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ isSubmitted: true });
    event.preventDefault();

    //Caculations we use to insert into the database through chained axios calls
    //We chain the calls to make sure that we are updating ONLY the latest row insertion
    const sum = Number(this.state.firstNum) + Number(this.state.secondNum);
    const product = sum * 2;
    const power = Math.pow(product, 2);
    this.setState({ sum, product, power });

    axios
      .get("/calculations/add", {
        params: {
          first_num: this.state.firstNum,
          second_num: this.state.secondNum,
          sum_result: sum
        }
      })
      .then(() => {
        return axios
          .get("/calculations/product", {
            params: {
              product_result: product
            }
          })
          .then(() => {
            return axios
              .get("/calculations/power", {
                params: {
                  power_result: power
                }
              })
              .then(() => {
                this.setState({ isLoaded: true });
              });
          });
      });
  };

  displayForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row" id="container">
          <div className="col-5">
            <input
              type="number"
              className="form-control"
              placeholder="First Number"
              name="firstNum"
              value={this.state.firstNum ? this.state.firstNum : ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-5">
            <input
              type="number"
              className="form-control"
              placeholder="Second Number"
              name="secondNum"
              value={this.state.secondNum ? this.state.secondNum : ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-outline-primary">
              Calculate
            </button>
          </div>
        </div>
      </form>
    );
  };

  displayCalculations = () => {
    return (
      <div className="card">
        <div className="card">
          <div className="card-body">
            Summing the numbers {this.state.firstNum} + {this.state.secondNum},
            we get {this.state.sum}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            Multiplying {this.state.sum} * 2, we get the product of{" "}
            {this.state.product}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            Raising {this.state.product} ^ 2, we get the result of{" "}
            {this.state.power}
          </div>
        </div>
        <div className="card">
          <div className="card-header text-primary font-weight-bold">
            The final answer = {this.state.power}
          </div>
        </div>
      </div>
    );
  };

  displaySpinner = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.displayForm()}
        <div align="center">
          {this.state.isLoaded
            ? this.displayCalculations()
            : this.state.isSubmitted
            ? this.displaySpinner()
            : "Please enter numbers to start calculations."}
        </div>
      </div>
    );
  }
}

export default Calculations;
