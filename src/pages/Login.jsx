import { Link } from "react-router-dom";
import task from "../assets/task.svg";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const botao = useRef();

    const {signin} = useContext(AuthContext);

    async function handleLogin() {
        if(email && password) {

            try {
                setIsLoading(true)
                await signin(email, password, isLoading, setIsLoading);
                setIsLoading(false)

            } catch (e) {
                alert(e.message)
                setIsLoading(false)
            }
            
        } else {
            alert("nenhum campo pode ficar vazio")
        }
    }

    return(
        <main className="h-screen bg-gradient-to-b from-blue-1 to-secondary flex items-center justify-around xmd:justify-center xmd:px-5">
            <section className="max-w-[396px] w-full flex flex-col gap-[42px]">
                <div>
                    <h2 className=" leading-8 text-[40px] text-white s:text-[32px]">Logue na sua conta</h2>
                    <p className=" text-[20px] text-white inline s:text-[15px]">ou se </p><Link className=" text-[20px] s:text-[15px] bg-gradient-to-r from-[#16F1FF] to-secondary hover:to-[#16F1FF] bg-clip-text text-transparent font-bold" to="/Registrar">registre</Link>
                </div>
                <div className="flex flex-col gap-[26px] text-[20px] text-white">
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="outline-none py-[8px] pl-[33px] rounded-input placeholder:text-white/60 bg-input-bg hover:bg-input-bg-hf focus:bg-input-bg-hf shadow-inner transition-[background-color] ease-out duration-300" placeholder="e-mail" />
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}  className="outline-none py-[8px] pl-[33px] rounded-input placeholder:text-white/60 bg-input-bg hover:bg-input-bg-hf focus:bg-input-bg-hf shadow-inner transition-[background-color] ease-out duration-300" placeholder="senha"/>
                    <button ref={botao} disabled={isLoading} onClick={() => handleLogin()} className="border-[4px] border-blue-1 py-[4px] bg-blue-1 text-white rounded-button mt-[24px] shadow-xl opacity-80 hover:opacity-100 transition-opacity ease-out duration-300">{isLoading ? <AiOutlineLoading3Quarters className="w-8 h-8 mx-auto animate-spin"/>:"Logar"}</button>
                </div>
            </section>
            <section>
                <img src={task} alt="Logo" className="w-[400px] h-[400px] xmd:hidden" />
            </section>
        </main>
    )
}