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
      console.log(selected)
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
              <VerticalStack gap="25">
                <Card>
                  <div>
                    <HorizontalStack align="end">{pickButton}</HorizontalStack>
                  </div>

                  {selectedProduct.length > 0 ? (
                    <HeadingSection
                      title={selectedProduct[0].title}
                      description={selectedProduct[0].description}
                      quantity={selectedProduct[0].quantity}
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

                {selectedProduct.length > 0 ? (
                  <Card>
                   <Text variant="heading2xl" as="h3">
        Lets setup!
      </Text>
                  </Card>
                ) : (
                  <></>
                )}
              </VerticalStack>
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
      quantity: res.totalInventory,
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

[
  {
    id: "gid://shopify/Product/6954218651692",
    title: "Cheems sticker",
    images: [
      {
        id: "gid://shopify/ProductImage/36274758156332",
        originalSrc:
          "https://cdn.shopify.com/s/files/1/0588/9789/1372/files/59ba1z.jpg?v=1705945152",
      },
    ],
  },
];
