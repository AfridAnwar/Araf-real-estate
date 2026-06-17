import json

def update_json(filepath, new_data):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data.update(new_data)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

en_data = {
    "manifesto-text": "We do not just build structures. We engineer enduring legacies in the Saudi landscape, blending absolute precision with uncompromising luxury.",
    "masterpieces-title": "The Masterpieces",
    "masterpieces-fig": "Fig.",
    "masterpieces-estate": "Araf Estate",
    "anatomy-index": "Index 04",
    "anatomy-title": "The Anatomy of Luxury",
    "anatomy-material-title": "Material Integrity",
    "anatomy-material-desc": "Every development is predicated on uncompromising material selection. From locally sourced Riyadh stone to imported Italian statuario, our supply chain ensures that surface aesthetics perfectly match structural longevity.",
    "anatomy-spatial-title": "Spatial Geometry",
    "anatomy-spatial-desc": "Volume is the ultimate luxury. Our layouts are engineered to maximize natural light refraction, ensuring every square meter serves a psychological and functional purpose.",
    "invitation-subtitle": "Your Legacy Awaits",
    "invitation-title": "Begin your journey with Araf.",
    "invitation-btn": "Book a Meeting"
}

ar_data = {
    "manifesto-text": "نحن لا نبني هياكل فحسب. بل نصمم إرثاً خالداً في المشهد العمراني السعودي، دامجين بين الدقة المطلقة والرفاهية التي لا تضاهى.",
    "masterpieces-title": "الروائع المعمارية",
    "masterpieces-fig": "شكل",
    "masterpieces-estate": "أراف العقارية",
    "anatomy-index": "فهرس 04",
    "anatomy-title": "تشريح الرفاهية",
    "anatomy-material-title": "نزاهة المواد",
    "anatomy-material-desc": "يعتمد كل مشروع على اختيار لا تشوبه شائبة للمواد. من حجر الرياض المحلي إلى رخام ستاتواريو الإيطالي المستورد، تضمن سلسلة التوريد لدينا أن تتطابق الجماليات السطحية تماماً مع طول العمر الهيكلي.",
    "anatomy-spatial-title": "الهندسة الفضائية",
    "anatomy-spatial-desc": "الحجم هو قمة الرفاهية. تم تصميم مخططاتنا لزيادة انكسار الضوء الطبيعي، مما يضمن أن كل متر مربع يخدم غرضاً نفسياً ووظيفياً.",
    "invitation-subtitle": "إرثك بانتظارك",
    "invitation-title": "ابدأ رحلتك مع أراف.",
    "invitation-btn": "حجز موعد"
}

update_json('/home/habib/Documents/habib/emergent/Araf-real-estate/v3/public/assets/lng/en.json', en_data)
update_json('/home/habib/Documents/habib/emergent/Araf-real-estate/v3/public/assets/lng/ar.json', ar_data)
