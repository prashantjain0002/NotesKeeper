import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader, Mail } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    rememberMe: false,
  });

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoadingLogin(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        email: formData.email,
        otp: formData.otp,
      });

      const { token, user } = res.data;

      console.log(res.data);
      

      // Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Logged in successfully.");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "OTP verification failed. Try again."
      );
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleResend = async () => {
    if (!formData.email) {
      toast.error("Enter your email to receive OTP.");
      return;
    }

    try {
      setLoadingOtp(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
      });
      toast.success(res.data.message || "OTP sent.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <div className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-2">
              <Loader />
              HD
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              Log in
            </h2>
            <p className="text-sm text-gray-500">
              Please login to continue to your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="block mb-1 text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>

            {/* OTP */}
            <div>
              <Label htmlFor="otp" className="block mb-1 text-sm">
                OTP
              </Label>
              <div className="relative">
                <Input
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="pr-[6.5rem]"
                />
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loadingOtp}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline font-medium"
                >
                  {loadingOtp ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: !!checked,
                  }))
                }
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="rememberMe" className="text-sm">
                Keep me logged in
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loadingLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loadingLogin ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100">
          <img
            src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
