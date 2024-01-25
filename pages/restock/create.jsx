import React, { useState } from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  Box,
  Button,
  HorizontalStack,
  VerticalStack,
  Thumbnail,
} from "@shopify/polaris";

const create = () => {
  const [selectedProduct, setSelectedProduct] = useState([{}]);

  async function resourcepickerOpen() {
    const selected = await window.shopify.resourcePicker({
      type: "product",
      action: "add",
      filter: {
        variants: true,
      },
    });

    if (selected) {
      console.log(JSON.stringify(selected));

      setSelectedProduct(selected);

      console.log(JSON.stringify(selected));
    }
  }

  const isProductSelected = selectedProduct[0].id;

  const pickButton = (
    <Button
      primary
      onClick={async () => {
        resourcepickerOpen();
      }}
    >
      Pick a product
    </Button>
  );

  return (
    <>
      <Page backAction={{ content: "Create", url: "/" }}>
        <Layout>
          <Layout.Section>
            <Box gap="200">
              <Card>
                <VerticalStack>
                  <HorizontalStack align="end">
                    {isProductSelected ? <></> : pickButton}
                  </HorizontalStack>
                  <HorizontalStack gap="50">
                    {selectedProduct[0].images && (
                      <Thumbnail
                        source={selectedProduct[0].images[0].originalSrc}
                      ></Thumbnail>
                    )}
                    <VerticalStack gap="50">
                      {selectedProduct && (
                        <Text>{selectedProduct[0].title}</Text>
                      )}
                      {selectedProduct && (
                        <Text>{selectedProduct[0].totalInventory}</Text>
                      )}
                    </VerticalStack>
                  </HorizontalStack>

                  {isProductSelected ? (
                    <HorizontalStack align="end">
                      <Button
                        primary
                        onClick={() => {
                          alert("Clicked");
                        }}
                      >
                        Create alert
                      </Button>
                    </HorizontalStack>
                  ) : (
                    <></>
                  )}
                </VerticalStack>
              </Card>
            </Box>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default create;
