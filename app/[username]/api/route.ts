import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { genSalt, hash } from 'bcrypt'
import { Client as NotionClient } from "@notionhq/client"
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

interface Account {
  auth: boolean,
  username: string,
  password: string
}

export async function POST(request: NextRequest) {
  const {auth, username, password}: Account = await request.json()

  if (!auth) { // is Logup

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

  } else { // is Login

    const response: any = await notion.databases.query({
      database_id: databaseId!,
      filter: {
        property: 'username',
        rich_text: {
          contains: username
        }
      }
    })

    // get account password
    const passwordHashed = response.results[0].properties.password.rich_text[0].plain_text
    
    // match plain text password with account password
    const result: boolean = await compare(password, passwordHashed)

    if (result) {
      const token = jwt.sign({id: response.results[0].id}, 'app')

      return NextResponse.json({result, token})
    } else {
      return NextResponse.json({result})
    }
    
  }
}