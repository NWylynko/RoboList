cd client
yarn
yarn build
cd ../server
yarn
yarn build
cd ..
sudo pm2 start ecosystem.config.js