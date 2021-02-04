import React from 'react'
import ReactDOM from 'react-dom';
import {
    Router,
    Route
  } from 'react-router-dom';
import main from "../css/main.css";
import media from "../css/media.css";

  import {createBrowserHistory} from 'history';
  import routes from './routes.js'

  ReactDOM.render(
    <Router history={createBrowserHistory()}>
    {routes}
    </Router>
    ,document.getElementById('root'));
