import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonText, IonLoading, IonToast } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <IonHeader className="ion-no-border">
        <IonToolbar color="transparent">
          <IonTitle className="auth-title">Welcome Back</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="auth-container">
          <div className="auth-card">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="auth-card-title">Sign In</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form onSubmit={handleLogin}>
                  <IonItem className="auth-input">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      autoCapitalize="off"
                      autoCorrect="off"
                    />
                  </IonItem>
                  <IonItem className="auth-input">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                  <IonButton
                    expand="block"
                    type="submit"
                    className="auth-button"
                    shape="round"
                  >
                    Login
                  </IonButton>
                </form>
                <div className="auth-footer">
                  <IonText>
                    Don't have an account?{' '}
                    <IonRouterLink routerLink="/register" color="primary">
                      Register
                    </IonRouterLink>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
      <IonLoading isOpen={showLoading} message="Signing in..." />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color="danger"
      />
    </IonPage>
  );
};

export default Login;
