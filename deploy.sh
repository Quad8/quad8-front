#!/bin/bash
cd /home/ubuntu/quad8-front
git pull origin develop
sudo npm install
sudo npm run build
pm2 restart next_app

# pm2 start ecosystem.config.js --only next_app