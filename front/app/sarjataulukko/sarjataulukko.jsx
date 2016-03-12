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

    render: function () {
        var f = this.state.sarjataulukko;
        return (
            <div>
                <h1>Sarjataulukko ja pistetilanne</h1>

                <Table striped bordered condensed hover>

                <thead>
                    <tr key='jee'>
                        <th>Nimi</th><th>Pelit</th>
                        <th>Voitot</th>
                        <th>Tasapelit</th>
                        <th>Häviöt</th>
                        <th>Pisteet</th>
                    </tr>
                </thead>

                <tbody>
                { _.chain(this.state.sarjataulukko.rivit)
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
