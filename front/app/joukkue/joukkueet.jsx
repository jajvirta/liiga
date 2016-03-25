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
        JoukkueService.getAlustavatJoukkueet();
        JoukkueService.getVahvistetutJoukkueet();
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

    render: function () {
        var t = this;
        return (
            <div>
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
