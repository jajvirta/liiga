import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Table } from 'react-bootstrap';
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
        JoukkueService.getJoukkueet();
    },

    render: function () {
        return (
            <div>
                <h1>Liigaan ilmoittautuneet joukkueet</h1>

                <h2>Alustavat</h2>

                <Table striped bordered condensed hover>
                    <thead><tr><th>Nimi</th><th>Yhteyshenkilö</th><th>Kotirata</th></tr></thead>
                    <tbody>
                { _.chain(this.state.joukkue.joukkueet)
                    .map(function(joukkue) {
                        return (
                                <tr key={joukkue.id}>
                                    <td> { joukkue.nimi }</td>
                                    <td> { joukkue.yhteyshenkilo }</td>
                                    <td> { joukkue.kotirata }</td>
                                </tr>
                            );
                    }).value()
                }
                </tbody>

                </Table>


                <h2>Vahvistetut</h2>
            </div>
        );
    }
});
