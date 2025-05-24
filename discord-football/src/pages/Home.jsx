
import React, { useEffect, useState, useRef } from 'react';
import '../styles/home.css';

// Merged CSS styles and React component
const Home = () => {
  const [stats, setStats] = useState({ fans: 0, threads: 0, events: 0 });
  const timeoutRef = useRef(null);
  const [messages] = useState([
    "Who's watching the Clasico tonight?",
    "That goal was INSANE! 🔥🔥🔥",
    "Anyone want to join our fantasy league?",
    "The ref needs glasses!",
    "New transfer rumor thread is up!"
  ]);

  // Testimonials data
  const testimonials = [
    {
      name: "John Doe",
      role: "Community Member",
      text: "This server reignited my love for football. Amazing discussions!"
    },
    {
      name: "Jane Smith",
      role: "Moderator",
      text: "We have built a safe and fun space for all football fans."
    },
    {
      name: "Alex Turner",
      role: "New Member",
      text: "I joined recently and already feel part of the family!"
    }
  ];

  // Value props data
  const valueProps = [
    {
      icon: "💬",
      title: "24/7 Live Match Threads",
      description: "Join the conversation during every major match with fans worldwide."
    },
    {
      icon: "🔍",
      title: "In-depth Tactical Analysis",
      description: "Break down strategies and performances with our football experts."
    },
    {
      icon: "🎁",
      title: "Giveaways and Fantasy Leagues",
      description: "Win prizes and compete with other members in our fantasy competitions."
    },
    {
      icon: "👋",
      title: "Friendly and Inclusive Community",
      description: "A welcoming space for football fans of all clubs and nations."
    }
  ];

  // Live feed data
  const feed = [
    {
      user: "FootballMod",
      avatar: "#5865f2",
      content: "🚨 Real Madrid sign Mbappe - Official Announcement!"
    },
    {
      user: "GunnerFan22",
      avatar: "#ed4245",
      content: "🔥 Arsenal thrash Chelsea 4-1 at the Bridge"
    },
    {
      user: "TacticsTom",
      avatar: "#57f287",
      content: "👀 VAR controversy in the UCL Semis again..."
    },
    {
      user: "SerieALover",
      avatar: "#fee75c",
      content: "🎉 Discord Nitro giveaway live! Join #giveaways"
    }
  ];

  // Counter animation effect
  useEffect(() => {
    let currentStep = 0;
    const targetStats = { fans: 5000, threads: 1200, events: 300 };
    const steps = 50;
    const increment = {
      fans: targetStats.fans / steps,
      threads: targetStats.threads / steps,
      events: targetStats.events / steps
    };

    const interval = setInterval(() => {
      currentStep++;
      setStats(prev => ({
        fans: Math.min(Math.floor(prev.fans + increment.fans), targetStats.fans),
        threads: Math.min(Math.floor(prev.threads + increment.threads), targetStats.threads),
        events: Math.min(Math.floor(prev.events + increment.events), targetStats.events)
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targetStats); // Ensure final accuracy
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Scroll animation effect
  const handleScroll = () => {
    if (timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('animated');
        }
      });
      timeoutRef.current = null;
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        
        {/* Floating message bubbles */}
        <div className="scrolling-messages">
          {messages.map((msg, idx) => (
            <div key={`msg-${idx}`} className="message-bubble">
              {msg}
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <h1>Welcome to the Ultimate Football Discord</h1>
          <p>Live matches, analysis, giveaways & more</p>
          <a href="https://discord.gg/YOURSERVER" className="btn-join-server" aria-label="Join our Discord">Join Now</a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{stats.fans.toLocaleString()}</div>
              <div className="stat-label">Passionate Fans</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.threads.toLocaleString()}</div>
              <div className="stat-label">Match Threads</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.events.toLocaleString()}</div>
              <div className="stat-label">Community Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Value Props Section */}
      <section className="value-props-section section">
        <div className="container">
          <div className="section-title">
            <h2>What We Offer</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="value-grid animate-on-scroll">
            {valueProps.map((prop, idx) => (
              <div key={`value-${idx}`} className="value-card">
                <div className="value-icon">{prop.icon}</div>
                <h3>{prop.title}</h3>
                <p>{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Live Feed Section */}
      <section className="live-feed-section section">
        <div className="container">
          <div className="section-title">
            <h2>Live Community Feed</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="feed-container animate-on-scroll">
            <div className="feed-message-container">
              {feed.map((item, idx) => (
                <div key={`feed-${idx}`} className="feed-message">
                  <div className="message-header">
                    <div className="user-avatar" style={{ backgroundColor: item.avatar }}>
                      {item.user.charAt(0)}
                    </div>
                    <div className="user-name">{item.user}</div>
                  </div>
                  <div className="message-content">{item.content}</div>
                </div>
              ))}
            </div>
            
            <div className="feed-screenshots">
              <div className="screenshot-grid">
                <div className="screenshot-item">
                  <img src="/api/placeholder/400/320" alt="Match thread screenshot" />
                  <div className="screenshot-caption">Live Match Thread</div>
                </div>
                <div className="screenshot-item">
                  <img src="/api/placeholder/400/320" alt="Tactical analysis screenshot" />
                  <div className="screenshot-caption">Tactical Analysis</div>
                </div>
                <div className="screenshot-item">
                  <img src="/api/placeholder/400/320" alt="Fantasy league screenshot" />
                  <div className="screenshot-caption">Fantasy League</div>
                </div>
                <div className="screenshot-item">
                  <img src="/api/placeholder/400/320" alt="Transfer news screenshot" />
                  <div className="screenshot-caption">Transfer News</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-title">
            <h2>What Our Members Say</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="testimonials-grid animate-on-scroll">
            {testimonials.map((t, idx) => (
              <div key={`testimonial-${idx}`} className="testimonial-card">
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{t.text}</p>
                <p className="testimonial-author">{t.name}, <em>{t.role}</em></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Discord Widget */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join?</h2>
            <p>Be part of our growing community of passionate football fans from around the world</p>
            <a href="https://discord.gg/YOURSERVER" className="btn-join-cta">Join Our Server</a>
            
            <div className="discord-widget-container animate-on-scroll">
              <iframe
                src={`https://discord.com/widget?id=359039577362530314&theme=dark`}
                width="100%"
                height="500"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Discord Widget"
                className="discord-widget"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;