const jwt = require('jsonwebtoken')

const CONST_AUTH_HEADER = 'Authorization'

const verifyToken = (token) => {
    console.log(`Verify Token: ${token}`)
        try {
            const decoded = jwt.verify(token, process.env.APP_CSAIGMC_SECRET_PASS)
            return decoded
        } catch(err) {
            throw new Error("Token Verification failed!") 
        }
}

const AO={
    SORT_BY: "sort_by",
    LIMIT: 'limit',
    SKIP: 'skip',
    AFTER: "after"
}

const BEF_DATE_STRING=new Date(1997, 1, 1).toString()

const DEFAULTS = {
    Student: {
        [AO.SORT_BY]: "roll_no",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
    Art: {
        [AO.SORT_BY]: "-create_date",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
    User: {
        [AO.SORT_BY]: "-create_date",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
    Article: {
        [AO.SORT_BY]: "-create_date",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
    Complaint: {
        [AO.SORT_BY]: "-create_date",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
    Notification: {
        [AO.SORT_BY]: "-create_date",
        [AO.LIMIT]: parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE),
        [AO.SKIP]: 0,
        [AO.AFTER]: BEF_DATE_STRING
    },
}

const checkAllOptions = (options, defaultOptions) => {
    let finalOptions = {}
    console.log(defaultOptions[AO.AFTER])
    const maxLimitPerPage = parseInt(process.env.APP_CSAIGMC_MAX_LIMIT_PER_PAGE)
    const curLimitPerPage = parseInt(process.env.APP_CSAIGMC_CURRENT_LIMIT_PER_PAGE)
    const defLimit = parseInt(defaultOptions[AO.LIMIT])
    console.log(options)
    if(!options) {
        console.log("Runing from options insider")
        console.log(options)
        finalOptions = defaultOptions
    } else {
        console.log("Runing from options customizer")
        console.log(options)
        finalOptions[AO.SORT_BY] =  options[AO.SORT_BY] || defaultOptions[AO.SORT_BY]
        finalOptions[AO.LIMIT] = options[AO.LIMIT] !== null ? Math.min(options[AO.LIMIT], maxLimitPerPage) : Math.min(defLimit, maxLimitPerPage)
        finalOptions[AO.SKIP] =  options[AO.SKIP] !== null ? (options[AO.SKIP] * finalOptions[AO.LIMIT]) : (defaultOptions[AO.SKIP] * finalOptions[AO.LIMIT])
        finalOptions[AO.AFTER] = options[AO.AFTER] || defaultOptions[AO.AFTER]
    }

    console.log(finalOptions)
    return finalOptions
}

const checkAdminDetails = (token) => {
    // console.log(token)
    const data = verifyToken(token)
    if(data === null) throw new Error("Null Token") 
    if(data.username === process.env.APP_CSAIGMC_USERNAME && data.id === process.env.APP_CSAIGMC_CLIENT_ID) {
        return true
    }
    throw new Error('Token Not Found')
}

const getAuthToken = (req) => {
    const data = req.header(CONST_AUTH_HEADER)
    if(!data) {
        throw new Error("Forbidden")
    } else {
        const token = data.split(' ')[1]
        if(!token) {
            return new Error('Forbidden') 
        } else {
            return token
        }
    }
}

module.exports = {
    verifyToken,
    DEFAULTS,
    checkAllOptions,
    AO,
    checkAdminDetails,
    getAuthToken
}