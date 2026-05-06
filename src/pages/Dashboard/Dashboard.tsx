import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonCard, IonCardContent, IonAvatar, IonText, IonItem, IonLabel, IonIcon, IonButtons, IonMenuButton } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import { logOut, personCircle, mail, create } from 'ionicons/icons';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="dashboard-container">
          <div className="profile-card">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personCircle} size="large" />
            </IonAvatar>
            <IonText>
              <h1 className="profile-name">{user?.name || 'User'}</h1>
              <p className="profile-email">{user?.email || 'user@example.com'}</p>
            </IonText>
          </div>

          <IonCard className="stats-card">
            <IonCardContent>
              <div className="stats-grid">
                <div className="stat-item">
                  <IonIcon icon={personCircle} color="primary" size="large" />
                  <IonText color="dark">
                    <h2>Active</h2>
                  </IonText>
                </div>
                <div className="stat-item">
                  <IonIcon icon={create} color="secondary" size="large" />
                  <IonText color="dark">
                    <h2>Member</h2>
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="info-card">
            <IonCardContent>
              <IonItem lines="none">
                <IonIcon icon={mail} slot="start" color="medium" />
                <IonLabel>
                  <h3>Email</h3>
                  <p>{user?.email}</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>

          <IonButton
            expand="block"
            fill="outline"
            className="logout-button"
            onClick={handleLogout}
            shape="round"
          >
            <IonIcon icon={logOut} slot="start" />
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
