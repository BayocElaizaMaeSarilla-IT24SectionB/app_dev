import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonCard, IonCardContent, IonAvatar, IonText, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonBadge, IonRefresher, IonRefresherContent, IonList, IonListHeader, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logOut, personCircle, mail, calendar, time, star, chevronForward, film, settings, helpCircle, heart } from 'ionicons/icons';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Anime Fan';
  const userInitial = userName.charAt(0).toUpperCase();

  const stats = [
    { label: 'Anime Watched', value: '24', icon: film, color: '#667eea', trend: '+3 this week' },
    { label: 'Episodes', value: '847', icon: time, color: '#ff6b6b', trend: '+52 today' },
    { label: 'Days Active', value: '42', icon: calendar, color: '#ffd700', trend: 'streak!' },
    { label: 'Reviews', value: '15', icon: star, color: '#00d9c0', trend: '+5 this month' },
  ];

  const watchList = [
    { title: 'One Piece', episodes: 1100, progress: 850, status: 'Watching', rating: 9.0, cover: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg' },
    { title: 'Attack on Titan', episodes: 87, progress: 87, status: 'Completed', rating: 9.0, cover: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg' },
    { title: 'Jujutsu Kaisen', episodes: 48, progress: 24, status: 'Watching', rating: 8.8, cover: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg' },
  ];

  const recentActivity = [
    { action: 'Watched Episode', title: 'One Piece - 1024', time: '2 hours ago' },
    { action: 'Rated', title: 'Demon Slayer - 9/10', time: '5 hours ago' },
    { action: 'Added to List', title: 'Chainsaw Man', time: '1 day ago' },
  ];

  const handleLogout = () => {
    logout();
  };

  const doRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => history.push('/settings')}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="dashboard-scroll">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-bg"></div>
            <div className="profile-content">
              <IonAvatar className="profile-avatar-lg">
                <IonIcon icon={personCircle} />
              </IonAvatar>
              <div className="profile-info">
                <h1 className="profile-name">{userName}</h1>
                <p className="profile-email">{user?.email}</p>
                <IonBadge color="success" className="online-badge">
                  Online
                </IonBadge>
              </div>
              <IonButton fill="outline" size="small" onClick={() => history.push('/settings')}>
                Edit Profile
              </IonButton>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-section">
            <h2 className="section-title">Your Stats</h2>
            <IonGrid>
              <IonRow>
                {stats.map((stat, idx) => (
                  <IonCol size="6" sizeMd="3" key={idx}>
                    <IonCard className={`stat-card stat-card-${idx + 1}`}>
                      <IonCardContent>
                        <div className="stat-content">
                          <div className="stat-icon" style={{ background: stat.color + '20', color: stat.color }}>
                            <IonIcon icon={stat.icon} />
                          </div>
                          <div className="stat-text">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-trend">{stat.trend}</span>
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>

          {/* Watch List */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Continue Watching</h2>
              <IonButton fill="clear" size="small" routerLink="/watchlist">
                View All <IonIcon icon={chevronForward} />
              </IonButton>
            </div>
            <div className="anime-list">
              {watchList.map((anime, idx) => (
                <IonCard key={idx} className="anime-card" routerLink={`/anime/${idx}`}>
                  <div className="anime-cover" style={{ backgroundImage: `url(${anime.cover})` }}>
                    <div className="anime-progress">
                      <div className="progress-bar" style={{ width: `${(anime.progress / anime.episodes) * 100}%` }}></div>
                      <span className="progress-text">{anime.progress}/{anime.episodes} eps</span>
                    </div>
                    <IonBadge color={anime.status === 'Completed' ? 'success' : 'primary'} className="status-badge">
                      {anime.status}
                    </IonBadge>
                  </div>
                  <IonCardContent>
                    <h3 className="anime-title">{anime.title}</h3>
                    <div className="anime-meta">
                      <IonIcon icon={star} color="warning" />
                      <span>{anime.rating}</span>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="section">
            <h2 className="section-title">Recent Activity</h2>
            <IonList lines="full">
              {recentActivity.map((activity, idx) => (
                <IonItem key={idx} button detail>
                  <IonIcon icon={star} slot="start" color="primary" />
                  <IonLabel>
                    <h3>{activity.action}</h3>
                    <p>{activity.title}</p>
                  </IonLabel>
                  <div slot="end" className="activity-time">
                    {activity.time}
                  </div>
                </IonItem>
              ))}
            </IonList>
          </div>

          {/* Quick Actions */}
          <div className="section">
            <h2 className="section-title">Quick Actions</h2>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/search">
                    <IonIcon icon={film} slot="top" />
                    Browse
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/community">
                    <IonIcon icon={heart} slot="top" />
                    Community
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/help">
                    <IonIcon icon={helpCircle} slot="top" />
                    Help
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/help">
                    <IonIcon icon={helpCircle} slot="top" />
                    Help
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          {/* Logout */}
          <div className="logout-section">
            <IonButton
              expand="block"
              fill="outline"
              color="danger"
              onClick={handleLogout}
              shape="round"
              className="logout-btn"
            >
              <IonIcon icon={logOut} slot="start" />
              Sign Out
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
