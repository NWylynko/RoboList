#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "* * * * * /home/pi/RoboList/robot/register.sh > /home/pi/RoboList/robot/register.log" >> mycron
#install new cron file
crontab mycron
rm mycron