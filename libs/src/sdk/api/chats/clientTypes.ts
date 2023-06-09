import { z } from 'zod'

import {
  CommsResponse,
  ChatPermission,
  ChatMessage,
  ChatMessageNullableReaction
} from './serverTypes'

// REQUEST PARAMETERS

export const ChatGetAllRequestSchema = z.object({
  limit: z.optional(z.number()),
  before: z.optional(z.string()),
  after: z.optional(z.string())
})

export type ChatGetAllRequest = z.infer<typeof ChatGetAllRequestSchema>

export const ChatGetRequestSchema = z.object({
  chatId: z.string()
})

export type ChatGetRequest = z.infer<typeof ChatGetRequestSchema>

export const ChatGetMessagesRequestSchema = z.object({
  chatId: z.string(),
  limit: z.optional(z.number()),
  before: z.optional(z.string()),
  after: z.optional(z.string())
})

export type ChatGetMessagesRequest = z.infer<
  typeof ChatGetMessagesRequestSchema
>

export const ChatCreateRequestSchema = z.object({
  userId: z.string(),
  invitedUserIds: z.array(z.string()).min(1)
})

export type ChatCreateRequest = z.infer<typeof ChatCreateRequestSchema>

export const ChatInviteRequestSchema = z.object({
  chatId: z.string(),
  userId: z.string(),
  invitedUserIds: z.array(z.string()).min(1)
})

export type ChatInviteRequest = z.infer<typeof ChatInviteRequestSchema>

export const ChatMessageRequestSchema = z.object({
  chatId: z.string(),
  messageId: z.optional(z.string()),
  message: z.string()
})

export type ChatMessageRequest = z.infer<typeof ChatMessageRequestSchema>

export const ChatReactRequestSchema = z.object({
  chatId: z.string(),
  messageId: z.string(),
  reaction: z.nullable(z.string())
})

export type ChatReactRequest = z.infer<typeof ChatReactRequestSchema>

export const ChatReadRequestSchema = z.object({ chatId: z.string() })

export type ChatReadRequest = z.infer<typeof ChatReadRequestSchema>

export const ChatBlockRequestSchema = z.object({
  userId: z.string()
})

export type ChatBlockRequest = z.infer<typeof ChatBlockRequestSchema>

export const ChatDeleteRequestSchema = z.object({ chatId: z.string() })

export type ChatDeleteRequest = z.infer<typeof ChatDeleteRequestSchema>

export const ChatPermitRequestSchema = z.object({
  permit: z.nativeEnum(ChatPermission)
})

export type ChatPermitRequest = z.infer<typeof ChatPermitRequestSchema>

export const ChatValidateCanCreateRequestSchema = z.object({
  userIds: z.array(z.string()).min(1)
})

export type ChatValidateCanCreateRequest = z.infer<
  typeof ChatValidateCanCreateRequestSchema
>

export const ChatGetPermissionRequestSchema = z.object({
  userIds: z.array(z.string()).min(1)
})

export type ChatGetPermissionRequest = z.infer<
  typeof ChatGetPermissionRequestSchema
>

export const ChatUnfurlRequestSchema = z.object({
  urls: z.array(z.string()).min(1)
})

export type ChatUnfurlRequest = z.infer<typeof ChatUnfurlRequestSchema>

export type TypedCommsResponse<T> = Omit<CommsResponse, 'data'> & {
  data: T
}

export type ChatEvents = {
  open: () => void
  close: () => void
  error: (error: any) => void
  ['message']: (params: { chatId: string; message: ChatMessage }) => void
  ['reaction']: (params: {
    chatId: string
    messageId: string
    reaction: ChatMessageNullableReaction
  }) => void
}

export type UnfurlResponse = {
  url: string
  url_type?: string
  site_name?: string
  title?: string
  description?: string
  image?: string
  html?: string
  favicon?: string
}
