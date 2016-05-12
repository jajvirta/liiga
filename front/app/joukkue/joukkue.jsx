import React from 'react';
import Router from 'react-router';
import joukkueStore from './joukkue_store.js';
import KayttajaStore from '../kayttaja/kayttaja_store.js';
import KayttajaService from '../kayttaja/kayttaja_service.js';
import { Link } from 'react-router';
import joukkueService from './joukkue_service.js';
import { Button, Table } from 'react-bootstrap';
import Reflux from 'reflux';
import _ from 'lodash';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(joukkueStore, 'joukkue'),
        Reflux.connect(KayttajaStore, 'kayttaja')
    ],

    componentWillMount: function() {
        joukkueService.getJoukkue(this.getParams().joukkueid);
        joukkueService.getJoukkueenOttelut(this.getParams().joukkueid);
        KayttajaService.haeKayttaja();
    },

    componentWillUpdate: function() {
        if (this.state.joukkue.valittu && (this.getParams().joukkueid !== this.state.joukkue.valittu.joukkueId)) {
            console.log(this.state.joukkue.valittu, this.getParams().joukkueid, this.state.joukkue.valittu.joukkueId);
            // joukkueService.getJoukkue(this.getParams().joukkueid);
            // joukkueService.getJoukkueenOttelut(this.getParams().joukkueid);
        }
    },

    renderOttelu: function(ottelu) {
        var polku = '/joukkue/' + ottelu.otteluId;
        var kj = '/joukkue/' + ottelu.kotijoukkueId;
        var vj = '/joukkue/' + ottelu.vierasjoukkueId;
        var tulos = ottelu.kpiste + ' - ' + ottelu.vpiste;
        return (
                <tr key={ottelu.otteluId}>
                    <td> { ottelu.formattedPelipaiva } kello 18:00</td>
                    <td>{ ottelu.kotijoukkue }</td>
                    <td>{ ottelu.vierasjoukkue }</td>
                    <td>
                        { (ottelu.kpiste === 0 && ottelu.vpiste === 0) ?  '' : tulos }
                    </td>
                </tr>
            );
    },

    render: function () {
        var current = this.state.joukkue.valittu;
        var kayttaja = this.state.kayttaja;
        var polku = '/public-api/liiga/joukkue/' + current.joukkueId + '/kalenteri';
        var t = this;
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
            <p>Siirrä <a href={ polku }>joukkueen kevätkauden pelit</a> kalenteriisi.</p>
            <p>
            iLaitteilla ja ainakin osalla Android-laitteista riittää, että klikkaa linkkiä ja hyväksyy tapahtumien lisäämisen omaan kalenteriin.
            Ohjeet tapahtumisen lisäämiseen Google Calendariin <a href="https://support.google.com/calendar/answer/37118">täällä</a>.
            En takaa tietojen oikeellisuutta tai ajantasaisuutta. Kalenterit eivät päivity automaattisesti muutosten sattuessa.</p>
            <Table striped bordered condensed hover>
                    <thead>
                    <tr><th colSpan='3'><h2></h2></th></tr>
                    </thead>
                    <tr><th>Ajankohta</th><th>Kotijoukkue</th><th>Vierasjoukkue</th></tr>
                    <tbody>
                { _.chain(this.state.joukkue.ottelut)
                    .map(t.renderOttelu).value() }
                    </tbody>
            </Table>

            </div>
        );
    }
});
