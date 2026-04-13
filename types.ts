
export interface BookPage {
  id: number;
  phrase: string;
  commentary: string;
  school: string;
  color: string;
}

export enum BookState {
  COVER = 'COVER',
  TOC = 'TOC',
  READING = 'READING',
  BACK_COVER = 'BACK_COVER'
}
