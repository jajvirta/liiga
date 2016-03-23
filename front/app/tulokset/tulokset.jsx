import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import { Modal, Textarea, Button, Input, Table, Select } from 'react-bootstrap';
import _ from 'lodash';
import TuloksetStore from './tulokset_store.js';
import TuloksetService from './tulokset_service.js';

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(TuloksetStore, 'tulokset')
    ],

    componentWillMount: function() {
    },

    render: function () {
        return (
            <div>
                <h1>Tulosten ilmoittaminen</h1>

                <p>TBD.</p>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                            <Input
                                type='text'
                                size='40'
                                maxLength='40'
                                onChange={ this.addNimi }
                                value={ this.state.nimi }/>
                            </td>
                            <td>
                            <Input
                                type='text'
                                size='40'
                                maxLength='40'
                                onChange={ this.addNimi }
                                value={ this.state.nimi }/>
                            </td>

                        </tr>

                    </tbody>
                </Table>

            </div>
        );
    }
});
