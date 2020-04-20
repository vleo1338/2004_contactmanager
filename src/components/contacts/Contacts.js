import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

class Contacts extends Component {
  deleteContact = (id) => {
    console.log("deleteContact " + id);
    // this.setState({
    //   contacts: this.state.contacts.filter((contact) => contact.id != id),
    // });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const contacts = value.contacts;
          return (
            <>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h1>
              {contacts.map((contact) => (
                <Contact
                  key={contact.id}
                  contact={contact}
                  // deleteClickHandler={this.deleteContact}
                />
              ))}
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
