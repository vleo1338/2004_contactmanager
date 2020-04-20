import React, { Component } from "react";
import PropTypes from "prop-types";
//import "./contact.css";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false,
    };
  }

  // Tip: No need to do binding for this function if it's an arrow function
  onShowClick = (id, name, e) => {
    console.log(id + " > " + name);
    this.setState({
      showContactInfo: !this.state.showContactInfo,
    });
  };

  onDeleteClick = async (id, dispatch) => {
    console.log("Contact > onDeleteClick");

    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const showContactInfo = this.state.showContactInfo;
    // const { name, email, phone } = this.props;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  className={
                    showContactInfo ? "fas fa-caret-down" : "fas fa-caret-up"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={this.onShowClick.bind(this, id, name)}
                />
                <i
                  className="fas fa-trash"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-edit"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem",
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
