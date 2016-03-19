import React from 'react';
import Router from 'react-router';
import SarjataulukkoStore from './sarjataulukko_store';
import SarjataulukkoService from './sarjataulukko_service.js';
import { Button, Table } from 'react-bootstrap';
import Reflux from 'reflux';
import _ from 'lodash';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(SarjataulukkoStore, 'sarjataulukko')
    ],

    handleClick: function() {
        SaannotService.another();
    },

    componentWillMount: function() {
        SarjataulukkoService.getSarjataulukko();
    },

    pick: function(o) {
        return o.pelit; 
    },

    voitot: function(o) { return o.pelit; },

    sortBy: function(which) {
        // 
    },

    render: function () {
        var f = this.state.sarjataulukko;
        var uirivit = this.state.sarjataulukko.rivit;
        uirivit = _.sortBy(uirivit, function(o) { return o.pelit; });

        return (
            <div>
                <h1>Sarjataulukko ja pistetilanne</h1>

                <Table striped bordered condensed hover>

                <thead>
                    <tr key='jee'>
                        <th>Nimi</th><th>Pelit</th>
                        <th><span onClick={ this.sortBy(this.voitot) }>Voitot</span></th>
                        <th>Tasapelit</th>
                        <th>Häviöt</th>
                        <th>Pisteet</th>
                    </tr>
                </thead>

                <tbody>
                { _.chain(uirivit)
                    .map(function(rivi) {
                        return (
                                <tr key={rivi.joukkue}>
                                    <td> { rivi.joukkue }</td>
                                    <td> { rivi.pelit }</td>
                                    <td> { rivi.voitot }</td>
                                    <td> { rivi.tasapelit }</td>
                                    <td> { rivi.haviot }</td>
                                    <td> { rivi.pisteet }</td>
                                </tr>
                            );
                    }).value()
                }
                </tbody>
                </Table>

            </div>
        );
    }
});
