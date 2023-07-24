import { Button, Layout, Result } from "antd"
import About from "../components/about"
import { useNavigate } from "react-router-dom"
import { Content, Footer } from "antd/es/layout/layout"

function VoteSent() {
    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Content>
                <Result
                    status="success"
                    title="Vote successfully sent to Votility!!"
                    subTitle="Your vote will be computed ASAP."
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => navigate("/poll")}>
                    Create your poll
                    </Button>
                </div>
            </Content>
            <Footer style={{padding: 0}}>
                <About />
            </Footer>
        </Layout>

    )
}

export default VoteSent
