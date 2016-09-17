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
        var t = this;
        SarjataulukkoService.getSarjataulukko()
            .then(function(result) {
                t.setState( { tau: result });
                SarjataulukkoService.getRanking()
                    .then(function(result) {
                        t.setState( { ran: result });
                    });
            });
    },

    pick: function(o) {
        return o.pelit; 
    },

    voitot: function(o) { return o.pelit; },

    sortBy: function(which) {
        // 
    },

    renderPelaaja: function(pelaaja) {
        return (
            <tr>
            <td>{ pelaaja.nimi }</td>
            <td>{ pelaaja.ottelut }</td>
            <td>{ pelaaja.tulospisteet }</td>
            <td>{ pelaaja.reikapelipisteet }</td>
            <td>{ pelaaja.reikapelipisteet + pelaaja.tulospisteet }</td>
            </tr>
        );
    },

    renderRivi: function(rivi) {
        return (
                <tr key={rivi.joukkue}>
                    <td> { rivi.joukkue }</td>
                    <td> { rivi.pelit }</td>
                    <td> { rivi.voitot }</td>
                    <td> { rivi.tasapelit }</td>
                    <td> { rivi.haviot }</td>
                    <td> { rivi.ottelupisteet }</td>
                    <td> { rivi.kotiottelupisteet }</td>
                    <td> { rivi.vierasottelupisteet }</td>
                    <td> { rivi.pisteet }</td>
                    <td> { rivi.kotipisteet }</td>
                    <td> { rivi.vieraspisteet }</td>
                </tr>
            );
    },

    render: function () {
        var t = this;
        // var f = this.state.sarja.sarjataulukko;
        var uirivit = this.state.sarja ? this.state.sarja.sarjataulukko.rivit : [];
        var uirivit = this.state.tau ? this.state.tau.rivit : [];
        // uirivit = _.sortBy(uirivit, function(o) { return 0 - o.sarjapisteet; });
        // uirivit = _.sortBy(uirivit, function(o) { return 0 - o.pisteet; });
        //
        var ranking = this.state.ran ? this.state.ran : [];
        ranking = _.sortBy(ranking, function(p) { return p ? (0 - (p.tulospisteet + p.reikapelipisteet)) : 0; });
        if (ranking) {
            console.log(ranking[0]);
        }

        return (
            <div>
                <h1>Sarjataulukko ja pistetilanne</h1>

                <Table striped bordered condensed hover>
                    <thead>
                        <tr><th colSpan='5'>Länsilohko</th></tr>
                        <tr key='jee'>
                            <th>Nimi</th><th>Pelit</th>
                            <th><span onClick={ this.sortBy(this.voitot) }>Voitot</span></th>
                            <th>Tasapelit</th> <th>Häviöt</th> <th>Ottelupisteet</th> 
                            <th>koti</th><th>vieras</th>
                            <th>Sarjapisteet</th>
                            <th>koti</th><th>vieras</th>
                        </tr>
                    </thead>
                    <tbody>
                    { _.chain(uirivit)
                        .filter(function(o) { return o.lohkoId === 1; })
                        .map(t.renderRivi).value() }

                    </tbody>

                    <thead>
                        <tr><th colspan='5'>Itälohko</th></tr>
                        <tr key='jee'>
                            <th>Nimi</th><th>Pelit</th>
                            <th><span onClick={ this.sortBy(this.voitot) }>Voitot</span></th>
                            <th>Tasapelit</th> <th>Häviöt</th> <th>Ottelupisteet</th>
                            <th>koti</th><th>vieras</th>
                            <th>Sarjapisteet</th>
                            <th>koti</th><th>vieras</th>
                        </tr>
                    </thead>
                    <tbody>
                    { _.chain(uirivit)
                        .filter(function(o) { return o.lohkoId === 2; })
                        .map(t.renderRivi).value() }
                    </tbody>
                </Table>

                <h1>Pelaajaranking ja tilastot</h1>

                <Table striped bordered condensed hover>
                    <thead>
                        <tr><th colspan='5'>Länsilohkon ranking</th></tr>
                        <tr key='jee'>
                            <th>Nimi</th>
                            <th>Pelit</th>
                            <th>Tulospelipisteet</th>
                            <th>Reikapelipisteet</th>
                            <th>Yhteispisteet</th>
                        </tr>
                    </thead>
                    <tbody>
                    { _.chain(ranking)
                        .filter(function(o) { return o.joukkuelohko === 1; })
                        .map(t.renderPelaaja).value() }
                    </tbody>
                </Table>

                <Table striped bordered condensed hover>
                    <thead>
                        <tr><th colspan='5'>Itälohkon ranking</th></tr>
                        <tr key='jee'>
                            <th>Nimi</th>
                            <th>Pelit</th>
                            <th>Tulospelipisteet</th>
                            <th>Reikapelipisteet</th>
                            <th>Yhteispisteet</th>
                        </tr>
                    </thead>
                    <tbody>
                    { _.chain(ranking)
                        .filter(function(o) { return o.joukkuelohko === 2; })
                        .map(t.renderPelaaja).value() }
                    </tbody>
                </Table>
            </div>
        );
    }
});
