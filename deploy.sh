#!/bin/bash
cd /home/ubuntu/quad8-front
git pull origin main
sudo npm install
sudo npm run build
pm2 restart next_app
