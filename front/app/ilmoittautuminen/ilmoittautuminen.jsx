import React from 'react';
import Router from 'react-router';
import IlmoStore from './ilmo_store.js';
import KayttajaService from '../kayttaja/kayttaja_service.js';
import KayttajaStore from '../kayttaja/kayttaja_store.js';
import IlmoService from './ilmo_service.js';
import { Modal, Button, Input, Table, Select } from 'react-bootstrap';
import Reflux from 'reflux';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(IlmoStore, 'ilmo'),
        Reflux.connect(KayttajaStore, 'kayttaja')
    ],

    getInitialState: function() {
        return {
            nimi: "",
            showModal: false };
    },

    openModal: function() {
        this.setState({ showModal: true });
    },

    closeModal: function() {
        this.setState({ showModal: false });
    },


    componentWillMount: function() {
        console.log('mounting..', this);

        var t = this;
        KayttajaService.haeKayttaja()
            .then(function(result) {
                console.log('promisessa', result);
                t.setState({ yhteyshenkilo: result.name });
            });
    },

    handleClick: function() {
        var state = this.state;
        var t = this;
        IlmoService.lahetaIlmoittautuminen(
                'tre_liiga_2016',
                this.state.nimi,
                this.state.ilmo.kotirata,
                this.state.yhteyshenkilo,
                this.state.puhelinnumero,
                this.state.yhteyshenkilo_sahkposti).
            then(function() {
                t.closeModal();
            });
    },

    handleNimiChange: function(event) {
        this.setState({ nimi: event.target.value });
        // IlmoService.updateNimi(event.target.value);
    },

    handleKotirataChange: function(event) {
        IlmoService.updateKotirata(event.target.value);
        // this.setState({ kotirata: event.target.value });
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

    isValid: function(validate, value) {
        return validate(value) === 'success';
    },

    disabled: function() {
        return !this.isValid(this.validateNimi, this.state.nimi)
            || !this.isValid(this.validateNimi, this.state.ilmo.kotirata)
            || !this.isValid(this.validatePuhelin, this.state.puhelinnumero)
            || !this.isValid(this.validateEmail, this.state.yhteyshenkilo_sahkposti)
            || !this.isValid(this.validateNimi, this.state.yhteyshenkilo);
    },

    validateNimi: function(value) {
        if (value && value.length < 2 || !value) {
            return 'error';
        }
        return 'success';
    },

    validateEmail: function(value) {
        if (!value) {
            return 'warning';
        } else if (value && value.length < 2 || !value) {
            return 'error';
        }

        var re = /.+@.+/;

        if (re.test(value)) {
            return 'success';
        } else {
            return 'error';
        }
    },

    helpEmail: function(validator, value) {
        if (validator(value) === 'success' || validator(value) === 'warning') {
            return;
        }

        return 'Sähköposti ei mennyt tarkistuksesta läpi.'
    },

    validatePuhelin: function(value) {
        if (!value) {
            return 'warning';
        } else if (value && value.length < 1) {
            return 'error';
        }

        var re = /^[0-9-+ ]+$/;

        if (re.test(value)) {
            return 'success';
        } else {
            return 'error';
        }
    },

    helpPuhelin: function(validator, value) {
        if (validator(value) === 'success' || validator(value) === 'warning') {
            return '';
        }

        return 'Anna numero muodossa +358 1234567 tai 0505555555.'
    },

    helpNimi: function(validator, value) {
        if (validator(value) === 'success') {
            return;
        }

        return 'Tieto on pakollinen.';
    },

    renderIlmo: function() {
        return (
                <div><i>Olet kirjautunut sisään käyttäjänä: { this.state.kayttaja.name }</i>
                <br/>
                <Modal container={this}
                       onHide={this.closeModal}
                       show={this.state.showModal}
                       close={this.closeModal}>
                    <Modal.Body>
                            <div className='application-section'>
                                <h2>Ilmoittaumisen lähettäminen</h2>
                                <p>( .. ohje ..)</p>
                                <button className='' onClick={this.handleClick}>Lähetä</button>
                                <button className='cancel right' onClick={this.closeModal}>Peru</button>
                            </div>
                        </Modal.Body>
                    </Modal>
                <h1>Ilmoittautuminen Tampereen seudun frisbeegolf-joukkueliigaan</h1>

                <Table>
                    <tr>
                        <td>Sarja</td>
                        <td>Tampereen seudun frisbeegolf-liiga, 2016 </td>
                    </tr>
                     <tr>
                        <td>Joukkueen nimi</td>
                        <td><Input type='text'
                            size='70'
                            onChange={this.handleNimiChange}
                            value={ this.state.nimi }
                            bsStyle={ this.validateNimi(this.state.nimi) }
                            help={ this.helpNimi(this.validateNimi, this.state.nimi) }
                            /></td>
                    </tr>
                    <tr>
                        <td>Joukkueen kotirata (<em>esim. Vihioja, Kylmäkoski DGP, jne</em>)</td>
                        <td><Input type='text'
                            onChange={this.handleKotirataChange}
                            value={ this.state.ilmo.kotirata }
                            bsStyle={ this.validateNimi(this.state.ilmo.kotirata) }
                            help={ this.helpNimi(this.validateNimi, this.state.ilmo.kotirata) }
                            /></td>
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
                                value={this.state.puhelinnumero}
                                bsStyle={ this.validatePuhelin(this.state.puhelinnumero) }
                                help={ this.helpPuhelin(this.validatePuhelin, this.state.puhelinnumero) }
                                /></td>
                    </tr>
                    <tr>
                        <td>Yhteyshenkilön sähköposti</td>
                        <td><Input type='text' onChange={this.handleYhtSahkopostiChange}
                                value={this.state.yhteyshenkilo_sahkposti}
                                bsStyle={ this.validateEmail(this.state.yhteyshenkilo_sahkposti) }
                                help={ this.helpEmail(this.validateEmail, this.state.yhteyshenkilo_sahkposti) }
                                /></td>
                    </tr>
                    <tr><td></td><td>
                        <Button 
                          type="submit"
                          disabled={ this.disabled() }
                          onClick={this.openModal}>
                              Siirry ilmoittautumisen vahvistamiseen
                        </Button>
                    </td></tr>
                </Table>

                </div>
                );
    },

    renderLogin: function() {
        return (
                <div>
                    <h1>Kirjaudu sisään aloittaaksesi ilmoittautumisen</h1>
                    <p>
                        Ilmoittautuminen aloitetaan tunnistautumalla joko Facebook- tai Google/Gmail-tunnuksella.
                        Sovellus ei pyydä mitään oikeuksia Facebook/Google-tileillesi. Sovellus käyttää vain
                        tunnistustietoa yhdistääkseen yhteyshenkilön joukkueensa.
                    </p>
                    <p>
                        <a href="/login">Kirjaudu sisään Facebook-tunnuksella</a>.<br/>
                        Kirjaudu sisään Google/Gmail-tunnuksella. (Ei ole vielä toteutettu.)
                    </p>
                </div>);
    },

    render: function () {

        return (
            <div>
                { this.state.kayttaja.authenticated ?
                    this.renderIlmo() :
                        this.renderLogin() }
                        <hr/>

 
           </div>
        );
    }
});
