#include <Probe.h>

/*  Vibration API
 *  Updated 5 June 2018
 *  Authors: 
 *   - Cesar Torres
 *   - Tony Zhao
 */
 
/*
A vibration design platform.
*/
#define DEBUG 0
#define BAUD 9600
#define MOTOR A5
#define RED 7
#define YELLOW 6
#define GREEN 5
#include <Probe.h>

Probe probe ("VibrationAPI", Serial, BAUD);

void set_motor(int value){
  value = sanitize(value);
  Serial.print("Setting motor to ");
  Serial.println(value);
  analogWrite(MOTOR, value);
}

void set_light(int value){
  value = sanitize(value);
  Serial.print("Setting light to ");
  Serial.println(value);
  analogWrite(RED, value);
  analogWrite(YELLOW, value);
  analogWrite(GREEN, value);  
}

int sanitize(int value) {
  if (value < 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  }
  return value;
}

void setup()
{  
  Serial.begin(BAUD);
  probe.begin();

  pinMode(RED, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(MOTOR, OUTPUT);
  
  probe.add_api('a', set_motor);
  probe.add_api('b', set_light);
}

void loop()
{
  probe.enable_api();
  delay(100);
}

