import { Hono } from "hono";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { verify } from "hono/jwt";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("/*", cors());


//Middleware logic for all the blog routes, checks for token
app.use("/api/v1/blog/*", async (c, next) => {

  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  
  const token = jwt.split(" ")[1];
  const verified = await verify(token, c.env.JWT_SECRET);


  if (!verified) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  console.log("Middleware Success");

  c.set("userId", verified.id);
  await next();
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;