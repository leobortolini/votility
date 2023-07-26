import { createBrowserRouter } from "react-router-dom"
import PollOptions from "../screens/PollOptions"
import VoteSent from "../screens/VoteSent"
import ResultComponent from "../screens/Result"
import PollForm from "../screens/CreatePoll"
import PollCreated from "../screens/PollCreated"
import HomePage from "../screens/Home"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/poll/:id",
        element: <PollOptions />
    },
    {
        path: "/voteSent/:id",
        element: <VoteSent />
    },
    {
        path: "/poll",
        element: <PollForm />
    },
    {
        path: "/pollCreated/:id",
        element: <PollCreated />
    },
    {
        path: "/result/:id",
        element: <ResultComponent />
    }
])
