// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { signupUser } from '../redux/slices/authSlice';
// import type { RootState, AppDispatch } from '../redux/store'; // Import AppDispatch

// const Signup: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch<AppDispatch>(); // Type your dispatch
//   const { user, loading, error } = useSelector((state: RootState) => state.auth);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(signupUser({ name, email, password }));
//   };

//   useEffect(() => {
//     if (user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? 'Signing up...' : 'Sign Up'}
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && <p className="text-red-500 text-center text-sm mt-4">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;





// import React, { useState, useEffect } from 'react';

// const Signup: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     // Simulate API call
//     setTimeout(() => {
//       if (email && password && name) {
//         setSuccess(true);
//         setLoading(false);
//         console.log('Signup successful:', { name, email, password });
//       } else {
//         setError('Please fill in all fields');
//         setLoading(false);
//       }
//     }, 1000);
//   };

//   const handleLoginClick = () => {
//     console.log('Navigate to login page');
//   };

//   return (
//     <div 
//       className="min-h-screen relative"
//       style={{
//         background: `linear-gradient(135deg, 
//           rgba(20, 30, 25, 0.95) 0%, 
//           rgba(30, 45, 35, 0.9) 50%, 
//           rgba(40, 60, 45, 0.85) 100%),
//           url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="ivy" patternUnits="userSpaceOnUse" width="20" height="20"><path d="M10 2c-2 4-6 6-8 10 2 2 6 0 8 4 2-4 6-2 8-6-2-2-6 0-8-8z" fill="%23355e3b" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23ivy)"/></svg>')`,
//         backgroundSize: 'cover, 40px 40px'
//       }}
//     >
//       {/* Header */}
//       <header className="flex justify-between items-center p-6">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
//             <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z"/>
//             </svg>
//           </div>
//           <div>
//             <h1 className="text-white text-xl font-semibold">levitation</h1>
//             <p className="text-white/70 text-sm">infotech</p>
//           </div>
//         </div>
//         <button 
//           className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-2 rounded-lg transition-colors"
//           onClick={handleLoginClick}
//         >
//           Login
//         </button>
//       </header>

//       {/* Main Content */}
//       <div className="flex items-center justify-center px-6 py-12">
//         <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Side - Form */}
//           <div className="max-w-md">
//             <div className="mb-8">
//               <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//                 Sign up to begin journey
//               </h2>
//               <p className="text-white/70 text-lg">
//                 This is basic signup page which is used for levitation assignment purpose.
//               </p>
//             </div>

//             <div onSubmit={handleSubmit} className="space-y-6">
//               {/* Name Input */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Enter your name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Email ID"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
//                   required
//                 />
//                 <p className="text-white/50 text-sm mt-2">This name will be displayed with your inquiry</p>
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter Email ID"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
//                   required
//                 />
//                 <p className="text-white/50 text-sm mt-2">This email will be displayed with your inquiry</p>
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label className="block text-white text-sm font-medium mb-2">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter the Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
//                   required
//                 />
//                 <p className="text-white/50 text-sm mt-2">Any further updates will be forwarded on this Email ID</p>
//               </div>

//               {/* Submit Button and Login Link */}
//               <div className="flex items-center justify-between pt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {loading ? 'Registering...' : 'Register'}
//                 </button>
//                 <button
//                   type="button"
//                   className="text-white/70 hover:text-white transition-colors"
//                   onClick={handleLoginClick}
//                 >
//                   Already have account?
//                 </button>
//               </div>

//               {/* Success Message */}
//               {success && (
//                 <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mt-4">
//                   <p className="text-green-300 text-sm">Registration successful! Welcome to Levitation!</p>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mt-4">
//                   <p className="text-red-300 text-sm">{error}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Billboard */}
//           <div className="hidden lg:block">
//             <div className="relative">
//               {/* Billboard Background */}
//               <div 
//                 className="bg-lime-200 rounded-2xl p-12 shadow-2xl relative overflow-hidden"
//                 style={{
//                   background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
//                   minHeight: '500px'
//                 }}
//               >
//                 {/* Decorative Elements */}
//                 <div className="absolute top-0 left-0 w-full h-20 opacity-30"
//                      style={{
//                        background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0 10c20-5 40 5 60 0s40-5 60 0v10H0z" fill="%23355e3b"/></svg>')`,
//                        backgroundRepeat: 'repeat-x'
//                      }}>
//                 </div>

