var StatusMessage = {
    200: "Success",
    201: "Created",
    202: "Accepted",
    204: "Processed, no content to display",
    301: "Endpoint moved",
    302: "Request can't be fullfiled",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    413: "Payload too large",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout"
}

function response(status, result, res) {
    let resp = {
        status: {
            code: status,
            message: StatusMessage[status] || null
        },
        result: result
    }

    res.status(status).json(resp).end()
}


function handleError(status, err, res) {
    response(status, err, res)
}

function MongooseErrorHandle(err, res) {
    if (err.hasOwnProperty('errors')) {
        let keys = Object.keys(err.errors)

        keys.forEach((key) => {
            return err.errors[key] = {
                field: key,
                message: err.errors[key].message || 'Message not available',
                reason: err.errors[key].reason || 'Reason not available'
            }
        })

        response(400, err.errors, res)
    }

    if (err.name === 'CastError') {
        response(400, {
            field: 'ObjectId',
            message: 'Must be a single String of 12 bytes or a string of 24 hex characters',
            reason: 'Must be a single String of 12 bytes or a string of 24 hex characters'
        }, res)
    }
}

module.exports = {
    response,
    handleError,
    MongooseErrorHandle
}
