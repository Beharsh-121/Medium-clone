import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@ashhru123/medium-package";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();



userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = signupInput.safeParse(body);

  if (!result.success) {
    c.status(411);
    console.log(result.error.message);
    return c.json({
      error: "Invalid Inputs \nPlease check the length of Email OR Password ",
    });
  }


  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userExists) {
    c.status(403);
    return c.json({ error: "User already exists" });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  console.log(token);
  
  return c.json({
    jwt: token,
  });
});



userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const result = signinInput.safeParse(body);
  if (!result.success) {
    c.status(411);
    return c.json({ error: "invalid input", err: result.error });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  console.log(jwt);
  
  return c.json({ jwt });
});

