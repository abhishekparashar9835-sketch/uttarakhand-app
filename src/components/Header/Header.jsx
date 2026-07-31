import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../services/authService';
import { logout } from '../../store/authSlice';
import logoImg from '../../assets/LogoTourism.png';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Places', slug: '/places', active: true },
    { name: 'Hotels & Vendors', slug: '/hotels', active: true },
    { name: 'Menu', slug: '/menu', active: true },
    { name: 'Contact', slug: '/contact', active: true },
    { name: 'Gov Dashboard', slug: '/dashboard', active: authStatus }, // visible only if logged in
  ];

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/');
    });
  };

  return (
    <header className="bg-[#1b3d2b] text-white sticky top-0 z-50 px-6 md:px-12 py-4 shadow-md border-b border-[#2d583f]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Uttarakhand Tourism Logo" className="h-10 w-auto object-contain" />
          <span className="font-serif text-lg tracking-wider hidden sm:inline">Uttarakhand Unlocked</span>
        </Link>

        {/* Dynamic Navigation Menu links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => 
            item.active ? (
              <Link 
                key={item.name} 
                to={item.slug} 
                className="text-sm font-medium text-gray-200 hover:text-[#59d585] transition-colors"
              >
                {item.name}
              </Link>
            ) : null
          )}
        </nav>

        {/* Dynamic Conditional Auth Control Blocks */}
        <div className="flex items-center gap-4">
          {authStatus ? (
            <>
              <Link to="/profile" className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full font-medium transition-colors">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm bg-[#b91c1c] hover:bg-red-700 px-4 py-2 rounded-full font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-200 hover:text-[#59d585] transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="text-sm bg-[#59d585] hover:bg-[#448b5b] text-[#1b3d2b] px-4 py-2 rounded-full font-semibold transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;