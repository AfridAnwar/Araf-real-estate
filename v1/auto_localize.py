import os
import re
import json
from html.parser import HTMLParser

class LocalizeParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.current_tags = []
        self.in_script_style = False
        self.replacements = [] # list of (starttag_line, starttag_offset, tag_name, text)

    def handle_starttag(self, tag, attrs):
        self.current_tags.append({
            'tag': tag,
            'attrs': dict(attrs),
            'pos': self.getpos() # (line, offset)
        })
        if tag in ['script', 'style']:
            self.in_script_style = True

    def handle_endtag(self, tag):
        if self.current_tags:
            self.current_tags.pop()
        if tag in ['script', 'style']:
            self.in_script_style = False

    def handle_data(self, data):
        if self.in_script_style:
            return
        
        text = data.strip()
        if not text:
            return
            
        # Ignore purely numeric or symbol-only strings roughly
        if not any(c.isalpha() for c in text):
            return

        # Check parent
        if self.current_tags:
            parent = self.current_tags[-1]
            parent_tag = parent['tag']
            parent_attrs = parent['attrs']
            parent_pos = parent['pos']
            
            if 'lng-tag' in parent_attrs:
                return # Already translated
            
            self.replacements.append({
                'tag': parent_tag,
                'pos': parent_pos,
                'text': text
            })

def process_file(file_path, en_json, ar_json):
    if not os.path.exists(file_path):
        return

    basename = os.path.basename(file_path).replace('.html', '').replace(' ', '-')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines(keepends=True)
        
    parser = LocalizeParser(file_path)
    parser.feed("".join(lines))
    
    if not parser.replacements:
        return

    # Sort replacements in reverse order of line and offset so we can modify lines safely from bottom up
    # Wait, modifying a line might change the offsets for subsequent replacements ON THE SAME LINE.
    # So we sort by line DESC, offset DESC.
    parser.replacements.sort(key=lambda x: (x['pos'][0], x['pos'][1]), reverse=True)
    
    count = 1
    for rep in parser.replacements:
        line_idx = rep['pos'][0] - 1
        offset = rep['pos'][1]
        tag = rep['tag']
        text = rep['text']
        
        # Generate a unique key
        # Try to make a slug from the text (up to 3 words)
        words = re.sub(r'[^a-zA-Z0-9 ]', '', text).split()[:3]
        slug = "-".join(words).lower()
        if not slug:
            slug = "text"
        key = f"auto-{basename}-{slug}-{count}"
        count += 1
        
        # Add to JSON
        if key not in en_json:
            en_json[key] = text
        if key not in ar_json:
            ar_json[key] = text # Use english text as placeholder in arabic
            
        # Add lng-tag to the HTML
        # The line contains the start tag at `offset`.
        # e.g. `<div class="something">` at offset. We want `<div lng-tag="KEY" class="something">`
        # OR just insert right after the tag name.
        
        original_line = lines[line_idx]
        
        # The tag name starts right after the '<' character.
        # It's at original_line[offset:]. We find the first space or '>' after the tag name.
        
        # We know the tag starts at `offset`.
        # Ensure it actually is a '<'
        if original_line[offset] == '<':
            tag_end_idx = offset + 1 + len(tag)
            
            # Insert lng-tag="{key}"
            insert_str = f' lng-tag="{key}"'
            new_line = original_line[:tag_end_idx] + insert_str + original_line[tag_end_idx:]
            lines[line_idx] = new_line

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write("".join(lines))
        
    print(f"Processed {file_path}, added {len(parser.replacements)} tags.")


def main():
    html_files = [
        "./blog-details.html", "./project-single.html", "./contact.html", "./architecture-project.html",
        "./checkout.html", "./rnovation.html", "./index.html", "./blog-sidebar.html",
        "./project-details.html", "./service-details.html", "./properties.html", "./cart.html",
        "./project.html", "./index.html", "./product-details.html", "./about.html",
        "./faq.html", "./error.html", "./service-details 2.html", "./project-masonary.html",
        "./interior.html", "./project-info-flow.html", "./shop.html", "./meeting.html",
        "./architecture.html", "./service.html", "./service-details-ar.html", "./projectstatus.html",
        "./blog-masonary.html", "./property-details.html", "./blog-grid.html", "./brand.html",
        "./team.html"
    ]
    
    with open('assets/lng/en.json', 'r', encoding='utf-8') as f:
        en_json = json.load(f)
    
    with open('assets/lng/ar.json', 'r', encoding='utf-8') as f:
        ar_json = json.load(f)
        
    for file_path in html_files:
        process_file(file_path, en_json, ar_json)
        
    with open('assets/lng/en.json', 'w', encoding='utf-8') as f:
        json.dump(en_json, f, indent=2, ensure_ascii=False)
        
    with open('assets/lng/ar.json', 'w', encoding='utf-8') as f:
        json.dump(ar_json, f, indent=2, ensure_ascii=False)
        
    print("Done generating auto localizations.")

if __name__ == "__main__":
    main()
