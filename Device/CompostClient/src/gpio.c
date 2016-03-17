#include "gpio.h"

typedef enum 
{
	PIN_PULLUP = PUD_UP,
	PIN_PULLDOWN = PUD_DOWN
}PIN_SETUP;

typedef enum
{
	PIN_OUTPUT = OUTPUT,
	PIN_INPUT = INPUT
}PIN_DIRECION;

int setupPiGpio(void)
{
	// Setup stuff:
	wiringPiSetupGpio(); // Initialize wiringPi -- using Broadcom pin numbers
	
	pinMode(FILTER_BAD, PIN_OUTPUT);     
	pullUpDnControl(FILTER_BAD, PIN_PULLUP); 
	PinAction(FILTER_BAD, LED_DARK);

	pinMode(WIFI_STATUS, PIN_OUTPUT);     
	pullUpDnControl(WIFI_STATUS, PIN_PULLUP); 
	PinAction(WIFI_STATUS, LED_GLOW);
	
	pinMode(NIGHT_MODE, PIN_OUTPUT);     
	pullUpDnControl(NIGHT_MODE, PIN_PULLUP); 
	PinAction(NIGHT_MODE, LED_DARK);
	
	pinMode(D1, PIN_OUTPUT);     
	pullUpDnControl(D1, PIN_PULLUP); 
	PinAction(D1, LED_DARK);
	
	pinMode(D2, PIN_OUTPUT);     
	pullUpDnControl(D2, PIN_PULLUP); 
	PinAction(D2, LED_DARK);
	
	pinMode(D3, PIN_OUTPUT);     
	pullUpDnControl(D3, PIN_PULLUP); 
	PinAction(D3, LED_DARK);
	
	pinMode(D4, PIN_OUTPUT);     
	pullUpDnControl(D4, PIN_PULLUP); 
	PinAction(D4, LED_DARK);
	
	pinMode(D5, PIN_OUTPUT);     
	pullUpDnControl(D5, PIN_PULLUP); 
	PinAction(D5, LED_DARK);
	
	pinMode(D6, PIN_OUTPUT);     
	pullUpDnControl(D6, PIN_PULLUP); 
	PinAction(D6, LED_DARK);
	
	pinMode(D7, PIN_OUTPUT);     
	pullUpDnControl(D7, PIN_PULLUP); 
	PinAction(D7, LED_DARK);
	
	pinMode(AUTO, PIN_OUTPUT);     
	pullUpDnControl(AUTO, PIN_PULLUP); 
	PinAction(AUTO, LED_DARK);
	
	pinMode(POWER, PIN_OUTPUT);     
	pullUpDnControl(POWER, PIN_PULLUP); 
	PinAction(POWER, LED_GLOW);
	
	pinMode(CIRCLE, PIN_OUTPUT);     
	pullUpDnControl(CIRCLE, PIN_PULLUP); 
	PinAction(CIRCLE, LED_GLOW);	
}

void PinAction(PurifierLed pin, PIN_ACTION action)
{
	digitalWrite(pin, action); 
}
