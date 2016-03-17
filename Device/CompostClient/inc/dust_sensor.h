#ifndef DUST_SENSOR_H
#define DUST_SENSOR_H

#define INITDATA {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}


#define SAMPLING_TIME	1 	// sec
#define SAMPLES_COUNT	4

void dust_sensor_run(char param[]);

int ReadParticleData(int fd);
typedef enum
{
	MEASUREMENT_TOGGLE = 0x00,
	MEASUREMENT_OPEN = 0x01,
	MEASUREMENT_CLOSE = 0x02
}ParticleMeasureState;

int dust_sensor_init();
int Reset_BillingCycle();
#endif
