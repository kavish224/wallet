import { useNavigate } from "react-router-dom"
import Appbar from "../components/Appbar"
import Button from "../components/Button"
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Appbar/>
            <div className="h-screen flex justify-center">
            <div className="flex flex-col h-max items-center pt-10">
                    <Heading label={"Welcome to Wallet"} />
                    <div className="pt-5">
                    <SubHeading label={"Transfer money securely, anytime, anywhere - powered by Blockchain"} />
                    </div>
                    <div className="pt-5">
                        <Button label={"Get Started"} onClick={()=>navigate("/signup")}/>
                    </div>
                </div>
            </div>
        </>
    )
}