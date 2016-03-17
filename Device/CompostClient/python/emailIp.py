import subprocess

import os.path
import os
import time
import smtplib
from email.mime.text import MIMEText
from os import open, remove, close

t = 0

while True:
	os.system("sudo ip addr show|grep 'wlan0\|eth0'|grep 'inet'>>/home/pi/gitrepo/Device/QaasClient/bin/Ip.log")
	if os.path.isfile("/home/pi/gitrepo/Device/QaasClient/bin/Ip.log"):
           break
        else:
           print("File Don't Exist")

if os.path.isfile("/home/pi/gitrepo/Device/QaasClient/bin/Ip.log"):
        fp=os.open("/home/pi/gitrepo/Device/QaasClient/bin/Ip.log",os.O_RDWR|os.O_CREAT)
        data = os.read(fp, 150)  
        os.close(fp)  
        os.remove("/home/pi/gitrepo/Device/QaasClient/bin/Ip.log")

msg = MIMEText(data)
msg['Subject'] = 'Email from Pi'
msg['From'] = "renju.chandrasekharapanicker@honeywell.com"
msg['To'] = "santhosh.urukonda@honeywell.com;renju.chandrasekharapanicker@honeywell.com;satyajeet.banerjee@honeywell.com;prabhat.ranjan@honeywell.com"
s = smtplib.SMTP('smtp-secure.honeywell.com')

#s.sendmail('renju.chandrasekharapanicker@honeywell.com', ['renju.chandrasekharapanicker@honeywell.com','santhosh.urukonda@honeywell.com','satyajeet.banerjee@honeywell.com','prabhat.ranjan@honeywell.com'], msg.as_string())
s.sendmail('renju.chandrasekharapanicker@honeywell.com', 'renju.chandrasekharapanicker@honeywell.com', msg.as_string())

s.quit()
print ('Sent Data')
