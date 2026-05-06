import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonText, IonLoading, IonToast, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { eye, eyeOff, personAddOutline, logIn, happy, paw } from 'ionicons/icons';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    const { error } = await register(name, email, password);
    setShowLoading(false);
    if (error) {
      setToastMessage(error.message || 'Registration failed');
      setShowToast(true);
    } else {
      history.push('/dashboard');
    }
  };

  return (
    <IonPage>
      <div className="register-background">
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
            <div className="logo-icon register-icon">
              <IonIcon icon={personAddOutline} />
            </div>
            <IonTitle className="login-title">Join AnimeVerse</IonTitle>
            <p className="login-subtitle">Start your anime journey today!</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding register-content">
        <div className="register-container">
          <IonCard className="register-card">
            <IonCardHeader>
              <IonCardTitle className="card-title">
                <IonIcon icon={personAddOutline} /> Create Account
              </IonCardTitle>
              <p className="card-subtitle">Fill in your details to get started</p>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <IonItem className="custom-input">
                    <IonLabel position="floating">Full Name</IonLabel>
                    <IonInput
                      type="text"
                      value={name}
                      onIonChange={e => setName(e.detail.value!)}
                      autoCapitalize="words"
                      className="input-field"
                    />
                  </IonItem>

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

                  <div className="password-strength">
                    <div className={`strength-bar ${password.length >= 6 ? 'strong' : 'weak'}`}></div>
                    <span className="strength-text">
                      {password.length === 0 ? '' : password.length < 6 ? 'Weak' : 'Strong'}
                    </span>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  type="submit"
                  className="register-button"
                  shape="round"
                >
                  <IonIcon icon={personAddOutline} slot="start" />
                  Create Account
                </IonButton>
              </form>

              <div className="card-footer">
                <IonText>
                  Already have an account?{' '}
                  <IonRouterLink routerLink="/login" className="link-primary">
                    Sign In
                  </IonRouterLink>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <div className="terms-text">
            <p>
              By registering, you agree to our <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </p>
          </div>

          <div className="bottom-links">
            <IonRouterLink routerLink="/" className="back-link">
              <IonIcon icon={happy} /> Back to Home
            </IonRouterLink>
          </div>
        </div>
      </IonContent>

      <IonLoading isOpen={showLoading} message="Creating your account..." />
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

export default Register;
