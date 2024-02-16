// To create a new webhook, create a new `.js` folder in /utils/webhooks/ and use the project snippet
// `createwebhook` to generate webhook boilerplate

import prisma from "../prisma";

/**
 * @typedef { import("@/_developer/types/2023-07/webhooks.js").PRODUCTS_UPDATE} ProductUpdate
 */

const productUpdateHandler = async (topic, shop, webhookRequestBody) => {
  try {
    console.log(`Received product update webhook for ${shop}`);
    /** @type {AppUninstalled} */
    const webhookBody = JSON.parse(webhookRequestBody);

    const id = webhookBody.admin_graphql_api_id;
    const quant = webhookBody.variants[0].inventory_quantity;
    console.log(quant)
    console.log(id.toString());

    const data = await prisma.alerts.findFirst({
      where: {
        productId: id,
      },
    });

    if (
      data.isActive &&
      webhookBody.variants[0].inventory_quantity < data.threshold
    ) {
      console.log("FIRE AN EMAIL!");
    } else {
      console.log("We're cool");
    }

    console.dir(webhookBody, { depth: null });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export default productUpdateHandler;
