import { z } from 'zod'

const tag = z.string().min(3)

export const errorSchema = z.object({
  tag,
  message: z.string(),
  isCritical: z.boolean().default(false),
  error: z.any().default(null)
})

export const cookieBody = z.object({
  name: z.string(),
  value: z.string(),
  opts: z.object({
    path: z.string(),
    maxAge: z.number().optional()
  }).optional()
})

export const resultSchema = z.object({
  data: z.any().optional(),
  cookie: cookieBody.array().optional()
})

export const addResultSchema = z.object({
  data: z.any()
})


export const errorListSchema = z.array(errorSchema)

export const tagListSchema = z.array(tag)

export type addResultSchemaType = z.infer<typeof addResultSchema>

export type addCookieSchemaType = z.infer<typeof cookieBody>

export type errorSchemaType = z.infer<typeof errorSchema>

export type resultSchemaType = z.infer<typeof resultSchema>

export type errorListSchemaType = z.infer<typeof errorListSchema>

export type tagListSchemaType = z.infer<typeof tagListSchema>