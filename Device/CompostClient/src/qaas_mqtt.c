// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

#include <stdlib.h>

#include <stdio.h>
#include <stdint.h>
#include <string.h>

/* This sample uses the _LL APIs of iothub_client for example purposes.
That does not mean that MQTT only works with the _LL APIs.
Simply changing the using the convenience layer (functions not having _LL)
and removing calls to _DoWork will yield the same results. */

#include <serializer.h>
#include <iothub_client_ll.h>
#include <iothubtransportmqtt.h>
#include "threadapi.h"
#include "platform.h"
#include <dust_sensor.h>
#include <gpio.h>
#include <time.h>

#include <pwm.h>
#include <sr04.h>
/*String containing Hostname, Device Id & Device Key in the format:             */
/*  "HostName=<host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"    */
static const char* connectionString = "HostName=QaaS-Hub.azure-devices.net;DeviceId=QaaS-Pi1;SharedAccessKey=lqC9WOiQHogQPPCmz93AN2xpheiohejmvLO2KM2GjJI=";
// Define the Model
BEGIN_NAMESPACE(CompostClient);

DECLARE_MODEL(CompostClient1,
WITH_DATA(ascii_char_ptr, DeviceId),
WITH_DATA(int, Height),
WITH_ACTION(SETSPEED, ascii_char_ptr, Value)

);

END_NAMESPACE(CompostClient);

extern void StopLed();
extern void GlowLed();

DEFINE_ENUM_STRINGS(IOTHUB_CLIENT_CONFIRMATION_RESULT, IOTHUB_CLIENT_CONFIRMATION_RESULT_VALUES)


EXECUTE_COMMAND_RESULT SETSPEED(CompostClient1* device, ascii_char_ptr Value)
{
	printf ("*********SETTING SPEED ************** \n");	
	
	int val = atoi(Value);

	switch (val)
	{
		case 0:
			StopLed();
			break;

		case 1:
			GlowLed();
			break;

		default:
			StopLed();
			break;
	}
	return EXECUTE_COMMAND_SUCCESS;
}


void sendCallback(IOTHUB_CLIENT_CONFIRMATION_RESULT result, void* userContextCallback)
{
    int messageTrackingId = (intptr_t)userContextCallback;

    (void)printf("Message Id: %d Received.\r\n", messageTrackingId);

    (void)printf("Result Call Back Called! Result is: %s \r\n", ENUM_TO_STRING(IOTHUB_CLIENT_CONFIRMATION_RESULT, result));
}

static void sendMessage(IOTHUB_CLIENT_LL_HANDLE iotHubClientHandle, const unsigned char* buffer, size_t size)
{
    static unsigned int messageTrackingId;
    IOTHUB_MESSAGE_HANDLE messageHandle = IoTHubMessage_CreateFromByteArray(buffer, size);
    if (messageHandle == NULL)
    {
        printf("unable to create a new IoTHubMessage\r\n");
    }
    else
    {
        if (IoTHubClient_LL_SendEventAsync(iotHubClientHandle, messageHandle, sendCallback, (void*)(uintptr_t)messageTrackingId) != IOTHUB_CLIENT_OK)
        {
            printf("failed to hand over the message to IoTHubClient");
        }
        else
        {
            printf("IoTHubClient accepted the message for delivery\r\n");
        }
        IoTHubMessage_Destroy(messageHandle);
    }
    free((void*)buffer);
    messageTrackingId++;
}

