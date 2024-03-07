import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import { useState } from 'react'

const API_KEY = "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"

interface IMessage {
    message: string,
    sender: 'user' | 'chatGPT',
    direction?: string
}

interface IChatRequest {
    role: 'user' | 'assistant',
    content: string
}
interface Props {
    page: string
}


// var dict: {string} = {
//     'register': 'The register page is for new users to create an account. It requires an email, username, full name, password, and password confirmation before clicking the "Register" button.',
//     'login': 'On the login page, returning users can enter their email and password to access their account by clicking the "login" button.',
//     'category': 'The categories page allows users to manage their financial categories. They can add a new category, or delete or update existing ones such as Food or Sport.',
//     'subcategory': 'Here, users can add subcategories to existing categories by choosing a main category and then clicking the "Create sub category" button.',
//     'transaction': 'This page is where users can record new financial transactions. They select a category, subcategory, enter an amount, additional info, and classify it as income or expense before saving.'
//   };

let dict = {
    register: 'The register page is for new users to create an account. It requires an email, username, full name, password, and password confirmation before clicking the "Register" button.',
    login: 'On the login page, returning users can enter their email and password to access their account by clicking the "login" button.',
    category: 'The categories page allows users to manage their financial categories. They can add a new category, or delete or update existing ones such as Food or Sport.',
    subcategory: 'Here, users can add subcategories to existing categories by choosing a main category and then clicking the "Create sub category" button.',
    transaction: 'This page is where users can record new financial transactions. They select a category, subcategory, enter an amount, additional info, and classify it as income or expense before saving.'
};


export const ChatBot = ({ page }: Props): JSX.Element => {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>([
        {
            message: `Hello i am your finiancial management helper bot. You are in ${page} page`,
            sender: 'chatGPT',
            direction: 'incoming'
        }
    ])

    var helperStr = dict[page];

    const handleSend = async (message: string) => {
        const newMessage: IMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }
        const newMessages: IMessage[] = [...messages, newMessage] 
        setMessages(newMessages)
        setTyping(true)
        await processMessageToChatGPT(newMessages)
    }

    const processMessageToChatGPT = async (chatMessages: IMessage[]) => {
        const convertedMessages: IChatRequest[] = chatMessages.map(msg => {
            const role = msg.sender === 'chatGPT' ? 'assistant' : msg.sender
            return {
                role: role,
                content: msg.message 
            }
        })

        const systemMessage = {
            role: 'system',
            content: `Pretend you a financier who can give finacial advice in (if you are asked in a certain language, answer in that language) and does not consult on anything else because it is out of your scope. If you are asked about how to add categories within application say "In categoies tab, click on add categories, then enter name of the cateogry, then click on income or outcome"(Translate if asked in different language). If you are asked about how to add income/outcome within application, say "In income/outcome tab, click on add income/outcome, then choose category, sum, and note, then click save, and here you are!"(Translate if asked in different language). You are in ${page} page, help to user only in navigation this page, ${helperStr}`
        }
        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...convertedMessages]
        }

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                const botResponseMessage = data.choices[0].message.content
                setMessages([
                    ...chatMessages,
                    {
                        message: botResponseMessage,
                        sender: 'chatGPT',
                        direction: 'incoming'
                    }
                ])
            }).finally(() => {
                setTyping(false)
            })
    }

    return (
        <div style={{ position: 'relative', height: '400px', width: '500px' }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior='smooth'
                        typingIndicator={typing ? <TypingIndicator content='Bot is typing...' /> : null}
                    >
                        {/* @ts-ignore */}
                        {messages.map((message, index) => <Message key={index} model={message} />)}
                    </MessageList>
                    <MessageInput placeholder='Type...' onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}
