import React from 'react';
import MainTemplate from 'components/4-templates/main-template';
import MainHeader from 'components/3-organisms/main-header';
import MainNavigation from 'components/3-organisms/main-navigation';

const MainPage = ({
  match: {
    params: { page },
  },
}) => (
  <MainTemplate
    top={() => <MainHeader />}
    left={() => <MainNavigation page={page} />}
    center={() => {}}
  />
);

export default MainPage;