//                 {/* Main Text */}
//                 <div className="relative z-10 pt-8">
//                   <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
//                     Connecting People
//                   </h3>
//                   <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
//                     With Technology
//                   </h3>
                  
//                   <div className="space-y-2 text-gray-700 mb-8">
//                     <p className="text-sm">SOFTWARE DEVELOPMENT | ERP | CRM SERVICES</p>
//                     <p className="text-sm">UX DESIGN | SECURITY</p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-gray-600 text-sm mb-1">End to End Software</p>
//                     <p className="text-gray-600 text-sm">Development Company</p>
//                   </div>
//                 </div>

//                 {/* Levitation Logo */}
//                 <div className="absolute bottom-8 right-8 flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-gray-800 font-semibold text-sm">levitation</p>
//                     <p className="text-gray-600 text-xs">infotech</p>
//                   </div>
//                 </div>

//                 {/* Brick Pattern at Bottom */}
//                 <div className="absolute bottom-0 left-0 right-0 h-16"
//                      style={{
//                        background: `repeating-linear-gradient(
//                          90deg,
//                          #8b4513 0px,
//                          #8b4513 2px,
//                          #a0522d 2px,
//                          #a0522d 20px,
//                          #8b4513 20px,
//                          #8b4513 22px
//                        ), repeating-linear-gradient(
//                          0deg,
//                          #8b4513 0px,
//                          #8b4513 1px,
//                          #a0522d 1px,
//                          #a0522d 8px
//                        )`
//                      }}>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



















import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, 
          rgba(20, 30, 25, 0.95) 0%, 
          rgba(30, 45, 35, 0.9) 50%, 
          rgba(40, 60, 45, 0.85) 100%),
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="ivy" patternUnits="userSpaceOnUse" width="20" height="20"><path d="M10 2c-2 4-6 6-8 10 2 2 6 0 8 4 2-4 6-2 8-6-2-2-6 0-8-8z" fill="%23355e3b" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23ivy)"/></svg>')`,
        backgroundSize: 'cover, 40px 40px'
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold">levitation</h1>
            <p className="text-white/70 text-sm">infotech</p>
          </div>
        </div>
        <button 
          className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-2 rounded-lg transition-colors"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Form */}
          <div className="max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Sign up to begin journey
              </h2>
              <p className="text-white/70 text-lg">
                This is basic signup page which is used for levitation assignment purpose.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Enter your name
                </label>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
                  required
                />
                <p className="text-white/50 text-sm mt-2">This name will be displayed with your inquiry</p>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
                  required
                />
                <p className="text-white/50 text-sm mt-2">This email will be displayed with your inquiry</p>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter the Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-all backdrop-blur-sm"
                  required
                />
                <p className="text-white/50 text-sm mt-2">Any further updates will be forwarded on this Email ID</p>
              </div>

              {/* Submit Button and Login Link */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Signing up...' : 'Register'}
                </button>
                <button
                  type="button"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Already have account ?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mt-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Billboard */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Billboard Background */}
              <div 
                className="bg-lime-200 rounded-2xl p-12 shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                  minHeight: '500px'
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-20 opacity-30"
                     style={{
                       background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0 10c20-5 40 5 60 0s40-5 60 0v10H0z" fill="%23355e3b"/></svg>')`,
                       backgroundRepeat: 'repeat-x'
                     }}>
                </div>

                {/* Main Text */}
                <div className="relative z-10 pt-8">
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                    Connecting People
                  </h3>
                  <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
                    With Technology
                  </h3>
                  
                  <div className="space-y-2 text-gray-700 mb-8">
                    <p className="text-sm">SOFTWARE DEVELOPMENT | ERP | CRM SERVICES</p>
                    <p className="text-sm">UX DESIGN | SECURITY</p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-1">End to End Software</p>
                    <p className="text-gray-600 text-sm">Development Company</p>
                  </div>
                </div>

                {/* Levitation Logo */}
                <div className="absolute bottom-8 right-8 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">levitation</p>
                    <p className="text-gray-600 text-xs">infotech</p>
                  </div>
                </div>

                {/* Brick Pattern at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                     style={{
                       background: `repeating-linear-gradient(
                         90deg,
                         #8b4513 0px,
                         #8b4513 2px,
                         #a0522d 2px,
                         #a0522d 20px,
                         #8b4513 20px,
                         #8b4513 22px
                       ), repeating-linear-gradient(
                         0deg,
                         #8b4513 0px,
                         #8b4513 1px,
                         #a0522d 1px,
                         #a0522d 8px
                       )`
                     }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;