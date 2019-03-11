import React, { Component } from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
  margin-top: 50px;
`

class Home extends Component {
  render() {
    return (
      <div className="App">
        <H1>Home</H1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
          vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    );
  }
}

export default Home;
