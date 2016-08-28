
alter table henkilo add column joukkue integer references joukkue (joukkue_id) on delete no action;
