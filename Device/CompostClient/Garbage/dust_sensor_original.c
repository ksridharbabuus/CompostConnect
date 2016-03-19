#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <termios.h>
#include <dust_sensor.h>

float pm05data_1 = 0.0;
float pm25data_1 = 0.0;
float pm10data_1 = 0.0; 

int ser_setspeed(int fd, long baud, int flushfirst)
{
  int rc;

  struct termios termios;
  speed_t speed = B9600;

  if (!isatty(fd))
    return -ENOTTY;

  /*
   * initialize terminal modes
   */
  rc = tcgetattr(fd, &termios);
  if (rc < 0) {
    perror("ser_setspeed(): tcgetattr() failed");
    return 1;
  }

  termios.c_iflag = IGNBRK;
  termios.c_oflag = 0;
  termios.c_lflag = 0;
  termios.c_cflag = (CS8 | CREAD | CLOCAL);
  termios.c_cc[VMIN]  = 1;
  termios.c_cc[VTIME] = 0;

  cfsetospeed(&termios, speed);
  cfsetispeed(&termios, speed);

  rc = tcsetattr(fd, (flushfirst) ? TCSAFLUSH : TCSANOW, &termios);
  if (rc < 0) {
    perror("%s: ser_setspeed(): tcsetattr() failed\n");
    return 1;
  }
  return 0;
}

unsigned char addCheckSum(char* buffer, int size)
{
	unsigned char sum = 0;
	int k = 0;
	
	// exclude the cheksum byte
	for (k = 0; k < (size-1); k++)
	{
		sum += buffer[k];
	}
	sum = 255 - sum;
	buffer[size-1] = sum;
	
	// if someone needs to use it 
	return sum;
}

int validateCheckSum(char* buffer, int size)
{
	unsigned char computedCheckSum = addCheckSum(buffer, size);
	
	if (computedCheckSum == buffer[size-1])
	{
		//printf ("Checksum Valid\n");
		return 1;
	}
	else
	{
		//printf ("Checksum Invalid\n");
		return 0;
	}
}


int closeDevice(int fd)
{
	close(fd);
}

int sendData(int fd, char* data, int size)
{
	// Write to the port
	int n = write(fd, data, size);
	if (n < 0) 
	{
		perror("Write failed - ");
		return -1;
	}
}

int recvData(int fd, char* data, int size)
{
	int k = 0;
	int n = read(fd, (void*)data, size);
	if (n < 0) 
	{
		perror("Read failed - ");
		return -1;
	} 
	else if (n == 0) 
		printf("No Sensor data on port\n");
	else 
	{
		//printf("%i bytes read \n", n);
		
		//for(k = 0; k < n; k++)
		//	printf("Data : %x\n", data[k]);
	}
	validateCheckSum(data, n);
	return n;
}

int flushBuffers(char* buffer, int size)
{
	int k = 0;
	for(k = 0; k < size; k++)
		buffer[k] = 0;
	
	return 0;
}

int openDevice(char* device)
{
	// Open the Port. We want read/write, no "controlling tty" status, and open it no matter what state DCD is in
	int fd = open(device, O_RDWR | O_NOCTTY | O_NDELAY);
	if (fd == -1) 
	{
		perror("open_port: Unable to open serial port");
		return(-1);
	}

	
	ser_setspeed(fd, 9600, 1);

	// Turn off blocking for reads, use (fd, F_SETFL, FNDELAY) if you want that
	fcntl(fd, F_SETFL, 1);

	return fd;
}


int SetParticleMeasurement_OpenClose(int fd, ParticleMeasureState state)
{
	int retval = 0;
	char data[] = {0x11, 0x03, 0x0C, state, 0x1E, 0x00};
	addCheckSum(data, sizeof(data));
	retval = sendData(fd, data, sizeof(data));

	char recvBuffer[5] = {};
	retval = recvData(fd, recvBuffer, sizeof(recvBuffer));
	
	return retval;
}

double GetAnyPMData(char* buffer)
{
	char data1 = *buffer;
	char data2 = *(buffer++);
	char data3 = *(buffer++);
	char data4 = *(buffer++);
	
	double data =   (256^3) * data1 + 
					(256^2) * data1 + 
					(256^1) * data3 + 
					data4;

	return data;
}

// 0.5 uM particle
double GetPM0005Value(char* buffer)
{
	return (GetAnyPMData(buffer+3));
}

// 2.5 uM particle
double GetPM2005Value(char* buffer)
{
	return (GetAnyPMData(buffer+7));
}

// 10 uM Particle
double GetPM10000Value(char* buffer)
{
	return (GetAnyPMData(buffer+11));
}

double GetPM2005Mass(char* buffer)
{
	return (GetAnyPMData(buffer+3));
}

double GetPM10000Mass(char* buffer)
{
	return (GetAnyPMData(buffer+7));
}

int ReadParticleData(int fd, float* pm05data, float* pm25data, float* pm10data)
{
	char data[] = {0x11, 0x01, 0x0B, 0xE3};
	sendData(fd, data, sizeof(data));

	char recvBuffer[21] = {};
	recvData(fd, recvBuffer, sizeof(recvBuffer));
         
        *pm05data = GetPM0005Value(recvBuffer);
        *pm25data = GetPM2005Value(recvBuffer);
        *pm10data = GetPM10000Value(recvBuffer);

	//printf ("PM0.5  : %f\n", *pm05data);
	//printf ("PM2.5  : %f\n", *pm25data);
        //printf ("PM10.0 : %f\n", *pm10data);

        return 0;
}

int ReadParticleMass(int fd)
{
	char data[] = {0x11, 0x02, 0x0B, 0x01, 0xE1};
	sendData(fd, data, sizeof(data));

	char recvBuffer[21] = {};
	recvData(fd, recvBuffer, sizeof(recvBuffer));

	printf ("PM2.5  : %f\n", GetPM2005Mass(recvBuffer));
	printf ("PM10.0 : %f\n", GetPM10000Mass(recvBuffer));
}

int dust_sensor_init()
{
	int fd = 0;
	char rcvData[20] = INITDATA;
	fd = openDevice("/dev/ttyAMA0");
	SetParticleMeasurement_OpenClose(fd, MEASUREMENT_OPEN);
        printf ("Dust Sensor Initialized\n"); 
        return fd;  
}



void dust_sensor_run(char param[])
{
  int fileds = 0;  

  if(!strcmp(param, "dust"))
      fileds = dust_sensor_init();
  while(1)
  {
    if(!strcmp(param, "dust"))
    {
      ReadParticleData(fileds, &pm05data_1, &pm25data_1, &pm10data_1);
      ReadParticleMass(fileds);
    }
    //printf("Data1 = %f %f %f\n", pm05data_1, pm25data_1, pm10data_1);
    sleep(2);
  }

}


// dust_sensor_init()
// ReadParticleData()
// close (fd)

