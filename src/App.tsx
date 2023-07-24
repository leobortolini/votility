import { RouterProvider } from "react-router-dom"
import { router } from "./routers/router"
import { Layout } from "antd"
import { ConfigProvider, theme } from "antd"

function App() {
    const { darkAlgorithm } = theme
    return (
        <ConfigProvider theme={{algorithm: darkAlgorithm}}>
            <Layout style={{ width: "100vw", height: "100vh" }}>
                <RouterProvider router={router} />
            </Layout>
        </ConfigProvider>
    )
}

export default App

