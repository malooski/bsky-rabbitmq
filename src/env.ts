import z from "zod";

export const RabbitEnvSchema = z.object({
	RABBIT_USER: z.string(),
	RABBIT_PASS: z.string(),
	RABBIT_HOST: z.string().default("localhost"),
	RABBIT_PORT: z.coerce.number().default(5672),
	RABBIT_VHOST: z.string().default("/"),
});

export function getRabbitEnv() {
	return RabbitEnvSchema.parse(process.env);
}
