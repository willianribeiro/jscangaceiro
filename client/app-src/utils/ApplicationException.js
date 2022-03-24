export class ApplicationException extends Error {
    constructor (message = '') {
        super(message)
        this.name = this.constructor.name
    }
}

export function isApplicationException (error) {
    return (
        error instanceof ApplicationException ||
        Object.getPrototypeOf(error) instanceof ApplicationException
    )
}

export function getExceptionMessage (error) {
    if (!isApplicationException) {
        console.error(error)
        return 'Não foi possível realizar a operação.'
    }

    return error.message
}
