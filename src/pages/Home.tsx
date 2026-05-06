import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonText, IonButton, IonRouterLink, IonIcon } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { logIn, personAddOutline, home } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={home} /> Ionic Auth
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {user ? (
          <div className="home-authenticated">
            <IonCard className="welcome-card">
              <IonCardContent>
                <div className="welcome-content">
                  <IonIcon icon={personAddOutline} size="large" color="primary" />
                  <IonText>
                    <h1>Welcome back, {user.name}!</h1>
                    <p>You're successfully logged in.</p>
                  </IonText>
                </div>
                <IonRouterLink routerLink="/dashboard">
                  <IonButton expand="block" shape="round">
                    Go to Dashboard
                  </IonButton>
                </IonRouterLink>
              </IonCardContent>
            </IonCard>
          </div>
        ) : (
          <div className="home-guest">
            <div className="hero-section">
              <IonIcon icon={personAddOutline} size="large" className="hero-icon" />
              <IonText>
                <h1>Welcome to Ionic Auth</h1>
                <p>Sign in to access your account or create a new one.</p>
              </IonText>
            </div>
            <div className="button-group">
              <IonRouterLink routerLink="/login">
                <IonButton expand="block" shape="round" className="login-btn">
                  <IonIcon icon={logIn} slot="start" />
                  Login
                </IonButton>
              </IonRouterLink>
              <IonRouterLink routerLink="/register">
                <IonButton expand="block" shape="round" fill="outline" className="register-btn">
                  <IonIcon icon={personAddOutline} slot="start" />
                  Register
                </IonButton>
              </IonRouterLink>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
