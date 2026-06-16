import os
import glob

replacements = {
    "NEW YORK": "Dammam",
    "WASHINGTON DC": "Riyadh",
    "8204 Glen Ridge DriveEndicott, NY 13760": "King Abdullah Road",
}

def fix_address():
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
            print(f"Updated address in {file_path}")

if __name__ == "__main__":
    fix_address()
