import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const sessionHandler = async (req, res) => {
  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true, //false for offline session, true for online session
    });

    const response = await client.query({
      data: `
      
      mutation {
        productUpdate(
          input: {id: "gid://shopify/Product/6954218618924", 
            title: "Polaris Snowboard", 
            descriptionHtml: "<p>This is an updated description</p>"}
        ) {
          product {
            id
            title
            description
          }
          userErrors {
            field
            message
          }
        }
      }
      `, //Paste your GraphQL query/mutation here
    });
    
    console.dir(response, {depth: null})
    return res.status(200).send(response.body);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
};

export default withMiddleware("verifyRequest")(sessionHandler);