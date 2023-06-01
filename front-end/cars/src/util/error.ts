import { AxiosError } from "axios";

type Error = AxiosError & {
  response: {
    data: {
      message: string
      fields: {
        field: string
        message: string
      }[]
    }
  }
}

function getStringFieldInvalids(fields: string[]) {
  const separator = fields.length > 2 ? ', ' : ' e '

  return fields.join(separator)
}

export function getMessageError(error: Error) {
  const messageByStatus = {
    404: 'Oops, parece que este carro não existe mais na base de dados. Por favor atualize a página.',
    500: 'Oops, ocorreu um erro interno no servidor. Por favor tente novamente mais tarde.',
  } as {
    [key: number]: string
  }

  const status = error.response?.status

  if(status === 400) {
    const data = error.response?.data
    const fieldsString = data.fields.map(field => field.field)
    const fieldInvalidsString = getStringFieldInvalids(fieldsString)

    const message = fieldsString.length > 1
      ? `Oops, os campos ${fieldInvalidsString} estão inválidos. Por favor verifique e tente novamente.`
      : `Oops, o campo ${fieldInvalidsString} está inválido. Por favor verifique e tente novamente.`

    return message
  }

  const message = status
    ? messageByStatus[status]
    : messageByStatus[500]

  return message
}
