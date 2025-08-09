
import { RegisterForm } from "@/modules/auth/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="flex items-center flex-1 justify-center">
    
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <image href="/logo.svg" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}