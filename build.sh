#!/bin/bash

git stash
pm2 stop avatars
git pull
git stash apply
yarn rw build
pm2 start avatars
