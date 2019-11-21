const Student = require('../models/Student')
const Art = require('../models/Arts')
const Article = require('../models/Articles')
const Complaint = require('../models/Complaint')
const Notification = require('../models/Notification')
const User = require('../models/User')

const {makeExecutableSchema} = require('graphql-tools')
const {
    DEFAULTS,
    checkAllOptions,
    AO,
    checkAdminDetails,
    getAuthToken
} = require('../utils')

const typeDefs = `
type Student {
    _id: ID!
    roll_no: String
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
    art_format: String
    art_type: String
    is_meme: Boolean
    create_date: String
}

type User {
    _id: ID!
    user: String
    about_user: String
    user_type: String
    url_path: String
    phone_no: String
    email: String
    create_date: String
}

type Article {
    _id: ID!
    author: String
    about_author: String
    article_type: String
    title: String
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
    art_format: String
    art_type: String
    is_meme: Boolean
}

input InpUser {
    user: String
    about_user: String
    user_type: String
    url_path: String
    phone_no: String
    email: String
}

input InpArticle {
    author: String
    about_author: String
    text: String
    title: String
    article_type: String
}

input InpComplaint {
    complaint_message: String
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
    type: String
}

type Query {
    student(roll_no: String): Student
    art(id: ID!): Art
    article(id: ID!): Article
    complaint(id: ID!): Complaint
    notification(id: ID!): Notification
    user(id: ID!): User
    
    allStudents(options: InpOptions): [Student]
    allArts(options: InpOptions): [Art]
    allArticles(options: InpOptions): [Article]
    allComplaints(options: InpOptions): [Complaint]
    allNotifications(options: InpOptions): [Notification]
    allUsers(options: InpOptions): [User]
}

type Mutation{
    addStudent(student: InpStudent): Student
    deleteStudent(roll_no: ID!): Student
    updateStudent(id: ID!, student: InpStudent): Student 
    
    addArt(art: InpArt): Art
    deleteArt(id: ID!): Art
    updateArt(id: ID!, art: InpArt): Art

    addUser(user: InpUser): User
    deleteUser(id: ID!): User
    updateUser(id: ID!, user: InpUser): User
    
    addArticle(article: InpArticle): Article
    deleteArticle(id: ID!): Article
    updateArticle(id: ID!, article: InpArticle): Article 
    
    addComplaint(complaint: InpComplaint): Complaint
    updateComplaint(id: ID!, complaint: InpComplaint): Complaint
    deleteComplaint(id: ID!): Complaint
    
    addNotification(notification: InpNotification): Notification
    updateNotification(id: ID!, notification: InpNotification): Notification
    deleteNotification(id: ID!): Notification
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
        async user(_, {id}) {
            const info = await User.findOne({_id: id})
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
            console.log('....')
            console.log(foptions)
            const info = await Student.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allArts(_, {options}) {
            const art_type = options.type
            if(typeof(art_type) === 'undefined') {
                throw new Error("Type Not specified in request!")
            }

            const foptions = checkAllOptions(options, DEFAULTS.Art)
            const info = await Art.find({
                art_type,
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allUsers(_, {options}) {
            const user_type = options.type
            if(typeof(user_type) === 'undefined') {
                throw new Error("Type Not specified in request!")
            }

            const foptions = checkAllOptions(options, DEFAULTS.User)
            const info = await User.find({
                user_type,
                create_date: {$gte: new Date(foptions[AO.AFTER])}
            }).
            skip(foptions[AO.SKIP]).
            limit(foptions[AO.LIMIT]).
            sort(foptions[AO.SORT_BY]).exec()
            return info
        },
        async allArticles(_, {options}) {
            const article_type = options.type
            if(typeof(article_type) === 'undefined') {
                throw new Error("article_type Not specified in request!")
            }

            const foptions = checkAllOptions(options, DEFAULTS.Article)
            const info = await Article.find({
                create_date: {$gte: new Date(foptions[AO.AFTER])},
                article_type
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
                    throw new Erro("Error Not Found")
                }
                return stud
            }
            return null
        },
        async updateStudent(_, {id, student}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            console.log("___updating_user____")
            console.log(id)
            console.log(student)
            if(r === true) {
                const result = await Student.updateOne({_id: id}, student)
                const newStud = await Student.findOne({_id: id})
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
                    throw new Error("Error deleting Art")
                } 
                return result
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

        // User
        async addUser(_, {user}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const nuser = new User(user)
                const result = await nuser.save()
                return result
            }
            return null
        },
        async deleteUser(_, {id}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await User.findOneAndRemove({_id: id})
                if(result === null) {
                    throw new Error("Error deleting User")
                } 
                return result
            }
            return null
        },
        async updateUser(_, {id, user}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await User.updateOne({_id: id}, user)
                const updatedValue = await User.findOne({_id: id})
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
                    throw new Error("Error deleting Article")
                }
                return result
            }
            return null
        },
        async updateArticle(_, {id, article}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Article.updateOne({_id: id}, article)
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
                const result = await Complaint.updateOne({_id: id}, complaint)
                const newComplaint = await Complaint.findOne({_id: id})
                return newComplaint
            }
            return null
        },

        // Notification
        async addNotification(_, {notification}, {req}) {
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const notif = new Notification(notification)
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
                    throw new Error("Error deleting Notification")
                }
                return result
            }
            return null
        },
        async updateNotification(_, {id, notification}, {req}) {
            console.log(id)
            console.log(notification)
            const r = checkAdminDetails(getAuthToken(req))
            if(r === true) {
                const result = await Notification.updateOne({_id: id}, notification)
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