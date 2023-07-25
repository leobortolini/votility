import { useState, useEffect } from "react"
import { voteService } from "../axios/voteAxios"
import { pollService } from "../axios/pollAxios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { useParams } from "react-router-dom"
import { Result } from "../types/Result"
import { Layout, Typography } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import About from "../components/about"
import { Poll } from "../types/Poll"
import Countdown from "../components/countdown"

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
        votes: number;
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
                const votes = voteCountsMap[id] || 0
                combinedVoteData.push({ optionId: id, title, votes })
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
            <Header style={{height: "120px", backgroundColor: "#414140", display: "flex", justifyContent: "center"}}>
                <h1 style={{alignSelf: "center", fontSize: "3em"}}>{pollData?.title}</h1>
            </Header>
            <Content style={{padding: 24}}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <BarChart style={{alignSelf: "center"}} width={800} height={600} data={combinedResult??[]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="votes" fill="#8884d8" />
                    </BarChart>
                    <Typography.Paragraph style={{ fontSize: "2em", alignSelf: "center"}}>{pollData?.description}</Typography.Paragraph>
                    <Typography.Text style={{ alignSelf: "center" }}><Countdown text="This poll ends in" finishedText="Poll completed" targetDate={pollData?.expire_date} /></Typography.Text>
                </div>
            </Content>
            <Footer style={{padding: 0}}>
                <About />
            </Footer>
        </Layout>
    )
}

export default VoteChart
