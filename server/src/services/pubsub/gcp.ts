// google cloud pubsub logic

import { PubSub } from "@google-cloud/pubsub";
import { PubSubService } from "./type";
import { NODE_ENV } from "../../config/env.config";

export interface GCPPubSubPayload {
    message: {
        attributes?: Record<string, string>;
        data: string;
        messageId: string;
        publishTime?: string;
    };

    subscription: string;
}

export function isPubSubPayload(
    body: Record<string, any>
): body is GCPPubSubPayload {
    return (
        typeof body?.subscription === "string" &&
        typeof body?.message?.data === "string" &&
        typeof body?.message?.messageId === "string"
    );
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

    validatePayload(payload: Record<string, unknown>): boolean {
        return isPubSubPayload(payload)
    }
}
