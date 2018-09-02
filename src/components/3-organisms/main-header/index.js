import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const MainHeader = () => (
  <Header>
    <Title>D3 in Action Examples wrapped with React</Title>
    <a
      href="https://github.com/daengdaengLee/d3-in-react"
      target="_blank"
      rel="noopener noreferrer"
    >
      Github
    </a>
  </Header>
);

export default MainHeader;
