const Student = require('../models/Student')
const Art = require('../models/Arts')
const Article = require('../models/Articles')
const Complaint = require('../models/Complaint')
const Notification = require('../models/Notification')

const {makeExecutableSchema} = require('graphql-tools')
const {verifyToken, DEFAULTS, checkAllOptions, AO} = require('../utils')

const CONST_AUTH_HEADER = 'Authorization'

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

const typeDefs = `
type Student {
    roll_no: ID!
    first_name: String
    last_name: String
    country_code: String
    phone_no: String
    father_name: String
    mother_name: String
    create_date: String
}

type Art {
    _id: ID!
    creator: String
    about_creator: String
    url_path: String
    art_type: String
    create_date: String
}

type Article {
    _id: ID!
    author: String
    about_author: String
    text: String
    create_date: String
}

type Complaint {
    _id: ID!
    complaint_message: String
    complaint_status: String
    create_date: String
}

type Notification {
    _id: ID!,
    notification_text: String
    notification_url: String
    create_date: String
}

input InpStudent {
    roll_no: ID
    first_name: String
    last_name: String
    country_code: String
    phone_no: String
    father_name: String
    mother_name: String
}

input InpArt {
    creator: String
    about_creator: String
    url_path: String
    art_type: String
}

input InpArticle {
    author: String
    about_author: String
    text: String
}

input InpComplaint {
    compaint_message: String
    complaint_status: String
}

input InpNotification {
    notification_text: String
    notification_url: String
}

input InpOptions {
    skip: Int
    limit: Int
    sort_by: String
    after: String
}

type Query {
    student(roll_no: String): Student
    art(id: ID!): Art
    article(id: ID!): Article
    complaint(id: ID!): Complaint
    notification(id: ID!): Notification
    
    allStudents(options: InpOptions): [Student]
    allArts(options: InpOptions): [Art]
    allArticles(options: InpOptions): [Article]
    allComplaints(options: InpOptions): [Complaint]
    allNotifications(options: InpOptions): [Notification]
}

type Mutation{
    addStudent(student: InpStudent): Student
    deleteStudent(roll_no: String): String
    updateStudent(roll_no: ID!, student: InpStudent): Student 
    
    addArt(art: InpArt): Art
    deleteArt(id: ID!): String
    updateArt(id: ID!, art: InpArt): Art
    
    addArticle(article: InpArticle): Article
    deleteArticle(id: ID!): String
    updateArticle(id: ID!, art: InpArticle): Article 
    
    addComplaint(complaint: InpComplaint): Complaint
    updateComplaint(id: ID!, complaint: InpComplaint): Complaint
    deleteComplaint(id: ID!): String
    
    addNotification(notification: InpNotification): Notification
    updateNotification(id: ID!, notification: InpNotification): Notification
    deleteNotification(id: ID!): String
}

type Schema {
    query: Query
    mutation: Mutation
}
`

const resolvers = {
    Query: {
        async student(_, {roll_no}) {
            const info = await Student.findOne({roll_no})
            return info
        },
        async art(_, {id}) {
            const info = await Art.findOne({_id: id})
            return info
        },
        async article(_, {id}) {
            const info = await Article.findOne({_id: id})
            return info
        },
        async complaint(_, {id}) {
            const info = await Complaint.findOne({_id: id})
            return info
        },
        async notification(_, {id}) {
            const info = await Notification.findOne({_id: id})
            return info
        },
        async allStudents(_, {options}) {
            const foptions = checkAllOptions(options, DEFAULTS.Student)
            const info = await Student.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allArts(_, {options}) {

            const foptions = checkAllOptions(options, DEFAULTS.Art)
            const info = await Art.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allArticles(_, {options}) {

            const foptions = checkAllOptions(options, DEFAULTS.Article)
            const info = await Article.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allComplaints(_, {options}) {

            const foptions = checkAllOptions(options, DEFAULTS.Complaint)
            const info = await Complaint.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allNotifications(_, {options}) {

            const foptions = checkAllOptions(options, DEFAULTS.Notification)
            const info = await Notification.find({
                create_date: {$gte: foptions[AO.AFTER]}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        }
    },
    Mutation: {
        // Student
        async addStudent(_, {student}, {req}) {
            const stud = new Student(student)
            const result = await stud.save()
            return result
        },
        async deleteStudent(_, {roll_no}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const stud = await Student.findOneAndRemove({roll_no})
                if(stud === null) {
                    return "Error Not Found"
                }
                return "Successfully deleted student"
            }
            return null
        },
        async updateStudent(_, {roll_no, student}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const prevStud = await Student.findOne({roll_no})
                const result = await Student.updateOne({roll_no}, student)
                const newStud = await Student.findOne({_id: prevStud._id})
                return newStud
            }
            return null
        },

        // Art
        async addArt(_, {art}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const nart = new Art(art)
                const result = await nart.save()
                return result
            }
            return null
        },
        async deleteArt(_, {id}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Art.findOneAndRemove({_id: id})
                if(result === null) {
                    return "Error deleting Art"
                } 
                return "Successfully deleted Art"
            }
            return null
        },
        async updateArt(_, {id, art}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Art.updateOne({_id: id}, art)
                const updatedValue = await Art.findOne({_id: id})
                return updatedValue
            }
            return null
        },

        // Article
        async addArticle(_, {article}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const arti = new Article(article)
                const result = await arti.save()
                return result
            }
            return null
        },
        async deleteArticle(_, {id}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = Article.findOneAndRemove({_id: id})
                if(result === null){
                    return "Error deleting Article"
                }
                return "done deleting article"
            }
            return null
        },
        async updateArticle(_, {id, art}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Article.updateOne({_id: id}, art)
                const newArticle = await Article.findOne({_id: id})
                return newArticle
            }
            return null
        },

        // Complaint
        async addComplaint(_, {complaint}, {req}) {
            const comp = new Complaint(complaint)
            const result = await comp.save()
            return result
        },
        async deleteComplaint(_, {id}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = Complaint.findOneAndRemove({_id: id})
                if(result === null){
                    return "Error deleting Article"
                }
                return "done deleting article"
            }
            return null
        },
        async updateComplaint(_, {id, complaint}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Complaint.updateOne({_id: id}, art)
                const newComplaint = await Complaint.findOne({_id: id})
                return newComplaint
            }
            return null
        },

        // Notification
        async addNotification(_, {notification}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const notif = new Notification(article)
                const result = await notif.save()
                return result
            }
            return null
        },
        async deleteNotification(_, {id}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = Notification.findOneAndRemove({_id: id})
                if(result === null){
                    return "Error deleting Notification"
                }
                return "done deleting notification"
            }
            return null
        },
        async updateNotification(_, {id, art}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Notification.updateOne({_id: id}, art)
                const newNotification = await Notification.findOne({_id: id})
                return newNotification
            }
            return null
        }  
    }
}

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
})