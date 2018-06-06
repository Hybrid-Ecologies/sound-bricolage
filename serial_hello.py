import serial
import time
import json

## Change this to match your local settings
SERIAL_PORT = '/dev/tty.usbmodem1911'
#SERIAL_PORT = '/dev/tty.usbmodem1421'
SERIAL_BAUDRATE = 9600



class SerialProcess():
    def __init__(self, input_queue, output_queue):
        self.input_queue = input_queue
        self.output_queue = output_queue
        try:
            self.sp = serial.Serial(SERIAL_PORT, SERIAL_BAUDRATE, timeout=1)
            print "SUCCESS: Arduino was found!"
        except Exception as e:
            # raise e
            self.sp = None
            print "ERROR: Arduino is not attached! Check to make sure the USB for the door alarm is connected to the BiD computer."
    def opened(self):
        return self.sp
    def close(self):
        if self.sp:
            self.sp.close()
 
    def writeSerial(self, data):
        if self.sp:
            self.sp.write(data)
        # time.sleep(1)
        
    def readSerial(self):
        # return self.sp.readline().replace("\n", "")
        if self.sp:
            return decipher_message(self.sp.readline())
 
    def run(self):
        if self.sp:        
            self.sp.flushInput()
            while True:
                # look for incoming tornado request
                if not self.input_queue.empty():
                    data = self.input_queue.get()
     
                    # send it to the serial device
                    self.writeSerial(data)
                    print "writing to serial: " + data
     
                # look for incoming serial data
                if (self.sp.inWaiting() > 0):
                    data = self.readSerial()
                    if data:
                        #print "reading from serial: " + data
                        # send it back to tornado
                        self.output_queue.put(data)
