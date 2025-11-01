import { PrismaClientKnownRequestError, } from '@prisma/client/runtime/library'

// Type Predicate
export function isUniqueConstraintPrismaError(error: any): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
}

export function isNotFoundPrismaError(error: any): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
}

export function isForeignKeyConstraintPrismaError(error: any): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError && error.code === 'P2003'
}
