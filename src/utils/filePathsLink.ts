import { baseUrl } from './apiFabric';

type LinkType = 'unloadFiles' | 'imageProducts' | 'imageDocuments' |
  'linkProductInfo' | 'baseImage';

let filePathsLink = {
  unloadFiles: '',
  imageProducts: '',
  imageDocuments: '',
  linkProductInfo: '',
  baseImage:'',
};

export function setFilePathsLink(links = {
  unloadFiles: '',
  imageProducts: '',
  imageDocuments: '',
  linkProductInfo: '',
  baseImage:'',
}) {
  filePathsLink = links;
}

export function mergeLink(link: string, linkType: LinkType) {
  if (!link) return '';
  return `${baseUrl}/${filePathsLink[linkType]}/${link}`;
}
