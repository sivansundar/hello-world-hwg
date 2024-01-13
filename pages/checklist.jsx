import React from "react";
import { Page, Layout, LegacyCard, Text, Box, List } from "@shopify/polaris";

const checklist = () => {
  return (
    <>
      <Page backAction={{ content: "Checklist", url: "/" }}>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <Text variant="headingLg" as="h5">
                ReStock
              </Text>

              <Box paddingBlockStart="300">
                <Text>
                  ReStock app allows merchants to get notified about their
                  depleting stocks so that they can replenish them at the right
                  time.
                </Text>
              </Box>

              <Box paddingBlockStart="400">
                <Text as="h2" variant="headingSm">
                  Merchant Side
                </Text>
              </Box>

              <Box paddingBlockStart="200">
                <List>
                  <List.Item>
                    Choose items in your inventory and define their restock
                    threshold
                  </List.Item>
                  <List.Item>
                    Save this in a database. Use ServerSide props to use them in
                    the app
                  </List.Item>
                  <List.Item>
                    Attach a webhook to a product that would fire when quantity
                    goes below the threshold
                  </List.Item>
                  <List.Item>
                    Message the merhcant through email (can be omnichanel) about
                    their product being low in stock
                  </List.Item>
                  <List.Item>
                    Have a dashboard section that would inform the user if a
                    product needs to be restocked
                  </List.Item>
                </List>
              </Box>

              <Box paddingBlockStart="400">
                <Text as="h2" variant="headingSm">
                  Customer Side
                </Text>
              </Box>

              <Box paddingBlockStart="200">
                <List>
                  <List.Item>
                    Create a theme extension that would be installed in a
                    product page
                  </List.Item>
                  <List.Item>
                    Extension should be able to collect the email address of the
                    customer
                  </List.Item>
                  <List.Item>
                    Show this UI only when the product is out of stock
                  </List.Item>
                  <List.Item>
                    When the requested product is back in stock, the app must
                    send a templated email to the customer informing them about
                    the availability of the product{" "}
                  </List.Item>
                </List>
              </Box>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default checklist;
