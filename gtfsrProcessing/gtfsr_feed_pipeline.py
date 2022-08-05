import threading

class Pipeline:
    """
    Class to allow a single element pipeline between producer and consumer.
    """
    def __init__(self):
        #instanciate message and lock
        self.message = 0
        self.lock = threading.Lock()

    def get_message(self):
        #acquire lock if available
        self.lock.acquire()
        message = self.message
        #release lock once message is obtained
        self.lock.release()
        return message

    def set_message(self, message):
        #acquire lock if available
        self.lock.acquire()
        print("message set")
        self.message = message
        #release lock once message is set
        self.lock.release()



