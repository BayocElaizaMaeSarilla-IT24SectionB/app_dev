import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonText, IonLoading, IonToast, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { eye, eyeOff, logIn, personAddOutline, happy, paw } from 'ionicons/icons';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setToastMessage('Please fill in all fields');
      setShowToast(true);
      return;
    }
    setShowLoading(true);
    const { error } = await login(email, password);
    setShowLoading(false);
    if (error) {
      setToastMessage(error.message || 'Login failed');
      setShowToast(true);
    } else {
      history.push('/dashboard');
    }
  };

  return (
    <IonPage>
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <IonIcon icon={paw} className="paw paw-1" />
          <IonIcon icon={paw} className="paw paw-2" />
          <IonIcon icon={paw} className="paw paw-3" />
        </div>
      </div>

      <IonHeader className="ion-no-border transparent-header">
        <IonToolbar>
          <div className="login-header-content">
            <div className="logo-icon">
              <IonIcon icon={happy} />
            </div>
            <IonTitle className="login-title">AnimeVerse</IonTitle>
            <p className="login-subtitle">Welcome back, warrior!</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding login-content">
        <div className="login-container">
          <IonCard className="login-card">
            <IonCardHeader>
              <IonCardTitle className="card-title">
                <IonIcon icon={logIn} /> Sign In
              </IonCardTitle>
              <p className="card-subtitle">Enter your credentials to continue</p>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <IonItem className="custom-input">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      className="input-field"
                    />
                  </IonItem>

                  <IonItem className="custom-input password-input">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      className="input-field"
                    />
                    <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      <IonIcon icon={showPassword ? eyeOff : eye} />
                    </div>
                  </IonItem>
                </div>

                <IonButton
                  expand="block"
                  type="submit"
                  className="login-button"
                  shape="round"
                >
                  <IonIcon icon={logIn} slot="start" />
                  Sign In
                </IonButton>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons">
                  <IonButton fill="outline" shape="round" className="social-btn google">
                    <img src="https://www.google.com/favicon.ico" alt="Google" />
                    Google
                  </IonButton>
                </div>
              </form>

              <div className="card-footer">
                <IonText>
                  Don't have an account?{' '}
                  <IonRouterLink routerLink="/register" className="link-primary">
                    Create one
                  </IonRouterLink>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <div className="bottom-links">
            <IonRouterLink routerLink="/" className="back-link">
              <IonIcon icon={happy} /> Back to Home
            </IonRouterLink>
          </div>
        </div>
      </IonContent>

      <IonLoading isOpen={showLoading} message="Signing in..." />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        color="danger"
        position="top"
      />
    </IonPage>
  );
};

export default Login;
