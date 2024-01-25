import React from "react";
import { Page, Layout, LegacyCard, Text, Box, List } from "@shopify/polaris";

const deliveryChecklist = () => {
  return (
    <>
      <Page backAction={{ content: "Delivery Checklist", url: "/" }}>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <Text variant="headingLg" as="h5">
              Dynamic Delivery 
              </Text>

              <Box paddingBlockStart="300">
                <Text>
                Dynamic Delivery is an app allows merchants to set custom delivery rates based on the distance from their store to the destination address.
                
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
                    Store location and delivery rate to database
                  </List.Item>
                  <List.Item>
                    Have a dashboard to look at orders with location.
                  </List.Item>
                  
                  <List.Item>
                    Have stats showing the region that has most orders from. (Good to have)
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
                    Create a checkout extension that would calculate the delivery rate based on the values from the database.
                  </List.Item>
                  <List.Item>
                    Extension should be present in the checkout flow (after entering the address step).
                  </List.Item>
                  <List.Item>
                    Add an additonal line item to cart with the additional charges.
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

export default deliveryChecklist;