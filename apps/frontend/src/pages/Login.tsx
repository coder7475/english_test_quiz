import { LoginForm } from "@/modules/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center flex-1 justify-center">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      
    </div>
  );
}