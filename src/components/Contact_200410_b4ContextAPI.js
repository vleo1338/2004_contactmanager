import React, { Component } from "react";
import PropTypes from "prop-types";
import "./contact.css";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false,
    };

    // this.onShowClick = this.onShowClick.bind(this);
  }

  // Tip: No need to do binding for this function if it's an arrow function
  onShowClick = (id, name, e) => {
    console.log(id + " > " + name);
    this.setState({
      showContactInfo: !this.state.showContactInfo,
    });
  };

  onDeleteClick = (id, e) => {
    console.log(id);
    this.props.deleteClickHandler(id);
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    // const { name, email, phone } = this.props;

    return (
      <div className="card card-body mb-3">
        <h4>
          {name}{" "}
          <i
            className={
              this.state.showContactInfo
                ? "fas fa-caret-down"
                : "fas fa-caret-up"
            }
            style={{ cursor: "pointer" }}
            onClick={this.onShowClick.bind(this, id, name)}
          />
          <i
            className="fas fa-trash"
            style={{ cursor: "pointer", float: "right", color: "red" }}
            onClick={this.onDeleteClick.bind(this, id)}
          />
        </h4>
        {this.state.showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired,
};

export default Contact;
