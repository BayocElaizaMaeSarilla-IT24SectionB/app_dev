import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonText, IonLoading, IonToast } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setToastMessage('Please fill in all fields');
      setShowToast(true);
      return;
    }
    if (password.length < 6) {
      setToastMessage('Password must be at least 6 characters');
      setShowToast(true);
      return;
    }
    setShowLoading(true);
    try {
      await register(name, email, password);
      history.push('/dashboard');
    } catch {
      setToastMessage('Registration failed');
      setShowToast(true);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="transparent">
          <IonTitle className="auth-title">Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="auth-container">
          <div className="auth-card register-card">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="auth-card-title">Sign Up</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form onSubmit={handleRegister}>
                  <IonItem className="auth-input">
                    <IonLabel position="floating">Full Name</IonLabel>
                    <IonInput
                      type="text"
                      value={name}
                      onIonChange={e => setName(e.detail.value!)}
                      autoCapitalize="words"
                    />
                  </IonItem>
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
                    className="auth-button register-button"
                    shape="round"
                  >
                    Register
                  </IonButton>
                </form>
                <div className="auth-footer">
                  <IonText>
                    Already have an account?{' '}
                    <IonRouterLink routerLink="/login" color="primary">
                      Login
                    </IonRouterLink>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
      <IonLoading isOpen={showLoading} message="Creating account..." />
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

export default Register;
