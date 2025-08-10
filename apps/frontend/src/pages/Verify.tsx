import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  
const email = typeof location.state === "string"
  ? location.state
  : location.state?.email;
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);
  const maxResendAttempts = 3;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Helper function to extract error message
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string => {
    if (error?.data?.message) return error.data.message;
    if (error?.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
  };

  // Helper function to check if email is valid
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    // Validate email before sending OTP
    if (!email) {
      toast.error("Email address is required");
      navigate("/");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please provide a valid email address");
      navigate("/");
      return;
    }

    // Check resend attempts limit
    if (resendAttempts >= maxResendAttempts) {
      toast.error(`Maximum resend attempts (${maxResendAttempts}) reached. Please try again later.`);
      return;
    }

    const toastId = toast.loading("Sending OTP...");
    
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP sent successfully to your email", { id: toastId });
        setConfirmed(true);
        setTimer(60); // Reset to 60 seconds for better UX
        setResendAttempts(prev => prev + 1);
        
        // Clear any previous form errors
        form.clearErrors();
        form.reset({ pin: "" });
      } else {
        toast.error(res.message || "Failed to send OTP", { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Send OTP Error:", error);
      const errorMessage = getErrorMessage(error);
      
      // Handle specific error cases
      if (error?.status === 429) {
        toast.error("Too many requests. Please wait before trying again.", { id: toastId });
      } else if (error?.status === 400) {
        toast.error("Invalid email address or request", { id: toastId });
      } else if (error?.status === 500) {
        toast.error("Server error. Please try again later.", { id: toastId });
      } else if (error?.status === 'FETCH_ERROR') {
        toast.error("Network error. Please check your connection.", { id: toastId });
      } else {
        toast.error(errorMessage, { id: toastId });
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // Validate form data
    if (!data.pin || data.pin.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email address is missing. Please start over.");
      navigate("/");
      return;
    }

    const toastId = toast.loading("Verifying OTP...");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      
      if (res.success) {
        toast.success("OTP verified successfully!", { id: toastId });
        
        // Store verified email in localStorage for future checks
        const verifiedEmails = JSON.parse(localStorage.getItem('verifiedEmails') || '[]');
        if (!verifiedEmails.includes(email)) {
          verifiedEmails.push(email);
          localStorage.setItem('verifiedEmails', JSON.stringify(verifiedEmails));
        }
        
        setConfirmed(true);
        
        // Small delay for better UX before navigation
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: "Email verified successfully. You can now log in.",
              email: email 
            } 
          });
        }, 1000);
      } else {
        toast.error(res.message || "OTP verification failed", { id: toastId });
        form.setError("pin", { 
          type: "manual", 
          message: res.message || "Invalid OTP. Please try again." 
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      const errorMessage = getErrorMessage(error);
      
      // Handle specific error cases
      if (error?.status === 400) {
        toast.error("Invalid or expired OTP", { id: toastId });
        form.setError("pin", { 
          type: "manual", 
          message: "Invalid or expired OTP. Please try again." 
        });
      } else if (error?.status === 429) {
        toast.error("Too many verification attempts. Please wait.", { id: toastId });
      } else if (error?.status === 500) {
        toast.error("Server error. Please try again later.", { id: toastId });
      } else if (error?.status === 'FETCH_ERROR') {
        toast.error("Network error. Please check your connection.", { id: toastId });
      } else {
        toast.error(errorMessage, { id: toastId });
        form.setError("pin", { 
          type: "manual", 
          message: "Verification failed. Please try again." 
        });
      }
    }
  };

  // Check if user is already verified and redirect if no email is provided
  useEffect(() => {
    if (!email) {
      toast.error("Email address is required for verification");
      navigate("/");
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error("Invalid email address provided");
      navigate("/");
      return;
    }

    // Check if user is already verified by making an API call or checking localStorage
    const checkVerificationStatus = async () => {
      try {    
        if (location.state?.isAlreadyVerified) {
          toast.info("Email is already verified");
          navigate("/login", { 
            state: { 
              message: "Your email is already verified. Please log in.",
              email: email 
            } 
          });
          return;
        }
      } catch (error) {
        // If verification check fails, continue with normal flow
        console.log("Could not check verification status:", error);
      }
    };

    checkVerificationStatus();
  }, [email, navigate, location.state]);

  // Timer effect with error handling
  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    if (timer <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev > 0 ? prev - 1 : 0;
        return newTimer;
      });
    }, 1000);

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [email, confirmed, timer]);

  // Show loading state or error if email is invalid
  if (!email) {
    return (
      <div className="grid place-content-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Error</CardTitle>
            <CardDescription>
              Email address is required for verification. Redirecting...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br /> 
              <span className="font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP 
                          maxLength={6} 
                          {...field}
                          disabled={isVerifyingOtp}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0 || isSendingOtp || resendAttempts >= maxResendAttempts}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0 && !isSendingOtp && resendAttempts < maxResendAttempts,
                            "text-gray-500 font-semibold": timer !== 0 || isSendingOtp || resendAttempts >= maxResendAttempts,
                          })}
                        >
                          {isSendingOtp 
                            ? "Sending..." 
                            : resendAttempts >= maxResendAttempts 
                              ? "Max attempts reached" 
                              : "Resend OTP"
                          }{" "}
                        </Button>
                        {timer > 0 && <span>in {timer}s</span>}
                        {resendAttempts >= maxResendAttempts && (
                          <p className="text-xs text-red-500 mt-1">
                            Maximum resend attempts reached. Please try again later.
                          </p>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              form="otp-form" 
              type="submit"
              disabled={isVerifyingOtp || !form.watch("pin") || form.watch("pin").length !== 6}
            >
              {isVerifyingOtp ? "Verifying..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> 
              <span className="font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSendOtp} 
              className="w-[300px]"
              disabled={isSendingOtp}
            >
              {isSendingOtp ? "Sending..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}