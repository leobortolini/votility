import { Button, Layout, Result, Typography } from "antd"
import About from "../components/about"
import { useNavigate } from "react-router-dom"
import { Content, Footer } from "antd/es/layout/layout"
import { useParams } from "react-router-dom"

function VoteSent() {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Content>
                <Result
                    status="success"
                    title="Vote successfully sent to Votility!"
                    subTitle="Your vote will be computed ASAP."
                />
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: 72}}>
                    <Typography.Paragraph style={{ fontSize: "2em", alignSelf: "center"}}>Meanwhile you can: </Typography.Paragraph>
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <Button style={{ marginRight: "10px" }} onClick={() => navigate("/poll")}>
                        Create your poll
                        </Button>
                        <Button style={{ marginLeft: "10px" }} onClick={() => navigate("/result/" + id)}>
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

export default VoteSent
