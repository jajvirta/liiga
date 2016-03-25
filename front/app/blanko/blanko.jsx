import React from 'react';
import Router from 'react-router';
import Store from './blanko_store.js';
import Service from './blanko_service.js';
import { Button  } from 'react-bootstrap';
import Reflux from 'reflux';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(BlankoStore, 'blanko')
    ],

    render: function () {
        return (
            <div>
            </div>
        );
    }
});
