import React, { useState, useCallback } from "react";
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
  Form,
  FormLayout,
  Checkbox,
  TextField,
} from "@shopify/polaris";
import useFetch from "@/components/hooks/useFetch";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();

  const fetch = useFetch();

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
      setSelectedProduct(result);
      console.log(selectedProduct);
    }
  }

  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState("");

  const handleSubmit = useCallback(() => {
    console.log("Email : ", email);
    triggerModal();
  }, [email, threshold]);

  const handleEmailChange = useCallback((value) => setEmail(value), []);

  const handleThresholdChange = useCallback((value) => setThreshold(value), []);

  async function triggerModal() {
    const modal = await window.document.getElementById("my-modal").show();
    console.log(modal);
  }

  const handleModalPositive = useCallback(() => {
    saveForm(email, threshold, selectedProduct[0]);
  });

  const handleModalNegative = useCallback(async () => {
    await window.document.getElementById("my-modal").hide();
  });

  async function saveForm(email, threshold, product) {
    console.log(product);
    try {
      await window.document.getElementById("my-modal").hide();
      const response = await fetch("/api/apps/create", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          threshold: threshold,
          productId: product.id,
        }),
      });

      console.log(response);

      if (response.status === 200) {
        shopify.toast.show("Alert created ⭐️", {
          duration: 5000,
        });

        router.push("/restock");
      }
    } catch (error) {}
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
                  <Text variant="headingLg" alignment="">
                    Product
                  </Text>
                  <HorizontalStack align="start">{pickButton}</HorizontalStack>
                </Card>

                {selectedProduct.length > 0 ? (
                  <Card gap="25">
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

                    <Text variant="headingMd">Lets setup!</Text>

                    <Form onSubmit={handleSubmit}>
                      <FormLayout paddingBlockStart="20px">
                        <TextField
                          value={threshold}
                          onChange={handleThresholdChange}
                          label="Threshold"
                          type="number"
                          helpText={
                            <span>
                              Set the threshold value for your product
                            </span>
                          }
                        />

                        <TextField
                          value={email}
                          onChange={handleEmailChange}
                          label="Email"
                          type="email"
                          autoComplete="email"
                          helpText={
                            <span>
                              We’ll use this email address to inform you when
                              the product has hit its threshold.
                            </span>
                          }
                        />

                        <Button submit>Submit</Button>
                      </FormLayout>
                    </Form>
                  </Card>
                ) : (
                  <></>
                )}

                <ui-modal id="my-modal" variant="small">
                  {/* 
                  Message content doesnt show up
                  https://github.com/Shopify/shopify-app-bridge/issues/264 */}

                  <div>
                    <p id="content">Message</p>
                  </div>

                  <ui-title-bar title="Confirm?">
                    <button variant="primary" onClick={handleModalPositive}>
                      Create
                    </button>
                    <button onClick={handleModalNegative}>Cancel</button>
                  </ui-title-bar>
                </ui-modal>
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

export default Create;
