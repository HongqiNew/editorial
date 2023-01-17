export type Article = {
    id: number
    title: string
    time: number
    author: string
    md: string
    pin: boolean
    cover?: string
    download?: string
    tags?: string[]
}


export type Comment = {
    id: string
    time: number
    userId: string
    user_name: string
    article: number
    text: string
    isMe: boolean
}
