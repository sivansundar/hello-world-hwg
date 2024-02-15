//This is the same as `pages/api/index.js`.

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  console.log("SERVER : ", body);

  if (req.method === "GET") {
    return res
      .status(200)
      .send({ text: "This text is coming from `/api/create route`" });
  }

  if (req.method === "POST") {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true,
    });

    const shop = await client.query({
      data: `
      {
        shop
          {
            id
            name
          }
        }`,
    });

    const shopId = shop.body.data.shop.id;

    const response = await prisma.alerts.create({
      data: {
        email: body.email,
        threshold: body.threshold,
        productId: body.productId,
        shop: shopId,
      },
    });
    
    return res.status(200).send(response);
  }

  return res.status(400).send({ text: "Bad request" });
};

export default withMiddleware("verifyRequest")(handler);
