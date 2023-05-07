const BlogList = ({blogs}) => (
    <div>
      {blogs.map((blog, i) =>
        <div key={i}>
            {blog.title} {blog.author}
        </div> 
      )}
    </div>
)
export default BlogList;