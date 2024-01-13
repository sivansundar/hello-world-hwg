import { Page, Layout, LegacyCard, Button, Card } from "@shopify/polaris";
import { useEffect } from "react";

const resourcepicker = () => {

    async function resourcepickerOpen () {
        const selected = await window.shopify.resourcePicker({
            type: "product", 
            action : "add",
            filter : {
                variants : true
            }
        });


        if(selected) {
            console.log(selected[0].id)
        }

    }
    
     

    return (
        <>
            <Page title="Resource Picker">
                <Layout>
                    <Layout.Section>
                        <Card sectioned title="">
                            <p>This is some text</p>
                           <Button primary onClick={async() => {resourcepickerOpen()}}>Open</Button>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </>
    );
};

export default resourcepicker;