/*this function "links" IoTHub to the serialization library*/
static IOTHUBMESSAGE_DISPOSITION_RESULT IoTHubMessage(IOTHUB_MESSAGE_HANDLE message, void* userContextCallback)
{
    IOTHUBMESSAGE_DISPOSITION_RESULT result;
    const unsigned char* buffer;
    size_t size;
    if (IoTHubMessage_GetByteArray(message, &buffer, &size) != IOTHUB_MESSAGE_OK)
    {   
        printf("unable to IoTHubMessage_GetByteArray\r\n");
        result = EXECUTE_COMMAND_ERROR;
    }
    else
    {
        /*buffer is not zero terminated*/
        char* temp = malloc(size + 1);
        if (temp == NULL)
        {
            printf("failed to malloc\r\n");
            result = EXECUTE_COMMAND_ERROR;
        }
        else
        {
            memcpy(temp, buffer, size);
            temp[size] = '\0';
            EXECUTE_COMMAND_RESULT executeCommandResult = EXECUTE_COMMAND(userContextCallback, temp);
            result =
                (executeCommandResult == EXECUTE_COMMAND_ERROR) ? IOTHUBMESSAGE_ABANDONED :
                (executeCommandResult == EXECUTE_COMMAND_SUCCESS) ? IOTHUBMESSAGE_ACCEPTED :
                IOTHUBMESSAGE_REJECTED;
            free(temp);
        }
    }
    return result;
}


void qaas_mqtt_run(char param[])
{
    int count = 0;
    char macAdrs[18];
    unsigned char* destination;
    size_t destinationSize;
   

    //getMACAddress(0, macAdrs);
     (void)printf("Mac Adress %s.\r\n", macAdrs); 
    if (platform_init() != 0)
    {
        (void)printf("Failed on serializer_init\r\n");
    }
    else
    {
        if (serializer_init(NULL) != SERIALIZER_OK)
        {
            (void)printf("Failed on serializer_init\r\n");
        }
        else
        { 
            IOTHUB_CLIENT_LL_HANDLE iotHubClientHandle = IoTHubClient_LL_CreateFromConnectionString(connectionString, MQTT_Protocol);
            srand((unsigned int)time(NULL));
            int avgPrtclSize = 10;

            if (iotHubClientHandle == NULL)
            {
                (void)printf("Failed on IoTHubClient_LL_Create\r\n");
            }
            else
            { 
                CompostClient1* deviceInfo = CREATE_MODEL_INSTANCE(CompostClient, CompostClient1);
                if (deviceInfo == NULL)
                {
                    (void)printf("Failed on CREATE_MODEL_INSTANCE\r\n");
                }
                else
                {
                    if (IoTHubClient_LL_SetMessageCallback(iotHubClientHandle, IoTHubMessage, deviceInfo) != IOTHUB_CLIENT_OK)
                    {
                        printf("unable to IoTHubClient_SetMessageCallback\r\n");
                    }
                    else
                    {
                        deviceInfo->DeviceId = "CompClnt01";
                                             

                        /* wait for commands */
                        while (1)
                        {
 
                            deviceInfo->Height = measuredHeight;

                            if(count%50 == 0)
                            {
                            if (SERIALIZE(&destination, &destinationSize, deviceInfo->DeviceId, deviceInfo->Height) != IOT_AGENT_OK)
                            {
                                (void)printf("Failed to serialize\r\n");
                            }
                            else
                            {

                                IOTHUB_MESSAGE_HANDLE messageHandle = IoTHubMessage_CreateFromByteArray(destination, destinationSize);
                                if (messageHandle == NULL)
                                {
                                    printf("unable to create a new IoTHubMessage\r\n");
                                }
                                else
                                {
                                    if (IoTHubClient_LL_SendEventAsync(iotHubClientHandle, messageHandle, sendCallback, (void*)1) != IOTHUB_CLIENT_OK)
                                    {
                                        printf("failed to hand over the message to IoTHubClient");
                                    }
                                    else
                                    {
                                        printf("IoTHubClient accepted the message for delivery\r\n");
                                    }

                                    IoTHubMessage_Destroy(messageHandle);
                                }
                                free(destination);
                            }
                            }
                            IoTHubClient_LL_DoWork(iotHubClientHandle);
                            count++;
                            //ThreadAPI_Sleep(SAMPLES_COUNT * SAMPLING_TIME * 1000);  // secs
							ThreadAPI_Sleep(100);
						}
                    }

                    DESTROY_MODEL_INSTANCE(deviceInfo);
                }
                IoTHubClient_LL_Destroy(iotHubClientHandle);
            }
            serializer_deinit();
        }
        platform_deinit();
    }
}
