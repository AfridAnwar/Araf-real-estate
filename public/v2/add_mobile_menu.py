import os

menu_html = """
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobile-menu">
        <button class="mobile-menu-close" id="mobile-menu-close">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="mobile-menu-content">
            <nav class="mobile-nav-links">
                <a href="index.html" lng-tag="nav-home">Home</a>
                <a href="projects.html" lng-tag="nav-projects">Projects</a>
                <a href="about.html" lng-tag="nav-about">About Us</a>
                <a href="project-status.html" lng-tag="nav-status">Project Status</a>
            </nav>
            <div class="mobile-actions">
                <div class="lang-switch-mobile">
                    <a href="#" class="active" onclick="changeLanguage('en')">EN</a>
                    <span>|</span>
                    <a href="#" onclick="changeLanguage('ar')">عربي</a>
                </div>
                <a href="meeting.html" class="btn btn-primary" lng-tag="nav-meeting" style="margin-top: 20px; width: 100%; text-align: center;">Book a Meeting</a>
            </div>
        </div>
    </div>
"""

files = [
    'index.html', 'about.html', 'projects.html', 'project-status.html',
    'project-detail.html', 'contact.html', 'meeting.html'
]

for file in files:
    path = os.path.join('/home/habib/Documents/habib/emergent/Araf-real-estate/v2', file)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'id="mobile-menu"' not in content:
            # Insert right before </header> or <main>
            if '    <main>' in content:
                content = content.replace('    <main>', menu_html + '\n    <main>')
            elif '<!-- Main Content -->' in content:
                content = content.replace('<!-- Main Content -->', menu_html + '\n<!-- Main Content -->')
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added menu to {file}")

