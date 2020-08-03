SERVER="http://192.168.0.109:8080"

ID=$(ifconfig wlan0 | grep ether | awk '{ print $2 }')
IP=$(ifconfig wlan0 | grep "inet " | awk '{ print $2 }')

echo $SERVER
echo $ID
echo $IP

BODY='{"id":"'$ID'","ip":"'$IP'"}'
echo $BODY

curl -X POST $SERVER -d $BODY -H "Content-Type: application/json"