import { PieChartFilled, UserOutlined} from "@ant-design/icons";
import { Avatar } from "antd";
import { Header } from "antd/es/layout/layout";

export default function AppHeader() {
    return (
    <Header className="!bg-white border-b border-[#f1f1f1] flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div><PieChartFilled className="text-3xl color"/></div>
            <div>Analytics</div>
        </div>
        
        
        
        <div className="flex items-center gap-2">
            <Avatar size={40} src="/profile.jpg"/>
            <div>Jhon Smith</div>
        </div>
    </Header>
    );
}