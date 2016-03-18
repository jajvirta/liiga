import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
var RouteHandler = Router.RouteHandler;
import rankingStore from './ranking_store.js';
import rankingService from './ranking_service.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(rankingStore, 'ranking')
    ],

    componentWillMount: function() {
        rankingService.getrankinget();
    },

    render: function () {
        return (
            <div>
                <h1>Ranking-listat</h1>

                <p>TBD.</p>
            </div>
        );
    }
});
