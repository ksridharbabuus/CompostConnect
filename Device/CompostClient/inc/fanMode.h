#ifndef __FAN_MODE_H__
#define __FAN_MODE_H__


typedef enum
{
	MODE_INVALID = 0,
	MODE_AUTO = 1,
	MODE_MANUAL,
	MODE_NIGHT,
	MODE_QUIET,
	MODE_MAX_MODES
}FanRunningModes;

typedef enum
{
	STATE_INVALID = 0,
	STATE_OFF = 1,
	STATE_ON,
	STATE_ACTIVATED,
	STATE_DEACTIVATED,
	STATE_RESET_BILLING,
	STATE_MAX_STATES
}PurifierStates;

extern char __PurifierStates[STATE_MAX_STATES][10];
extern char __PurifierModes[MODE_MAX_MODES][10];


#endif
