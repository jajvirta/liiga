import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Modal, Textarea, Button, Input, Table, Select } from 'react-bootstrap';
import { Dropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';
import TuloksetStore from './tulokset_store.js';
import TuloksetService from './tulokset_service.js';


export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(TuloksetStore, 'tulokset')
    ],

    getInitialState: function() {
        return {
            value: '',
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

    addNimi1: function(event) {
        // console.log(this.state.nimet);
        // console.log(event.target.value);
    },

    filteredNames: function(value) {
        var self = this;

        const onClickNimi = function(nimi) {
            TuloksetService.setNimi(nimi);
        };

        if (!value || value.length === 0) {
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
                                &nbsp;&nbsp;
                                { nimi }
                                &nbsp;
                            </a>&nbsp;&nbsp;<br/></span>
                           );
                }).value()
            }
            </div>
            );
        } 
    },

    onChange: function(event) {
        // console.log(event.target.value);
        this.setState({ value: event.target.value });
        TuloksetService.update();
    },

    render: function () {
        return (
            <div>
                <h1>Tulosten ilmoittaminen</h1>

                <p>
                <b>Huom.: ei ole vielä käytössä.</b>
                </p>

                <Table>
                    <tbody>
                    <tr><td></td><td>Ryhmä 1:n tulosjärjestys</td>
                    <td>&nbsp; &mdash; &nbsp;</td>
                    <td>Ryhmä 2:n tulosjärjestys</td>
                    </tr>
                    <tr>
                        <td>1. sija</td>
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
                    </td></tr>
                    </tbody>
                </Table>

            </div>
        );
    }
});
