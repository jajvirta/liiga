
import 'babelify/polyfill'; //eslint-disable-line no-unused-vars

import React from 'react/addons';
import Reflux from 'reflux';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

import Etusivu from './etusivu.jsx';
import Ranking from './ranking/ranking.jsx';
import Ohjelma from './ohjelma/ohjelma.jsx';
import Saannot from './saannot/saannot.jsx';
import Tulokset from './tulokset/tulokset.jsx';
import Sarjataulukko from './sarjataulukko/sarjataulukko.jsx';
import Joukkueet from './joukkue/joukkueet.jsx';
import Ilmo from './ilmoittautuminen/ilmoittautuminen.jsx';

import KayttajaService from './kayttaja/kayttaja_service.js';

var Liiga = React.createClass({
    mixins: [
        Router.State
    ],

    getInitialState: function() {
        return {
            nimi: "",
            authenticated: false };
    },

    componentWillMount: function() {
        var t = this;
        KayttajaService.haeKayttaja()
            .then(function(result) {
                t.setState({ nimi: result.name });
                t.setState({ authenticated: result.authenticated });
            });
    },

    logout: function() {
        KayttajaService.logout().
            then(function() {
                window.location.href = "/";
            });
    },

    render() {
        return (
            <div>
                <div className="header">
                    <div className="wrapper">
                        <nav className="main clearfix">
                            <div className="back-link">
                                { this.state.authenticated ?
                                    <div>
                                        <small>Kirjautuneena: { this.state.nimi }</small>
                                        <br/>
                                        <small>
                                            <Button bsSize='xsmall' onClick={this.logout}>Kirjaudu ulos</Button>
                                        </small>
                                    </div>
                                    :
                                <small><a href="/login/facebook">Facebook-login</a>
                                <br/><a href="/login/google">Google-login</a>
                                </small> }
                            </div>
                            <div className="main-title">
                            <h1><Link to='etusivu'>Tampereen seudun frisbeegolf-joukkueliiga</Link></h1>
                            </div>

                            <div className="alert-field clearfix">
                            </div>
                        </nav>
                    </div>
                </div>
                <div>
                    <div className="main">
                        <div id='navigation' className="sidebar">
                            <ul className='side-navigation'>
                                <li className='menu-item'>
                                    <Link to='etusivu'><span className="text">Ajankohtaista</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='saannot'><span className="text"><div>Lyhyt kuvaus & säännöt</div></span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='joukkueet'><span className="text">Joukkueet & Otteluohjelma</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='sarjataulukko'><span className="text">Sarjataulukko & ranking-listat</span></Link>
                                </li>
                                <li className='menu-item'>
                                <img src="/common/img/logo-pieni.png"/>
                                </li>


                                <li className='menu-item'>
                                    <Link to='ilmo'><span className="text">Ilmoittautuminen</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='tulokset'><span className="text">Tulosten ilmoittaminen</span></Link>
                                </li>
                            </ul>
                        </div>
                        <div className='content'>

                            <RouteHandler/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var routes = (
    <Route>
        <Route name='liiga' path='/' handler={ Liiga }>
            <Route name='from_face' path='_=_' handler={ Etusivu } />
            <Route name='etusivu' handler={ Etusivu } />
            <Route name='saannot' handler={ Saannot } />
            <Route name='ranking' handler={ Ranking } />
            <Route name='ohjelma' handler={ Ohjelma } />
            <Route name='joukkueet' handler={ Joukkueet } />
            <Route name='sarjataulukko' handler={ Sarjataulukko } />
            <Route name='ilmo' handler={ Ilmo } />
            <Route name='tulokset' handler={ Tulokset } />
            <DefaultRoute handler={ Etusivu }/>
        </Route>
        <DefaultRoute handler={ Etusivu }/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('container'));
});
