#!/bin/sh

# ALA laita skandeja tahan tiedostoon. Vagrant (ruby) kaatuu jos laitat.

set -xe

yum install -y docker
service docker start

rpm -iUvh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-8.noarch.rpm

yum install -y ansible

ANSIBLE_LOG=/logfiles/ansible.log
if [ ! -f $ANSIBLE_LOG ]; then
  mkdir -p /logfiles
  touch $ANSIBLE_LOG
  chown vagrant:vagrant $ANSIBLE_LOG
fi

# Lisataan joitakin shell-kayttoa helpottavia tyokaluja
yum install -y screen centos-release-SCL redhat-lsb-core
