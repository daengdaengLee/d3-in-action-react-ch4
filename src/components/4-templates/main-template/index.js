import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopArea = styled.div`
  height: 6rem;
`;

const BelowArea = styled.div`
  height: 0;
  flex-grow: 1;
  display: flex;
`;

const LeftArea = styled.div`
  width: 10rem;
`;

const CenterArea = styled.div`
  width: 0;
  flex-grow: 1;
`;

const MainTemplate = ({ top, left, center }) => (
  <Container>
    <TopArea>{top()}</TopArea>
    <BelowArea>
      <LeftArea>{left()}</LeftArea>
      <CenterArea>{center()}</CenterArea>
    </BelowArea>
  </Container>
);

export default MainTemplate;
