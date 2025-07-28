// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { CalendarDays, Mail, User, KeyRound, Loader } from "lucide-react";
// import axios from "axios";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     email: "",
//     otp: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [loadingOtp, setLoadingOtp] = useState(false);
//   const [loadingSignup, setLoadingSignup] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGetOtp = async (e) => {
//     e.preventDefault();
//     const { name, dob, email } = formData;
//     if (!name || !dob || !email) {
//       toast.error("Please fill all fields before requesting OTP.");
//       return;
//     }

//     try {
//       setLoadingOtp(true);
//       const res = await axios.post("http://localhost:5000/api/auth/signup", {
//         name,
//         dob,
//         email,
//       });
//       setOtpSent(true);
//       toast.success(res.data.message || "OTP sent to your email.");
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to send OTP. Try again."
//       );
//     } finally {
//       setLoadingOtp(false);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, dob, email, otp } = formData;
//     if (!otp) {
//       toast.error("Please enter the OTP to continue.");
//       return;
//     }

//     try {
//       setLoadingSignup(true);
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify",
//         { name, dob, email, otp }
//       );

//       toast.success(res.data.message || "Signup successful! Redirecting...");
//       setTimeout(() => {
//         window.location.href = "/dashboard";
//       }, 1200);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Signup failed. Please try again."
//       );
//     } finally {
//       setLoadingSignup(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <div className="mb-8">
//             <div className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-2">
//               <Loader className="animate-spin" />
//               HD
//             </div>
//             <h2 className="text-3xl font-semibold text-gray-800">Sign up</h2>
//             <p className="text-sm text-gray-500">
//               Sign up to enjoy the features of HD
//             </p>
//           </div>

//           <form
//             onSubmit={otpSent ? handleSignup : handleGetOtp}
//             className="space-y-4"
//           >
//             {/* Name */}
//             <div>
//               <Label htmlFor="name" className="block mb-1 text-sm">
//                 Your Name
//               </Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="Jonas Kahnwald"
//                   className="pl-9"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* DOB */}
//             <div>
//               <Label htmlFor="dob" className="block mb-1 text-sm">
//                 Date of Birth
//               </Label>
//               <div className="relative">
//                 <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//                 <Input
//                   id="dob"
//                   name="dob"
//                   type="date"
//                   className="pl-9"
//                   value={formData.dob}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <Label htmlFor="email" className="block mb-1 text-sm">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="jonas.kahnwald@gmail.com"
//                   className="pl-9"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* OTP */}
//             {otpSent && (
//               <div>
//                 <Label htmlFor="otp" className="block mb-1 text-sm">
//                   OTP
//                 </Label>
//                 <div className="relative">
//                   <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//                   <Input
//                     id="otp"
//                     name="otp"
//                     placeholder="Enter OTP"
//                     className="pl-9"
//                     value={formData.otp}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Submit */}
//             <Button
//               type="submit"
//               disabled={loadingOtp || loadingSignup}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               {loadingOtp || loadingSignup ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Loader className="animate-spin w-4 h-4" />
//                   {otpSent ? "Signing up..." : "Sending OTP..."}
//                 </span>
//               ) : otpSent ? (
//                 "Sign up"
//               ) : (
//                 "Get OTP"
//               )}
//             </Button>
//           </form>

//           <p className="text-sm text-gray-500 mt-4 text-center">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-blue-600 font-medium hover:underline"
//             >
//               Log In
//             </Link>
//           </p>
//         </div>

//         {/* Right Image */}
//         <div className="hidden md:block md:w-1/2 bg-gray-100">
//           <img
//             src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
//             alt="Signup Visual"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalendarDays, Mail, User, KeyRound, Loader } from "lucide-react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    const { name, dob, email } = formData;
    if (!name || !dob || !email) {
      toast.error("Please fill all fields before requesting OTP.");
      return;
    }

    try {
      setLoadingOtp(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        dob,
        email,
      });
      setOtpSent(true);
      toast.success(res.data.message || "OTP sent to your email.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, dob, email, otp } = formData;
    if (!otp) {
      toast.error("Please enter the OTP to continue.");
      return;
    }

    try {
      setLoadingSignup(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        name,
        dob,
        email,
        otp,
      });

      toast.success(res.data.message || "Signup successful! Redirecting...");
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoadingSignup(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub: googleId } = decoded;

      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          name,
          email,
          googleId,
        }
      );

      toast.success("Google login successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google sign in failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <div className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-2">
              <Loader className="animate-spin" />
              HD
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">Sign up</h2>
            <p className="text-sm text-gray-500">
              Sign up to enjoy the features of HD
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={loadingOtp || loadingSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loadingOtp || loadingSignup ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin w-4 h-4" />
                  {otpSent ? "Signing up..." : "Sending OTP..."}
                </span>
              ) : otpSent ? (
                "Sign up"
              ) : (
                "Get OTP"
              )}
            </Button>
          </form>

          {/* Google Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">or continue with</p>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
          </div>

          {/* Already registered */}
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
