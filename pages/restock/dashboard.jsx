import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  EmptyState,
  Text,
  Card,
  MediaCard,
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

const Dashboard = () => {
  const fetch = useFetch();

  const [alerts, setAlerts] = useState({});
  const [products, setProducts] = useState([{}]);
  const [loading, setLoading] = useState(false);

  //fetchAlerts();

  async function fetchAlerts() {
    // Set loading to true
    setLoading(true);

    await window.shopify.loading(true);

    try {
      const response = await (await fetch("/api/apps/dashboard")).json();
      setAlerts(response.data);
      console.log("Response : ", response);

      //setProducts(response.products);
      await window.shopify.loading(false);
      await getImages();
    } catch (error) {
      await window.shopify.loading(false);
      setLoading(false);
      // setLoading to false
      console.log("ERR : ", error);
    }
  }

  async function getImages() {
    console.log(alerts)
  }

  return (
    <>
      <Page backAction={{ content: "Dashboard", url: "/restock" }}>
        <Card sectioned>
          
          
           {alerts.length > 0 ? (
            
            alerts.map((data, index) => {   
              console.log(data)       
              return (
                <MediaCard
                  key={data.id}
                  title={data.title}
                  primaryAction={{
                    content: "Learn about getting started",
                    onAction: () => {},
                  }}
                  description="Discover how Shopify can power up your entrepreneurial journey."
                  popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
                  size="small"
                >
                  <img
                    alt=""
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "scale-down",
                      objectPosition: "center",
                    }}
                    src={data.image.length > 0 ? data.image : "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"}
                  />
                </MediaCard>
              );
            })
          ) : (
            <EmptyState
              heading="Manage your product alert"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              action={{
                content: "Add transfer",
                onAction: async () => {
                  fetchAlerts();
                },
              }}
              secondaryAction={{
                content: "Add transfer",
                onAction: async () => {
                  console.log(alerts);
                },
              }}
            >
              <p>Track your product alerts that you have created.</p>
            </EmptyState>
          )}
        </Card>
      </Page>
    </>
  );
};

export default Dashboard;

