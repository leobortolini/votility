import React from "react"
import { Carousel } from "antd"

const contentStyle: React.CSSProperties = {
    height: "80px",
    color: "#fff",
    lineHeight: "80px",
    textAlign: "center",
    background: "#414140",
}

const About: React.FC = () => (
    <Carousel autoplay autoplaySpeed={5000}>
        <div>
            <h3 style={contentStyle}>Votiliy is a lightweight poll website</h3>
        </div>
        <div>
            <h3 style={contentStyle}>We do not store any information about you (neither your e-mail, if you provided)</h3>
        </div>
        <div>
            <h3 style={contentStyle}>All votes are anonymous and encrypted</h3>
        </div>
        <div>
            <h3 style={contentStyle}>Our architecture can handle tons of votes per second!</h3>
        </div>
    </Carousel>
)

export default About
