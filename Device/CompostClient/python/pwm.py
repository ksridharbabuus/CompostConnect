# External module imports
import RPi.GPIO as GPIO
import time

# Pin Definitons:
pwmPin = 18 # Broadcom pin 18 (P1 pin 12)
ledPin = 23 # Broadcom pin 23 (P1 pin 16)
butPin = 17 # Broadcom pin 17 (P1 pin 11)

STEP_SIZE = 1
MAX_CYCLES = 10000
dc = 20 # duty cycle (0-100) for PWM pin
speed = 0  #  read from file
cycles = 0

#with open("bin/pwm_speed") as f:
#    speed_string = f.readline()
#    if speed_string <> "" :
#        speed = float (speed_string)
#        if speed <= 50 and speed >= 20:
#            dc = speed   # Do not overrun the fan
#            print dc
#        f.close

# Pin Setup:
GPIO.setmode(GPIO.BCM) # Broadcom pin-numbering scheme
GPIO.setup(ledPin, GPIO.OUT) # LED pin set as output
GPIO.setup(pwmPin, GPIO.OUT) # PWM pin set as output
pwm = GPIO.PWM(pwmPin, 250)  # Initialize PWM on pwmPin 100Hz frequency
GPIO.setup(butPin, GPIO.IN, pull_up_down=GPIO.PUD_UP) # Button pin set as input w/ pull-up

# Initial state for LEDs:
GPIO.output(ledPin, GPIO.LOW)
pwm.start(dc)

print("Here we go! Press CTRL+C to exit")
try:
    while 1:
        if GPIO.input(butPin): # button is released
            #print "I am at 1"
            pwm.ChangeDutyCycle(dc)
            GPIO.output(ledPin, GPIO.LOW)
        else: # button is pressed:
            #print "I am at 2"       
            pwm.ChangeDutyCycle(100-dc)
            GPIO.output(ledPin, GPIO.HIGH)
#           time.sleep(0.075)
            time.sleep(0.002)
            GPIO.output(ledPin, GPIO.LOW)
#           time.sleep(0.075)
            time.sleep(0.002)
			
        if dc <> speed and cycles == 0:
            if dc + STEP_SIZE < speed :
                dc = dc + STEP_SIZE
                cycles = MAX_CYCLES
            elif dc < speed :
                dc = dc + 1
                cycles = MAX_CYCLES
            elif dc > speed + STEP_SIZE :
                dc = dc - STEP_SIZE
                cycles = MAX_CYCLES
            elif dc > speed :
                dc = dc - 1
                cycles = MAX_CYCLES				
            else :
                print "Cannot figure out what happend"			
   
        elif cycles <> 0 :
            cycles = cycles - 1

        else :   
            with open("bin/pwm_speed") as f:
                speed_string = f.readline()
                if speed_string <> "" :
                    new_speed = float (speed_string)
                    if new_speed >= 20 and new_speed <= 50 :
                        speed = new_speed
#                    if speed <= 50:
#                        dc = speed   # Do not overrun the fan
                print dc
                f.close
				
		
except KeyboardInterrupt: # If CTRL+C is pressed, exit cleanly:
    pwm.stop() # stop PWM
    GPIO.cleanup() # cleanup all GPIO
