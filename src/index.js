import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import MainPage from 'components/5-pages/main-page';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  ${reset}
  html, body, #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/:index" component={MainPage} />
      <Route component={MainPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
