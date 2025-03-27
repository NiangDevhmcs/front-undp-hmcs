export interface Language {
  id?: number;
  code: string;
  name: string;
  flag: string;
}


export interface ResponseLanguage{
  data: Language[];
  message: string
}
