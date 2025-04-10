'use client'
import { Table } from "antd";
import { columns, dataa } from "./ListCandidate";



export default function RejectedCandidate() {

    const data = dataa();   
    const filteredData = data.filter(item => item.status === "Refusé");

    return <Table columns={columns()} dataSource={filteredData} rowKey="id" />;
}