from aiokafka import AIOKafkaProducer
from domicile.services.kafka.dependencies import get_kafka_producer
from domicile.web.api.kafka.schema import KafkaMessage
from fastapi import APIRouter, Depends

router = APIRouter()


@router.post("/")
async def send_kafka_message(
    kafka_message: KafkaMessage,
    producer: AIOKafkaProducer = Depends(get_kafka_producer),
) -> None:
    """
    Sends message to kafka.

    :param producer: kafka's producer.
    :param kafka_message: message to publish.
    """
    await producer.send(
        topic=kafka_message.topic,
        value=kafka_message.message.encode(),
    )
