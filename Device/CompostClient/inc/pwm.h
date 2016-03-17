#ifndef __PWM_H__
#define __PWM_H__

#include <stdio.h>    
#include <wiringPi.h> 

extern int setDutyCycle;

void* PwmThreadEntryFunction(void *args);

#endif