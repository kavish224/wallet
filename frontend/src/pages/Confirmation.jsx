import { useNavigate, useSearchParams } from "react-router-dom"
import Appbar from "../components/Appbar"
import Button from "../components/Button"
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"

export const Confirmation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const to = searchParams.get("name");
    const amount = searchParams.get("amount");
    return (
        <>
            <Appbar/>
            <div className="flex justify-center pt-20">
                <div class="block max-w-sm pt-4 pr-12 pl-12 pb-5 bg-white border border-gray-200 rounded-lg shadow">
                    <Heading label={"Money Sent"} />
                    <div className="p-4">
                        To: {to}
                    </div>
                    <div className="p-4">
                        Amount: {amount}
                    </div>
                    <Button label={"Back to home"} onClick={(e)=>{navigate("/dashboard")}}/>
                </div>
            </div>
        </>
    )
}