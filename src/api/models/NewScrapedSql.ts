

import {DataTypes, Model} from 'sequelize';
import {NewScrapedI} from "./NewScraped";

export interface NewScrapedSqlI {
    newspaper: string
    author: string
    description: string
    image: string
    date: Date
    scrapedAt: Date
    content: string
    headline: string
    tags: string
    sections: string
    figuresUrl: string
    figuresText: string
    url: string
    scraperId: string
    scrapingIteration: number
    id: string
    newsIndex: number
}

export class NewScrapedSql extends Model<NewScrapedSqlI> {
}

export const newScrapedSqlAttributes = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    newspaper: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
    scrapedAt: {
        type: DataTypes.DATE,
    },
    content: {
        type: DataTypes.STRING,
    },
    contentMarkdown: {
        type: DataTypes.STRING,
    },
    headline: {
        type: DataTypes.STRING,
    },
    tags:{
        type: DataTypes.STRING,
    },
    sections:{
        type: DataTypes.STRING,
    },
    figuresUrl:{
        type: DataTypes.STRING,
    },
    figuresText:{
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    scraperId: {
        type: DataTypes.STRING,
    },
    newsIndex: {
        type: DataTypes.NUMBER,
    },
    scrapingIteration: {
        type: DataTypes.NUMBER,
    }
} as any

export const joiningStrtags = ','
export const joiningStrFigures = '=====' 


export const convertToNewsScrapedSqlI = (newScrapedI: NewScrapedI): NewScrapedSqlI => {
    const newScrapedSql = newScrapedI as any
    if (newScrapedSql.tags && Array.isArray(newScrapedSql.tags)){
        const tags = newScrapedSql.tags
        newScrapedSql.tags =  tags.join(joiningStrtags)
    }
    if (newScrapedSql.sections && Array.isArray(newScrapedSql.sections)){
        const sections = newScrapedSql.sections
        newScrapedSql.sections =  sections.join(joiningStrtags)
    }
    if (newScrapedSql.figuresUrl && Array.isArray(newScrapedSql.figuresUrl)){
        const figuresUrl = newScrapedSql.figuresUrl
        newScrapedSql.figuresUrl =  figuresUrl.join(joiningStrFigures)
    }
    if (newScrapedSql.figuresText && Array.isArray(newScrapedSql.figuresText)){
        const figuresText = newScrapedSql.figuresText
        newScrapedSql.figuresText =  figuresText.join(joiningStrFigures)
    }
    return newScrapedSql as NewScrapedSqlI
}

export const convertNewsScrapedSqlI = (newScrapedSqlI: NewScrapedSqlI): NewScrapedI => {
    const index = newScrapedSqlI as any
    if (newScrapedSqlI.tags.includes(joiningStrtags)) {
        const tags = newScrapedSqlI.tags
        index.tags =  tags.split(joiningStrtags)
    } else {
        index.tags = [newScrapedSqlI.tags]
    }
    if (newScrapedSqlI.sections.includes(joiningStrtags)) {
        const sections = newScrapedSqlI.sections
        index.sections =  sections.split(joiningStrtags)
    } else {
        index.sections = [newScrapedSqlI.sections]
    }
    
    if (newScrapedSqlI.figuresUrl.includes(joiningStrFigures)) {
        const figuresUrl = newScrapedSqlI.figuresUrl
        index.figuresUrl =  figuresUrl.split(joiningStrFigures)
    } else {
        index.figuresUrl = [newScrapedSqlI.figuresUrl]
    }
    if (newScrapedSqlI.figuresText.includes(joiningStrFigures)) {
        const figuresText = newScrapedSqlI.figuresText
        index.figuresText =  figuresText.split(joiningStrFigures)
    } else{
        index.figuresText =  [newScrapedSqlI.figuresText]

    }
    return index as NewScrapedI
}

export const convertScrapingNewsSqlIApi = (
    newScrapedSql: NewScrapedSql
  ): NewScrapedI => {
    const index = newScrapedSql as any;
    return convertNewsScrapedSqlI(index)
  };