#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "* * * * * /home/pi/RoboList/robot/register.sh" >> mycron
#install new cron file
crontab mycron
rm mycron