import React from 'react';
import styled from 'styled-components';
import RouterLink from 'components/1-atoms/router-link';

const Nav = styled.nav`
  display: flex;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 0;
  flex-grow: 1;
`;

const ListItem = styled.li`
  height: 2rem;
  margin-bottom: 1rem;
  display: flex;
  padding-left: 0.8rem;
`;

const MainNavigation = ({ page, chapter }) => (
  <Nav>
    <List>
      <ListItem>
        <RouterLink
          to="/4/scatter"
          isCurrent={chapter === '4' && page === 'scatter'}
        >
          4-Scatter
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink
          to="/4/boxplot"
          isCurrent={chapter === '4' && page === 'boxplot'}
        >
          4-Boxplot
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink
          to="/4/linechart"
          isCurrent={chapter === '4' && page === 'linechart'}
        >
          4-Linechart
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink
          to="/4/streamchart"
          isCurrent={chapter === '4' && page === 'streamchart'}
        >
          4-Streamchart
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink
          to="/5/histogram"
          isCurrent={chapter === '5' && page === 'histogram'}
        >
          5-Histogram
        </RouterLink>
      </ListItem>
    </List>
  </Nav>
);

export default MainNavigation;
