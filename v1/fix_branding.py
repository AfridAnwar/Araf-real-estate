import os
import glob

replacements = {
    "Vernex- Architecture & Construction Website Template.": "Araf Real Estate",
    "Vernex": "Araf Real Estate",
    "Egens Lab": "Zuvi8 Creatives",
    "https://www.egenslab.com/": "#",
    "Welcome to Vernex, where innovation meet our passion in a journey that started dream.": "Welcome to Araf Real Estate, where innovation meets our passion in a journey that started with a dream.",
    "Welcome to Araf Real Estate, where innovation meet our passion in a journey that started dream.": "Welcome to Araf Real Estate, where innovation meets our passion in a journey that started with a dream."
}

def fix_branding():
    html_files = glob.glob('*.html')
    json_files = glob.glob('assets/lng/*.json')
    all_files = html_files + json_files
    
    for file_path in all_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated branding in {file_path}")

if __name__ == "__main__":
    fix_branding()
