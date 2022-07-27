from django.apps import AppConfig








class GtfsrprocessingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gtfsrProcessing'
    def ready(self):
        
        #import and instanciate a pipeline
        from .gtfsr_feed_pipeline import Pipeline
        #make pipeline instance global
        global pipeline
        pipeline = Pipeline()

        #import threading, define thread and start thread
        import threading
        from .get_feed import get_GTFSR
        t = threading.Thread(target = get_GTFSR)
        t.setDaemon(True)
        t.start()

       

        

        



