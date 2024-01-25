import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    // GET, POST, PUT, DELETE
    console.log("Serve this request only if method type is GET");
    return res.status(401).send({ error: true });
  }

  try {
    const { client } = await clientProvider.offline.graphqlClient({
      shop: req.user_shop,
    });

    const response = await client.query({
      data: `
        {
            shop {
                name
            }    
        }
        `,
    });

    console.log(response.body.data)
    res.status(200).send({ content: "Proxy Be Working!", data : response.body.data });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: true });
  }
};

export default withMiddleware("verifyProxy")(handler);