import { useContext } from "react"
import { AuthContext } from "../../Auth/AuthContext"

export default function SideBar() {

    const {signout, user} = useContext(AuthContext);

    return(
        <div className="bg-[#D9D9D930] backdrop-blur-2xl min-w-max p-6 md:hidden">
            <button title="sair" onClick={signout} className=" bg-red-900 p-[2px] rounded-[50%] relative shadow-profile-pic overflow-hidden before:content-[''] before:bg-55px ">
                <img src={user.photoURL} alt="Imagem do perfil" className="rounded-[50%] w-[110px] h-[110px] object-cover"/>
            </button>
        </div>
    )
}