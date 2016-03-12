import React from 'react';
import Router from 'react-router';
import SaannotStore from './saannot_store';
import SaannotService from './saannot_service.js';
import { Button  } from 'react-bootstrap';
import Reflux from 'reflux';

var RouteHandler = Router.RouteHandler;

export default React.createClass({

    mixins: [
        Router.State,
        Reflux.connect(SaannotStore, 'saannot')
    ],

    handleClick: function() {
        SaannotService.another();
        // YhteenvetoService.lahetaHakemus(organisaatiohakemusId, this.state.kielivalinta);
    },

    render: function () {
        var f = this.state.saannot;
        console.log('f', f);
        return (
            <div>
                <h1>Tampereen seudun frisbeegolf-joukkueliigan säännöt</h1>

                <h2>Mikä on Tampereen seudun frisbeegolf-joukkueliiga?</h2>
                
                <p>
                Tampereen seudun frisbeegolf-joukkueliiga on Tampereen seudun
                joukkuepelisarja, jossa etsitään Tampereen seudun parasta
                frisbeegolf-joukkuetta. Joukkueet pelaavat kauden aikana kaikki
                kaikkia vastaan koti- ja vierasottelun, joissa neljän pelaajan
                joukkueet ratkovat paremmuuden yhdeksän väylän tulospelissä ja
                yhdeksän väylän reikäpeleissä. Kauden lopuksi eniten pisteitä
                keränneet joukkueet palkitaan. Sarjan järjestää Tampereen
                Frisbeeseura Ry.
                </p>

                <h2>Liigan järjestäminen ja päätäntävalta</h2>

                <p>
                Kaudella 2016 Tampereen seudun
                frisbeegolf-joukkueliigan järjestää Tampereen
                Frisbeeseura Ry (TFS). Tampereen seudun
                frisbeegolf-joukkueliigan hallituksena toimii TFS:n hallitus ja
                toimintaa pyörittävä Jarno Virtanen. Liigan hallitus vahvistaa
                liigan säännöt ja tekee päätökset sääntöepäselvyyksissä ja
                sääntöjen tulkinnoissa.
                </p>

                <h2>Joukkueiden ilmoittautuminen sarjaan</h2>

                <p> Joukkueen ilmoittaminen Tampereen seudun
                frisbeegolf-joukkueliigaan tapahtuu sähköpostilla osoitteeseen
                liiga@tfs.fi otsikolla “Ilmoittautuminen Tampereen
                frisbeegolf-liigaan”.  </p>
                
                <p> Kerro sähköpostissa joukkueen nimi, yhteyshenkilö
                yhteystietoineen (puhelinnumero ja sähköpostiosoite) sekä
            joukkueen kotirata. Listaa lisäksi vähintään kolme muuta pelaajaa.
            Joukkueet saavat kuitenkin vapaasti lisätä muita pelaajia kauden
            aikana. Tietty pelaaja ei saa kuitenkaan pelata kahdessa eri
            joukkueessa yhden kauden aikana. Pelaajien ei tarvitse kuulua
            mihinkään jäsenseuraan eikä Frisbeeliittoon.
                </p>

                <p>
                Tämän jälkeen joukkueen tulee suorittaa <b>maanantaihin 11.4.
                mennessä osallistumismaksu</b> (ks. kohta Osallistumismaksu
                        liigaan) alla olevin tiedoin. Jos maksu ei näy TFS:n
                tilillä viimeistään maanantain 11.4. aikana, niin joukkueella
                ei ole pelioikeutta liigassa. (Myöhässä ilmoittautuneille ja
                        siksi sarjasta suljetuille palautetaan maksamansa
                        osallistumismaksu.) </p>

                <blockquote>
                Tilinumero: FI17 8330 0710 4436 19<br/>
                Saaja: Tampereen Frisbeeseura<br/>
                Viestiin: Frisbeegolfliiga, osallistumismaksu &lt;joukkueen nimi&gt;<br/>
                Summa: 60 euroa<br/>
                </blockquote>


                <h2>Osallistumismaksu liigaan</h2>

                <p>
                Liigan osallistumismaksu kaudella 2016 on 60 euroa per joukkue. Liiga järjestetään, jos ilmoittautuneita ja osallistumismaksun maksaneita joukkueita tulee vähintään viisi joukkuetta. Jos liigaa ei järjestetä, niin osallistumismaksut palautetaan.
                </p>

                <p>
                Maksuista pääosa (noin 90%) käytetään liigassa parhaiten menestyneiden joukkueiden ja yksilöiden palkitsemiseen. Loput rahat käytetään liigan hallituksen päättämällä tavalla eli pääosin liigan mahdollisesti aiheuttamiin juokseviin kuluihin. Liigassa menestyneitä voidaan palkita tämän lisäksi myös erillisillä sponsoripalkinnoilla, jos sellaisia saadaan järjestettyä.
                </p>
                <h2>Sarjatasot ja lohkot</h2>
                <p>
                Liigassa on ensimmäisellä kaudella yksi sarjataso. Jos sarjaan ilmoittautuu yli 10 joukkuetta, liigan hallitus päättää miten joukkueet jaetaan useampiiin lohkoihin. Sarjat ja lohkot pyritään jakamaan niin, että otteluita tulee kauden aikana yhteensä enintään n. 10-15. Jos lohkoja on useampi, niin lohkojen parhaat pelaavat kauden lopuksi ratkaisupelit. Tarkka systeemi päätetään kun tiedetään joukkueiden määrä.
                </p>



            </div>
        );
    }
});
