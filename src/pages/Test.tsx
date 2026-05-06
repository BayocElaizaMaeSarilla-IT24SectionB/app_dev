import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonRouterLink } from '@ionic/react';
import './Home.css';

const TestPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>TEST PAGE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1 style={{ color: 'red', fontSize: '2rem' }}>VISIBLE?</h1>
        <p>If you see this red text, the app is rendering.</p>
        <IonRouterLink routerLink="/login">
          <IonButton expand="block">Go to Login</IonButton>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
