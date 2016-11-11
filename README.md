

Tampereen seudun frisbeegolf-joukkueliiga website. http://liiga.tfs.fi/

Requirements:

* Java (8)
* Postgresql database
* npm

Running:

mvn spring-boot:run



createuser tfsliiga -W
createdb -O tfsliiga tfsliiga

Backup/restore


    pg_dump -h localhost -U tfsliiga tfsliiga --format=t -C --file=dump-clear-2016-07-09.tar
    dropdb tfsliiga
    createdb -O tfsliiga tfsliiga
    pg_restore -U tfsliiga -d tfsliiga dump-clear-2016-07-09.tar

älä välitä restoren sanomista virheistä (jostain public scheman diipa
daapasta): kanta toimii silti.

jee


