'use client'
import { Table } from "antd";
import { columns, dataa } from "./ListCandidate";

export default function PendingCandidate() {

    const data = dataa();   
    const filteredData = data.filter(item => item.status === "En Attente");

    return <Table columns={columns()} dataSource={filteredData} rowKey="id" />;
}