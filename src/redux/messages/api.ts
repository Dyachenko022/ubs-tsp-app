import { post } from '../../utils/apiFabric';
import { mergeLink } from '../../utils/filePathsLink';

interface IGetNotificationsReq {
  filter: 'sent' | 'incoming',
  numPages: number,
  pageRows: 20,
  type: 'messages'
}

export interface IGetNotificationsRes extends IBaseResponse {
  countUnreadMessages: number,
  notifications: IMessage[],
}

interface IStateMessageReq {
  guidMessage: string,
  state: 1,
}

interface IReadMessageReq {
  guidMessage: string,
}

interface IReadMessageRes extends IBaseResponse{
  files: [string[]],
}

export function getNotifications(numPages: number, isIncoming: boolean) {
  return post<IGetNotificationsReq, IGetNotificationsRes>('getNotifications', {
    filter: isIncoming ? 'incoming' : 'sent',
    numPages,
    pageRows: 20,
    type: 'messages',
  });
}

export async function readMessage(guidMessage: string) {
  const response = await post<IReadMessageReq, IReadMessageRes>('readMessage', { guidMessage });
  response.files.forEach((linkName) => {
    linkName[0] = mergeLink(linkName[0], 'unloadFiles');
  });
  return response;
}

export function stateMessage(guidMessage: string) {
  return post<IStateMessageReq, IReadMessageRes>('stateMessage', { guidMessage, state: 1});
}

