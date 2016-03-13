import React from 'react';
import Router from 'react-router';
import IlmoStore from './ilmo_store.js';
import IlmoService from './ilmo_service.js';
import { Button, Input, Table, Select } from 'react-bootstrap';
import Reflux from 'reflux';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(IlmoStore, 'ilmo')
    ],

    getInitialState: function() {
        console.log("initial");
        return { nimi: "" };
    },

    componentWillReceiveProps(nextProps) {
        console.log('nextprops?', nextProps);
    },

    handleClick: function() {
        IlmoService.lahetaIlmoittautuminen(
                'tre_liiga_2016',
                this.state.nimi,
                this.state.kotirata,
                this.state.yhteyshenkilo,
                this.state.puhelinnumero,
                this.state.yhteyshenkilo_sahkposti);

    },

    handleNimiChange: function(event) {
        this.setState({ nimi: event.target.value });
        // IlmoService.updateNimi(event.target.value);
    },

    handleKotirataChange: function(event) {
        this.setState({ kotirata: event.target.value });
    },

    handleYhteyshenkiloChange: function(event) {
        this.setState({ yhteyshenkilo: event.target.value });
    },

    handleYhteyshenkiloPuhelinnumeroChange: function(event) {
        this.setState({ puhelinnumero: event.target.value });
    },

    handleYhtSahkopostiChange: function(event) {
        this.setState({ yhteyshenkilo_sahkposti: event.target.value });
    },

    render: function () {
        return (
            <div>
                <h1>Ilmoittautuminen Tampereen seudun frisbeegolf-joukkueliigaan</h1>

                <p>Ilmoittautuminen alkaa <a href="/login">loggaamalla sisään
                   Facebook-tunnuksilla</a>. Sovellus ei pyydä mitään erikoisoikeuksia
                   Facebook-tililtäsi. Se on vain tapa tunnistaa yhteyshenkilöt.</p>

                <Table>
                    <tr>
                        <td>Sarja</td>
                        <td>Tampereen seudun frisbeegolf-liiga, 2016 </td>
                    </tr>
                     <tr>
                        <td>Joukkueen nimi</td>
                        <td><Input type='text'
                            size='50'
                            onChange={this.handleNimiChange} 
                            value={ this.state.nimi } /></td>
                    </tr>
                    <tr>
                        <td>Joukkueen kotirata (<em>esim. Vihioja, Kylmäkoski DGP, jne</em>)</td>
                        <td><Input type='text'
                            onChange={this.handleKotirataChange} 
                            value={ this.state.kotirata } /></td>
                    </tr>

                    <tr>
                        <td>Yhteyshenkilön nimi</td>
                        <td><Input
                                type='text'
                                onChange={this.handleYhteyshenkiloChange} 
                                value={this.state.yhteyshenkilo}/></td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön puhelinnumero</td>
                        <td><Input
                                type='text'
                                onChange={this.handleYhteyshenkiloPuhelinnumeroChange} 
                                value={this.state.puhelinnumero}/></td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön sähköposti</td>
                        <td><Input type='text' onChange={this.handleYhtSahkopostiChange}
                                value={this.state.yhteyshenkilo_sahkposti}/></td>
                    </tr>
                    <tr><td></td><td><Button type="submit" onClick={this.handleClick}>Siirry ilmoittautumisen vahvistamiseen ..</Button></td></tr>
                </Table>
            </div>
        );
    }
});
