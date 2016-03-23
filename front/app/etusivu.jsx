import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
var RouteHandler = Router.RouteHandler;

export default React.createClass({
    render: function () {
        return (
            <div>
                <h1>Ajankohtaista frisbeegolf-joukkueliigasta</h1>

                <h2><i>ke 22.3.2016</i>: Säännöt jotakuinkin valmiina, mutta niitä muutetaan tarvittaessa</h2>

                <p>Liigan säännöt löytyvät nyt kokonaisuudessaan <Link to='saannot'>säännöt-sivulta</Link>, mutta
                niihin saatetaan tehdä tarvittaessa vielä pieniä muutoksia. Mahdollisista muutoksista ilmoitetaan
                liigan etusivulla.
                </p>

                <h2><i>pe 17.3.2016</i>: Ilmoittautuminen aukeaa pian</h2>

                <p><Link to='ilmo'>Liigaan ilmoittautuminen</Link> aukeaa pian.</p>
                <p>Stay tuned. Pysykää vireessä.</p>
            </div>
        );
    }
});
