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
      where: {
        shop: shopId,
      },
    });

    const ids = data.map((prod) => prod.productId);

    const product = await client.query({
      data: {
        query: `query ($ids : [ID!]!) {
          nodes(ids:$ids){
            ... on Product{
              id
              title
              totalInventory
              images(first:1) {
                nodes{
                  id
                  url
                } 
              }
            }
          }
        }`,
        variables: {
          ids: ids,
        },
      },
    });

    //console.log(product.body.data.nodes)

    const root = product.body.data.nodes;
    console.log(root)
    console.log("#@$#@$")
    const images = product.body.data.nodes.map((dat) =>
      dat.images.nodes.map((nod) => nod.url).flat()
    );
    console.log(images[0].toString());

    const re = data.map((dbItem, index) => {
      return { 
        id: dbItem.id, 
        title: root[index].title,
        image : images[index].toString()
       };
    });
    console.log(re);

    return res.status(200).send({
      data: re,
    });
  }

  if (req.method === "POST") {
    return res.status(200).send({ text: "post this is" });
  }

  return res.status(400).send({ text: "Bad request" });
};

export default withMiddleware("verifyRequest")(handler);
