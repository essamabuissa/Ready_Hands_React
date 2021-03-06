import React, { Component } from "react";

export class FormWorkerDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="regback">
        <div className=" bg-transparent  align-ceneter">
          <div className=" col-6 mx-auto ">
            <div className="row py-5 ">
              <div className="col">
                <h3 className="text-white text-center">Worker Information</h3>
              </div>
            </div>
            <div className="row py-2">
              <div className="col">
                <label
                  htmlFor="phone_no"
                  style={{ color: "white", fontWeight: "bolder" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_no"
                  value={values.phone_no}
                  name="phone_no"
                  placeholder="Phone Number"
                  onChange={handleChange("phone_no")}
                  required
                />
              </div>
              <div className="col">
                <label
                  htmlFor="hour_rate"
                  style={{ color: "white", fontWeight: "bolder" }}
                >
                  Hour Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hour_rate"
                  value={values.hour_rate}
                  name="hour_rate"
                  placeholder="Hour Rate"
                  onChange={handleChange("hour_rate")}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label
                  htmlFor="image"
                  style={{ color: "white", fontWeight: "bolder" }}
                  className="mt-5"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  placeholder="Profile Image"
                  required
                />
              </div>
            </div>
            <button
              className="btn btn-primary mt-5"
              onClick={this.continue}
              style={{
                position: "absolute",
                right: 0,
                color: "white",
                backgroundColor: "#006064",
                borderColor: "#006064",
              }}
            >
              Continue
            </button>
            <button
              className="btn btn-warning mt-5"
              onClick={this.back}
              style={{
                position: "absolute",
                left: 0,
                backgroundColor: "#ffb74d ",
                borderColor: "#ffb74d ",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FormWorkerDetails;
