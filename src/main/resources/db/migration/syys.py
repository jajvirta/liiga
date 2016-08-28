#!/usr/bin/python

current_date = None

for line in file('V14__otteluohjelma.sql'):
    if line.find('delete from') > -1:
        continue
    elif line.find('to_date') > -1:
        current_date = line
    elif line.find('select joukkue_id from') > -1:
        pdate = current_date.split("'")
        c = line.split("'")
        new_date = {
                '2016-05-04': '2016-07-20',
                '2016-05-11': '2016-07-27',
                '2016-05-18': '2016-08-03',
                '2016-05-25': '2016-08-10',
                '2016-06-01': '2016-08-17',
                '2016-06-08': '2016-08-24',
                '2016-06-15': '2016-08-31'
                }
        if c[3] in ('Nelosketju', 'Sasta FG'):
            new_date = {
                    '2016-05-04': '2016-07-21',
                    '2016-05-11': '2016-07-28',
                    '2016-05-18': '2016-08-04',
                    '2016-05-25': '2016-08-11',
                    '2016-06-01': '2016-08-18',
                    '2016-06-08': '2016-08-25',
                    '2016-06-15': '2016-09-01'
                    }
        print "%s'%s'%s" % (pdate[0], new_date[pdate[1]], "'".join(pdate[2:])),
        print "%s'%s'%s'%s'%s" % (c[0], c[3], c[2], c[1], c[4]),
    else:
        print line,

