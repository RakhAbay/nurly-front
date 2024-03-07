import { useState } from "react"
import { ChatBot } from "./ChatBot"


interface Props {
    page: string
}
    

export const ChatBotContainer = ({ page }: Props): JSX.Element => {
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="pinned">
            <div style={{ display: isOpened ? 'block' : 'none' }}>
                <ChatBot page={page} />
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row-reverse' }}>
                {isOpened ? 
                <button onClick={() => setIsOpened(false)}>Close</button>
                :
                <button onClick={() => setIsOpened(true)}>Helper</button>}
            </div>
        </div>
    )
}
