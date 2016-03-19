#ifndef __GPIO_H__
#define __GPIO_H__

#include <stdio.h>    // Used for printf() statements
#include <wiringPi.h> // Include WiringPi library!

// Pin number declarations. We're using the Broadcom chip pin numbers.
/*
Sr.     Action          PI pin  GPIO No.
1		Filter Bad		37		GPIO26
2		WiFi Status		38		GPIO20
3		Night Mode		35		GPIO19
4		D1				36		GPIO16
5		D2				33		GPIO13
6		D3				31		GPIO06
7		D4				32		GPIO12
8		D5				29		GPIO05
9		D6				26		GPIO07
10		D7				23		GPIO11
11		Auto 			24		GPIO08
12		Power			21		GPIO09
13		Circle			22		GPIO25
*/
typedef enum
{
	FILTER_BAD = 26,
	WIFI_STATUS = 20,
	NIGHT_MODE = 19,
	D1 = 16,
	D2 = 13,
	D3 = 6,
	D4 = 12,
	D5 = 5,
	D6 = 7,
	D7 = 11,
	AUTO = 8,
	POWER = 9,
	CIRCLE = 25
}PurifierLed;

typedef enum
{
	LED_DARK = HIGH,
	LED_GLOW = LOW
}PIN_ACTION;

int setupPiGpio(void);
void PinAction(PurifierLed pin, PIN_ACTION action);

#endif /* __GPIO_H__ */