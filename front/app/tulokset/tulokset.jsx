import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
var RouteHandler = Router.RouteHandler;
import TuloksetStore from './tulokset_store.js';
import TuloksetService from './tulokset_service.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(TuloksetStore, 'tulokset')
    ],

    componentWillMount: function() {
    },

    render: function () {
        return (
            <div>
                <h1>Tulosten ilmoittaminen</h1>

                <p>TBD.</p>

            </div>
        );
    }
});
