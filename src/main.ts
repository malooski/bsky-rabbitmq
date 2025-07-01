import { JetstreamSubscription } from "@atcute/jetstream";
import * as amqplib from "amqplib";
import { getRabbitEnv } from "./env";
import { LOGGER } from "./logger";

const rabbitEnv = getRabbitEnv();

const subscription = new JetstreamSubscription({
	url: "wss://jetstream2.us-east.bsky.network",
});

const server = await amqplib.connect({
	hostname: rabbitEnv.RABBIT_HOST,
	port: rabbitEnv.RABBIT_PORT,
	username: rabbitEnv.RABBIT_USER,
	password: rabbitEnv.RABBIT_PASS,
});

const channel = await server.createChannel();

await channel.assertExchange("bsky-firehose", "topic");

let messageCount = 0;
setInterval(() => {
	LOGGER.info({ msgRate: messageCount }, `${messageCount} msg/s`);
	messageCount = 0;
}, 1000);

for await (const event of subscription) {
	messageCount++;
	console.log("Received event:", event);
	channel.publish("bsky-firehose", "event", Buffer.from(JSON.stringify(event)));
}
