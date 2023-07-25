import React, { useState } from "react"
import { Form, Input, Button, DatePicker, Layout, Row } from "antd"
import { Moment } from "moment"
import { format } from "date-fns"
import { pollService } from "../axios/pollAxios"
import { Content, Footer, Header } from "antd/es/layout/layout"
import About from "../components/about"

interface Option {
  option: string;
}

interface Poll {
  title: string;
  description: string;
  expirationDate: Moment;
  options: Option[];
}

const VotacaoForm: React.FC = () => {
    const [form] = Form.useForm<Poll>()
    const [options, setOptions] = useState<Option[]>([])

    const handleOpcaoChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newOptions = [...options]
        newOptions[index] = { option: event.target.value }
        setOptions(newOptions)
    }

    const onFinish = (values: Poll) => {
        const formattedValues = {
            title: values.title,
            description: values.description,
            expireDateTime: format(values.expirationDate.toDate(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
            options: values.options.map((option) => option.option),
        }

        console.log(formattedValues)

        pollService.post("http://localhost:8080/api/v1/poll", formattedValues)
            .then((response) => {
                console.log("Resposta da API:", response.data)
            })
            .catch((error) => {
                console.error("Erro na chamada da API:", error)
            })
    }

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header style={{ height: "120px", backgroundColor: "#414140", display: "flex", justifyContent: "center" }}>
                <h1 style={{ alignSelf: "center", fontSize: "3em" }}>Create your poll!</h1>
            </Header>
            <Content style={{overflow: "auto"}}>
                <Row style={{ padding: 24, display: "flex", flexDirection: "column", alignContent: "center"}}>
                    <Form style={{display: "flex", justifyContent: "center", flexDirection: "column", width: "30%"}} form={form} onFinish={onFinish}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Insert the title!" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Insert the description!" }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Expiration date"
                            name="expirationDate"
                            rules={[{ required: true, message: "Insert the expiration date!" }]}
                        >
                            <DatePicker style={{width: "100%" }} showTime />
                        </Form.Item>
                        <Form.List name="options">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <div key={field.key} style={{ display: "flex", marginBottom: 8 }}>
                                            <Form.Item style={{width: "100%"}} {...field} name={[field.name, "option"]} rules={[{ required: true, message: "Insert the option!" }]}>
                                                <Input style={{width: "100%"}} placeholder="Option" value={options[index]?.option || ""} onChange={(e) => handleOpcaoChange(index, e)}/>
                                            </Form.Item>
                                            <Button style={{marginLeft: 24}} onClick={() => remove(field.name)}>-</Button>
                                        </div>
                                    ))}
                                    <Button type="dashed"
                                        onClick={() => {
                                            add()
                                            setOptions([...options, { option: "" }])
                                        }}
                                        style={{width: "100%"}}
                                    >
                                        Add option
                                    </Button>
                                </>
                            )}
                        </Form.List>
                        <Button style={{width: "100%", marginTop: 24}} type="primary" htmlType="submit">
                            Create poll
                        </Button>
                    </Form>
                </Row>
            </Content>
            <Footer style={{ padding: 0 }}>
                <About />
            </Footer>
        </Layout>
    )
}

export default VotacaoForm
