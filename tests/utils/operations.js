import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

const getMyPosts = gql`
  query {
    myPosts {
      id
      title
      body
      published
    }
  }
`;

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`;

const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
    }
  }
`;

const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      body
      published
    }
  }
`;

const getComments = gql`
  query {
    comments {
      id
      text
    }
  }
`;

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;

export {
  createUser,
  getProfile,
  getUsers,
  login,
  getPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
  getComments,
  deleteComment,
};
