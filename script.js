/* Navigation Active Indicator */
nav {
    position: relative;
}

.nav-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4dabf7, #3bc9db);
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease;
    width: 0;
}

.nav-link.active {
    color: #4dabf7;
}
