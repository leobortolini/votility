import { useState } from "react"
import { Layout, Row, Col, Typography, Button, Input, Modal } from "antd"
import { useNavigate } from "react-router-dom"
import { voteService } from "../axios/voteAxios"
import { Vote } from "../types/Vote"

function HomePage() {
    const navigate = useNavigate()
    const [pollId, setPollId] = useState<string>("")
    const [voteId, setVoteId] = useState<string>("")
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<string>("")
    const [computedAt, setComputedAt] = useState<string>("")

    const handleValidateVote = () => {
        voteService
            .get<Vote>(`http://localhost:8081/api/v1/vote/${voteId}/validate`)
            .then((response) => {
                if (response.status === 200) {
                    setModalContent("This is a valid Vote ID.")
                    setComputedAt("Vote was computed at: " + response.data.created_at)
                    setModalVisible(true)
                } else {
                    // Handle other non-404 errors if needed
                    console.error("Error occurred while validating vote.")
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setModalContent("Vote not found.")
                    setComputedAt("")
                    setModalVisible(true)
                } else {
                    console.error("Error occurred while validating vote:", error)
                }
            })
    }


    return (
        <Layout>
            <Row style={{ height: "100%", padding: 24 }}>
                <Col span={18} style={{ borderRadius: "10%", background: "rgb(0,0,0) linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 64%, rgba(179,179,179,1) 100%)"}} >
                    <div style={{padding: 24}}>
                        <Typography.Title style={{ fontSize: "5em" }}>Votility</Typography.Title>
                        <Typography.Paragraph style={{ marginTop: 300, fontSize: "3em"}}><i>A very fast poll system</i></Typography.Paragraph>
                        <Typography.Paragraph style={{ fontSize: "3em"}}><i>Ilimited options per poll</i></Typography.Paragraph>
                        <Typography.Paragraph style={{ fontSize: "3em"}}><i>No login needed, zero data collection</i></Typography.Paragraph>
                        <Typography.Paragraph style={{ fontSize: "3em"}}><i>All informations are encrypted</i></Typography.Paragraph>
                    </div>
                </Col>
                <Col span={6} style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
                    <Row style={{marginLeft: 24}}>
                        <Col span={24}>
                            <Button type='primary' style={{fontSize: "2em", width: "100%", height: "100%", backgroundColor: "#3b3b3b"}} onClick={() => {
                                navigate("/poll")
                            }}>
                                Create your poll!
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{marginLeft: 24, marginTop: 100, alignItems: "center"}}>
                        <Input placeholder="Paste the ID of the desired poll" onChange={(event) => {
                            setPollId(event.target.value)
                        }}/>
                    </Row>
                    <Col style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", marginLeft: 24}}>
                        <Row>
                            <Col span={24} style={{padding: 10}}>
                                <Button type='primary' style={{fontSize: "2em", width: "100%", height: "100%", backgroundColor: "#3b3b3b"}} onClick={() => {
                                    navigate("/result/" + pollId)
                                }}>
                                Check results
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{padding: 10}}>
                                <Button type='primary' style={{fontSize: "2em", width: "100%", height: "100%", backgroundColor: "#3b3b3b"}} onClick={() => {
                                    navigate("/poll/" + pollId)
                                }}>
                                Vote
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Row style={{marginLeft: 24, marginTop: 100, alignItems: "center"}}>
                        <Input placeholder="Paste the Vote ID that you received in your e-mail to validate" onChange={(event) => {
                            setVoteId(event.target.value)
                        }}/>
                    </Row>
                    <Col style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", marginLeft: 24}}>
                        <Row>
                            <Col span={24} style={{padding: 10}}>
                                <Button type='primary' style={{fontSize: "2em", width: "100%", height: "100%", backgroundColor: "#3b3b3b"}} onClick={handleValidateVote}>
                                Validate vote
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
            <Modal
                title="Validation Result"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}> {modalContent}</pre>
                <pre> {computedAt} </pre>
            </Modal>
        </Layout>
    )
}

export default HomePage
