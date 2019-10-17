const jwt = require('jsonwebtoken')

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
    if(!options) {
        finalOptions = defaultOptions
    } else {
        finalOptions[AO.SORT_BY] =  options[AO.SORT_BY] || defaultOptions[AO.SORT_BY]
        finalOptions[AO.LIMIT] = Math.min(Math.max(options[AO.LIMIT], defLimit), maxLimitPerPage)
        finalOptions[AO.SKIP] =  options[AO.SKIP] ? (options[AO.SKIP] * finalOptions[AO.LIMIT] - finalOptions[AO.LIMIT]) : (defaultOptions[AO.SKIP] * finalOptions[AO.LIMIT] - finalOptions[AO.LIMIT])
        finalOptions[AO.AFTER] = options[AO.AFTER] || defaultOptions[AO.AFTER]
    }
    return finalOptions
}

module.exports = {
    verifyToken,
    DEFAULTS,
    checkAllOptions,
    AO
}