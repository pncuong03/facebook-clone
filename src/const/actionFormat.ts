export const formatNoti = (notify: string, t: (key: string) => string) => {
  switch (notify) {
    case 'ACCEPT_FRIEND_REQUEST':
      return t('home.acceptfriend')
    case 'FRIEND_REQUEST':
      return t('home.friendrequest')
    case 'COMMENT':
      return t('home.commentactivity')
    case 'LIKE':
      return t('home.likeactivity')
    case 'SHARE':
      return t('home.shareactivity')
    default:
      return notify
  }
}
