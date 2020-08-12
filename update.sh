git pull
cd client
yarn
yarn build
cd ../server
yarn
yarn build
cd ..
sudo pm2 restart ecosystem.config.js