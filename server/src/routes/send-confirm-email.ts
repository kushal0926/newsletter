import { Request, Response } from "express";
import { isPubSubPayload } from "src/services/pubsub/gcp";
import HttpStatus from "http-status";

export const sendConfirmEmailHandler = () => async (req: Request, res: Response) => {
    try {
        const { body } = req;

        if (!isPubSubPayload(body)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "invalid pubsub payload!",
            });
        }

        const { message: { data: encodedJsonObject } } = body;

        const parseBuffer = Buffer.from(
            encodedJsonObject as string,
            "base64"
        ).toString("utf-8")

        const parsePayload = JSON.parse(parseBuffer)

        console.log("sendConfirmEmailHandeler:", parsePayload)

        return res.status(HttpStatus.OK).json({ message: "Ok" })

    } catch (error) {
        console.error("pub/sub processing failed", error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }

}