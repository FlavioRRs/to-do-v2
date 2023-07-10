import { useRef } from "react";
import useTaskModalContext from "../../hook/useTaskModalContext";
import { CgClose } from "react-icons/cg";

export default function TaskModal({changeTask}) {

    const task = useRef();
    const date = useRef();

    const {isOpenTask, setIsOpenTask, setModalTask, modalTask, setModalDate, modalDate, modalId} = useTaskModalContext();

    function handleTaskChange(e) {
        e.preventDefault();
        changeTask(task.current.value, date.current.value, modalId);
        setIsOpenTask(!isOpenTask);
    };

    if(isOpenTask) {
        return(
            <form onSubmit={(e) => {handleTaskChange(e)}} className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/60 z-40">
                <div className="bg-white p-10 s:p-5 flex flex-col gap-4 items-center rounded-[50px] relative">
                    <button onClick={(e) => {setIsOpenTask(!isOpenTask)}} className="absolute top-5 right-5"><CgClose className="w-8 h-8 s:w-5 s:h-5 text-red-500" /></button>
                    <label htmlFor="task" className="text-2xl md:text-md s:text-base">Altere a tarefa</label>
                    <div className="bg-gradient-to-b rounded-[130px] p-[3px] mb-4 s:mb-2">
                        <input ref={task} value={modalTask} onChange={(e) => setModalTask(e.currentTarget.value)} type="text" name="task" id="task" className="outline-none rounded-[130px] p-4 md:p-3 s:p-2 text-lg md:text-md s:text-sm" placeholder="Insira a tarefa..."  />
                    </div>
                    <label htmlFor="date" className="text-xl md:text-lg sm:text-base">Insira a nova data</label>
                    <div>
                        <input ref={date} value={modalDate} min="0000-01-01" max="9999-12-31" onChange={(e) => setModalDate(e.currentTarget.value)} type="date" name="date" id="date" className="outline-none text-lg md:text-md s:text-base" />
                    </div>
                    <button type="submit" className="bg-gradient-to-b opacity-80 hover:opacity-100 duration-200 rounded-md p-4 text-white shadow-xl">alterar</button>
                </div>
            </form>
        )
    } else {
        return(null)
    }
}