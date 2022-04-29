export class HttpService {
    get (url) {
        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json())
    }

    _handleErrors (response) {
        if (!response.ok)
            throw new Error(response.statusText)
        return response
    }
}
