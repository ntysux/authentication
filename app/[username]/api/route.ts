import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { genSalt, hash } from 'bcrypt'
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

interface Account {
  username: string,
  password: string
}

export async function POST(request: NextRequest) {
  const {username, password}: Account = await request.json()
  
  // hash password with Bcrypt
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)

  // store username & password in Notion
  const res = await notion.pages.create({
    parent: {
      database_id: databaseId!
    },
    properties: {
      username: {
        title: [
          {
            text: {
              content: username
            }
          }
        ]
      },
      password: {
        rich_text: [
          {
            text: {
              content: hashedPassword
            }
          }
        ]
      }
    }
  })

  return NextResponse.json({pageId: res.id})
}