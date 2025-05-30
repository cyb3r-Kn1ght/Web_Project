import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth(); // Xác minh cookie với backend
        navigate('/chat'); // Điều hướng khi thành công
      } catch (err) {
        navigate('/auth/login?error=oauth_failed');
      }
    };

    verifyAuth();
  }, [checkAuth, navigate]);

  return (
    <div className="oauth-loading">
      <p>Đang hoàn tất đăng nhập...</p>
      {/* Hiển thị spinner */}
    </div>
  );
};

export default OAuthSuccess;
