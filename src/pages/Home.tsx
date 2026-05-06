import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonText, IonButton, IonRouterLink, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { home, logIn, personAddOutline, star, flash, chatbubbles } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    { icon: star, title: 'Discover', desc: 'Find your next favorite anime' },
    { icon: flash, title: 'Track', desc: 'Keep track of what you have seen' },
    { icon: chatbubbles, title: 'Discuss', desc: 'Connect with other fans' },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={home} /> AnimeVerse
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {user ? (
          // Authenticated Landing
          <div className="authenticated-hero">
            <div className="hero-content">
            <h1 className="hero-title">
              Welcome back, <span className="gradient-text">{user?.user_metadata?.name || user?.email?.split('@')[0]}</span>!
            </h1>
              <p className="hero-subtitle">Continue your anime journey</p>
              <IonRouterLink routerLink="/dashboard">
                <IonButton expand="block" shape="round" className="dashboard-btn">
                  Go to Dashboard
                </IonButton>
              </IonRouterLink>
            </div>
            <div className="floating-characters">
              <div className="character char-1">🎌</div>
              <div className="character char-2">⚡</div>
              <div className="character char-3">🔥</div>
            </div>
          </div>
        ) : (
          // Guest Landing
          <div className="guest-landing">
            <section className="hero-gradient">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">AnimeVerse</span>
                </h1>
                <p className="hero-tagline">Your Ultimate Anime Universe</p>
                <p className="hero-description">
                  Discover, track, and discuss anime with thousands of fans worldwide.
                  Join the community today!
                </p>
                <div className="cta-group">
                  <IonRouterLink routerLink="/register">
                    <IonButton expand="block" shape="round" className="primary-btn">
                      <IonIcon icon={personAddOutline} slot="start" />
                      Join Free
                    </IonButton>
                  </IonRouterLink>
                  <IonRouterLink routerLink="/login">
                    <IonButton expand="block" fill="outline" shape="round" className="secondary-btn">
                      <IonIcon icon={logIn} slot="start" />
                      Sign In
                    </IonButton>
                  </IonRouterLink>
                </div>
              </div>
              <div className="hero-visual">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
              </div>
            </section>

            <section className="features-section">
              <IonGrid>
                <IonRow>
                  {features.map((feature, idx) => (
                    <IonCol size="12" sizeSm="4" key={idx}>
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

            <section className="stats-section">
              <IonCard className="stats-card">
                <IonCardContent>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">10K+</span>
                      <span className="stat-label">Anime Titles</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">50K+</span>
                      <span className="stat-label">Community Members</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">100K+</span>
                      <span className="stat-label">Reviews & Ratings</span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </section>

            <section className="about-preview">
              <IonCard className="about-preview-card">
                <IonCardContent>
                  <h2>About AnimeVerse</h2>
                  <p>
                    AnimeVerse is a community-driven platform where fans can discover new anime,
                    track their watchlists, rate and review series, and connect with like-minded
                    enthusiasts. Whether you're into classic shonen, magical girls, or psychological
                    thrillers — there's something for everyone.
                  </p>
                  <IonRouterLink routerLink="/about">
                    <IonButton fill="outline" shape="round">
                      Learn More About Us
                    </IonButton>
                  </IonRouterLink>
                </IonCardContent>
              </IonCard>
            </section>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
