import { Link } from "react-router-dom";
import task from "../assets/task.svg" 
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignUp() {

    const navigate = useNavigate();

    const botao = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const {signup} = useContext(AuthContext);

    async function handleSignUp() {
        if (email && password && avatar) {
            try {
                setIsLoading(true)
                await signup(email, password, avatar, isLoading, setIsLoading);
                navigate("/")
                setIsLoading(false)
            } catch(e) {
                alert(e.message);
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
                    <h2 className=" leading-8 text-[40px] text-white s:text-[32px]">Registre uma conta</h2>
                    <p className=" text-[20px] text-white inline s:text-[15px]">ou </p><Link className=" text-[20px] s:text-[15px] bg-gradient-to-r from-[#16F1FF] to-secondary hover:to-[#16F1FF] bg-clip-text text-transparent font-bold" to="/">logue</Link>
                </div>
                <div className="flex flex-col gap-[26px] text-[20px] text-white">
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="outline-none py-[8px] pl-[33px] rounded-input placeholder:text-white/60 bg-input-bg hover:bg-input-bg-hf focus:bg-input-bg-hf shadow-inner transition-[background-color] ease-out duration-300" placeholder="e-mail" />
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="outline-none py-[8px] pl-[33px] rounded-input placeholder:text-white/60 bg-input-bg hover:bg-input-bg-hf focus:bg-input-bg-hf shadow-inner transition-[background-color] ease-out duration-300" placeholder="senha"/>
                    <input type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])}  id="avatar" accept=".png, .jpg, .jpeg"/>
                    <button ref={botao} disabled={isLoading} onClick={() => handleSignUp()} type="submit" className="border-[4px] border-blue-1 py-[4px] bg-blue-1 text-white rounded-button mt-[24px] shadow-xl opacity-80 hover:opacity-100 transition-opacity ease-out duration-300">{isLoading ? <AiOutlineLoading3Quarters className="w-8 h-8 mx-auto animate-spin"/>:"Registrar"}</button>
                </div>
            </section>
            <section>
                <img src={task} alt="Logo" className="w-[400px] h-[400px] xmd:hidden" />
            </section>
        </main>
    )
}