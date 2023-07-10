import Task from "../Task/Task";
import add from "../../assets/add.svg";
import TaskModal from "../../components/TaskModal/TaskModal";
import { useContext, useEffect, useRef, useState } from "react";
import { getCollectionTasks, db } from "../../services/firebase"
import { AuthContext } from "../../Auth/AuthContext";
import { doc, setDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore/lite";
import {v4 as uuidv4} from "uuid";

export default function TaskBoard() {

    const name = useRef();
    const time = useRef();

    const [tasks, setTasks] = useState([]);

    const {user} = useContext(AuthContext);

    function getCollectionAndChangeTasks() {
        getCollectionTasks(user.uid).then((tasksCollection) => {
            let newArr = tasksCollection.map(task => {
                task.date = task.date.toDate();
                return task
            })
            setTasks(newArr)
         })
    }

    useEffect(() => {
        getCollectionAndChangeTasks()
    },[])

    async function addTask(task, date, isChecked) {

        const[year, month, day] = date.split("-");

        let taskDate = new Date(`${year}/${month}/${day}`);

        if (task == ""){
            alert('insira uma tarefa válida!');
            return
        } else if (isNaN(taskDate.getDate()) || isNaN(taskDate.getDay()) || isNaN(taskDate.getFullYear())) {
            alert('insira uma data válida!');
            return
        }
        name.current.value = ""

        const identifier = uuidv4()

        await setDoc(doc(db, user.uid, identifier), 
        {
            id: identifier,
            task: task,
            date: taskDate,
            isChecked: isChecked
        })

        getCollectionAndChangeTasks()
    }

    async function removeTask(id) {

        await deleteDoc(doc(db, user.uid, id));

        getCollectionAndChangeTasks()

    }

    async function markTaskDone(id) {

        const snapshot = await getDoc(doc(db, user.uid, id))

        const previousValue = snapshot.data().isChecked;
        
        await updateDoc(doc(db, user.uid, id), {
            isChecked: !previousValue
        })

        getCollectionAndChangeTasks()
    }

    async function changeTask(newTask, newDateTask, id) {

        const[year, month, day] = newDateTask.split("-");

        let taskDate = new Date(`${year}/${month}/${day}`);

        if (newTask == ""){
            alert('insira uma tarefa válida!');
            return
        } else if (isNaN(taskDate.getDate()) || isNaN(taskDate.getDay()) || isNaN(taskDate.getFullYear())) {
            alert('insira uma data válida!');
            return
        }

        await updateDoc(doc(db, user.uid, id), {
            task: newTask,
            date: taskDate
        })

        getCollectionAndChangeTasks()
    }

        return(
            <div className="flex flex-col items-center gap-8 py-10 overflow-auto bg-white w-full scrollbar-thin scrollbar-track-secondary/50 scrollbar-thumb-secondary/70 scrollbar-thumb-rounded-3xl">
                <div className="flex items-center justify-center w-4/5 gap-4 xmd:flex-col">
                    <input ref={name} type="text" className="text-lg s:text-base shadow-md p-2 rounded-3xl outline-none bg-gradient-to-b bg-clip-text text-transparent w-full" />
                    <input ref={time} type="date" min="0000-01-01" max="9999-12-31"  name="date" id="date" className="bg-gradient-to-b bg-clip-text text-transparent text-lg s:text-base outline-none min-w-max" />
                    <button onClick={() => {addTask(name.current.value, time.current.value, false)}}><img src={add} alt="ícone do botão de adicionar tarefa" className="s:h-10 hover:scale-105 hover:animate-pulse min-w-max" /></button>
                </div>
                {tasks?.map((task) => {
                    return (<Task key={task.id} task={task.task} date={task.date} isChecked={task.isChecked} id={task.id} removeTask={removeTask} markTaskDone={markTaskDone} changeTask={changeTask} />)
                })}
                <TaskModal changeTask={changeTask}/>
            </div>
        )
}