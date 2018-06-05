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

#include <Probe.h>

Probe probe ("VibrationAPI", Serial, BAUD);

void turn_on(){
}
void turn_off(){
}

void setup()
{  
  Serial.begin(BAUD);
  probe.begin();

  probe.add_api('a', turn_on);
  probe.add_api('b', turn_off);
}

void loop()
{
  probe.enable_api();
  delay(100);
}

