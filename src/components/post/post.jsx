import './post.css';

function Post({
    post,
    currUser,
    posts,
    setPosts
}) {
    const deletePost = () => {
        fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE",
        credentials: "include",
        }).then(response => {
            if (response.ok) {
                //to do
            }
        });
    };

    const likePost = () => {
        fetch(`http://localhost:3000/posts/${post.id}/like`, {
        method: "POST",
        credentials: "include"
        }).then(response => {
            if (response.ok) {
                const updatedPosts = posts.map(currPost => {
                    if(currPost.id === post.id) {
                        currPost.likes++;
                    }
                    return currPost;
                })
                setPosts(updatedPosts);
            }
          });
    };

    return (
        <section className='card'>
            <p className='author'>{post.userName}:</p>
            <p>{post.content}</p>
            <div className='post-info'>
                <p>Likes: {post.likes}</p>
                {currUser === post.userName ? <button onClick={deletePost}>Delete</button> : <button onClick={likePost}>Like</button>}
            </div>
        </section>
    )
}

export default Post;