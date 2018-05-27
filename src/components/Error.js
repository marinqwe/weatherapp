import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const ErrorPage = ({ error, message }) => (
    <div>
        <Header />
        <div className="background">
            <div className="content-container">
                <div className="error__title">{message}</div>
                <div className="error">{error.toString()}</div>
                <Link className="error__link" to="/">
                    <div>Click here to refresh the start page.</div>
                </Link>
            </div>
        </div>
    </div>
);

export default ErrorPage;
