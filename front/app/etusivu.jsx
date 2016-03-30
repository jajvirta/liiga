import React from 'react';
import Router from 'react-router';
import { Link } from 'react-router';
var RouteHandler = Router.RouteHandler;

export default React.createClass({
    render: function () {
        return (
            <div>

                <h1>Mikä on Tampereen seudun frisbeegolf-joukkueliiga?</h1>

                <p>
                Tampereen seudun frisbeegolf-joukkueliiga on <b>kaikille avoin</b>
                &nbsp;Tampereen seudun <b>joukkuepelisarja</b>, jossa etsitään Tampereen
                seudun parasta frisbeegolf-joukkuetta. Joukkueen saa muodostaa vapaasti
                eikä yhdenkään joukkueen jäsenen tarvitse kuulua esimerkiksi mihinkään
                jäsenseuraan.  Joukkue valitsee itselleen kotiradan.
                Kotiottelut pelataan lähtökohtaisesti joukkueen kotiradalla.
                </p>

                <p>
                Joukkueet pelaavat kauden aikana sarjan, jossa joukkue pelaa
                kaikkia muita joukkueita vastaan koti- ja vierasottelun. Pelejä tulee
                noin kerran viikkoon tai kahteen. Pelipäivä on normaalisti keskiviikko ja peliaika
                18:00. Yhdessä ottelussa <b>neljän pelaajaan joukkueet</b> ratkovat 
                paremmuuden yhdeksän väylän tulospelissä ja yhdeksän
                väylän reikäpeleissä.
                </p>

                <p>
                Joukkueissa voi olla kauden aikana <b>vapaavalintainen määrä pelaajia</b>, mutta
                yksittäiset ottelut pelataan aina nelihenkisesti. Kauden
                lopuksi eniten pisteitä keränneet joukkueet palkitaan. Sarjan
                järjestää ensimmäisellä kaudella Tampereen Frisbeeseura Ry.
                </p>

                <p>
                Ilmoittautuminen tehdään osoitteessa <a
                href="http://liiga.tfs.fi/#/ilmo">http://liiga.tfs.fi/#/ilmo</a>.
                </p>


                <hr/>

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
