// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

#include <qaas_mqtt.h>
#include <stdio.h>
#include <string.h>
#include <pthread.h>
#include <dust_sensor.h>
#include <gpio.h>
#include <workerThread.h>
#include <pwm.h>

pthread_t threadId, workerThreadId, PwmThreadId;

int main(int argc, char* argv[])
{
    char param[] ="None";

    if(argc > 1)
     strcpy(param,argv[1]);
    
    printf("Starting Mqtt Client %d %s", argc, argv[1]);

	setupPiGpio();
	readDataFromFile();
	
    if(pthread_create(&threadId, NULL, &dust_sensor_run, param) != 0)
      printf("Dust Sensor Thread Failed");
    else
      printf("Dust Sensor Thread Created");

    if(pthread_create(&workerThreadId, NULL, &threadEntryFunc, param) != 0)
      printf("Worker Thread Failed");
    else
      printf("Worker Thread Created");

    if(pthread_create(&PwmThreadId, NULL, &PwmThreadEntryFunction, param) != 0)
      printf("Pwm Thread Failed");
    else
      printf("Pwm Thread Created");

    qaas_mqtt_run(param);
    
    return 0;
}
