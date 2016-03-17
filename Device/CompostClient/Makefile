TARGET = bin/CompostClient
LIBS = -lpthread -lm -lssl -lcrypto -lcurl -lwiringPi -lpigpio -lrt
CC = gcc
CFLAGS = -D_POSIX_C_SOURCE=200112L -g -std=c99 -s #-Wall
INC = -Iinc/

.PHONY: clean all default

default: $(TARGET)
all: default

OBJECTS = $(patsubst src/%.c, obj/%.o, $(wildcard src/*.c))
HEADERS = $(wildcard *.h)

obj/%.o: src/%.c $(HEADERS)
	$(CC) $(INC) $(CFLAGS) -c $< -o $@

.PRECIOUS: $(TARGET) $(OBJECTS)

$(TARGET): $(OBJECTS)
	$(CC) $(OBJECTS) -Wall $(INC) $(LIBS) -o $@

clean:
	-rm -f obj/*.o
	-rm -f $(TARGET)
