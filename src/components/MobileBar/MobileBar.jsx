import { useContext } from "react"
import { AuthContext } from "../../Auth/AuthContext"

export default function MobileBar() {

    const {signout, user} = useContext(AuthContext);

    return(
    <div className="hidden md:block fixed bottom-5 left-5 ">
        <button onClick={signout}>
            <img src={user.photoURL} alt="Imagem do perfil" className="rounded-[50%] w-[90px] h-[90px] s:w-[70px] s:h-[70px] object-cover"/>
        </button>
    </div>
    )
}