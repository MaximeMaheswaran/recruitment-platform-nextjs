'use client'
import { Table } from "antd";
import { columns, dataa } from "./ListCandidate";

export default function AcceptedCandidate() {

    const data = dataa();   
    const filteredData = data.filter(item => item.status === "Accepté");

    return <Table columns={columns()} dataSource={filteredData} rowKey="id" />;
}
