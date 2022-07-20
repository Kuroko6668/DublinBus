from django.apps import AppConfig
import threading
import time
from threading import Timer






class GtfsrprocessingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gtfsrProcessing'
    def ready(self):
        import sched, time
        
        from .gtfsr_feed_pipeline import Pipeline
        global pipeline
        pipeline = Pipeline()
        from .get_feed import get_GTFSR
        t = threading.Thread(target = get_GTFSR, args=[pipeline])
        t.setDaemon(True)
        t.start()

       

        

        



