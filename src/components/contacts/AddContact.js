import React, { Component } from "react";
import { Consumer } from "../../context";
import { v4 as uuid } from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "Default Name",
    email: "2@as.com",
    phone: "3",
    errors: {},
  };

  onChange = (e) => {
    this.setState({
      // note: spread state (...) below is actually redundant. setState will
      // include the existing state, then merge in whatever you try to set in
      // setState.

      ...this.state,
      // use square brackets [] to use the input field's "name" property
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //validation check
    if (name === "") {
      this.setState({
        errors: { name: "Name is required" },
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: { email: "Email is required" },
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: { phone: "Phone is required" },
      });
      return;
    }

    const newContact = {
      // id: uuid(),
      name,
      email,
      phone,
    };
    console.log(this.state);

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({
      type: "ADD_CONTACT",
      payload: res.data,
    });

    // dispatch({
    //   type: "ADD_CONTACT",
    //   payload: newContact,
    // });

    // clear fields
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    // switch to homepage after adding a Contact
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="name"
                    value={name}
                    placeholder="Enter name.."
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    placeholder="Enter Email.."
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="phone"
                    value={phone}
                    placeholder="Enter phone.."
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
