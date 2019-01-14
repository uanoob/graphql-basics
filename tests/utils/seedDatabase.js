import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'red',
    email: 'red@icloud.com',
    password: bcrypt.hashSync('red@icloud.com'),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: 'black',
    email: 'black@icloud.com',
    password: bcrypt.hashSync('black@icloud.com'),
  },
  user: undefined,
  jwt: undefined,
};

const postOne = {
  input: {
    title: 'Published post 1',
    body: '...',
    published: true,
  },
  post: undefined,
};

const postTwo = {
  input: {
    title: 'Published post 2',
    body: '...',
    published: true,
  },
  post: undefined,
};

const commentOne = {
  input: {
    text: 'Comment from userOne',
  },
  comment: undefined,
};

const commentTwo = {
  input: {
    text: 'Comment from userTwo',
  },
  comment: undefined,
};

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_KEY);
  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_KEY);
  // Create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
  // Create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
    },
  });
  // Create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
      post: {
        connect: {
          id: postTwo.post.id,
        },
      },
    },
  });
  // Create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
    },
  });
};

export {
  seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo,
};
