import { IBlog } from "../model/blog";

export const sampleBlogs: Array<IBlog> = [
  {
    title: "The Blog",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    content: `

    # This section have all the function that are used all over the application.
    ## Want to Learn

    To learn more about Next.js, take a look at the following resources:

    - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
    - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
    - To document this README.md, You can refer to [this guide](https://www.markdownguide.org/cheat-sheet/) to learn more about markdown.
    - [i18next](https://www.i18next.com) is a simple framework that provide us with a complete solution to localize the application.
    - [Playwright](https://playwright.dev/docs/intro) enables reliable end-to-end testing for modern web apps. We are using Playwright for End to End testing of Module, Pages or a feature flow.
    - [Jest](https://jestjs.io/docs/getting-started) is a delightful JavaScript Testing Framework with a focus on simplicity. No component or page can be complete without using it.
    - [Storybook](https://storybook.js.org/docs/react/get-started/introduction) is a frontend workshop for building UI components and pages in isolation. We are using storybook to document and everything in isolation.`,
    comments: 1,
    deletedAt: null,
    description: "",
    id: "123",
    likes: 1,
    cover: "https://placehold.co/800x740",
    author: {
      createdAt: new Date().toISOString(),
      access_token: "null",
      deletedAt: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      token_expiry: 1,
      updatedAt: new Date().toISOString(),
    }
  },
  {
    title: "The Blog 2",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    content: '# Some limited information about the blog Some limited information about the blog Some limited information about the blog Some limited information about the blog',
    comments: 1,
    deletedAt: null,
    description: "",
    id: "abc",
    likes: 1,
    cover: "https://placehold.co/800x540",
    author: {
      createdAt: new Date().toISOString(),
      access_token: "null",
      deletedAt: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      token_expiry: 1,
      updatedAt: new Date().toISOString(),
    }
  },
  {
    title: "The Blog 3",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    content: '# Some limited information about the blog Some limited information about the blog Some limited information about the blog Some limited information about the blog',
    deletedAt: null,
    description: "",
    id: "xyz",
    likes: 1,
    comments: 1,
    cover: "https://placehold.co/800x240",
    author: {
      createdAt: new Date().toISOString(),
      access_token: "null",
      deletedAt: null,
      email: "abc123@gmail.com",
      id: "123",
      linkedin: "123",
      name: "abc123",
      profile: "https://placehold.co/96",
      role: 1,
      token_expiry: 1,
      updatedAt: new Date().toISOString(),
    }
  }
];
