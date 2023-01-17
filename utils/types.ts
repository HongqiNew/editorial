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
    text: string
    userPic: string
    userName: string
    artId: number
    isMe: boolean
}
