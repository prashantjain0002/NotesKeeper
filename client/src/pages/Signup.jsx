import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalendarDays, Mail, User, KeyRound, Loader } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    const { name, dob, email } = formData;
    if (!name || !dob || !email) {
      toast.error("Please fill all fields before requesting OTP.");
      return;
    }

    setOtpSent(true);
    toast.success("OTP sent to your email.");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast.error("Please enter the OTP to continue.");
      return;
    }

    toast.success("Signup successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <div className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-2">
              <Loader />
              HD
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">Sign up</h2>
            <p className="text-sm text-gray-500">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          <form
            onSubmit={otpSent ? handleSignup : handleGetOtp}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <Label htmlFor="name" className="block mb-1 text-sm">
                Your Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jonas Kahnwald"
                  className="pl-9"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* DOB */}
            <div>
              <Label htmlFor="dob" className="block mb-1 text-sm">
                Date of Birth
              </Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  className="pl-9"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block mb-1 text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jonas.kahnwald@gmail.com"
                  className="pl-9"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* OTP */}
            {otpSent && (
              <div>
                <Label htmlFor="otp" className="block mb-1 text-sm">
                  OTP
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP"
                    className="pl-9"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {otpSent ? "Sign up" : "Get OTP"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100">
          <img
            src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
