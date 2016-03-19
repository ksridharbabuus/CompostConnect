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
#include <sr04.h>

pthread_t threadId, workerThreadId, PwmThreadId;

int main(int argc, char* argv[])
{
    char param[] ="None";

    if(argc > 1)
     strcpy(param,argv[1]);
    
    printf("Starting Mqtt Client %d %s", argc, argv[1]);

    if(pthread_create(&threadId, NULL, &sr04_run, NULL) != 0)
      printf("Dust Sensor Thread Failed");
    else
      printf("Dust Sensor Thread Created");

    qaas_mqtt_run(param);
    
    return 0;
}
