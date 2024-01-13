import {
  Card,
  HorizontalStack,
  Icon,
  Layout,
  Page,
  DataTable,
  Badge,
  Tag,
  Link,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import { OrderStatusMinor } from "@shopify/polaris-icons";

const PolarisPage = () => {
  const router = useRouter();

  const rows = [
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="emerald-silk-gown"
      >
        Emerald Silk Gown
      </Link>,
      "$875.00",
      124689,
      140,
      "$122,500.00",
    ],
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="mauve-cashmere-scarf"
      >
        Mauve Cashmere Scarf
      </Link>,
      "$230.00",
      124533,
      83,
      "$19,090.00",
    ],
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="navy-merino-wool"
      >
        Navy Merino Wool Blazer with khaki chinos and yellow belt
      </Link>,
      "$445.00",
      124518,
      32,
      "$14,240.00",
    ],
  ];

  return (
    <>
      <Page
        backAction={{ content: "Products", url: "/" }}
        title="#1001"
        titleMetadata={<Badge tone="success">Paid</Badge>}
        subtitle="December 14th, 2023 at 8:45PM"
        secondaryActions={[
          {
            content: "Restock",
            accessibilityLabel: "Secondary action label",
            onAction: () => alert("Duplicate action"),
          },
          {
            content: "Edit",
            onAction: () => {},
          },
        ]}
        actionGroups={[
          {
            title: "More Actions",
            actions: [
              {
                content: "Share on Facebook",
                accessibilityLabel: "Individual action label",
                onAction: () => alert("Share on Facebook action"),
              },
            ],
          },
        ]}
      >
        <Layout.Section variant="oneThird">
          <Card>
            
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            
          </Card>
        </Layout.Section>
      </Page>
    </>
  );
};

export default PolarisPage;
