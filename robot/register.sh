SERVER="http://192.168.0.109:8080"

if [$(ifconfig wlan0) == '']
then
	exit;
fi

ID=$(ifconfig wlan0 | grep ether | awk '{ print $2 }')
IP=$(ifconfig wlan0 | grep "inet " | awk '{ print $2 }')

echo Server: $SERVER
echo Mac: $ID
echo local ip: $IP
echo hostname: $HOSTNAME

BODY='{"id":"'$ID'","ip":"'$IP'","hostname":"'$HOSTNAME'"}'
echo $BODY

curl -X POST $SERVER -d $BODY -H "Content-Type: application/json"
