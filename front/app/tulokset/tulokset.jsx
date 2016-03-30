import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Modal, Textarea, Button, Input, Table, Select } from 'react-bootstrap';
import { Dropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';
import TuloksetStore from './tulokset_store.js';
import TuloksetService from './tulokset_service.js';
import { hasExactMatch } from '../common/utils.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(TuloksetStore, 'tulokset')
    ],

    getInitialState: function() {
        return {
            value: '',
            koti_2: '',
            nimet: ['Jarno Virtanen', 'Tero Hirvelä', 'Mikko Putaja', 'Jaajo Linnainmaa', 
            'Matti Virtanen']
        };
    },

    componentWillMount: function() {
        console.log(this.state.nimet);
    },

    componentDidUpdate: function() {
        var curValue = this.state.value;
        var proposedValue = this.state.tulokset.valittuNimi;
        var self = this;

        if (curValue && proposedValue && curValue !== proposedValue) {
            TuloksetService.setNimi('');
            self.setState({ value: proposedValue });
        }
    },

    filteredNames: function(value) {
        var self = this;

        const onClickNimi = function(nimi) {
            TuloksetService.setNimi(nimi);
        };


        if (!value || value.length === 0) {
            return ( <div></div> );
        } else if (hasExactMatch(this.state.nimet, value)) {
            return ( <div></div> );
        } else if (value && value.length >= 0) {

            return (

            <div className="mydropdown-content">
            { _.chain(this.state.nimet)
                .filter(function(nimi) {
                    return (nimi && nimi.toLowerCase().indexOf(value.toLowerCase()) > -1);
                })
                .map(function(nimi) {
                    return (
                            <span className="mydropdown-item">
                            <a
                                onClick={_.partial(onClickNimi, nimi)}>
                                &nbsp;&nbsp; { nimi } &nbsp;
                            </a>&nbsp;&nbsp;<br/></span>
                           );
                }).value()
            }
            </div>
            );
        }
    },

    onChange: function(event) {
        this.setState({ value: event.target.value });
        TuloksetService.update();
    },

    onChangeKoti2: function(event) {
        console.log('koti2change', event.target.value);
        this.setState({ koti_2: event.target.value });
        TuloksetService.update();
    },

    render: function () {
        return (
            <div>
                <h1>Tulosten ilmoittaminen</h1>

                <p>
                <b>Huom.: ei ole vielä käytössä.</b>
                </p>

                <Table bordered>
                    <tbody>
                    <tr><td>Kotijoukkue</td>
                    <td>Vierasjoukkue</td>
                    </tr>
                    <tr>
                        <td>
                          <div className="mydropdown">
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="dropinput"
                              placeholder="kirjoita nimi..."
                              onChange={this.onChange}
                              value={this.state.value}
                            />
                            { this.filteredNames(this.state.value) }
                          </div>
                    </td>
                    </tr>
                    <tr>
                        <td>
                          <div className="mydropdown">
                            <input
                              ref={input => this.input = input}
                              type="text"
                              className="dropinput"
                              placeholder="kirjoita nimi..."
                              onChange={ this.onChangeKoti2 }
                              value={this.state.koti_2}
                            />
                            { this.filteredNames(this.state.koti_2) }
                          </div>
                    </td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        );
    }
});
