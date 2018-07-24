
/*  SolderingIron Logger API
 *  Updated 35 Apr 2018
 *  Authors: 
 *   - Cesar Torres
 */
 
/*
The sensor outputs provided by the library are the raw 16-bit values
obtained by concatenating the 8-bit high and low accelerometer and
magnetometer data registers. They can be converted to units of g and
gauss using the conversion factors specified in the datasheet for your
particular device and full scale setting (gain).

Example: In the LSM303DLHC, LSM303DLM, and LSM303DLH, the acceleration data
registers actually contain a left-aligned 12-bit number, so the lowest
4 bits are always 0, and the values should be shifted right by 4 bits
(divided by 16) to be consistent with the conversion factors specified
in the datasheets.
*/
#define DEBUG 0
#define BAUD 9600

#include <Wire.h>
#include <LSM303.h>
#include <L3G.h>
#include <Probe.h>


Probe probe ("SolderingIron", Serial, BAUD);
L3G gyro;
LSM303 compass;
char report[80];

bool print_acc_b = true;
bool print_mag_b = false;
bool print_gyro_b = false;

void print_acc(){Serial.println("X, Writing ACC");print_acc_b = !print_acc_b;}
void print_mag(){Serial.println("X, Writing MAG");print_mag_b = !print_mag_b;}
void print_gyro(){Serial.println("X, Writing GYRO");print_gyro_b = !print_gyro_b;}

void acc_write(){
  snprintf(report, sizeof(report), "A,%6d,%6d,%6d", compass.a.x>>4, compass.a.y>>4, compass.a.z>>4);
  Serial.println(report);
}
void mag_write(){
  snprintf(report, sizeof(report), "M,%6d,%6d,%6d", compass.m.x, compass.m.y, compass.m.z);
  Serial.println(report);
}
void gyro_write(){
  snprintf(report, sizeof(report), "G,%6d,%6d,%6d",gyro.g.x, gyro.g.y, gyro.g.z);
  Serial.println(report);
}

void print_all(){
  snprintf(report, sizeof(report), "A,%6d,%6d,%6d\nM,%6d,%6d,%6d\nG,%6d,%6d,%6d",
    compass.a.x>>4, compass.a.y>>4, compass.a.z>>4,
    compass.m.x, compass.m.y, compass.m.z, 
    gyro.g.x, gyro.g.y, gyro.g.z);
  Serial.println(report);
}

void setup()
{
  
  Serial.begin(BAUD);
  Serial.println("Hello World");
  probe.begin();

  Wire.begin();
  if (!compass.init())
  {
    Serial.println("X, Failed to autodetect compass type!");
    while (1);
  }
  compass.enableDefault();
  if (!gyro.init())
  {
    Serial.println("X, Failed to autodetect gyro type!");
    while (1);
  }
  gyro.enableDefault();
  probe.add_api('a', print_acc);
  probe.add_api('g', print_gyro);
  probe.add_api('m', print_mag);
  probe.add_api('x', print_all);
}

void loop()
{
  compass.read();
  gyro.read();
  probe.enable_api();
  if(print_acc_b) acc_write();
  if(print_gyro_b) gyro_write();
  if(print_mag_b) mag_write();
    
  delay(100);
}

