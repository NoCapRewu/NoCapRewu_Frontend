import { UserInfo } from "./userinfo"
import { MiddleLeft } from "./middle_left"
import { MiddleRight } from "./middle_right"

export function MiddleSection() {
    return(
        <div className="flex flex-col h-full">
            <div className="h-[10%] border-b border-black">
                <UserInfo />
            </div>
            
            <div className="h-[90%] flex flex-row">
                <div className="w-[45%] border-r border-black">
                    <MiddleLeft/>
                </div>
                <div className="w-[59%]">
                    <MiddleRight/>
                </div>
            </div>
        </div>
    )
}