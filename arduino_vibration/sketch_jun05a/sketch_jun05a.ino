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
#define LEDB 50
#define MOTOR A5
#define MLOW 50
#define MMED 165
#define MHIGH 255
#define MOFF 0
#include <Probe.h>

Probe probe ("VibrationAPI", Serial, BAUD);

void turn_on_motor_off(){
  analogWrite(MOTOR, MOFF);
}

void turn_on_motor_low(){
  analogWrite(MOTOR, MLOW);
}

void turn_on_motor_med(){
  analogWrite(MOTOR, MMED);
}

void turn_on_motor_high(){
  analogWrite(MOTOR, MHIGH);
}

void turn_on(){
  Serial.println("On");
  analogWrite(5, LEDB);
  analogWrite(6, LEDB);
  analogWrite(7, LEDB);  
}
void turn_off(){
  Serial.println("Off");
  analogWrite(5, 0);
  analogWrite(6, 0);
  analogWrite(7, 0);
}


void setup()
{  
  Serial.begin(BAUD);
  probe.begin();

  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(MOTOR, OUTPUT);
  
  probe.add_api('a', turn_on);
  probe.add_api('b', turn_off);
  probe.add_api('q', turn_on_motor_off);
  probe.add_api('w', turn_on_motor_low);
  probe.add_api('e', turn_on_motor_med);
  probe.add_api('r', turn_on_motor_high);
}

void loop()
{
  probe.enable_api();
  delay(100);
}

