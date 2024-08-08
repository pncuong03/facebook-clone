import { IFriend } from './friend'
import { IPost } from './post'

export interface INoti {
  id: string
  type: string
  userId: string
  interactId: string
  groupId: string
  interactType: string
  postId: string
  hasSeen: boolean
  createdAt: string
  interact: IFriend
  //   group: {
  //     id: 0
  //     name: 'string'
  //   }
  post: IPost
}

export interface IMessage {
  id: string
  chatId: string
  userId: string
  message: string
  fullName: string
  imageUrl: string
  isMe: boolean
  createdAt: string
}
export interface IEventMessage {
  chatId: string
  userId: string
  message: string
  fullName: string
  imageUrl: string
  isMe: boolean
  createdAt: string
}

export interface IEventNoti {
  messageCount: number
  informCount: number
  messages: IMessage[]
}
