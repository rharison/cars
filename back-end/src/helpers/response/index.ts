import { Response } from "express"
import { CustomError } from "@/types/error"

const responseInternalError = (res: Response) => {
  const messageError = 'Internal server error - Try again later'
  const CODE_INTERNAL_SERVER_ERROR = 500

  return res.status(CODE_INTERNAL_SERVER_ERROR).json({
    message: messageError
  })
}

export const handleErrorApi = (err: CustomError, res: Response) => {
  const { code, fields, message } = err

  if (!code) {
    return responseInternalError(res)
  }

  return res.status(code).json({
    message,
    fields
  })
}