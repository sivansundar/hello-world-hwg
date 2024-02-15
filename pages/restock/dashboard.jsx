import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  EmptyState,
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

const Dashboard = () => {
  const fetch = useFetch();

  const [alerts, setAlerts] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchAlerts() {
    // Set loading to true
    setLoading(true);

    await window.shopify.loading(true);

    try {
      
      const response = await (await fetch("/api/apps/dashboard")).json();
      setAlerts(response.data);
      await window.shopify.loading(false);
    } catch (error) {
      await window.shopify.loading(false);
      setLoading(false);
      // setLoading to false
      console.log("ERR : ", error);
    }
  }

  return (
    <>
      <Page backAction={{ content: "Dashboard", url: "/restock" }}>
        <Card sectioned>
          {alerts.length > 0 ? (
            alerts.map((data, index) => <Text key={data.id}>{data.id}</Text>)
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
