import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import confirm from "../../assets/confirm.svg";
import calendar from "../../assets/calendar.svg";
import useTaskModalContext from "../../hook/useTaskModalContext";

export default function Task({task, date, isChecked, removeTask, markTaskDone, id}) {

    const {isOpenTask, setIsOpenTask, setModalTask, setModalDate, setModalId} = useTaskModalContext();

    function useModal() {

        setModalTask(task)
        setModalDate(`${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`)
        setModalId(id)
        
        setIsOpenTask(!isOpenTask)
    }

    return(
        <div className={`${isChecked ? "opacity-50" : ""} w-[88%] bg-gradient-to-b p-[2px] rounded-[11px]`}>
            <div className={`${isChecked ? "opacity-70 bg-green-300" : ""} bg-white rounded-[9px] flex justify-between items-center md:flex-col md:gap-4 py-6 px-4 duration-500`}>
                <div className="md:flex md:flex-col md:items-center md:text-center md:gap-4">
                    <p className="text-2xl break-words font-bold s:text-xl bg-gradient-to-b bg-clip-text text-transparent">{task}</p>
                    <div className="flex gap-2 items-center">
                        <img src={calendar} alt="ícone de um calendario" className="w-4" />
                        <p className="text-md font-bold s:text-sm bg-gradient-to-b bg-clip-text text-transparent">{`${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getFullYear()).padStart(4, "0")}`}</p>
                    </div>
                </div>
                <div className="relative flex gap-2">
                    <button className="outline-none " onClick={(e) => {useModal()}}><img src={pencil} alt="botão para editar tarefa" className=" min-w-full max-w-[2rem] s:max-w-[1.5rem] hover:scale-125 hover:animate-pulse duration-200" /></button>
                    <button className="outline-none " onClick={(e) => {markTaskDone(id)}}><img src={confirm} alt="botão para marcar como concluida a tarefa"  className="min-w-full max-w-[2rem] s:max-w-[1.5rem] hover:scale-125 hover:animate-pulse duration-200" /></button>
                    <button className="outline-none " onClick={(e) => {removeTask(id)}}><img src={trash} alt="botão para deletar tarefa"  className="min-w-full max-w-[2rem] s:max-w-[1.5rem] hover:scale-125 hover:animate-pulse duration-200" /></button>
                </div>
            </div>
        </div>
    )
}