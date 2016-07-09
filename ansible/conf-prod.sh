#!/bin/bash

ansible-playbook -v -i inv-prod --user=tfsliiga $@
