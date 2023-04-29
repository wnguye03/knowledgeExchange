import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    //title of document
    title: String, 
    // name of course
    courseName: String,
    //name of school
    school: String,
    //content -> notes or essays or whatever
    content: String,
    //tags of related information
    tags: [String],
    //uploaded file converted to a string
    selectedFile: String,

    comments: {
        type: [String],
        default:[]
    },
    //date of creation
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;