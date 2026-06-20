import os
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.untranslated = []
        self.current_tags = []
        self.in_script_style = False

    def handle_starttag(self, tag, attrs):
        self.current_tags.append((tag, dict(attrs)))
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
            parent_tag, parent_attrs = self.current_tags[-1]
            if 'lng-tag' in parent_attrs:
                return # Group A: Already translated
            
            # Group B: Needs translation
            # context: parent tag
            self.untranslated.append({
                'text': text,
                'parent': parent_tag,
                'classes': parent_attrs.get('class', '')
            })

def audit_files(files):
    results = {}
    for file_path in files:
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        parser = TextExtractor()
        parser.feed(content)
        
        if parser.untranslated:
            results[file_path] = parser.untranslated
            
    return results

files = [
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

audit_results = audit_files(files)

# Print strict output format for the user
for file, items in audit_results.items():
    print(f"\nFile: {file}")
    # Show first 5 items as a sample to avoid overwhelming output, or all if short
    count = len(items)
    print(f"  Count: {count} untranslated elements")
    for i, item in enumerate(items[:5]):
        print(f"  - [{item['parent']}] \"{item['text'][:50]}...\"")
    if count > 5:
        print(f"  ... and {count - 5} more.")
