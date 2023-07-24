import { useState, useEffect } from "react"
import { voteService } from "../axios/voteAxios"
import { pollService } from "../axios/pollAxios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { useParams } from "react-router-dom"
import { Result } from "../types/Result"
import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import About from "../components/about"
import { Poll } from "../types/Poll"

const VoteChart = () => {
    const [resultData, setResultData] = useState<Result | null>(null)
    const [pollData, setPollData] = useState<Poll | null>(null)
    const [combinedResult, setCombinedResult] = useState<CombinedVoteData[] | null>(null)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getPoll(id)
        }
    }, [])

    interface CombinedVoteData {
        optionId: number;
        title: string;
        count: number;
      }


    useEffect(() => {
        if (resultData && pollData) {
            const combinedVoteData: CombinedVoteData[] = []
            const voteCountsMap: { [optionId: number]: number } = {}

            for (const voteCount of resultData.votes ?? []) {
                voteCountsMap[voteCount.option] = voteCount.count
            }

            for (const voteOption of pollData.options ?? []) {
                const { id, title } = voteOption
                const count = voteCountsMap[id] || 0
                combinedVoteData.push({ optionId: id, title, count })
            }

            setCombinedResult(combinedVoteData)
        }
    }, [resultData, pollData])


    async function getResult (pollId: string) {
        try {
            const response = await voteService.get(`/${pollId}`)
            if (response.status === 200)
                setResultData(response.data)
        } catch (error) {
            console.error("Error while get result", error)
        }
    }

    async function getPoll(pollId: string) {
        try {
            const response = await pollService.get(`/${pollId}`)

            if (response.status === 200)
                setPollData(response.data)
        } catch (error) {
            console.error("Error while get poll", error)
        }
    }

    useEffect(() => {
        if (id) {
            const intervalId = setInterval(() => getResult(id), 3000)

            return () => clearInterval(intervalId)
        }
    }, [id])

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header>

            </Header>
            <Content>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <BarChart width={800} height={800} data={combinedResult??[]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </div>
            </Content>
            <Footer style={{padding: 0}}>
                <About />
            </Footer>
        </Layout>
    )
}

export default VoteChart
