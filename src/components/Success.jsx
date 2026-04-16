import { useNavigate } from 'react-router-dom';
import './Success.css';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-box">
        <h2>🎉 Giriş Başarılı!</h2>
        <p>Hoş geldiniz.</p>
        <button onClick={() => navigate('/')}>Geri Dön</button>
      </div>
    </div>
  );
}