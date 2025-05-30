# Softbook

Softbook is a modern social network website designed to connect people, foster meaningful interactions, and build communities. It offers a seamless and user-friendly platform where users can create profiles, share posts, engage with others, and explore a variety of content. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Softbook is optimized for speed, scalability, and a smooth user experience.

## Features

User Profiles

- Users can create profile
- Users can customize their profiles with profile pictures, bio, and personal details.
- Users can delete their profile

Posts and Feeds

- Create text, image, and video posts.
- Engage with other users’ posts through likes, comments, and shares.
- Real-time updates in the feed using Socket.IO.

Friends and Connections

- Send and accept friend requests.
- Follow and unfollow users.
- View mutual friends and recommended connections.

Messaging

- Real-time direct messaging with typing indicators and read receipts.
- Group chats and message history.
- Option to send images and emojis in chats.

Notifications

- Real-time notifications for likes, comments, friend requests, and messages.
- Option to customize notification preferences.

Search and Discovery

- Advanced search to find users, posts, and hashtags.
- Discover trending content and suggested users.

Privacy and Security

- Role-Based Access Control (RBAC) to manage user roles and permissions.
- Secure login and authentication using JWT with refresh tokens.
- Option to block or report users.

Analytics and Insights

- Dashboard for users to track post engagement and profile visits.
- Admin panel to manage user activities and content moderation.

## Tech Stack

- Node.js
- Express.js
- dotenv
- mongoose
- nodemon
- jsonwebtoken
- cloudinary
- bcryptjs

## API Endpoints

Users

- /api/v1/user/create
- /api/v1/user/getall
- /api/v1/user/get/:id
- /api/v1/user/delete/:id
- /api/v1/user/update/:id
- /api/v1/user/logout

Post

- /api/v1/post/create
- /api/v1/post/delete/:id
- /api/v1/post/update/:id
- /api/v1/post/getall
- /api/v1/post/get/:id

-/api/v1/post/:postId/like
-/api/v1/post/:postId/unlike

<!-- -/api/v1/post/:postId/comment/:commentId/like
-/api/v1/post/:postId/comment/:commentId/unlike

-/api/v1/post/:postId/comment (same for create and delete)
-/api/v1/post/:postId/comment/:commentId/reply (same for create and delete) -->

Message

- /api/v1/message/send
- /api/v1/message/unsend:/id
- /api/v1/message/get/:id
- /api/v1/message/getAll
- /api/v1/message/read:/id
- /api/v1/message/delete:/id

## Security Considerations
