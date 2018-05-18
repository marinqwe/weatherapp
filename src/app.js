import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<AppRouter />, document.getElementById('app'));