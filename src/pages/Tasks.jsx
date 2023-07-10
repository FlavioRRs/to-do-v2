import Board from "../components/Board/Board";
import ModalProvider from "../provider/ModalProvider";

export default function Tasks() {

    return(
        <main className="bg-gradient-to-b from-blue-1 to-secondary h-screen md:overflow-hidden flex items-center justify-center">
            <ModalProvider>
                <Board />
            </ModalProvider>
        </main>
        
    )
}