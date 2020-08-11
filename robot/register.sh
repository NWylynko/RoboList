SERVER="http://roboserver.local:8080"

# /sbin/ifconfig needs to be used when the script is run through crontab for whatever reason

# checks to see if wlan0 network interface is present
# raspberrypis use wlan0 for the wifi but other devices
# may use different names like wifi0
# or maybe want to use some other network interface
# like the ethernet port
# so if other ones need to be used
# eg. wifi0, lan0, en0
# change all the wlan0 in the script - not just this one
if [[ "$(/sbin/ifconfig | grep wlan0)" == '' ]]
then
	echo wlan0 interface not found
	exit;
fi

# grabs the mac addresss of the network adapter
# this is used as a id as it has to be intentionally changed
# this isn't necessarily something to identify the device
# as each network adapter has a different mac address
# eg the ethernet port has a different mac address to the
# wifi adapter, not all robots will be using wifi
# so it shouldn't be an issue
# if for some reason the mac address needs to be changed
# or some kind of connection is made using both wifi and bluetooth
# some other kind of unique identifier needs to be used
ID=$(/sbin/ifconfig wlan0 | grep ether | awk '{ print $2 }')
# use "inet " instead of just "inet" to remove any inet6 because we just want the ipv4
IP=$(/sbin/ifconfig wlan0 | grep "inet " | awk '{ print $2 }')

if [[ "$IP" == '' ]]
then
	echo no IP, not connected to wifi
	exit;
fi

HOSTNAME=$(/bin/hostname)

echo Server: $SERVER
echo Mac: $ID
echo local ip: $IP
echo hostname: $HOSTNAME

# shell doesnt support json
# each item is
# "item":"'$variable'"
# with a comma between each
# and {} brackets at the start and end
# needs to have '' around it as it is sent as a string
BODY='{"id":"'$ID'","ip":"'$IP'","hostname":"'$HOSTNAME'"}'
echo $BODY

curl -X POST $SERVER -d $BODY -H "Content-Type: application/json"
