import Client from "./client"
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

export default async function Page({params}: {params: {username: string}}) {
  const {username} = params
  let match: boolean

  // check user in Notion
  const response: any = await notion.databases.query({
    database_id: databaseId!,
    filter: {
      property: 'username',
      rich_text: {
        contains: username
      }
    }
  })
  
  if(response.results.length) {
    const accountUsername = response.results[0].properties.username.title[0].plain_text
    match = username === accountUsername
  } else {
    match = false
  }

  return <Client isUser={match} username={username} />
}