//This is the same as `pages/api/index.js`.
import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";

const handler = async (req, res) => {
  if (req.method === "GET") {
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
    
    const data = await prisma.alerts.findMany({
        where : {
        shop : shopId
        }
    });

    return res
      .status(200)
      .send({ text: "This text is coming from dashboard route", data : data, size : data.size });
  }

  if (req.method === "POST") {
    return res.status(200).send({ text: "post this is" });
  }

  return res.status(400).send({ text: "Bad request" });
};

export default withMiddleware("verifyRequest")(handler);


