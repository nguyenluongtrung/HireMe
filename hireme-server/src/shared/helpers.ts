import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { v4 as uuidv4 } from "uuid"
import * as path from "path"

// Type Predicate
export const isUniqueConstraintPrismaError = (error: any): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === "P2002"
}

export const isNotFoundPrismaError = (error: any): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === "P2025"
}

export const isForeignKeyConstraintPrismaError = (error: any): error is PrismaClientKnownRequestError => {
  return error instanceof PrismaClientKnownRequestError && error.code === "P2003"
}

export const generateRandomFilename = (filename: string) => {
  const ext = path.extname(filename)
  return `${uuidv4()}${ext}`
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
