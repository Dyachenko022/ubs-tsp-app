import PdfIcon from '../../assets/docIcons/pdf.png';
import JpegIcon from '../../assets/docIcons/jpg.png';
import PngIcon from '../../assets/docIcons/png.png';
import OtherIcon from '../../assets/docIcons/other.png';

export function getFileIcon(fileName: string): number {
  const extension = (fileName.split('.')[1]) || '';
  let Icon;
  switch (extension) {
    case 'pdf':
      Icon = PdfIcon;
      break;
    case 'jpg':
    case 'jpeg':
      Icon = JpegIcon;
      break;
    case 'png':
      Icon =PngIcon;
      break;
    default:
      Icon = OtherIcon;
      break;
  }
  return Icon;
}
