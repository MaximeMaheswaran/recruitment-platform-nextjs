'use client'
import ListCandidate, { dataa } from "@/components/ListCandidate";
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Flex, Row, Typography } from "antd";
const { Title } = Typography;

export default function page() {
    const data = dataa();
    const nbNv = data.filter(c => c.status === "Nouveau").length;
    const nbAc = data.filter(c => c.status === "Accepté").length;
    const nbAt = data.filter(c => c.status === "En Attente").length;
    const nbRe = data.filter(c => c.status === "Refusé").length;

    return (
        <Row gutter={10}>
            <Col span={19}>
                <Row style={{ marginBottom: "50px" }}>
                    <Flex wrap gap={25}>
                        <Card style={{ width: "250px" }}>
                            <Flex align="center" gap={16}>
                                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-blue-200">
                                    <CrownOutlined />
                                </div>
                                <div>
                                    <Title level={4} style={{ marginBottom: 0 }} >
                                        {nbNv}
                                    </Title>
                                    <Typography>
                                        Nouveaux
                                    </Typography>
                                </div>
                            </Flex>
                        </Card>
                        <Card style={{ width: "250px" }}>
                            <Flex align="center" gap={16}>
                                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-green-200">
                                    <CheckOutlined />
                                </div>
                                <div>
                                    <Title level={4} style={{ marginBottom: 0 }} >
                                        {nbAc}
                                    </Title>
                                    <Typography>
                                        Acceptés
                                    </Typography>
                                </div>
                            </Flex>
                        </Card>
                        <Card style={{ width: "250px" }}>
                            <Flex align="center" gap={16}>
                                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-orange-200">
                                    <ClockCircleOutlined />
                                </div>
                                <div>
                                    <Title level={4} style={{ marginBottom: 0 }} >
                                        {nbAt}
                                    </Title>
                                    <Typography>
                                        En Attentes
                                    </Typography>
                                </div>
                            </Flex>
                        </Card>
                        <Card style={{ width: "250px" }}>
                            <Flex align="center" gap={16}>
                                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-red-200">
                                    <CloseOutlined />
                                </div>
                                <div>
                                    <Title level={4} style={{ marginBottom: 0 }} >
                                        {nbRe}
                                    </Title>
                                    <Typography>
                                        Refusés
                                    </Typography>
                                </div>
                            </Flex>
                        </Card>
                    </Flex>
                </Row>
                <ListCandidate />
            </Col>

            <Col span={5}>
                <Card>
                    <Flex style={{flexDirection:"column"}}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", width: "100%" }}>
                            <Avatar size={100} icon={<UserOutlined />} />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontSize:20}}>
                                Jhon Smith
                        </div>

                    </Flex>
                </Card>
            </Col>
        </Row>
    );
} 