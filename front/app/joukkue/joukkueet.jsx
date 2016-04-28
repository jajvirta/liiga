import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';
var RouteHandler = Router.RouteHandler;
import JoukkueStore from './joukkue_store.js';
import JoukkueService from './joukkue_service.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(JoukkueStore, 'joukkue')
    ],

    componentWillMount: function() {
        var foo = this.getParams().joku;

        JoukkueService.getAlustavatJoukkueet();
        JoukkueService.getVahvistetutJoukkueet();
        if (foo) {
        JoukkueService.getOttelut();
        }
    },

    renderJoukkue: function(joukkue) {
        var polku = '/joukkue/' + joukkue.joukkueId;
        return (
                <tr key={joukkue.joukkueId}>
                    <td> <Link to={ polku }>{ joukkue.nimi }</Link></td>
                    <td> { joukkue.yhteyshenkilo }</td>
                    <td> { joukkue.kotirata }</td>
                </tr>
            );
    },

    renderOttelu: function(ottelu) {
        var polku = '/joukkue/' + ottelu.otteluId;
        var kj = '/joukkue/' + ottelu.kotijoukkueId;
        var vj = '/joukkue/' + ottelu.vierasjoukkueId;
        return (
                <tr key={ottelu.otteluId}>
                    <td> keskiviikko { ottelu.formattedPelipaiva } kello 18:00</td>
                    <td> <Link to={ kj }>{ ottelu.kotijoukkue }</Link></td>
                    <td> <Link to={ vj }>{ ottelu.vierasjoukkue }</Link></td>
                </tr>
            );
    },


    render: function () {
        var t = this;
        return (
            <div>
                <h1>Alustavat otteluohjelma</h1>

                <p><b>Huom</b>.: otteluohjelmat eivät ole vielä lopullisia.</p>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr><th colSpan='3'><h2>Länsilohko</h2></th></tr>
                    </thead>
                    <tr><th>Ajankohta</th><th>Kotijoukkue</th><th>Vierasjoukkue</th></tr>
                    <tbody>
                { _.chain(this.state.joukkue.ottelut)
                    .filter(function(o) { return o.lohkoId === 3; })
                    .map(t.renderOttelu).value() }
                    </tbody>
                </Table>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr><th colSpan='3'><h2>Itälohko</h2></th></tr>
                    </thead>
                    <tr><th>Ajankohta</th><th>Kotijoukkue</th><th>Vierasjoukkue</th></tr>
                    <tbody>
                { _.chain(this.state.joukkue.ottelut)
                    .filter(function(o) { return o.lohkoId === 4; })
                    .map(t.renderOttelu).value() }
                    </tbody>
                </Table>


                <h1>Liigaan ilmoittautuneet joukkueet</h1>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr><th colSpan='3'><h2>Alustavat</h2></th></tr>
                    </thead>
                    <tr><th>Nimi</th><th>Yhteyshenkilö</th><th>Kotirata</th></tr>
                    <tbody>
                { _.chain(this.state.joukkue.alustavat)
                    .map(t.renderJoukkue).value() }
                    <tr>
                        <td colSpan='3'>
                            <h2>Vahvistetut</h2>
                            <p>Ilmoittautumismaksu on maksettu ja se on noteerattu.</p>
                        </td>
                    </tr>
                    <tr><th>Nimi</th><th>Yhteyshenkilö</th><th>Kotirata</th></tr>
                { _.chain(this.state.joukkue.vahvistetut)
                    .map(t.renderJoukkue).value() }
                    </tbody>
                </Table>


            </div>
        );
    }
});
