import { LeftSidebar } from "../components/leftsidebar"
import { MiddleSection } from "../components/middlesection"

export function ResumeRoast(){
    return(
        <div className="grid grid-cols-[20%_80%] w-full h-screen border border-black">
            <div className="border-r border-black">
                <LeftSidebar />
            </div>
            <div>
                <MiddleSection />
            </div>
        </div>
    )
}