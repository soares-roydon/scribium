1. User routes
   /api/user/signin
   /api/user/signup
   /api/user/me

2. Blog routes
   GET /api/blogs
   GET /api/blogs/:slug

POST /api/blogs

3. Blog interactions

POST /api/blogs/:slug/likes
POST /api/blogs/:slug/comments

4. User interactions
   GET /api/user/following/count
   GET /api/user/followers/count
   GET /api/user/following
   GET /api/user/followers

POST /api/user/follow
