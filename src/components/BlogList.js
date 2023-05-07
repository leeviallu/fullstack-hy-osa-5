import Blog from './Blog'
const BlogList = ({blogs}) => (
    <div>
      {blogs.map((blog, i) =>
        <Blog key={i} blog={blog}/>
      )}
    </div>
)
export default BlogList;