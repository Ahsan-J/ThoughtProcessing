import { IBlog } from "../model/blog";

export const sampleBlogs: Array<IBlog> = [
  {
    title: "The Blog",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    content: '# Some limited information about the blog Some limited information about the blog Some limited information about the blog Some limited information about the blog',
    commentsCount: 1,
    deleted_at: null,
    description: "",
    id: "123",
    likes: 1,
    status: 1,
    cover: "https://placehold.co/800x240",
    author: {
      created_at: new Date().toISOString(),
      access_token: "null",
      deleted_at: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      status: 1,
      token_expiry: 1,
      updated_at: new Date().toISOString(),

    }
  },
  {
    title: "The Blog 2",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    content: '# Some limited information about the blog Some limited information about the blog Some limited information about the blog Some limited information about the blog',
    commentsCount: 1,
    deleted_at: null,
    description: "",
    id: "abc",
    likes: 1,
    status: 1,
    cover: "https://placehold.co/800x240",
    author: {
      created_at: new Date().toISOString(),
      access_token: "null",
      deleted_at: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      status: 1,
      token_expiry: 1,
      updated_at: new Date().toISOString(),
    }
  },
  {
    title: "The Blog 3",
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    content: '# Some limited information about the blog Some limited information about the blog Some limited information about the blog Some limited information about the blog',
    commentsCount: 1,
    deleted_at: null,
    description: "",
    id: "xyz",
    likes: 1,
    status: 1,
    cover: "https://placehold.co/800x240",
    author: {
      created_at: new Date().toISOString(),
      access_token: "null",
      deleted_at: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      status: 1,
      token_expiry: 1,
      updated_at: new Date().toISOString(),
    }
  }
];
