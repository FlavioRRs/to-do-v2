import { useContext } from "react";
import {TaskModalContext} from "../context/TaskModalContext";

export default function useTaskModalContext() {
    const context = useContext(TaskModalContext);

    if (context == undefined) {
        throw new Error('fora do contexto de task modal')
    }

    return context

}