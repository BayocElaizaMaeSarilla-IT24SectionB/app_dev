import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personAddOutline, heart, rocket, } from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="about-container">
          <h1>About Anime Nexus</h1>
          <p className="about-description">
            Anime Nexus is a vibrant community platform dedicated to anime enthusiasts worldwide. 
            We bring together fans, creators, and industry professionals to share, discuss, and celebrate 
            the rich world of anime culture.
          </p>
          
          <div className="features">
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="4">
                  <IonIcon icon={personAddOutline} size="large" className="feature-icon" />
                  <h3>Community Driven</h3>
                  <p>Join discussions, share your thoughts, and connect with fellow anime lovers from around the globe.</p>
                </IonCol>
                <IonCol size="12" size-md="4">
                  <IonIcon icon={heart} size="large" className="feature-icon" />
                  <h3>Creator Support</h3>
                  <p>We provide tools and resources for anime creators to showcase their work and grow their audience.</p>
                </IonCol>
                <IonCol size="12" size-md="4">
                  <IonIcon icon={rocket} size="large" className="feature-icon" />
                  <h3>Latest Updates</h3>
                  <p>Stay up-to-date with the latest anime releases, news, and industry trends.</p>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          
          <div className="join-section">
            <h2>Join Our Community</h2>
            <p>Whether you're a longtime fan or new to the world of anime, there's a place for you here.</p>
            <div className="button-group">
              <IonButton expand="block" shape="round" color="primary">
                Sign Up Now
              </IonButton>
              <IonButton expand="block" shape="round" fill="outline">
                Learn More
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;