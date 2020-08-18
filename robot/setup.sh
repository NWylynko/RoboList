#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "* * * * * $(pwd)/register.sh > $(pwd)/register.log" >> mycron
#install new cron file
crontab mycron
rm mycron
