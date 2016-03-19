#include <stdio.h>
#include <pigpio.h>

#define TRIG 23			// PI pin 16
#define ECHO 24			// PI pin 18
#define LED  22			// PI pin 15	

int measuredHeight = 0;

volatile uint32_t before;  // used for sonar distance

int last_range = 0;	     // last sonar reading

void delay(int ms) {  // delay in miliseconds
    gpioDelay(1000*ms); 
}

void ping(void) {     // send out an ultrasonic 'ping'

   before = 0xffffffff; // set for guard variable

   gpioSetMode(TRIG, PI_OUTPUT);

   // trigger a sonar pulse
   
   gpioWrite(TRIG, PI_OFF);
   gpioDelay(5);
   gpioWrite(TRIG, PI_ON);
   gpioDelay(10); 	
   gpioWrite(TRIG, PI_OFF);
   gpioDelay(5);

   gpioSetMode(ECHO, PI_INPUT);

   before = gpioTick(); // get tick right after sending pulse
   
}

// range - callback function for measuring ping response

void range(int gpio, int level, uint32_t tick) {

   static uint32_t startTick, endTick;
   
   uint32_t diffTick;

   if (tick>before) { // make sure we don't measure trigger pulse

      if (level == PI_ON) { // start counting on rising edge
         startTick = tick;
      } else 
      
      if (level == PI_OFF) { // stop counting on falling edge

         endTick = tick;
         diffTick = (endTick - startTick)/58;

         last_range = diffTick;

         if (diffTick < 600)
            printf("Ticks: %u\n", diffTick);
         else {
            printf("OUT OF RANGE"); // for seeedstudio sensor
            last_range = 0;
         }
      }

   }

}

void sleep(int t) {
  gpioSleep(PI_TIME_RELATIVE, t, 0);
}


void StopLed()
{
	gpioWrite(LED, PI_OFF);
}

void GlowLed()
{
	gpioWrite(LED, PI_ON);
}


// the main demonstration program

int sr04_run(void) {
  
   int i, n;
   char buff[128], ch;          

   if (gpioInitialise()<0) return 1;
   
   gpioSetMode(ECHO, PI_INPUT);
   gpioSetMode(LED, PI_OUTPUT);	

   // register callback on change of sonar pin
   gpioSetAlertFunc(ECHO, range); 

   sleep(2);    

   while (1) {
   
      ping();	// prime the last_range variable
      sleep(1);
      measuredHeight =  last_range + 1;		// Calibration Factor
      printf("Distance: %d\n", measuredHeight);
   }

   sleep(1);
    
   puts("Bye now!");  

   gpioTerminate();

   return 0;

}
