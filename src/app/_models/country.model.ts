export interface Country {
  id: string,
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  name: string;
  nativeName: string,
  population: number,
  region: string,
  subRegion: string,
  capital: any[], // array
  topLevelDomain: any[],
  currencies: any,
  languages: any,
  borders: any[],
  fifa: string,
  flags: any,
  nativeNameProcessed: string,
  currenciesProcessed: string,
  languagesProcessed: string,
  bordersProcessed: string[],
  cca1: string,
  cca2: string,
  cca3: string
}
