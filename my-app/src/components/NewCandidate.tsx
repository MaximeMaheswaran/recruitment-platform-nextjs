'use client'
import { Table } from "antd";
import { columns, dataa } from "./ListCandidate";


export default function NewCandidate() {

    const data = dataa();   
    const filteredData = data.filter(item => item.status === "Nouveau");

    return <Table columns={columns()} dataSource={filteredData} rowKey="id" />;
}