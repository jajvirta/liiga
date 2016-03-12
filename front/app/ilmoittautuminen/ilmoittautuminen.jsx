import React from 'react';
import Router from 'react-router';
import IlmoStore from './ilmo_store.js';
import IlmoService from './ilmo_service.js';
import { Button, Input, Table } from 'react-bootstrap';
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
        console.log("helo!");
        IlmoService.another();
    },

    handleNimiChange: function(event) {
        // this.setState({ nimi: event.target.value });
        IlmoService.updateNimi(event.target.value);
    },

    handleKotirataChange: function(event) {
        // this.setState({ nimi: event.target.value });
        // IlmoService.updateNimi(event.target.value);
    },

    handleChange: function(event) {
        // this.setState({ nimi: event.target.value });
    },

    render: function () {
        return (
            <div>
                <h1>Ilmoittautuminen Tampereen seudun frisbeegolf-joukkueliigaan</h1>

                <Table>
                    <tr>
                        <td>Joukkueen nimi</td>
                        <td><Input type='text'
                            size='50'
                            onChange={this.handleNimiChange} 
                            value={ this.state.ilmo.nimi } /></td>
                    </tr>
                    <tr>
                        <td>Joukkueen kotirata (<em>esim. Vihioja, Kylmäkoski DGP, jne</em>)</td>
                        <td><Input type='text'
                            onChange={this.handleKotirataChange} 
                            value={ this.state.ilmo.kotirata } /></td>
                    </tr>

                    <tr>
                        <td>Yhteyshenkilön nimi</td>
                        <td><Input
                                type='text'
                                onChange={this.handleChange} 
                                value={this.state.yhteyshenkilo}/></td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön sähköposti</td>
                        <td><Input type='text' onChange={this.handleChange} value={this.state.yhteyshenkilo_sahkposti}/></td>
                    </tr>
                    <tr><td></td><td><Button type="submit" onClick={this.handleClick}>Lähetä ilmoittautuminen</Button></td></tr>
                </Table>
            </div>
        );
    }
});
