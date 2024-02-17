# Simple Setup 

A quick guide on how to run the project immedeatly. 

Assuming you have `node`, `shopify cli` and `ngrok`  setup already.

## Steps :

- Run `npm g:install` to install global dependencies.

- Now rename your `.env.example` to `.env`
- Create a new app from your partners dashboard 
- Copy `client id` and `api secret` values from there and replace them as your `SHOPIFY_API_KEY` (aka client id) and `SHOPIFY_API_SECRET` (aka client secret) values in your `.env`.
- In your `.env` set your `SHOPIFY_API_SCOPES` to be `=read_products, write_products, read_orders`

- Open another terminal and run `npm run ngrok`. This would spin up a tunnel in port 3000.
- If the above step doesnt work, then execute `npm run ngrok:auth <NGROK_TOKEN>`. You can find this in your ngrok dashboard. Free to setup. Go to `https://ngrok.com/`. Now run the previous step again.


- Copy the `https` url which goes somehting like `https://xxx-xxx-xxxx.ngrok-free.app`
- Open your `.env` file and replace your `SHOPIFY_APP_URL` with the ngrok url above.
- From your project directory, run `npm run update:url`. This updates the app URL in your partners dashboard.

- Setup the following values for `DATABASE_URL=<CHECK SLACK FOR THE URL>`

- `ENCRYPTION_STRING` can be any random value. But do not change this once you set it.

- Save.

- Run `npm run prisma:push` to update the db schema
- Run `npm run prisma:pull` to pull the db schema.


- Now run `npm run dev` to start the app. 

To install the app, head over to `https://<SHOPIFY_APP_URL>/api/auth?shop=<SHOPURL>`

The app should be installed in your store by now. 


## Purpose

This is not a full fledged project and I see a lot of places that can be improved of course. 

This app aims to do the following : 
- Get some grasp on how shopify development works.
- Working with databases and your front end client.
- Webhooks.
- Some react.
- Manipulating data.
- Setting up an emailing tool that will email users.


Things that can be considerably improved : 

- A better UI. I did not focus too much on this and my aim was to just get the functionality working and understand how things work behind the hood. UI can always be built later when there is a clear sense of direction in terms of what things need to look like. 


## Navigating through the app. 

Ignore the homepage. Not too relavent. To access the app, click on "ReStock". This would take you to the app's main page. 

The `Create` page allows us to choose a product and set a threshold value against it. While we create an alert, this would store the relavent details like `shopId`, `productId`, `thershold` value and the `email` to which an alert must be sent to in a database.

Now the alert isnt active yet. To activate this, go to ReStock's main page and headover to the `dashboard` page. Click on `Get Alerts` to fetch all the alerts and display them. 

Now you can turn `ON` and turn `OFF` alerts by clicking on the relavent button. Once the webhook is active, it means it will respond to the product changes. Right now, if the threshold value of the item is less than the `total_inventory` count of the product, an `email` will be sent to the configured address.

To test this out, set your `inventory value` of your product to something below the threshold. You would get an alert email. 

NOTE : If the email does not get sent, go to `utils/webooks/product_updated.js` and replace the `const email` block with the following : 

This is only for testing.



```
Having this fallback because DNS records of sivansundar.com is being verified by Resend at the moment. Until this completes, if you use onboarding@resend.dev to send emails, it can only be sent to sivan.sundar@gmail.com. Once DNS verification succeeds, hello@sivansundar.com would be able to send emails via to Resend to anyone.


const email = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'sivan.sundar@gmail.com',
        subject: 'Your product is low on stock | ReStock',
        html: message
      });
```
## Next Step : 

- We can start looking at how to build an actual app that adds some value to people. 
- Come up with an idea and properly build a product like we are going to launch it.
- Your expertise in talking to a lot of merchants and developers so far will help in understanding what solution is valuable and not. 