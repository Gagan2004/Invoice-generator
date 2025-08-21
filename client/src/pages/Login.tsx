// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../redux/slices/authSlice';
// import { type RootState, useAppDispatch } from '../redux/store';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useAppDispatch();
//   const { loading, error, token } = useSelector((state: RootState) => state.auth);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/add-products');
//     }
//   }, [token, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
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
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </div>
//           {error && <p className="text-red-500 text-xs italic">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;








import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { type RootState, useAppDispatch } from '../redux/store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate('/add-products');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
        <Link to="/signup" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-900 transform rotate-45"></div>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">levitation</h1>
            <p className="text-gray-400 text-xs">infotech</p>
          </div>
        </Link>
        <div className="border border-green-400 text-green-400 px-4 py-2 rounded text-sm">
          Connecting People With Technology
        </div>
      </div>

      {/* Left Side - Advertisement Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Glass Building Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-3xl"></div>
          
          {/* Advertisement Board */}
          <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-gray-700">
            <div className="bg-gray-900 p-6 rounded-xl mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-900 transform rotate-45"></div>
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold">levitation</h2>
                  <p className="text-gray-400 text-xs">infotech</p>
                </div>
              </div>
              
              <p className="text-white text-center mb-6">
                Thinking to Build or Streamline<br />
                your online business ?
              </p>
              
              {/* Mock Devices */}
              <div className="relative mb-6">
                <div className="bg-white rounded-lg p-4 shadow-lg transform -rotate-6 absolute left-0">
                  <div className="w-24 h-16 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-6 ml-16">
                  <div className="w-24 h-16 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Green Banner */}
            <div className="bg-green-400 text-gray-900 p-4 rounded-xl text-center font-bold">
              Connecting People<br />
              with Technology
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-400/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-400/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-900 transform rotate-45"></div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">levitation</h1>
              <p className="text-gray-400 text-xs">infotech</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-2">Let the Journey Begin!</h2>
            <p className="text-gray-400">This is basic login page which is used for levitation assignment purpose.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                id="email"
                type="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-gray-400 text-xs mt-1">This email will be displayed with your inquiry</p>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
                Current Password
              </label>
              <input
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
                id="password"
                type="password"
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login now'}
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Forget password ?
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;