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

    render: function () {
        return (
            <div>
                <h1>Tampereen seudun frisbeegolf-joukkueliigan säännöt</h1>

                <h2>Mikä on Tampereen seudun frisbeegolf-joukkueliiga?</h2>

                <p>
                Tampereen seudun frisbeegolf-joukkueliiga on <b>kaikille avoin</b> Tampereen seudun
                joukkuepelisarja, jossa etsitään Tampereen seudun parasta
                frisbeegolf-joukkuetta. Joukkueet pelaavat kauden aikana kaikki
                kaikkia vastaan koti- ja vierasottelun, joissa neljä pelaajaa
                joukkueet ratkovat paremmuuden yhdeksän väylän tulospelissä ja
                yhdeksän väylän reikäpeleissä. Joukkueissa voi olla kauden aikana vapaa
                määrä pelaajia, mutta yksittäiset ottelut pelataan aina nelihenkisesti. 
                Kauden lopuksi eniten pisteitä keränneet joukkueet palkitaan. Sarjan järjestää ensimmäisellä kaudella Tampereen
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

                <p>Joukkueen ilmoittaminen Tampereen seudun
                frisbeegolf-joukkueliigaan tapahtuu ensisijaisesti liigan kotisivuilla
                osoitteessa <a href="https://liiga.tfs.fi/">https://liiga.tfs.fi</a>.
                Jos ilmoittautumisessa on ylitsepääsemättömiä teknisiä ongelmia, niin
                yhteyshenkilö voi ilmoittaa siitä sähköpostiosoitteeseen <code>liiga@tfs.fi</code>.
                </p>

                <p>Ilmoittautuminen alkaa kirjautumalla sisään Facebook tai Google-tunnuksella.
                Tämä yhdistää joukkueen yhteyshenkilön liigan sivuston tietoihin. Ilmoittautumislomake
                kertoo mitä ilmoittautumiseen vaaditaan.
                </p>

                <p> Joukkueet saavat vapaasti lisätä muita pelaajia kauden
                aikana. Tietty pelaaja ei saa kuitenkaan pelata kahdessa eri
                joukkueessa yhden kauden aikana. Pelaajien ei tarvitse kuulua
                mihinkään jäsenseuraan eikä Frisbeeliittoon.
                </p>

                <p>
                Tämän jälkeen joukkueen tulee suorittaa <b>perjantaihin 15.4.
                mennessä osallistumismaksu</b> (ks. kohta Osallistumismaksu
                        liigaan) alla olevin tiedoin. Jos maksu ei näy TFS:n
                tilillä viimeistään perjantain 15.4. aikana, niin joukkueella
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
                Maksuista pääosa (noin 80-90%) käytetään liigassa parhaiten
                menestyneiden joukkueiden ja yksilöiden palkitsemiseen. Loput
                rahat käytetään liigan hallituksen päättämällä tavalla eli
                pääosin liigan mahdollisesti aiheuttamiin juokseviin kuluihin.
                Liigassa menestyneitä voidaan palkita tämän lisäksi myös
                erillisillä sponsoripalkinnoilla, jos sellaisia saadaan
                järjestettyä.  </p>

                <h2>Sarjatasot ja lohkot</h2>
                <p>
                Liigassa on ensimmäisellä kaudella yksi sarjataso. Jos sarjaan
                ilmoittautuu yli 10 joukkuetta, liigan hallitus päättää miten
                joukkueet jaetaan useampiiin lohkoihin. Sarjat ja lohkot
                pyritään jakamaan niin, että otteluita tulee kauden aikana
                yhteensä enintään n. 10-15. Jos lohkoja on useampi, niin
                lohkojen parhaat pelaavat kauden lopuksi ratkaisupelit. Tarkka
                systeemi päätetään kun tiedetään joukkueiden määrä.  </p>

                <h2>Liigan ja yksittäisten otteluiden aikataulu</h2>

                <p>Liiga pelataan noin huhtikuun puolesta välistä syyskuun puoleen
                väliin. Pelit aikataulutetaan kiinteästi järjestäjän toimesta.
                Aikataulu julkistetaan liigan sivuilla. Jos sarjat joudutaan
                jakamaan useampaan lohkoon, liigan aikataulu suunnitellaan
                niin, että lohkojen kärkijoukkueet ehtivät pelaamaan
                ratkaisuottelut syyskuun loppuun mennessä. </p>

                <p>Liigan ottelut pelataan lähtökohtaisesti keskiviikkoisin
                alkaen kello 18:00. Joukkueet voivat yhteisellä päätöksellä
                siirtää pelin kyseisellä viikolla jollekin toiselle
                päivälle.</p>

                <h2>Pelipaikkavaatimukset</h2>

                <p>Joukkueet ilmoittavat ilmoittautuessaan kotiradan. Kotiradan
                voi vaihtaa kauden aikana erillisellä ilmoituksella liigan
                hallitukselle.</p>

                <p> Ottelut pelataan lähtökohtaisesti aikataulun mukaisen
                kotijoukkueen kotiradalla. Joukkueet kuitenkin voivat
                yhteisellä päätöksellä ja etukäteen sovitusti pelata tietyn
                ottelun jossain toisessa pelipaikassa.</p>

                <p>Pelipaikan vaatimukset:</p>

                <ul>
                    <li>radan pitää olla yleisesti käytössä</li>
                    <li>saa olla maksullinen; ei saa olla yksityinen</li>
                    <li>jos rata on maksullinen, kotijoukkue hoitaa pelimaksut ja pelioikeuden</li>
                    <li>ottelussa pelataan radan sillä hetkellä yleisesti käytössä olevalla layoutilla</li>
                    <li>enintään n. 50 kilometrin päässä Tampereelta</li>
                    <li>väylien määrää ei ole rajoitettu </li>
                    <li>radan pitää löytyä frisbeegolfradat.fi -listauksesta</li>
                </ul>

                <p>Epäselvissä tapauksissa päätöksen pelipaikan soveltuvuudesta tekee liigan hallitus.</p>
                
                <h2>Ottelu- ja pistejärjestelmä, luovutukset ja vajaalla joukkueella pelaaminen</h2>

                <p>Liigassa yhdessä ottelussa molemmilla joukkueilla pelaa
                neljä pelaajaa. Otteluissa on oltava paikalla vähintään kolme
                pelaajaa kummastakin joukkueesta. Muussa tapauksessa koko
                ottelu tuomitaan luovutetuksi. Myös tulosten ilmoittaminen
                myöhässä tulkitaan koko ottelun luovuttamiseksi. Tällöin
                luovutusvoiton saa vierasjoukkue.</p>

                <h2>Yksittäisen ottelun ottelujärjestelmä</h2>

                <p>
                Yksittäinen sarjaottelu koostuu tulososuudesta ja reikäpeliosuudesta.
                </p>

                <p>
                Tulospelissä pelaajat jaetaan kahteen neljän hengen ryhmään, joissa molemmilta
                joukkueilta on kaksi pelaajaa. Ryhmät arvotaan. Ryhmät kirjaavat tuloksensa ja
                tarkistavat ne ryhmäkohtaisesti yhdeksän väylän jälkeen. Jos eri joukkueen pelaajilla on sama
                tulos ryhmän sisällä, niin he ratkaisevat järjestyksen kotijoukkueen määräämällä CTP-väylällä.
                </p>

                <p>
                Ryhmän pelaajat sijoitetaan tämän jälkeen ryhmän tulosjärjestykseen. Ryhmän voittaja saa
                kolme pistettä, toinen kaksi pistettä, kolmas yhden pisteen, neljäs nolla. Molempien ryhmien
                tulokset lasketaan lopputulokseen yhteen.
                </p>

                <p>
                Molempien joukkueiden parhaiten sijoittunut pelaaja sijoitetaan
                ensimmäiseen reikäpeliin, toinen toiseen, jne. Tasatuloksessa joukkue määrää itse
                järjestyksen. Kotijoukkueen pitää sijoittaa pelaajat ensin listaan.
                </p>

                <p>
                Reikäpeleistä saa ottelun voitosta kaksi pistettä ja tasapelistä yhden pisteen.
                </p>

                <p>
                Lopuksi sekä tulososuuden että reikäpelien pisteet lasketaan yhteen ja enemmän pisteitä
                saanut joukkue voittaa. Ottelu voi päättyä myös tasan. Koko ottelun voitosta saa kolme
                pistettä sarjataulukossa, tasapelistä saa yhden pisteen.
                </p>

                <h2>Tasapisteissä olevien paremmuuden määräytyminen</h2>

                <p>
                Järjestys sarjassa määräytyy alla mainitun mukaan:
                </p>
                <ol>
                    <li>joukkueen pisteet otteluista (3 voitosta, 1 tasapelistä, 0 voitosta.)</li>
                    <li>joukkueen otteluiden kokonaistulosten pisteet (10-2, 9-3, jne)</li>
                    <li>tulosotteluiden pisteet</li>
                    <li>voitettujen reikäpelien määrä</li>
                </ol>

                <h2>Otteluajat ja niiden siirtäminen</h2>

                <p>Sarjatasojen koko yritetään mitoittaa niin, että pelejä
                tulee keskimäärin kerran noin 1-2 viikossa.
                Pelitahtia vähennetään juhannuksen ja heinäkuun alun tienoilla.</p>

                <p>Liigan pelipäivä on lähtökohtaisesti keskiviikko.
                Ottelupäiviä ja -aikoja voi myös joukkueiden keskinäisellä
                sopimuksella siirtää. Tämä on tehtävä hyvissä ajoin. Ottelut
                alkavat ohjelmiensa mukaisena päivinä kello 18:00.</p>

                <h2>Joukkueen sulkeminen sarjasta</h2>

                <p>Kolmesta otteluluovutuksesta joukkue suljetaan sarjasta.
                Joukkueen osallistumismaksua ei palauteta.</p>

                <h2>Tulokset ja
                niiden ilmoittaminen</h2>

                <p>
                <b>Kotijoukkue</b> on velvollinen ilmoittamaan lopputuloksen
                vaadittuine tietoineen liigalle. Lopputuloksesta
                ilmoitetaan tulospelien järjestys ja reikäpelien ottelutulokset.
                Yhteyshenkilö ilmoittaa tulokset &nbsp;
                <a href="http://liiga.tfs.fi/">http://liiga.tfs.fi/ -sivustolla</a>&nbsp;
                    mahdollisimman nopeasti mutta viimeistään seuraavaan päivään
                    klo 20:00 mennessä.</p>

                <p>Jos tulosten ilmoittaminen ei toimi liigan sivustolla, niin joukkue
                voi lähettää tulokset osoitteeseen liiga@tfs.fi</p>

                <h2>Liigan palkinnot</h2>

                <p>Sarjatason ilmoittautumismaksuista muodostetaan
                palkintopotti, johon laitetaan n. 80-90% osallistumismaksuista
                (riippuen osallistujamäärästä). Parhaat joukkueet palkitaan myös
                pokaaleilla. Tarkemmat tiedot palkinnoista julkaistaan heti kun
                tiedetään lopullinen osallistujamäärä. 
                </p>


            </div>
        );
    }
});
