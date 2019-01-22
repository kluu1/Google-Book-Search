import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  border: 1px solid black;
  margin: 0 auto;
  text-align: center;
`;

export default class Results extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h2>Results</h2>
        <ResultsContainer>
          <p>Place holder</p>
        </ResultsContainer>
      </div>
    );
  }
}
