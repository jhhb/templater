import "node_modules/normalize.css/normalize.css";
import "@blueprintjs/core/src/blueprint.scss";
import "@blueprintjs/core/lib/css/blueprint.css";
import {Button, Navbar, NavbarDivider, NavbarGroup} from '@blueprintjs/core';
import {Provider} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './index.scss';
import {TicketsPageState} from './states/TicketsPageState';
import {TicketsPage} from './TicketsPage';

const App = () => {
  const ticketsPageState = new TicketsPageState();

  return (
    <div id="app">
      <Navbar id="nav">
        <NavbarGroup align="left">
          <Navbar.Heading>Templater</Navbar.Heading>
        </NavbarGroup>
        <NavbarGroup align="right">
          <Link to="/">
            <Button text="Home"/>
          </Link>
          <NavbarDivider/>
          <Link to="/tickets">
            <Button text="Tickets"/>
          </Link>
        </NavbarGroup>
      </Navbar>
      <div className="main">
        <Provider state={ticketsPageState}>
          <Route path="/tickets" component={TicketsPage}/>
        </Provider>
      </div>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
