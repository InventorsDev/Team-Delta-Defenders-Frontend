import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import AuthLayout from "@/components/auth/AuthLayout";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login logic
      console.log("Login data:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your AgriLink account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="h-12"
                    style={{ fontFamily: 'MadaniArabic-Medium' }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 pr-12"
                      style={{ fontFamily: 'MadaniArabic-Medium' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-[hsl(var(--brand-colors-SproutGreen))] hover:underline"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[hsl(var(--brand-colors-SproutGreen))] hover:bg-[hsl(var(--brand-colors-SoilBlush))] text-white font-bold rounded-lg transition-colors"
            style={{ fontFamily: 'MadaniArabic-Bold' }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center">
            <p className="text-gray-600" style={{ fontFamily: 'MadaniArabic-Medium' }}>
              Don't have an account?{" "}
              <Link
                to="/farmers-signup"
                className="text-[hsl(var(--brand-colors-SproutGreen))] hover:underline font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;