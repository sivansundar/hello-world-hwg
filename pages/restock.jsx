import React from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  Box,
  Button,
  HorizontalStack,
} from "@shopify/polaris";

import { useRouter } from "next/router";

const checklist = () => {
  const router = useRouter();

  return (
    <>
      <Page backAction={{ content: "Checklist", url: "/" }}>
        <Layout>
          <Layout.Section>
            <Box gap="200">
              <Card>
                <Text variant="headingMd">ReStock dashboard</Text>
                <Text variant="bodyMd">
                  View your ReStocked products that you have configured alerts
                  for.
                </Text>

                <HorizontalStack align="end">
                  <Button
                    primary
                    onClick={() => {
                      router.push("/restock/dashboard");
                    }}
                  >
                    Open dashboard
                  </Button>
                </HorizontalStack>
              </Card>
            </Box>
          </Layout.Section>

          <Layout.Section>
            <Box gap="200">
              <Card>
                <Text variant="headingMd">New Alert</Text>
                <Text variant="bodyMd">Create a new alert for a product</Text>

                <HorizontalStack align="end">
                  <Button
                    primary
                    onClick={() => {
                      router.push("/restock/create");
                    }}
                  >
                    Create
                  </Button>
                </HorizontalStack>
              </Card>
            </Box>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default checklist;
