
import 'babelify/polyfill'; //eslint-disable-line no-unused-vars

import React from 'react/addons';
import Reflux from 'reflux';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';
import { Link } from 'react-router';
import Etusivu from './etusivu.jsx';
import Saannot from './saannot/saannot.jsx';
import Sarjataulukko from './sarjataulukko/sarjataulukko.jsx';

import Joukkueet from './joukkue/joukkueet.jsx';

import Ilmo from './ilmoittautuminen/ilmoittautuminen.jsx';

var Liiga = React.createClass({
    mixins: [
        Router.State
    ],

    render() {
        return (
            <div>
                <div className="header">
                    <div className="wrapper">
                        <nav className="main clearfix">
                            <div className="back-link">
                                <a className="previous"></a>
                            </div>
                            <div className="save-info">
                            <h2><Link to='etusivu'>Tampereen seudun frisbeegolf-joukkueliiga</Link></h2>
                            </div>

                            <div className='back-link'>
                            </div>

                            <div className="alert-field clearfix">
                            </div>
                        </nav>
                    </div>

                    <div className="stripe"></div>
                </div>
                <div>
                    <div className="main">
                        <div id='navigation' className="sidebar">
                            <ul className='side-navigation'>
                                <li className='menu-item'>
                                    <Link to='etusivu'><span className="text">Yleistä tietoa</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='saannot'><span className="text"><div>Säännöt</div></span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='joukkueet'><span className="text">Joukkueet</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='sarjataulukko'><span className="text">Sarjataulukko</span></Link>
                                </li>
                                <li className='menu-item'>
                                    <Link to='ilmo'><span className="text">Ilmoittautuminen</span></Link>
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
            <Route name='joukkueet' handler={ Joukkueet } />
            <Route name='sarjataulukko' handler={ Sarjataulukko } />
            <Route name='ilmo' handler={ Ilmo } />
            <DefaultRoute handler={ Etusivu }/>
        </Route>
        <DefaultRoute handler={ Etusivu }/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('container'));
});
