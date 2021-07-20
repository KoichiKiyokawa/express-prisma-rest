#!/bin/bash
yarn prisma generate
if [[ $NODE_ENV = 'production' ]]; then
  yarn remove prisma 
fi