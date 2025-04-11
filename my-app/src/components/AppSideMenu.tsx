import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";

export default function AppSide() {
    const menu = AppSideMenu();
    return (
        <Sider
        theme="light"
        style={{
            zIndex:2,
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
        label: <Link href="/rh">Home</Link>,
        key: 1,
      },
      {
        type: 'divider',
        key: 'divider-1', // 🔧 Ant Design exige un key même pour les dividers
      },
      {
        type: 'item',
        label: <Link href="/rh/listCandidate">Liste des candidats</Link>,
        key: 2,
      },
      {
        type: 'item',
        label: <Link href="/rh/newCandidate">Nouveaux candidats</Link>,
        key: 3,
      },
      {
        type: 'item',
        label: <Link href="/rh/acceptedCandidate">Candidats acceptés</Link>,
        key: 4,
      },
      {
        type: 'item',
        label: <Link href="/rh/pendingCandidate">Candidats en attente</Link>,
        key: 5,
      },
      {
        type: 'item',
        label: <Link href="/rh/rejectedCandidate">Candidats refusés</Link>,
        key: 6,
      },
    ];
  
    return <Menu mode="inline" items={menuItems} />;
}