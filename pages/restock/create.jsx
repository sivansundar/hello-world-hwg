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
  const [selectedProduct, setSelectedProduct] = useState([]);

  async function resourcepickerOpen() {
    const selected = await window.shopify.resourcePicker({
      type: "product",
      action: "add",
      filter: {
        variants: true,
      },
    });

    if (selected) {
      const result = getProduct(selected);
      console.log(result);

      setSelectedProduct(result);
    }
  }

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

  function HeadingSection({ title, description, quantity, image }) {
    return (
      <HorizontalStack gap="5">
        {/* 
          Here, if the image is null or empty, show a placeholder image instead.
        */}
        {image && <Thumbnail source={image}></Thumbnail>}
        <VerticalStack>
          <Text as="h2" variant="headingSm">
            {title}
          </Text>

          <Box paddingBlockStart="200">
            <VerticalStack gap="50">
              <Text as="p" variant="bodyMd">
                {description}
              </Text>

              <Text as="p" variant="bodyMd">
                Quantity is {quantity}
              </Text>
            </VerticalStack>
          </Box>
        </VerticalStack>
      </HorizontalStack>
    );
  }

  return (
    <>
      <Page backAction={{ content: "Create", url: "/restock" }}>
        <Layout>
          <Layout.Section>
            <Box gap="200">
              <Card>
                <div>
                  <HorizontalStack align="end">{pickButton}</HorizontalStack>
                </div>

                {selectedProduct.length > 0 ? (
                  <HeadingSection
                    title={selectedProduct[0].id}
                    description={selectedProduct[0].id}
                    image={
                      selectedProduct[0].images.map(
                        (data) => data.originalSrc
                      )[0]
                    }
                  ></HeadingSection>
                ) : (
                  <></>
                )}
              </Card>
            </Box>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

function getProduct(data) {
  const obj = data.map((res) => {
    const images = res.images.map((da) => da).flat();

    const result = {
      id: res.id,
      title: res.title,
      description: res.description,
      quantity: res.quantity,
      images: images,
    };
    return result;
  });

  const flatten = obj.flat();
  if (flatten.length > 0) {
    return flatten;
  } else {
    return [];
  }
}

export default create;
