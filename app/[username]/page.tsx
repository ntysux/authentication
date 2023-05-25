import Client from "./client"
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

export default async function Page({params}: {params: {username: string}}) {
  const {username} = params

  // check user in Notion
  const response = await notion.databases.query({
    database_id: databaseId!,
    filter: {
      property: 'username',
      rich_text: {
        contains: username
      }
    }
  })

  return <Client isUser={Boolean(response.results.length)} username={username} />
}