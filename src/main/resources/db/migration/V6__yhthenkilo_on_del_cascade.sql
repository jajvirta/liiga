
ALTER TABLE joukkue
DROP CONSTRAINT joukkue_yhteyshenkilo_id_fkey,
ADD CONSTRAINT joukkue_yhteyshenkilo_id_fkey
   FOREIGN KEY (yhteyshenkilo_id)
   REFERENCES henkilo(henkilo_id)
   ON DELETE CASCADE;

 
