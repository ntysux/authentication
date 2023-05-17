import Client from "./client"
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

export default async function Page({params}: {params: {username: string}}) {
  const {username} = params
  let password

  const response: any = await notion.databases.query({
    database_id: databaseId!,
    filter: {
      property: 'username',
      rich_text: {
        contains: username
      }
    }
  })

  if (response.results.length) {
    password = response.results[0].properties.password.rich_text[0].plain_text
  } else {
    password = null
  }

  // console.log('res', response.results[0].properties.password.rich_text[0].plain_text)

  return <Client isUser={Boolean(response.results.length)} account={{username, password}}
  />
}