import { NewScrapedI } from "./NewScraped";

export interface ResultsInNewspaper {
    dateScraping: Date;
    newspaper: string;
    news: NewScrapedI[];
    scraperId: string;
    deviceId: string;
    logoUrl: string;
    tag: string;
    id:number;
  }
    
  