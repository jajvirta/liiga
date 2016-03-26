#!/usr/bin/python

import sys, re

fn = "../pom.xml"

if len(sys.argv) > 1:
    fn = sys.argv[1]

bump = True
if len(sys.argv) > 2:
    bump = False

versio = None
for line in file(fn):
    m = re.search('<version>(.*?)</version>', line)
    if m:
        versio = m.groups(1)
        break

comps = versio[0].split('.')
if bump:
    print '%s.%s.%d' % (comps[0], comps[1], (int(comps[2])+1))
else:
    print '%s.%s.%s' % (comps[0], comps[1], comps[2])


