export interface IUser {
  id: string
  fullName: string
  imageUrl: string
  backgroundUrl: string
  birthday: string
  gender: string
  description: string
  state: string
}

export interface IUserGoogle {
  displayName: string
  email: string
}

export interface ISearchUser {
  id: string
  fullName: string
  imageUrl: string
  isFriend: boolean
  hadSendFriendRequest: boolean
  hadReceiverFriendRequest: boolean
}

export enum FetchStatus {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed'
}
