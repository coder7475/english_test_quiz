import { RegisterForm } from "@/modules/auth/RegisterForm";


export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background py-8 px-4">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}