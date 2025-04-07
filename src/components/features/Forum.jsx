import { useState, useEffect } from 'react';
import { FaUser, FaComment, FaHeart, FaClock, FaPlus, FaSearch } from 'react-icons/fa';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Simulate fetching posts from API
    const mockPosts = [
      {
        id: 1,
        title: 'Tips for staying active in your 70s',
        content: 'I recently turned 72 and wanted to share some tips that have helped me stay active and healthy. First, I make sure to walk at least 30 minutes every day, even if it\'s just around my neighborhood. Second, I joined a senior yoga class that meets twice a week - it\'s been amazing for my flexibility and balance. Third, I try to do some light weight training to maintain muscle mass. What activities do you all enjoy?',
        author: 'Margaret Wilson',
        date: '2 days ago',
        category: 'health',
        likes: 24,
        comments: [
          { id: 1, author: 'Robert Johnson', content: 'Swimming has been great for me! Low impact and good for the joints.', date: '1 day ago' },
          { id: 2, author: 'Elizabeth Brown', content: 'I love gardening. It keeps me active and I get fresh vegetables too!', date: '1 day ago' },
          { id: 3, author: 'Thomas Davis', content: 'Dancing is my favorite activity. I go to a senior ballroom dancing class every week.', date: '12 hours ago' }
        ]
      },
      {
        id: 2,
        title: 'Favorite books to read this season',
        content: 'I\'ve been reading more since retirement and would love to share some recommendations. I just finished "The Thursday Murder Club" by Richard Osman and thoroughly enjoyed it. It\'s about a group of seniors who solve crimes! What books have you all been enjoying lately?',
        author: 'James Smith',
        date: '3 days ago',
        category: 'hobbies',
        likes: 18,
        comments: [
          { id: 1, author: 'Patricia Miller', content: 'I loved that book too! Have you tried "Anxious People" by Fredrik Backman?', date: '2 days ago' },
          { id: 2, author: 'William Taylor', content: 'I\'ve been enjoying historical fiction. "The Nightingale" by Kristin Hannah was excellent.', date: '1 day ago' }
        ]
      },
      {
        id: 3,
        title: 'Technology help needed - smartphone confusion',
        content: 'I recently got a new smartphone and I\'m finding it quite confusing to use. The screen is so sensitive and I keep accidentally opening apps I don\'t want to. Does anyone have tips for making smartphones easier to use for seniors? Are there any settings I should change?',
        author: 'Dorothy Anderson',
        date: '1 week ago',
        category: 'technology',
        likes: 32,
        comments: [
          { id: 1, author: 'Michael Chen', content: 'Try going to Settings > Accessibility and look for "Touch Accommodations" or similar options. You can adjust the sensitivity there.', date: '6 days ago' },
          { id: 2, author: 'Susan Wilson', content: 'There are also phone cases designed for seniors that make the phone easier to grip and less sensitive to accidental touches.', date: '5 days ago' },
          { id: 3, author: 'John Davis', content: 'Many libraries offer free technology classes for seniors. That\'s how I learned to use my smartphone!', date: '3 days ago' },
          { id: 4, author: 'Barbara Johnson', content: 'You might want to try a stylus pen. It gives you more precision than using your fingers.', date: '2 days ago' }
        ]
      },
      {
        id: 4,
        title: 'Recipe exchange: easy and nutritious meals',
        content: 'Cooking for one or two can sometimes feel like a chore. I\'d love to exchange some simple, nutritious recipes with fellow seniors. One of my go-to meals is a Mediterranean chickpea salad: chickpeas, cucumber, tomato, feta cheese, olive oil, and lemon juice. It\'s healthy, no cooking required, and lasts for days in the fridge. What are your favorite easy recipes?',
        author: 'Helen Martinez',
        date: '5 days ago',
        category: 'food',
        likes: 29,
        comments: [
          { id: 1, author: 'Richard Wilson', content: 'I make a big batch of soup every Sunday and freeze portions for the week. My favorite is butternut squash soup.', date: '4 days ago' },
          { id: 2, author: 'Mary Thompson', content: 'Omelettes are my go-to quick meal. You can add whatever vegetables you have on hand.', date: '3 days ago' }
        ]
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const handlePostClick = (post) => {
    setActivePost(post);
    window.scrollTo(0, 0);
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the post to a backend API
    const newPostObj = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: JSON.parse(localStorage.getItem('user'))?.name || 'Anonymous',
      date: 'Just now',
      category: 'general',
      likes: 0,
      comments: []
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost({ title: '', content: '' });
    setActivePost(newPostObj);
    
    // Close the new post form
    document.getElementById('newPostModal').style.display = 'none';
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (newComment.trim() === '') return;
    
    // In a real app, this would send the comment to a backend API
    const newCommentObj = {
      id: activePost.comments.length + 1,
      author: JSON.parse(localStorage.getItem('user'))?.name || 'Anonymous',
      content: newComment,
      date: 'Just now'
    };
    
    const updatedPost = {
      ...activePost,
      comments: [...activePost.comments, newCommentObj]
    };
    
    setActivePost(updatedPost);
    
    // Update the post in the posts array
    const updatedPosts = posts.map(post => 
      post.id === activePost.id ? updatedPost : post
    );
    
    setPosts(updatedPosts);
    setNewComment('');
  };

  const handleLikePost = (postId) => {
    // In a real app, this would send the like to a backend API
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    
    setPosts(updatedPosts);
    
    if (activePost && activePost.id === postId) {
      setActivePost({ ...activePost, likes: activePost.likes + 1 });
    }
  };

  const openNewPostModal = () => {
    document.getElementById('newPostModal').style.display = 'block';
  };

  const closeNewPostModal = () => {
    document.getElementById('newPostModal').style.display = 'none';
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="forum-container">
      <h1 className="feature-title">Community Forum</h1>
      <p className="feature-description">
        Connect with other seniors, share experiences, and ask questions in our community forum.
      </p>
      
      <div className="forum-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="btn-primary new-post-btn" onClick={openNewPostModal}>
          <FaPlus /> New Discussion
        </button>
      </div>
      
      <div className="forum-categories">
        <button 
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Topics
        </button>
        <button 
          className={`category-btn ${activeCategory === 'health' ? 'active' : ''}`}
          onClick={() => setActiveCategory('health')}
        >
          Health & Wellness
        </button>
        <button 
          className={`category-btn ${activeCategory === 'technology' ? 'active' : ''}`}
          onClick={() => setActiveCategory('technology')}
        >
          Technology
        </button>
        <button 
          className={`category-btn ${activeCategory === 'hobbies' ? 'active' : ''}`}
          onClick={() => setActiveCategory('hobbies')}
        >
          Hobbies
        </button>
        <button 
          className={`category-btn ${activeCategory === 'food' ? 'active' : ''}`}
          onClick={() => setActiveCategory('food')}
        >
          Food & Recipes
        </button>
      </div>
      
      <div className="forum-content">
        {activePost ? (
          <div className="post-detail">
            <button 
              className="back-btn"
              onClick={() => setActivePost(null)}
            >
              Back to Discussions
            </button>
            
            <div className="post-header">
              <h2>{activePost.title}</h2>
              <div className="post-meta">
                <span className="post-author">
                  <FaUser /> {activePost.author}
                </span>
                <span className="post-date">
                  <FaClock /> {activePost.date}
                </span>
                <span className="post-category">
                  {activePost.category}
                </span>
              </div>
            </div>
            
            <div className="post-body">
              <p>{activePost.content}</p>
            </div>
            
            <div className="post-actions">
              <button 
                className="like-btn"
                onClick={() => handleLikePost(activePost.id)}
              >
                <FaHeart /> {activePost.likes} Likes
              </button>
              <span className="comment-count">
                <FaComment /> {activePost.comments.length} Comments
              </span>
            </div>
            
            <div className="comments-section">
              <h3>Comments</h3>
              
              {activePost.comments.length > 0 ? (
                <div className="comments-list">
                  {activePost.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">
                          <FaUser /> {comment.author}
                        </span>
                        <span className="comment-date">
                          <FaClock /> {comment.date}
                        </span>
                      </div>
                      <div className="comment-body">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}
              
              <form className="comment-form" onSubmit={handleSubmitComment}>
                <textarea 
                  placeholder="Write a comment..." 
                  value={newComment}
                  onChange={handleCommentChange}
                  required
                ></textarea>
                <button type="submit" className="btn-primary">Post Comment</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="posts-list">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-meta">
                    <span className="post-author">
                      <FaUser /> {post.author}
                    </span>
                    <span className="post-date">
                      <FaClock /> {post.date}
                    </span>
                    <span className="post-category">
                      {post.category}
                    </span>
                  </div>
                  <p className="post-excerpt">
                    {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                  </p>
                  <div className="post-footer">
                    <span className="post-likes">
                      <FaHeart /> {post.likes} Likes
                    </span>
                    <span className="post-comments">
                      <FaComment /> {post.comments.length} Comments
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-posts">
                <p>No discussions found matching your criteria.</p>
                <button className="btn-primary" onClick={openNewPostModal}>
                  Start a New Discussion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* New Post Modal */}
      <div id="newPostModal" className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={closeNewPostModal}>&times;</span>
          <h2>Start a New Discussion</h2>
          
          <form onSubmit={handleSubmitPost}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="form-control"
                placeholder="Enter a title for your discussion"
                value={newPost.title}
                onChange={handleNewPostChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea 
                id="content" 
                name="content" 
                className="form-control"
                rows="6"
                placeholder="Share your thoughts, questions, or experiences..."
                value={newPost.content}
                onChange={handleNewPostChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary">Post Discussion</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forum;