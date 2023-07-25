import { Button, Layout, Result, Typography } from "antd"
import About from "../components/about"
import { useNavigate, useParams } from "react-router-dom"
import { Content, Footer } from "antd/es/layout/layout"

function PollCreated() {
    const navigate = useNavigate()
    const params = useParams()
    const pollUrl = window.location.href.replace("pollCreated", "poll")

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Content>
                <Result
                    status="success"
                    title="Poll created with success!"
                    subTitle="Now you can send the link to everybody vote."
                />
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: 72}}>
                    <Typography.Paragraph style={{ fontSize: "2em", alignSelf: "center"}}>Meanwhile you can: </Typography.Paragraph>
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <Button style={{ marginRight: "10px" }} onClick={() => {navigator.clipboard.writeText(pollUrl)}}>
                        Copy link to your poll
                        </Button>
                        <Button style={{ marginLeft: "10px" }} onClick={() => navigate("/result/" + params.id)}>
                        See results in real time
                        </Button>
                    </div>
                </div>
            </Content>
            <Footer style={{padding: 0}}>
                <About />
            </Footer>
        </Layout>

    )
}

export default PollCreated
