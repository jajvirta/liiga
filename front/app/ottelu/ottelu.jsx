import React from 'react';
import Router from 'react-router';
import otteluStore from './ottelu_store.js';
import KayttajaStore from '../kayttaja/kayttaja_store.js';
import KayttajaService from '../kayttaja/kayttaja_service.js';
import { Link } from 'react-router';
import otteluService from './ottelu_service.js';
import { Button, Table, Input } from 'react-bootstrap';
import Reflux from 'reflux';
import _ from 'lodash';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(otteluStore, 'ottelu'),
        Reflux.connect(KayttajaStore, 'kayttaja')
    ],

    componentWillMount: function() {
        otteluService.getOttelu(this.getParams().otteluId)
            .then(function(result) {
                if (result && result.tulos) {
                    // console.log('got', result.tulos);
                }
            });
        KayttajaService.haeKayttaja();
    },

    componentWillUpdate: function() {
    },

    lahetaTulospeli: function(lohko) {
        var t = this;
        if (lohko === '2') {
            otteluService.updateTulospeli(this.getParams().otteluId,
                lohko,
                this.state['lohko_2_sija_1'], this.state['l2s1_joukkue'],
                this.state['lohko_2_sija_2'], this.state['l2s2_joukkue'],
                this.state['lohko_2_sija_3'], this.state['l2s3_joukkue'],
                this.state['lohko_2_sija_4'], this.state['l2s4_joukkue']).
                then(function(result) {
                    document.location.reload(false);
                });
        } else if (lohko === '1') {
            otteluService.updateTulospeli(this.getParams().otteluId,
                lohko,
                this.state['lohko_1_sija_1'], this.state['l1s1_joukkue'],
                this.state['lohko_1_sija_2'], this.state['l1s2_joukkue'],
                this.state['lohko_1_sija_3'], this.state['l1s3_joukkue'],
                this.state['lohko_1_sija_4'], this.state['l1s4_joukkue']).
                then(function(result) {
                    otteluService.getOttelu(t.getParams().otteluId);
                });
        }
    },

    lahetaReikapeli: function() {
        var t = this;
        otteluService.lahetaReikapeli(this.getParams().otteluId,
            this.state.ottelu.ottelu.kotijoukkueId, this.state.ottelu.ottelu.vierasjoukkueId,
            this.state['reikapeli1_koti'], this.state['reikapeli1_vieras'], this.state['reikapeli1_tulos'],
            this.state['reikapeli2_koti'], this.state['reikapeli2_vieras'], this.state['reikapeli2_tulos'],
            this.state['reikapeli3_koti'], this.state['reikapeli3_vieras'], this.state['reikapeli3_tulos'],
            this.state['reikapeli4_koti'], this.state['reikapeli4_vieras'], this.state['reikapeli4_tulos'])
                .then(function(result) {
                    otteluService.getOttelu(t.getParams().otteluId);
                });
    },

    lahetaKokonaistulos: function(kotipisteet, vieraspisteet) {
        otteluService.lahetaKokonaistulos(this.getParams().otteluId, kotipisteet, vieraspisteet);
    },

    onBlur: function(kentta, event) {
        this.state[kentta] = event.target.value;
    },

    handleOhjelmaChanged: function(event) {
        //
    },

    handleTulospeliJoukkue: function(peli, event) {
        this.state[peli] = event.target.value;
    },

    handleSelectChange: function(peli, event) {
        this.state[peli] = event.target.value;
    },

    handleTulosSelectChange: function(peli, event) {
        this.state[peli] = event.target.value;
    },

    createPelaajaOption: function(pelaaja) {
        if (pelaaja) {
            return (
                <option
                    key={'o_' + pelaaja}
                    value={pelaaja}>{pelaaja}</option>
            );
        } else {
            return ( <span/> );
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

    tulospisteet: function(tulos, joukkue) {
        var yht = 0;
        if (!tulos || !tulos.lohko1Voittaja.value || !tulos.lohko2Voittaja.value) {
            return 0;
        }
        yht += tulos.lohko1Voittaja.value.joukkue === joukkue ? 3 : 0;
        yht += tulos.lohko1Kakkonen.value.joukkue === joukkue ? 2 : 0;
        yht += tulos.lohko1Kolmonen.value.joukkue === joukkue ? 1 : 0;

        yht += tulos.lohko2Voittaja.value.joukkue === joukkue ? 3 : 0;
        yht += tulos.lohko2Kakkonen.value.joukkue === joukkue ? 2 : 0;
        yht += tulos.lohko2Kolmonen.value.joukkue === joukkue ? 1 : 0;

        return yht;
    },

    reikapisteet: function(tulos, joukkuelabel) {
        if (!tulos || !tulos.ensimmainen.value) {
            return 0;
        }
        var field = '';
        if (joukkuelabel === 'koti') {
            field = 'kotipisteet';
        } else if (joukkuelabel === 'vieras') {
            field = 'vieraspisteet';
        }
        return (tulos.ensimmainen.value[field] +
                tulos.toinen.value[field] +
                tulos.kolmas.value[field] +
                tulos.neljas.value[field]);
    },

    render: function () {
        var current = this.state.ottelu.ottelu;

        var kotijoukkue = current ? current.kotijoukkue : null;
        var vierasjoukkue = current ? current.vierasjoukkue : null;
        var kotijoukkueId = current ? current.kotijoukkueId : null;
        var vierasjoukkueId = current ? current.vierasjoukkueId : null;

        var kayttaja = this.state.kayttaja;
        var t = this;
        var tulos = this.state.ottelu.tulos;
        if (!current || !kayttaja) {
            return ( <div/> );
        }

        console.log(tulos);
        console.log(tulos.lohko1Voittaja.value);

        var isSuperuser = this.state.kayttaja.authenticated && this.state.kayttaja.superuser;

        var lohko2Syotetty = tulos && tulos.lohko2Voittaja && tulos.lohko2Voittaja.value && tulos.lohko2Voittaja.value.nimi;
        var lohko1Syotetty = tulos && tulos.lohko1Voittaja && tulos.lohko1Voittaja.value && tulos.lohko1Voittaja.value.nimi;

        var l1s1 = tulos && tulos.lohko1Voittaja && tulos.lohko1Voittaja.value ? tulos.lohko1Voittaja.value.nimi : null;
        var l1s1j = tulos && tulos.lohko1Voittaja && tulos.lohko1Voittaja.value ? tulos.lohko1Voittaja.value.joukkue : null;
        var l1s2 = tulos && tulos.lohko1Kakkonen && tulos.lohko1Kakkonen.value ? tulos.lohko1Kakkonen.value.nimi : null;
        var l1s3 = tulos && tulos.lohko1Kolmonen && tulos.lohko1Kolmonen.value ? tulos.lohko1Kolmonen.value.nimi : null;
        var l1s4 = tulos && tulos.lohko1Nelonen && tulos.lohko1Nelonen.value ? tulos.lohko1Nelonen.value.nimi : null;

        var l2s1 = tulos && tulos.lohko2Voittaja && tulos.lohko2Voittaja.value ? tulos.lohko2Voittaja.value.nimi : null;
        var l2s2 = tulos && tulos.lohko2Kakkonen && tulos.lohko2Kakkonen.value ? tulos.lohko2Kakkonen.value.nimi : null;
        var l2s3 = tulos && tulos.lohko2Kolmonen && tulos.lohko2Kolmonen.value ? tulos.lohko2Kolmonen.value.nimi : null;
        var l2s4 = tulos && tulos.lohko2Nelonen && tulos.lohko2Nelonen.value ? tulos.lohko2Nelonen.value.nimi : null;

        var L = [l1s1, l1s2, l1s3, l1s4, l2s1, l2s2, l2s3, l2s4];

        return (
            <div>
            <h1>Ottelu: { kotijoukkue } - { vierasjoukkue }</h1>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <td>Tulospeli, lohko 1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l1s1 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text" className="input" placeholder="pelaajan nimi..."
                              onChange={_.partial(this.onBlur, 'lohko_1_sija_1')}
                              onBlur={_.partial(this.onBlur, 'lohko_1_sija_1')}
                              value={l1s1}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko1Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ?
                                tulos.lohko1Voittaja.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l1s1_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <tr>
                        <td>2. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l1s2 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_1_sija_2')}
                              value={l1s2}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko1Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko1Kakkonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            value={ tulos.lohko1Voittaja.value ? tulos.lohko1Kakkonen.value.joukkue : null }
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l1s2_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>

                    <tr>
                        <td>3. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l1s3 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_1_sija_3')}
                              value={l1s3}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko1Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko1Kolmonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            value={ tulos.lohko1Voittaja.value ? tulos.lohko1Kolmonen.value.joukkue : null }
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l1s3_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <tr>
                        <td>4. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l1s4 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_1_sija_4')}
                              value={l1s4}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko1Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko1Nelonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            value={ tulos.lohko1Voittaja.value ? tulos.lohko1Nelonen.value.joukkue : null }
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l1s4_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <td></td>
                    { lohko1Syotetty || !isSuperuser ?
                        <tr><td></td></tr> :
                        <tr>
                          <td>
                            <button
                              className='' onClick={_.partial(this.lahetaTulospeli, '1')}>Lähetä tulospeli</button>
                          </td>
                        </tr>
                    }
                    <tr>
                        <td>Tulospeli, lohko 2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l2s1 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text" className="input" placeholder="pelaajan nimi..."
                              onChange={_.partial(this.onBlur, 'lohko_2_sija_1')}
                              onBlur={_.partial(this.onBlur, 'lohko_2_sija_1')}
                              value={l2s1}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko2Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko2Voittaja.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l2s1_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <tr>
                        <td>2. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l2s2 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_2_sija_2')}
                              value={l2s2}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko2Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko2Kakkonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l2s2_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>

                    <tr>
                        <td>3. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l2s3 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_2_sija_3')}
                              value={l2s3}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko2Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko2Kolmonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l2s3_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <tr>
                        <td>4. sija</td>
                        <td>
                        { !isSuperuser ?
                            <span>{ l2s4 }</span> :
                            <div>
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="input"
                              onChange={this.onChange}
                              onBlur={_.partial(this.onBlur, 'lohko_2_sija_4')}
                              value={l2s4}
                            /></div> }
                        </td>
                        { !isSuperuser || lohko2Syotetty ?
                            <td>
                            { tulos && tulos.lohko1Voittaja.value ? 
                                tulos.lohko2Nelonen.value.joukkue === kotijoukkueId ? kotijoukkue : vierasjoukkue : null }
                            </td>
                        :
                        <td>
                          <Input type='select'
                            disabled={!isSuperuser}
                            onChange={_.partial(t.handleTulospeliJoukkue, 'l2s4_joukkue')}>
                            <option value=''></option>
                            <option value={kotijoukkueId}>{kotijoukkue}</option>
                            <option value={vierasjoukkueId}>{vierasjoukkue}</option>
                          </Input>
                        </td>
                        }
                    </tr>
                    <td></td>
                    { lohko2Syotetty || !isSuperuser ?
                        <tr><td></td></tr> :
                        <tr>
                          <td>
                            <button
                              className='' onClick={_.partial(this.lahetaTulospeli, '2')}>Lähetä tulospeli</button>
                          </td>
                        </tr>
                    }
                </tbody>
            </Table>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <th>Kotijoukkueen pisteet</th>
                        <th>Vierasjoukkueen pisteet</th>
                    </tr>
                    <tr>
                    <th>{ this.tulospisteet(tulos, kotijoukkueId) }</th>
                    <th>{ this.tulospisteet(tulos, vierasjoukkueId) }</th>
                    </tr>
                    </tbody>
            </Table>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <td>Reikäpelit</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Kotijoukkueen pelaajat</td>
                        <td>Vierasjoukkueen pelaajat</td>
                        <td>Tulos</td>
                    </tr>
                    <tr>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.ensimmainen.value.kotipelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli1_koti')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.ensimmainen.value.vieraspelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli1_vieras')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                            <div>
                            <Input type='select' value={ tulos.ensimmainen.value ? tulos.ensimmainen.value.tulosString : null }
                              disabled={!isSuperuser}
                              onChange={_.partial(t.handleTulosSelectChange, 'reikapeli1_tulos')}>
                              <option key='peli1' value='tyhja'></option>
                              <option key='peli1_1' value='kotivoitto'>2 - 0</option>
                              <option key='peli1_2' value='tasapeli'>1 - 1</option>
                              <option key='peli1_3' value='vierasvoitto'>0 - 2</option>
                            </Input>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                          { l1s1 ?

                          <Input type='select' value={tulos.ensimmainen.value ? tulos.toinen.value.kotipelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli2_koti')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                          { l1s1 ?

                          <Input type='select' value={tulos.ensimmainen.value ? tulos.toinen.value.vieraspelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli2_vieras')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                            <div>
                            <Input type='select' value={ tulos.toinen.value ? tulos.toinen.value.tulosString : null }
                              disabled={!isSuperuser}
                              onChange={_.partial(t.handleTulosSelectChange, 'reikapeli2_tulos')}>
                              <option key='peli2' value='tyhja'></option>
                              <option key='peli2_1' value='kotivoitto'>2 - 0</option>
                              <option key='peli2_2' value='tasapeli'>1 - 1</option>
                              <option key='peli2_3' value='vierasvoitto'>0 - 2</option>
                            </Input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.kolmas.value.kotipelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli3_koti')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.kolmas.value.vieraspelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli3_vieras')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                            <div>
                            <Input type='select' value={ tulos.kolmas.value ? tulos.kolmas.value.tulosString : null }
                              disabled={!isSuperuser}
                              onChange={_.partial(t.handleTulosSelectChange, 'reikapeli3_tulos')}>
                              <option key='peli3' value='tyhja'></option>
                              <option key='peli3_1' value='kotivoitto'>2 - 0</option>
                              <option key='peli3_2' value='tasapeli'>1 - 1</option>
                              <option key='peli3_3' value='vierasvoitto'>0 - 2</option>
                            </Input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.neljas.value.kotipelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli4_koti')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                          { l1s1 ?
                          <Input type='select' value={tulos.ensimmainen.value ? tulos.neljas.value.vieraspelaaja : null}
                              disabled={!isSuperuser}
                            onChange={_.partial(t.handleSelectChange, 'reikapeli4_vieras')}>
                            <option value=''></option>
                            {L.map(t.createPelaajaOption)}
                          </Input>
                          : null }
                        </td>
                        <td>
                            <div>
                            <Input type='select' value={ tulos.neljas.value ? tulos.neljas.value.tulosString : null }
                              disabled={!isSuperuser}
                              onChange={_.partial(t.handleTulosSelectChange, 'reikapeli4_tulos')}>
                              <option key='peli4' value='tyhja'></option>
                              <option key='peli4_1' value='kotivoitto'>2 - 0</option>
                              <option key='peli4_2' value='tasapeli'>1 - 1</option>
                              <option key='peli4_3' value='vierasvoitto'>0 - 2</option>
                            </Input>
                            </div>
                        </td>
                    </tr>
                    { !isSuperuser ?
                        <tr><td></td></tr> :
                        <tr>
                          <td>
                            <button
                              className='' onClick={this.lahetaReikapeli}>Lähetä reikäpeli</button>
                          </td>
                        </tr>
                    }
                </tbody>
            </Table>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <th>Kotijoukkueen pisteet</th>
                        <th>Vierasjoukkueen pisteet</th>
                    </tr>
                    <tr>
                    <th>{ this.reikapisteet(tulos, 'koti') }</th>
                    <th>{ this.reikapisteet(tulos, 'vieras') }</th>
                    </tr>
                    </tbody>
            </Table>

            <Table bordered condensed striped>
                <tbody>
                    <tr>
                        <th>Kotijoukkueen kokonaispisteet</th>
                        <th>Vierasjoukkueen kokonaispisteet</th>
                    </tr>
                      { !isSuperuser ?
                    <tr>
                          <th>{ this.tulospisteet(tulos, kotijoukkueId) + this.reikapisteet(tulos, 'koti') }</th>
                          <th>{ this.tulospisteet(tulos, vierasjoukkueId) + this.reikapisteet(tulos, 'vieras') }</th>
                    </tr>
                      :
                    <tr>
                          <th>{ this.tulospisteet(tulos, kotijoukkueId) + this.reikapisteet(tulos, 'koti') }</th>
                          <th>{ this.tulospisteet(tulos, vierasjoukkueId) + this.reikapisteet(tulos, 'vieras') }</th>
                          <th> { current.kpiste } - { current.vpiste } </th>
                          <th>
                            <button className=''
                              onClick={_.partial(this.lahetaKokonaistulos,
                               this.tulospisteet(tulos, kotijoukkueId) + this.reikapisteet(tulos, 'koti'),
                               this.tulospisteet(tulos, vierasjoukkueId) + this.reikapisteet(tulos, 'vieras'))
                              }
                              >Lähetä kokonaistulos</button>
                          </th>
                    </tr>
                      }
                    </tbody>
            </Table>



            </div>
        );
    }
});
