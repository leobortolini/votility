import { createBrowserRouter } from "react-router-dom"
import PollOptions from "../screens/PollOptions"
import VoteSent from "../screens/VoteSent"
import ResultComponent from "../screens/Result"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>
    },
    {
        path: "/poll/:id",
        element: <PollOptions />
    },
    {
        path: "/voteSent",
        element: <VoteSent />
    },
    {
        path: "/poll",
        element: <div>oie</div>
    },
    {
        path: "/result/:id",
        element: <ResultComponent />
    }
])
