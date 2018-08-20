import React from 'react';
import MainTemplate from 'components/4-templates/main-template';
import MainHeader from 'components/3-organisms/main-header';

const MainPage = () => (
  <MainTemplate top={() => <MainHeader />} left={() => {}} center={() => {}} />
);

export default MainPage;
