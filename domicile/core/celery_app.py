from celery import Celery

celery_app = Celery("worker", broker="amqp://guest:guest@localhost:5672/")

celery_app.conf.task_routes = {"domicile.worker.test_celery": "main-queue"}
