export type Article = {
    id: number
    title: string
    time: number
    author: string
    md: string
    cover?: string
    download?: string
    tags?: string[]
}


export type Comment = {
    id: string
    time: number
    user_id: string
    user_name: string
    article: number
    text: string
    isMe: boolean
}
