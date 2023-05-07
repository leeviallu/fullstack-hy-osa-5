const BlogForm = ({
    addBlog, newBlogTitle, handeNewBlogTitleChange, newBlogAuthor, handeNewBlogAuthorChange, newBlogUrl, handeNewBlogUrlChange
}) => (
    <form onSubmit={addBlog}>
        title:
        <input
        value={newBlogTitle}
        onChange={handeNewBlogTitleChange}
        />
        <br />
        author:
        <input
        value={newBlogAuthor}
        onChange={handeNewBlogAuthorChange}
        />
        <br />
        url:
        <input
        value={newBlogUrl}
        onChange={handeNewBlogUrlChange}
        />
        <br />
        <button type="submit">save</button>
    </form>  
)

export default BlogForm