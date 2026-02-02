// Enhanced Gaming Portal JavaScript
// Theme toggle, search functionality, Clerk authentication, and dynamic features

document.addEventListener('DOMContentLoaded', () => {
    // ===== CLERK AUTHENTICATION SETUP =====
    let clerkInstance = null;
    let signUpMounted = false;
    let signInMounted = false;
    
    // Initialize Clerk
    window.addEventListener('load', async () => {
        if (window.Clerk) {
            try {
                clerkInstance = window.Clerk;
                await clerkInstance.load();
                
                // Check if user is signed in
                if (clerkInstance.user) {
                    handleSignedInUser(clerkInstance.user);
                } else {
                    // Show auth modal for first-time visitors (optional)
                    const hasSeenModal = localStorage.getItem('hasSeenAuthModal');
                    if (!hasSeenModal) {
                        setTimeout(() => {
                            showAuthModal();
                            localStorage.setItem('hasSeenAuthModal', 'true');
                        }, 2000); // Show after 2 seconds
                    }
                }
            } catch (error) {
                console.error('Error loading Clerk:', error);
            }
        }
    });

    // ===== AUTH MODAL CONTROLS =====
    const authModal = document.getElementById('auth-modal');
    const accountBtn = document.getElementById('account-btn');
    const closeAuthBtn = document.getElementById('close-auth');
    const authBackdrop = document.querySelector('.auth-backdrop');
    const continueGuestBtn = document.getElementById('continue-guest');
    const clerkSignUpContainer = document.getElementById('clerk-signup-container');
    const clerkSignInContainer = document.getElementById('clerk-signin-container');
    const userMenu = document.getElementById('user-menu');
    const tabSignUp = document.getElementById('tab-signup');
    const tabSignIn = document.getElementById('tab-signin');
    
    function showAuthModal() {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Mount SignUp by default if not already mounted
        if (!signUpMounted && clerkInstance) {
            mountSignUp();
        }
    }
    
    function hideAuthModal() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Mount Clerk SignUp component
    function mountSignUp() {
        if (!clerkInstance || signUpMounted) return;
        
        const isLightMode = document.body.classList.contains('light-mode');
        
        clerkSignUpContainer.innerHTML = '';
        clerkInstance.mountSignUp(clerkSignUpContainer, {
            appearance: {
                baseTheme: undefined,
                layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                    termsPageUrl: 'https://example.com/terms',
                    privacyPageUrl: 'https://example.com/privacy'
                },
                variables: {
                    colorPrimary: '#ff3366',
                    colorBackground: isLightMode ? '#ffffff' : '#2a2a4a',
                    colorInputBackground: isLightMode ? '#f8f8fc' : '#353560',
                    colorInputText: isLightMode ? '#1a1a35' : '#ffffff',
                    colorText: isLightMode ? '#1a1a35' : '#ffffff',
                    colorTextSecondary: isLightMode ? '#4a4a6a' : '#d0d0e8',
                    colorDanger: '#ff4444',
                    colorSuccess: '#00ff88',
                    colorWarning: '#ffcc00',
                    borderRadius: '12px',
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: {
                        normal: 400,
                        medium: 600,
                        bold: 700
                    }
                },
                elements: {
                    formButtonPrimary: {
                        background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 50%, #ffcc00 100%)',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: '600',
                        textTransform: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(255, 51, 102, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 24px rgba(255, 51, 102, 0.6)',
                        },
                        '&:active': {
                            transform: 'translateY(0)',
                        }
                    },
                    formButtonReset: {
                        background: 'transparent',
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        fontSize: '14px',
                        fontWeight: '600',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00',
                        }
                    },
                    socialButtonsBlockButton: {
                        background: isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                        border: isLightMode ? '2px solid #e8e8f0' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '15px',
                        fontWeight: '600',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: isLightMode ? '#f8f8fc' : 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#ff3366',
                            transform: 'translateY(-2px)',
                        }
                    },
                    socialButtonsBlockButtonText: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontWeight: '600'
                    },
                    formFieldInput: {
                        background: isLightMode ? '#f8f8fc' : '#353560',
                        border: isLightMode ? '2px solid #e8e8f0' : '2px solid rgba(255, 255, 255, 0.1)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '15px',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        transition: 'all 0.3s ease',
                        '&:focus': {
                            borderColor: '#ff3366',
                            boxShadow: '0 0 0 3px rgba(255, 51, 102, 0.1)',
                            background: isLightMode ? '#ffffff' : '#3a3a68'
                        },
                        '&::placeholder': {
                            color: isLightMode ? '#8888aa' : '#b0b0c8'
                        }
                    },
                    formFieldLabel: {
                        color: isLightMode ? '#1a1a35' : '#e8e8f8',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                    },
                    identityPreviewText: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8'
                    },
                    identityPreviewEditButton: {
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00'
                        }
                    },
                    formHeaderTitle: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                    },
                    formHeaderSubtitle: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '14px'
                    },
                    dividerLine: {
                        background: isLightMode ? '#e8e8f0' : 'rgba(255, 255, 255, 0.15)',
                        height: '1px'
                    },
                    dividerText: {
                        color: isLightMode ? '#8888aa' : '#b0b0c8',
                        fontSize: '13px',
                        fontWeight: '500'
                    },
                    footerActionText: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '14px'
                    },
                    footerActionLink: {
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00',
                            textDecoration: 'underline'
                        }
                    },
                    card: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: '0'
                    },
                    rootBox: {
                        width: '100%'
                    },
                    headerTitle: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '24px',
                        fontWeight: '700'
                    },
                    headerSubtitle: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '15px'
                    },
                    modalBackdrop: {
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(8px)'
                    },
                    alertText: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '14px'
                    },
                    alert: {
                        background: 'rgba(255, 68, 68, 0.1)',
                        border: '1px solid rgba(255, 68, 68, 0.3)',
                        borderRadius: '10px',
                        padding: '12px'
                    },
                    formFieldErrorText: {
                        color: isLightMode ? '#ff3366' : '#ff8899',
                        fontSize: '13px',
                        marginTop: '4px'
                    },
                    otpCodeFieldInput: {
                        background: isLightMode ? '#f8f8fc' : '#353560',
                        border: isLightMode ? '2px solid #e8e8f0' : '2px solid rgba(255, 255, 255, 0.1)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '20px',
                        fontWeight: '700',
                        borderRadius: '12px',
                        width: '48px',
                        height: '56px',
                        '&:focus': {
                            borderColor: '#ff3366',
                            boxShadow: '0 0 0 3px rgba(255, 51, 102, 0.1)'
                        }
                    },
                    selectButton: {
                        background: isLightMode ? '#f8f8fc' : '#353560',
                        border: isLightMode ? '2px solid #e8e8f0' : '2px solid rgba(255, 255, 255, 0.1)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        '&:hover': {
                            borderColor: '#ff3366'
                        }
                    },
                    selectButtonIcon: {
                        color: isLightMode ? '#8888aa' : '#c8c8e0'
                    },
                    avatarImageActionsUpload: {
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00'
                        }
                    },
                    breadcrumbsItem: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8'
                    },
                    breadcrumbsItemDivider: {
                        color: isLightMode ? '#8888aa' : '#b0b0c8'
                    },
                    badge: {
                        background: 'linear-gradient(135deg, #ff3366, #ff6b9d)',
                        color: '#ffffff',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }
                }
            },
            afterSignUpUrl: window.location.href,
        });
        
        signUpMounted = true;
    }
    
    // Mount Clerk SignIn component
    function mountSignIn() {
        if (!clerkInstance || signInMounted) return;
        
        const isLightMode = document.body.classList.contains('light-mode');
        
        clerkSignInContainer.innerHTML = '';
        clerkInstance.mountSignIn(clerkSignInContainer, {
            appearance: {
                baseTheme: undefined,
                layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton'
                },
                variables: {
                    colorPrimary: '#ff3366',
                    colorBackground: isLightMode ? '#ffffff' : '#2a2a4a',
                    colorInputBackground: isLightMode ? '#f8f8fc' : '#353560',
                    colorInputText: isLightMode ? '#1a1a35' : '#ffffff',
                    colorText: isLightMode ? '#1a1a35' : '#ffffff',
                    colorTextSecondary: isLightMode ? '#4a4a6a' : '#d0d0e8',
                    colorDanger: '#ff4444',
                    colorSuccess: '#00ff88',
                    colorWarning: '#ffcc00',
                    borderRadius: '12px',
                    fontFamily: '"Fredoka", sans-serif',
                    fontWeight: {
                        normal: 400,
                        medium: 600,
                        bold: 700
                    }
                },
                elements: {
                    formButtonPrimary: {
                        background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 50%, #ffcc00 100%)',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: '600',
                        textTransform: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(255, 51, 102, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 24px rgba(255, 51, 102, 0.6)',
                        }
                    },
                    formButtonReset: {
                        background: 'transparent',
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        fontSize: '14px',
                        fontWeight: '600',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00',
                        }
                    },
                    socialButtonsBlockButton: {
                        background: isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                        border: isLightMode ? '2px solid #e8e8f0' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '15px',
                        fontWeight: '600',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: isLightMode ? '#f8f8fc' : 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#ff3366',
                            transform: 'translateY(-2px)',
                        }
                    },
                    socialButtonsBlockButtonText: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontWeight: '600'
                    },
                    formFieldInput: {
                        background: isLightMode ? '#f8f8fc' : '#353560',
                        border: isLightMode ? '2px solid #e8e8f0' : '2px solid rgba(255, 255, 255, 0.1)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '15px',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        transition: 'all 0.3s ease',
                        '&:focus': {
                            borderColor: '#ff3366',
                            boxShadow: '0 0 0 3px rgba(255, 51, 102, 0.1)',
                            background: isLightMode ? '#ffffff' : '#3a3a68'
                        },
                        '&::placeholder': {
                            color: isLightMode ? '#8888aa' : '#b0b0c8'
                        }
                    },
                    formFieldLabel: {
                        color: isLightMode ? '#1a1a35' : '#e8e8f8',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                    },
                    identityPreviewText: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8'
                    },
                    identityPreviewEditButton: {
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00'
                        }
                    },
                    formHeaderTitle: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                    },
                    formHeaderSubtitle: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '14px'
                    },
                    dividerLine: {
                        background: isLightMode ? '#e8e8f0' : 'rgba(255, 255, 255, 0.15)',
                        height: '1px'
                    },
                    dividerText: {
                        color: isLightMode ? '#8888aa' : '#b0b0c8',
                        fontSize: '13px',
                        fontWeight: '500'
                    },
                    footerActionText: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '14px'
                    },
                    footerActionLink: {
                        color: isLightMode ? '#ff3366' : '#ff6b9d',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        '&:hover': {
                            color: isLightMode ? '#ff6b9d' : '#ffcc00',
                            textDecoration: 'underline'
                        }
                    },
                    card: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: '0'
                    },
                    rootBox: {
                        width: '100%'
                    },
                    headerTitle: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '24px',
                        fontWeight: '700'
                    },
                    headerSubtitle: {
                        color: isLightMode ? '#4a4a6a' : '#d0d0e8',
                        fontSize: '15px'
                    },
                    alertText: {
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '14px'
                    },
                    alert: {
                        background: 'rgba(255, 68, 68, 0.1)',
                        border: '1px solid rgba(255, 68, 68, 0.3)',
                        borderRadius: '10px',
                        padding: '12px'
                    },
                    formFieldErrorText: {
                        color: isLightMode ? '#ff3366' : '#ff8899',
                        fontSize: '13px',
                        marginTop: '4px'
                    },
                    otpCodeFieldInput: {
                        background: isLightMode ? '#f8f8fc' : '#353560',
                        border: isLightMode ? '2px solid #e8e8f0' : '2px solid rgba(255, 255, 255, 0.1)',
                        color: isLightMode ? '#1a1a35' : '#ffffff',
                        fontSize: '20px',
                        fontWeight: '700',
                        borderRadius: '12px',
                        width: '48px',
                        height: '56px',
                        '&:focus': {
                            borderColor: '#ff3366',
                            boxShadow: '0 0 0 3px rgba(255, 51, 102, 0.1)'
                        }
                    }
                }
            },
            afterSignInUrl: window.location.href,
        });
        
        signInMounted = true;
    }
    
    // Tab switching
    tabSignUp.addEventListener('click', () => {
        tabSignUp.classList.add('active');
        tabSignIn.classList.remove('active');
        clerkSignUpContainer.style.display = 'block';
        clerkSignInContainer.style.display = 'none';
        
        if (!signUpMounted) {
            mountSignUp();
        }
    });
    
    tabSignIn.addEventListener('click', () => {
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        clerkSignInContainer.style.display = 'block';
        clerkSignUpContainer.style.display = 'none';
        
        if (!signInMounted) {
            mountSignIn();
        }
    });
    
    // Account button click
    accountBtn.addEventListener('click', () => {
        if (clerkInstance && clerkInstance.user) {
            // Toggle user menu
            userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
        } else {
            showAuthModal();
        }
    });
    
    // Close modal
    closeAuthBtn.addEventListener('click', hideAuthModal);
    authBackdrop.addEventListener('click', hideAuthModal);
    continueGuestBtn.addEventListener('click', hideAuthModal);
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAuthModal();
            userMenu.style.display = 'none';
        }
    });
    
    // Handle signed in user
    function handleSignedInUser(user) {
        accountBtn.classList.add('logged-in');
        
        // Update user menu
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        const userAvatar = document.getElementById('user-avatar');
        
        userName.textContent = user.fullName || user.firstName || 'User';
        userEmail.textContent = user.primaryEmailAddress?.emailAddress || '';
        
        // Set avatar
        if (user.imageUrl) {
            userAvatar.style.backgroundImage = `url(${user.imageUrl})`;
            userAvatar.style.backgroundSize = 'cover';
            userAvatar.textContent = '';
        } else {
            userAvatar.textContent = (user.firstName?.[0] || user.primaryEmailAddress?.emailAddress?.[0] || 'U').toUpperCase();
        }
        
        hideAuthModal();
    }
    
    // Manage account button
    document.getElementById('manage-account-btn').addEventListener('click', () => {
        if (clerkInstance) {
            clerkInstance.openUserProfile();
        }
        userMenu.style.display = 'none';
    });
    
    // Sign out button
    document.getElementById('sign-out-btn').addEventListener('click', async () => {
        if (clerkInstance) {
            await clerkInstance.signOut();
            accountBtn.classList.remove('logged-in');
            userMenu.style.display = 'none';
            location.reload();
        }
    });
    
    // Close user menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target) && e.target !== accountBtn && !accountBtn.contains(e.target)) {
            userMenu.style.display = 'none';
        }
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        // Add a fun animation to the button
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 400);
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchBar = document.querySelector('.search-bar');
    const gameCards = document.querySelectorAll('.game-card');
    const visibleCountElement = document.getElementById('visible-count');
    
    // Game categories mapping
    const gameCategories = {
        'Gambeling': 'simulation',
        '2048': 'puzzle',
        '100ng': 'action',
        '1': 'sports',
        '9007199254740992': 'action',
        '1v1.lol': 'action',
        '99balls': 'puzzle',
        'a-dance-of-fire-and-ice': 'puzzle',
        'achievementunlocked': 'puzzle',
        'adrenalinechallenge': 'racing',
        'adventure-drivers': 'racing',
        'ages-of-conflict': 'simulation',
        'alienhominid': 'action',
        'align-4': 'puzzle',
        'amazing-rope-police': 'action',
        'amidst-the-clouds': 'puzzle',
        'Amug-Us': 'action',
        'angry-sharks': 'action',
        'aquapark-slides': 'racing',
        'astray': 'puzzle',
        'avalanche': 'action',
        'awesometanks2': 'action',
        'backrooms': 'horror',
        'bacon-may-die': 'action',
        'basket-bros': 'sports',
        'basket-random': 'sports',
        'Basketball-Superstars': 'sports',
        'blockblast': 'puzzle',
        'bob-the-robber-2': 'puzzle',
        'cars-simulator': 'racing',
        'cookie-clicker': 'simulation',
        'DASH': 'action',
        'SHOOT': 'action',
        'Hardest': 'puzzle',
        'hackertype': 'simulation',
        'Dino': 'retro',
        'Doodle-Jump': 'action',
        'drive-mad': 'racing',
        'DriftBoss': 'racing',
        'eggycar': 'racing',
        'electrondash.html': 'action',
        'FlappyBird': 'retro',
        'FNAF2-main': 'horror',
        'fnaf': 'horror',
        'idle-breakout': 'puzzle',
        'M-15': 'simulation',
        'MINER': 'simulation',
        'monkey-mart': 'simulation',
        'moto-x3m': 'racing',
        'motox3m2': 'racing',
        'Paint': 'simulation',
        'paperio2': 'action',
        'POP': 'puzzle',
        'retro-bowl': 'sports',
        'rooftop-snipers': 'action',
        'slope': 'racing',
        'slope-2': 'racing',
        'smash.html': 'racing',
        'snowrider': 'racing',
        'SNAKE': 'retro',
        'Stack': 'puzzle',
        'SubwaySurfers': 'action',
        'Tetris': 'retro',
        'timeshooter3.html': 'action',
        'vex2': 'action',
        'vex3': 'action',
        'vex4': 'action',
        'vex5': 'action',
        'vex6': 'action',
        'vex7': 'action',
        'You Are Jeff Bezos.html': 'simulation'
    };

    const categoryInfo = {
        'action': { icon: '⚔️', name: 'Action' },
        'sports': { icon: '⚽', name: 'Sports' },
        'racing': { icon: '🏎️', name: 'Racing' },
        'puzzle': { icon: '🧩', name: 'Puzzle' },
        'retro': { icon: '👾', name: 'Retro' },
        'horror': { icon: '👻', name: 'Horror' },
        'simulation': { icon: '🎲', name: 'Simulation' }
    };
    
    // Add category badges to game cards
    gameCards.forEach(card => {
        const href = card.getAttribute('href');
        const gameName = href.split('/').pop();
        const category = gameCategories[gameName] || 'action';
        
        // Set data attribute
        card.setAttribute('data-category', category);
        
        // Add badge if it doesn't exist
        const titleElement = card.querySelector('.game-title');
        if (titleElement && !card.querySelector('.game-badge')) {
            const categoryData = categoryInfo[category];
            const badge = document.createElement('span');
            badge.className = `game-badge ${category}`;
            badge.textContent = `${categoryData.icon} ${categoryData.name}`;
            
            // Wrap title in game-info if not already
            if (!titleElement.parentElement.classList.contains('game-info')) {
                const gameInfo = document.createElement('div');
                gameInfo.className = 'game-info';
                titleElement.parentNode.insertBefore(gameInfo, titleElement);
                gameInfo.appendChild(titleElement);
                gameInfo.appendChild(badge);
            } else {
                titleElement.parentElement.appendChild(badge);
            }
        }
    });
    
    // Category filter functionality
    let activeCategory = 'all';
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeCategory = category;
            filterGames();
        });
    });
    
    function filterGames() {
        const searchTerm = searchBar.value.toLowerCase().trim();
        
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('.game-title').textContent.toLowerCase();
            const gameCategory = card.getAttribute('data-category');
            
            const matchesSearch = gameTitle.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || gameCategory === activeCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateGameCount();
    }
    
    // Update visible game count
    function updateGameCount() {
        const visibleGames = Array.from(gameCards).filter(card => {
            return card.style.display !== 'none';
        });
        visibleCountElement.textContent = visibleGames.length;
        
        // Animate the count change
        visibleCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            visibleCountElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Search filter with animation
    searchBar.addEventListener('input', () => {
        filterGames();
    });

    // ===== INITIAL ANIMATIONS =====
    // Stagger game card animations on load
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.6s ease ${1 + (index * 0.03)}s both`;
    });

    // ===== EASTER EGG: KONAMI CODE =====
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateRainbowMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateRainbowMode() {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }

    // ===== SMOOTH SCROLL TO TOP ON LOGO CLICK =====
    const logo = document.getElementById('logo');
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== PERFORMANCE: LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('.card-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    // Simulate loading
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== KEYBOARD NAVIGATION =====
    let currentFocusIndex = -1;
    const gameCardsArray = Array.from(gameCards);
    
    document.addEventListener('keydown', (e) => {
        // Only activate if search is not focused
        if (document.activeElement !== searchBar) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentFocusIndex = Math.min(currentFocusIndex + 1, gameCardsArray.length - 1);
                focusCard(currentFocusIndex);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentFocusIndex = Math.max(currentFocusIndex - 1, 0);
                focusCard(currentFocusIndex);
            } else if (e.key === 'Enter' && currentFocusIndex >= 0) {
                gameCardsArray[currentFocusIndex].click();
            }
        }
    });
    
    function focusCard(index) {
        const card = gameCardsArray[index];
        if (card && card.style.display !== 'none') {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.outline = '3px solid var(--accent-primary)';
            card.style.outlineOffset = '4px';
            
            // Remove outline from other cards
            gameCardsArray.forEach((c, i) => {
                if (i !== index) {
                    c.style.outline = 'none';
                }
            });
        }
    }

    // ===== RANDOM GAME SUGGESTION =====
    function getRandomGame() {
        const visibleCards = gameCardsArray.filter(card => card.style.display !== 'none');
        if (visibleCards.length > 0) {
            const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
            randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            randomCard.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                randomCard.style.animation = '';
            }, 1000);
        }
    }
    
    // Add keyboard shortcut for random game (Ctrl/Cmd + R)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && document.activeElement !== searchBar) {
            e.preventDefault();
            getRandomGame();
        }
    });

    // ===== ANALYTICS: TRACK POPULAR GAMES =====
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameName = card.querySelector('.game-title').textContent;
            console.log(`Game clicked: ${gameName}`);
            // In production, you could send this to analytics
        });
    });

    console.log('🎮 GameZone loaded successfully!');
    console.log('💡 Tips: Use Ctrl/Cmd + R for random game, arrow keys to navigate!');
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
