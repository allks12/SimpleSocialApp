import { useState } from 'react';
import './App.css';
import Form from './components/form/form';
import Post from './components/post/post';

function App() {
  const [currUser, setCurrUser] = useState("");
  const [posts, setPosts] = useState([]);

  const register = (event) => {
    const form = event.target;
    event.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: form.inputValue.value
      })
    }).then(response => {
      if (response.ok) {
        login(event);
      }
    })
  };

  const login = (event) => {
    const form = event.target;
    event.preventDefault();
    const userName = form.inputValue.value;
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: userName
      })
    }).then(response => {
      if (response.ok) {
        setCurrUser(userName);
        fetchPosts();
      }
    });
    form.reset();
  };

  const logout = () => {
    if (!currUser) return;
    fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    }).then(response => {
      if (response.ok) {
        setCurrUser("");
        setPosts([]);
      }
    });
  };

  const makePost = (event) => {
    const form = event.target;
    event.preventDefault();
    const postContent = form.inputValue.value;
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: postContent
      })
    }).then(response => {
      if (response.ok) {
          return response.json()
      }
    }).then(post => {
      if(post) {
          setPosts([...posts, {...post, likes:0, userName: currUser}])
      }
    });
    form.reset();
  };

  const fetchPosts = () => {
    fetch("http://localhost:3000/posts", {
      credentials: "include"
    }).then(response => response.json()).then(data => {
      if (data) {
        setPosts(data);
      }
    });
  };

  return (
    <div className="App">
      <header>
        <p>{currUser}</p>
        <h1>Simple Social App</h1>
      </header>
      <Form formName="Register" onSubmit={register} placeholder="Enter your name..."/>
      <Form formName="Login" onSubmit={login} placeholder="Enter your name..."/>
      <button className='logout-btn' disabled={currUser === ""} onClick={logout}>Logout</button>
      <Form formName="Create post" onSubmit={makePost} placeholder="Enter post's text..."/>
      <main>
        {
          posts.map(post => {
            return (
              <Post posts={posts} setPosts={setPosts} currUser={currUser} post={post} key={post.id}/>
            )
          })
        }
      </main>
    </div>
  );
}

export default App;
