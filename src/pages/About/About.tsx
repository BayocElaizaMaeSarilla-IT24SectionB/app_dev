import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonText, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { rocket, people, shield, heart } from 'ionicons/icons';
import './About.css';

const About: React.FC = () => {
  const features = [
    { icon: rocket, title: 'Fast & Smooth', desc: 'Lightning-fast performance with modern tech stack' },
    { icon: people, title: 'Community Driven', desc: 'Join thousands of anime enthusiasts worldwide' },
    { icon: shield, title: 'Secure', desc: 'Enterprise-grade security with Supabase' },
    { icon: heart, title: 'Made with Love', desc: 'Built by fans, for fans' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="about-container">
          <section className="hero-section">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">AnimeVerse</span>
            </h1>
            <p className="hero-subtitle">
              Your ultimate destination for anime discovery, community discussions, and fellow fans.
            </p>
            <IonButton routerLink="/register" expand="block" shape="round" className="cta-button">
              Join the Community
            </IonButton>
          </section>

          <section className="features-section">
            <IonGrid>
              <IonRow>
                {features.map((feature, idx) => (
                  <IonCol size="12" sizeSm="6" sizeMd="3" key={idx}>
                    <IonCard className="feature-card">
                      <IonCardContent>
                        <IonIcon icon={feature.icon} className="feature-icon" />
                        <h3>{feature.title}</h3>
                        <p>{feature.desc}</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </section>

          <section className="story-section">
            <IonCard className="story-card">
              <IonCardContent>
                <h2>Our Story</h2>
                <p>
                  Born from a passion for anime, AnimeVerse began as a small community of dedicated fans.
                  We believed there should be a place where anime lovers could connect, share, and discover
                  new series together without limits.
                </p>
                <p>
                  Today, we've grown into a thriving platform serving thousands of users worldwide,
                  always staying true to our roots: bringing people together through the love of anime.
                </p>
              </IonCardContent>
            </IonCard>
          </section>

          <section className="cta-section">
            <h2>Ready to Dive In?</h2>
            <p>Create your account today and start your anime journey!</p>
            <div className="cta-buttons">
              <IonButton routerLink="/login" fill="outline" shape="round">
                Sign In
              </IonButton>
              <IonButton routerLink="/register" expand="block" shape="round">
                Get Started
              </IonButton>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
