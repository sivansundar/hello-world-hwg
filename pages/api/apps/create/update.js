//This is the same as `pages/api/index.js`.

import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";
import shopify from "@/utils/shopify";
import productUpdateHandler from "@/utils/webhooks/product_updated";
import { DeliveryMethod } from "@shopify/shopify-api";

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  console.log("SERVER : ", body);

  if (req.method === "GET") {
    return res
      .status(200)
      .send({ text: "This text is coming from `/api/update route`" });
  }

  if (req.method === "POST") {


    const update = await prisma.alerts.update({
      where: {
        id: body.id,
      },
      data: {
        isActive: body.isActive,
      },
    });
    return res.status(200).send(update);
  }

  return res.status(400).send({ text: "Bad request" });
};

export default withMiddleware("verifyRequest")(handler);
