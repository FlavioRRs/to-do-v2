import {TaskModalContext} from "../context/TaskModalContext";
import { useState } from "react";

export default function ModalProvider({children}) {

    const [isOpenTask, setIsOpenTask] = useState(false);
    const [modalTask, setModalTask] = useState(null);
    const [modalDate, setModalDate] = useState(null);
    const [modalId, setModalId] = useState(null);


    return(
        <TaskModalContext.Provider value={{isOpenTask, setIsOpenTask, modalTask, setModalTask, modalDate, setModalDate, setModalId, modalId}}>
            {children}
        </TaskModalContext.Provider>
    )
}