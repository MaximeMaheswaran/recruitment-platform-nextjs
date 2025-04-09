import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";

export default function AppSide() {
    const menu = AppSideMenu();
    return (
        <Sider
        theme="light"
        style={{
            position: "fixed",
            top: "64px",
            left: 0,
            borderRight: "1px solid #f1f1f1",
                    height: "calc(100vh - 64px)",
                }}
                >
            {menu}
        </Sider>
    );
} 

export function AppSideMenu() {
    const menuItems = [
        {
            label:<Link href="/">Home</Link>,
            key:1
        },
        {
            label:<Link href="/bookmarks">Bookmarks</Link>,
            key:2
        }
    ];
    return (
        <Menu mode="inline" items={menuItems}></Menu>
    );
}