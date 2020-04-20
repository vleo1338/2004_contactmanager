import React, { Component } from "react";

class Test extends Component {
  // constructor() {
  //   super();
  // }

  state = {
    title: "",
    body: "",
  };

  componentDidMount() {
    console.log("componentDidMount..");
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          title: json.title,
          body: json.body,
        })
      );
  }

  // componentWillMount() {
  //   console.log("componentWillMount...");
  // }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate...");
  // }
  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log("componentWillReceiveProps..");
  // }

  render() {
    const { title, body } = this.state;
    return (
      <>
        <h1>Title: {title}</h1>
        <p>Body: {body}</p>
      </>
    );
  }
}

export default Test;
