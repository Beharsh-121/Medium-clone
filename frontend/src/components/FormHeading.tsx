import { Link } from "react-router-dom";

function FormHeading({ type }: { type: "signup" | "signin" }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {type === "signup" ? "Create a new account" : "Sign in to your account"}
      </h1>
      <p className="mt-4">
        {type === "signup"
          ? "Already have an account? "
          : "Don't have an account? "}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className="text-purple-800 font-semibold"
        >
          {type === "signup" ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
export default FormHeading;
