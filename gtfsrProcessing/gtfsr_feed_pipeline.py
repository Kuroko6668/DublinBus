import threading
import concurrent.futures
import logging
# import get_feed
# from gtfsAPI import views
class Pipeline:
    """
    Class to allow a single element pipeline between producer and consumer.
    """
    def __init__(self):
        self.message = 0
        self.producer_lock = threading.Lock()
        # self.consumer_lock.acquire()

    def get_message(self):
        # self.consumer_lock.acquire()
        message = self.message
        # self.producer_lock.release()
        return message

    def set_message(self, message):
        self.producer_lock.acquire()
        # self.consumer_lock.acquire()
        print("message set")
        self.message = message
        
        self.producer_lock.release()
        # self.consumer_lock.release()



#pipeline = Pipeline()

# if __name__ == "__main__":
#     format = "%(asctime)s: %(message)s"
#     logging.basicConfig(format=format, level=logging.INFO,
#                         datefmt="%H:%M:%S")
#     # logging.getLogger().setLevel(logging.DEBUG)

#     pipeline = Pipeline()
#     with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
#         executor.submit(get_feed.gtfsr_producer, pipeline)
#         executor.submit(views.gtfsr_consumer, pipeline)