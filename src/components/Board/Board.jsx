import TaskBoard from "../TaskBoard/TaskBoard";
import SideBar from "../SideBar/SideBar";
import MobileBar from "../MobileBar/MobileBar";

export default function Board() {

    return(
        <section className="flex w-3/4 h-3/4 md:w-[85%] md:h-[85%]">
            <SideBar />
            <TaskBoard />
            <MobileBar />
        </section>
    )
}