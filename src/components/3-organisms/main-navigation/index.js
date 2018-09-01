import React from 'react';
import styled from 'styled-components';
import RouterLink from 'components/1-atoms/router-link';

const navigations = [
  { chapter: '4', page: 'scatter', name: '4-Scatter' },
  { chapter: '4', page: 'boxplot', name: '4-Boxplot' },
  { chapter: '4', page: 'linechart', name: '4-Line' },
  { chapter: '4', page: 'streamchart', name: '4-Stream' },
  { chapter: '5', page: 'histogram', name: '5-Histogram' },
  { chapter: '5', page: 'pie', name: '5-Pie' },
  { chapter: '5', page: 'circlepack', name: '5-CirclePack' },
  { chapter: '5', page: 'tree', name: '5-Tree' },
  { chapter: '5', page: 'radial-tree', name: '5-RadialTree' },
  { chapter: '5', page: 'stack', name: '5-Stack' },
];

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
      {navigations.map(nav => (
        <ListItem key={nav.name}>
          <RouterLink
            to={`/${nav.chapter}/${nav.page}`}
            isCurrent={chapter === nav.chapter && page === nav.page}
          >
            {nav.name}
          </RouterLink>
        </ListItem>
      ))}
    </List>
  </Nav>
);

export default MainNavigation;
