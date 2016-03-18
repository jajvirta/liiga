import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
var RouteHandler = Router.RouteHandler;
import ohjelmaStore from './ohjelma_store.js';
import ohjelmaService from './ohjelma_service.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(ohjelmaStore, 'ohjelma')
    ],

    componentWillMount: function() {
        ohjelmaService.getohjelmaet();
    },

    render: function () {
        return (
            <div>
                <h1>Liigan otteluohjelma kesällä 2016</h1>

                <p>TBD.</p>
            </div>
        );
    }
});
