// To create a new webhook, create a new `.js` folder in /utils/webhooks/ and use the project snippet
// `createwebhook` to generate webhook boilerplate

import { Resend } from "resend";
import prisma from "../prisma";

/**
 * @typedef { import("@/_developer/types/2023-07/webhooks.js").PRODUCTS_UPDATE} ProductUpdate
 */

const resend = new Resend(process.env.RESEND_API_KEY);


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

      const message = `<p>Looks like your product with product id <strong>${data.productId}</strong> is low on stock with only <strong>${webhookBody.variants[0].inventory_quantity} of them being available</strong>. ReStock it back up before it is too late`;

      // If you want to test it out, set "from" to "onboarding@resend.dev", to : "sivan.sundar@gmail.com". This is just to test if the emailing service works. 
      // Having this fallback because DNS records of sivansundar.com is being verified by Resend at the moment. Once this succeeds, hello@sivansundar.com would be able to send emails via to Resend to anyone.

      const email = await resend.emails.send({
        from: 'hello@sivansundar.com',
        to: data.email,
        subject: 'Your product is low on stock | ReStock',
        html: message
      });

      console.log("FIRE AN EMAIL!");
      console.log("STATUS : ", email.data);
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
