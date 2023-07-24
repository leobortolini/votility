import { useState, useEffect } from "react"
import { pollService } from "../axios/pollAxios"
import { Poll } from "../types/Poll"
import { AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import { Layout, Row, Col, Typography, Button, Form, Input } from "antd"
import Countdown from "../components/countdown"
import { useNavigate } from "react-router-dom"

function PollOptions() {
    const [pollData, setData] = useState<Poll | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    useEffect(() => {
        if (id)
            getPoll(id)
    }, [])

    async function getPoll(pollId: string) {
        try {
            const response: AxiosResponse<Poll> = await pollService.get(`/${pollId}`)

            if (response.status === 200)
                setData(response.data)
        } catch (error) {
            console.error("Error while get poll", error)
        }
    }

    async function voteOnPoll(pollId: string | undefined, optionId: number, email: string) {
        try {
            if (pollId) {
                const response: AxiosResponse<Poll> = await pollService.post(`/${pollId}`, {
                    optionId: optionId,
                    email: email
                })
                if (response.status === 200) {
                    console.log("vote sent")

                    navigate("/voteSent")
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error("Error while sent vote")
        }
    }

    return (
        <Layout>
            <Row style={{ height: "100%", padding: 24 }}>
                <Col span={12} style={{ borderRadius: "10%", backgroundColor: "#414140"}} >
                    <div style={{padding: 24}}>
                        <Typography.Title style={{ fontSize: "5em"}}>{pollData?.title}</Typography.Title>
                        <Typography.Paragraph style={{ fontSize: "3em"}}>{pollData?.description}</Typography.Paragraph>
                        <Typography.Text style={{ fontSize: "2em" }}><Countdown text="This poll ends in" finishedText="Poll completed" targetDate={pollData?.expire_date} /></Typography.Text>
                    </div>
                </Col>
                <Col span={12} style={{borderRadius: "10%", display: "flex", flexDirection: "column", height: "100%"}}>
                    <Row style={{padding: 24, alignItems: "center"}}>
                        <Form style={{width: "100%"}}>
                            <Form.Item name={["user", "email"]} label="Email" rules={[{ type: "email" }]}>
                                <Input placeholder="Feel free to inform your e-mail if you want a notification when your vote is computed" onChange={(event) => {
                                    setEmail(event.target.value)
                                }}/>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row style={{overflow: "auto"}}>
                        {pollData?.options.map((option) => {
                            return (
                                <Col key={option.id} span={24} style={{padding: 10}}>
                                    <Button type='primary' style={{fontSize: "3em", width: "100%", height: "100%", backgroundColor: "#121211"}} onClick={() => {
                                        voteOnPoll(id, option.id, email)
                                    }}>
                                        {option.title}
                                    </Button>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default PollOptions
