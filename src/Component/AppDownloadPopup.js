import React, { useState, useEffect } from 'react';
import './AppDownloadPopup.css';
import MainLogo from '../Assets/MainLogo.png';
import { 
  FaDownload, 
  FaTimes, 
  FaCheckCircle, 
  FaMobileAlt, 
  FaPhoneAlt, 
  FaShareAlt 
} from 'react-icons/fa';

const AppDownloadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setInstalled(true);
      return;
    }

    // Check iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for PWA beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check session storage if dismissed recently
    const isDismissed = sessionStorage.getItem('coolrite_app_popup_dismissed');

    // Show popup after 3 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setShowPopup(true);
      } else {
        setBadgeVisible(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPopup(false);
        setBadgeVisible(false);
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert("To Install on iPhone/iPad: Tap the Share button at the bottom of Safari, then select 'Add to Home Screen' (+).");
    } else {
      // Direct guide for Android / Chrome / Edge
      alert("To Add App to Home Screen: Open your browser menu (⋮) at top right and tap 'Install app' or 'Add to Home screen'.");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setBadgeVisible(true);
    sessionStorage.setItem('coolrite_app_popup_dismissed', 'true');
  };

  if (installed) return null;

  return (
    <>
      {/* Floating mini badge if popup was closed */}
      {badgeVisible && !showPopup && (
        <div className="floating-app-badge" onClick={() => setShowPopup(true)}>
          <FaMobileAlt style={{ color: "#f2ab26", fontSize: "1.1rem" }} />
          <span>Get CoolRite App</span>
        </div>
      )}

      {/* Main App Download Popup Modal */}
      {showPopup && (
        <div className="app-popup-backdrop" onClick={handleClose}>
          <div className="app-popup-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="app-popup-header">
              <button 
                className="app-popup-close-btn" 
                onClick={handleClose}
                aria-label="Close popup"
              >
                <FaTimes />
              </button>

              <div className="app-popup-logo-wrapper">
                <img 
                  src={MainLogo} 
                  alt="CoolRite Engineers App Icon" 
                  className="app-popup-logo"
                />
              </div>

              <h3 className="app-popup-title">CoolRite Engineers App</h3>
              <div className="app-popup-badge-row">
                <span>⭐⭐⭐⭐⭐ 5.0 Rating</span>
                <span>•</span>
                <span>Verified HVAC App</span>
              </div>
            </div>

            {/* Body Content */}
            <div className="app-popup-body">
              <p className="text-muted small mb-3 text-center">
                Download the official CoolRite Engineers web app on your phone for instant HVAC estimates and direct support.
              </p>

              <ul className="app-feature-list">
                <li className="app-feature-item">
                  <FaCheckCircle className="app-feature-icon" />
                  <span><strong>1-Tap Project Quotes</strong>: Request instant BOQ and site survey in Baddi, Chandigarh & Punjab.</span>
                </li>
                <li className="app-feature-item">
                  <FaCheckCircle className="app-feature-icon" />
                  <span><strong>Direct Engineer Access</strong>: Instant 24/7 WhatsApp & Phone support with zero delays.</span>
                </li>
                <li className="app-feature-item">
                  <FaCheckCircle className="app-feature-icon" />
                  <span><strong>Offline Catalogs</strong>: View Ducting, AHU, VRF & MEP service specifications anytime.</span>
                </li>
              </ul>

              {isIOS && (
                <div className="app-ios-instruction">
                  <FaShareAlt className="me-2 text-primary" />
                  Tap <strong>Share</strong> in Safari ➔ tap <strong>Add to Home Screen</strong>
                </div>
              )}

              {/* Action Buttons */}
              <div className="app-popup-actions">
                <button 
                  className="app-install-btn"
                  onClick={handleInstallClick}
                >
                  <FaDownload />
                  {deferredPrompt ? 'Install App on Device' : 'Download / Add App'}
                </button>

                <div className="app-secondary-actions">
                  <a href="tel:+917009167480" className="app-call-btn">
                    <FaPhoneAlt /> Call Engineer
                  </a>
                  <button className="app-later-btn" onClick={handleClose}>
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AppDownloadPopup;
