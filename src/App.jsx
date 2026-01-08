import React, { useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from "jwt-decode"
import axios from "axios"
const App = () => {
    useEffect(() => {
        const fadeElements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        if (fadeElements && fadeElements.length) {
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Notification function
        function showNotification(message, type) {
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `\n                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>\n                <span>${message}</span>\n            `;

            notification.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; border-radius: 10px; background: ${type === 'success' ? '#4CAF50' : '#F44336'}; color: white; display: flex; align-items: center; gap: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); z-index: 1000; animation: slideIn 0.3s ease; max-width: 400px;`;

            const style = document.createElement('style');
            style.textContent = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
            document.head.appendChild(style);

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';

                setTimeout(() => {
                    notification.remove();
                    document.head.removeChild(style);
                }, 300);
            }, 5000);
        }

        // Password visibility toggle (guarded)
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        if (togglePassword && passwordInput) {
            const handleToggle = function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                if (type === 'text') {
                    this.innerHTML = '<i class="far fa-eye-slash"></i>';
                } else {
                    this.innerHTML = '<i class="far fa-eye"></i>';
                }
            };

            togglePassword.addEventListener('click', handleToggle);
        }

        const forgotPasswordLink = document.querySelector('.forgot-password');
        if (forgotPasswordLink) {
            const forgotHandler = function(e) {
                e.preventDefault();
                const email = prompt('Please enter your email address to reset your password:');
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(email)) {
                        showNotification(`Password reset link has been sent to ${email}`, 'success');
                    } else {
                        showNotification('Please enter a valid email address.', 'error');
                    }
                }
            };

            forgotPasswordLink.addEventListener('click', forgotHandler);
        }

        // Add some interactive animation to security cards
        const securityCards = document.querySelectorAll('.security-card');
        if (securityCards && securityCards.length) {
            securityCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.security-icon i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotate(5deg)';
                        icon.style.transition = 'transform 0.3s ease';
                    }
                });

                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.security-icon i');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                    }
                });
            });
        }

        // Auto-animate floating elements on load
        setTimeout(() => {
            const f1 = document.querySelector('.floating-1');
            const f2 = document.querySelector('.floating-2');
            if (f1) f1.style.animation = 'float 20s infinite ease-in-out';
            if (f2) f2.style.animation = 'float 15s infinite ease-in-out reverse';
        }, 500);

        return () => {
            // Cleanup observers/listeners if needed when component unmounts
            if (observer && fadeElements && fadeElements.length) {
                fadeElements.forEach(element => observer.unobserve(element));
            }
        };
    }, []);
  const signedin = async(name,email,picture) => {
    try{
      let trops = {name,email,picture}
      let response = await axios.post("https://luvtoupload-in.onrender.com/signin",trops,
        {
          withCredentials:true,
          headers:{ 
            "Content-Type":"application/json"
          }
        }
      )
      let data = response.data
      console.log(data)
      if(response.status === 200 || response.status === 201){
        window.location.href = "https://luvtoupload-in.onrender.com/profile"
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <>
    <div className="container">
        <div className="signin-panel">
            <a href="https://luvtoupload-in.onrender.com" className="logo">
                <i class="fas fa-cloud-upload-alt"></i>
                LuvToUpload
            </a>
            
            <h1 className="fade-in">Welcome</h1>
            <p className="fade-in">Sign in to access your documents and continue your secure upload journey.</p>
            
            <form id="signinForm">
                <button type="button" className="btn btn-google fade-in" id="googleSignIn">
                    <i className="fab fa-google"></i> <GoogleLogin
  onSuccess={credentialResponse => {
    let credentialResponsedecoded = jwtDecode(credentialResponse.credential)
    signedin(credentialResponsedecoded.name,credentialResponsedecoded.email,credentialResponsedecoded.picture)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                </button>
            </form>
        </div>
        
        <div className="info-panel">
            <div className="floating-element floating-1"></div>
            <div className="floating-element floating-2"></div>
            
            <div className="info-content">
                <h2 className="fade-in">Secure Document Upload & Management</h2>
                <p className="fade-in">LuvToUpload provides enterprise-grade security for all your documents with end-to-end encryption, multi-factor authentication, and advanced threat protection.</p>
                
                <div className="security-features">
                    <div className="security-card fade-in">
                        <div className="security-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3>End-to-End Encryption</h3>
                        <p>All your files are encrypted both in transit and at rest with military-grade AES-256 encryption.</p>
                    </div>
                    
                    <div className="security-card fade-in">
                        <div className="security-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <h3>Multi-Factor Authentication</h3>
                        <p>Add an extra layer of security with biometric, SMS, or authenticator app verification.</p>
                    </div>
                    
                    <div className="security-card fade-in">
                        <div className="security-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <h3>Version History</h3>
                        <p>Keep track of all document changes with automatic versioning and restore previous versions anytime.</p>
                    </div>
                    
                    <div className="security-card fade-in">
                        <div className="security-icon">
                            <i class="fas fa-bell"></i>
                        </div>
                        <h3>Activity Monitoring</h3>
                        <p>Get real-time alerts for suspicious activities and detailed access logs for all your documents.</p>
                    </div>
                </div>
                
                <div className="app-stats fade-in">
                    <div className="stat">
                        <div className="stat-number">2M+</div>
                        <div className="stat-label">Secure Uploads</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">99.9%</div>
                        <div className="stat-label">Uptime</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">256-bit</div>
                        <div className="stat-label">Encryption</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Security Monitoring</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
export default App 