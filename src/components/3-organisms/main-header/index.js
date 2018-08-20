import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 4rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const MainHeader = () => (
  <Header>
    <Title>D3 in Action Chapter 4 Example wrapped with React</Title>
  </Header>
);

export default MainHeader;
