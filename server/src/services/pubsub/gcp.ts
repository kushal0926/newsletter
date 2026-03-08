// google cloud pubsub logic

import { PubSub } from "@google-cloud/pubsub";
import { PubSubService } from "./type";
import { NODE_ENV } from "../../config/env.config";

export interface GCPPubSubPayload {
    message: {
        attrubutes: string[];
        data: Buffer | string;
        message_id: string
    };

    subscription: string
}

export function isPubSubPayload(
    body: Record<string, any>
): body is GCPPubSubPayload {
    return Boolean(body?.subscribtion && body?.message?.data)
}

export class GooglePubSubService implements PubSubService {
    private client: PubSub;

    constructor(private projectId: string) {
        this.client = new PubSub({ projectId })
    }

    static preparePublishPayload(payload: Record<string, unknown>): Buffer {
        const objectAsString = JSON.stringify(payload)
        return Buffer.from(objectAsString)
    }

    async checkIfTopicsExists(topicName: string) {
        const [topicList] = await this.client.getTopics()
        return !!topicList.find((it) => it.name === topicName)
    }

    async publish(topicId: string, payload: Record<string, unknown>): Promise<string> {
        const topicName = `projects/${this.projectId}/topics/${topicId}-${NODE_ENV}`

        const exist = await this.checkIfTopicsExists(topicName)
        if (!exist) {
            throw new Error(
                `Topic: ${topicName} does not exist in the project ${this.projectId}`
            )
        }

        const topic = this.client.topic(topicName)

        return topic.publishMessage({
            data: GooglePubSubService.preparePublishPayload(payload),
        })
    }

    validatePayload(payload: Record<string, undefined>): boolean {
        return isPubSubPayload(payload)
    }
}