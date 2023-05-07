import { useState } from "react"
const Blog = ({blog, updateBlog}) => {
    const [showAllInfo, setShowAllInfo] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    
    const addBlogLikes = (event) => {
        event.preventDefault()
        const addLike = blog.likes + 1;
        updateBlog(blog.id,
            {
                ...blog,
                likes: addLike,
            }
        )
    }
    return (
        <div>
            { !showAllInfo ?
                <div style={blogStyle}>
                    {blog.title} {blog.author}
                    <button onClick={() => setShowAllInfo(true)}>show</button>
                </div> 
                :
                <div style={blogStyle}>
                    {blog.title}
                    <br/>
                    {blog.author}
                    <br/>
                    {blog.url}
                    <br/>
                    {blog.likes}
                    <button onClick={addBlogLikes}>like</button>
                    <br />
                    <button onClick={() => setShowAllInfo(false)}>hide</button>
                </div> 
            }
        </div>
    )
}
export default Blog