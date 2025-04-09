import AppSideMenu from "@/components/AppSideMenu";
import { Layout } from "antd";

export default function page() {
    return (
        <Layout style={{ marginLeft: 200 }}>
            <Layout style={{top:"64px"}}>
                <AppSideMenu />
            </Layout>
        </Layout>
    );
} 