import { createBlogInput, updateBlogInput } from "@ashhru123/medium-package";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();



blogRouter.post("/", async (c) => {//api/v1/blog POST
  const userId = c.get("userId");//get userId set by middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json(); //title, content\\
  const result = createBlogInput.safeParse(body);

  if (!result.success) {
    c.status(411);
    return c.json({ error: "invalid input", err: result.error });
  }


  const author = await prisma.user.findUnique({//find author in db
    where: {
      id: userId,
    },
  });

  if (!author) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const authorName = author?.name || "unknown";
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
      authorName: authorName,
    },
  });

  console.log(post);
  return c.json({
    id: post.id,
  });
});



blogRouter.put("/", async (c) => {//api/v1/blog  PUT
  // const userId = c.get("userId");//get userId set by middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json(); //id, title, content
  const result = updateBlogInput.safeParse(body);


  if (!result.success) {
    c.status(411);
    return c.json({ error: "invalid input", err: result.error });
  }

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  console.log(post);
  return c.json({id: body.id});
});



blogRouter.get("/:id", async (c) => {//api/v1/blog/id GET
  // const userId = c.get("userId");//get userId set by middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  console.log(id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  console.log(post);
  return c.json(post);
});



blogRouter.get("/", async (c) => {//api/v1/blog  GET
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany();
  return c.json(posts);
});



blogRouter.get("/profile/me", async (c) => {//api/v1/blog GET

  const userId = c.get("userId");//get userId set by middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "User not found. Please logout and login again.",
      });
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    console.log("🎲🎲🎲 blogRouter.get => posts:", posts);
    console.log("🎲🎲🎲 ~ blogRouter.get => user:", user);

    return c.json({
      user,
      posts,
    });
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    c.status(500);
    return c.json({ error: "Internal server error." });
  }
});

// {
//     "id": "0aa7d5a5-2150-4a8f-a481-6eefaa8ce2e2",
//     "title": "Updated Title 2",
//     "content": "Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 ",
//     "published": false,
//     "authorId": "45b5fbb9-0987-4d38-87ea-318e66ff4a8b"
// }
