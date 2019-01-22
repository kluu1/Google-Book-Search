import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

export default class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className="jumbotron">
          <h1 className="display-4">Google Book Search</h1>
          <h4>Search and save books of interest!</h4>
        </div>
      </Wrapper>
    );
  }
}
