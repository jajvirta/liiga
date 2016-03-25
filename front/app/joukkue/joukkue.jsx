import React from 'react';
import Router from 'react-router';
import joukkueStore from './joukkue_store.js';
import KayttajaStore from '../kayttaja/kayttaja_store.js';
import KayttajaService from '../kayttaja/kayttaja_service.js';
import joukkueService from './joukkue_service.js';
import { Button, Table } from 'react-bootstrap';
import Reflux from 'reflux';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(joukkueStore, 'joukkue'),
        Reflux.connect(KayttajaStore, 'kayttaja')
    ],

    componentWillMount: function() {
        joukkueService.getJoukkue(this.getParams().joukkueid);
        KayttajaService.haeKayttaja();
    },

    render: function () {
        var current = this.state.joukkue.valittu;
        var kayttaja = this.state.kayttaja;
        console.log(kayttaja);
        return (
            <div>
            <h1>Joukkue: { current.nimi }</h1>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <td>Kotirata</td>
                        <td> { current.kotirata }</td>
                    </tr>
                    <tr>
                        <td>Kuvaus</td>
                        <td> { current.kuvaus }</td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilö</td>
                        <td> { current.yhteyshenkilo }</td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön puhelinnumero</td>
                        { this.state.kayttaja.authenticated ?
                            <td> { current.yhteyshenkiloPuhelinnumero } </td> :
                            <td> <small>Näkyvissä vain kirjautuneille käyttäjille.</small> </td> }
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön sähköpostiosoite</td>
                        { this.state.kayttaja.authenticated ?
                            <td> { current.yhteyshenkiloSahkoposti } </td> :
                            <td> <small>Näkyvissä vain kirjautuneille käyttäjille.</small> </td> }
                    </tr>

                </tbody>
            </Table>
            </div>
        );
    }
});
