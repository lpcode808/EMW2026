# Speaker Bios — Implementation Plan

## Goal

Add a short AI-drafted bio and 2–3 "learn more" links to every speaker card in the Speakers tab. Right now each card only shows name, title, company, session chips, and a g.ai search link. A quick bio paragraph gives students context before they go searching.

## Teacher Action Required

Review every bio draft below before implementing. These are AI-generated starting points — please edit for accuracy, tone, and any facts you want to add or correct.

---

## Data Structure Change

Add two fields to each entry in the `SPEAKERS` array in `index.html`:

```js
{
  name: "Tim Draper",
  role: "Founder",
  company: "Draper Associates",
  sessions: ["thu-09"],
  bio: "Tim Draper is one of Silicon Valley's most famous venture capitalists, known for early bets on Tesla, SpaceX, Skype, Hotmail, and Bitcoin. He's a third-generation VC — his grandfather started a fund, his father co-founded DFJ — and is known for making bold contrarian calls that most investors pass on.",
  links: [
    { label: "Draper Associates", url: "https://www.draper.vc/" },
    { label: "Draper history", url: "https://www.draper.vc/history" }
  ]
}
```

## UI Change (when implementing)

In `renderSpeakers()`, add a `<p class="speaker-bio">` block between the company line and the session chips, and render the `links` array as additional `<a class="ext-link">` elements after the g.ai search link.

Suggested CSS class:
```css
.speaker-bio {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0.5rem 0 0.75rem;
}
```

---

## Speaker Bio Drafts

### Abigail Wen
**Role:** Author & Filmmaker · New York Times Bestselling Author  
**Sessions:** thu-11 (Intersection of Entertainment and AI)

> Abigail Hing Wen is a New York Times bestselling YA author and filmmaker. Her debut novel *Loveboat, Taipei* was adapted into a film she also produced. She speaks about representation in storytelling, the creative process, and how AI is changing what it means to be an author or filmmaker.

**Links:**
- [abigailhingwen.com](https://www.abigailhingwen.com/about/)
- [Loveboat Taipei](https://www.goodreads.com/book/show/43397183-loveboat-taipei)

---

### Alex Fielding
**Role:** Chief Executive Officer · Privateer  
**Sessions:** thu-08 (From Hawaiʻi to Orbit)

> Alex Fielding is CEO of Privateer, a space-domain awareness company working to map and manage the debris cluttering Earth's orbit. He previously co-founded Rivet Networks alongside Apple co-founder Steve Wozniak. He brings an engineering background to one of the most urgent problems in the modern space economy.

**Links:**
- [Privateer](https://www.privateer.com/company)
- [Space debris explained](https://www.esa.int/Space_Safety/Space_Debris/About_space_debris)

---

### Angela Laprete
**Role:** Producer · ICAN  
**Sessions:** thu-12 (A Conversation with the Writer/Creator of Chief of War)

> Angela Laprete is an award-winning producer at ICAN (Indigenous Cultural Arts Network), where she works on projects that center Pacific and Native voices. She produced *Chief of War*, the Apple TV+ series that tells Hawaiian history from a Native Hawaiian perspective alongside Jason Momoa.

**Links:**
- [ICAN International](https://www.icanintl.org/about)
- [Chief of War on Apple TV+](https://www.apple.com/tv-pr/news/2025/03/apple-tv-unveils-first-look-at-star-executive-producer-and-writer-jason-momoa-in-the-epic-new-drama-chief-of-war-premiering-globally-friday-august-1-2025/)

---

### Ashley Lukens
**Role:** Director · Ashley Lukens Consulting  
**Sessions:** thu-02 (Women's Breakfast)

> Ashley Lukens is a leadership consultant and facilitator based in Hawaiʻi. She works with organizations to build healthier cultures and more equitable workplaces. Her background spans public health, policy, and community organizing.

**Links:**
- [Ashley Lukens Consulting](https://www.ashleylukens.com/)

---

### Bill Bryant
**Role:** General Partner · Threshold Ventures  
**Sessions:** thu-14 (VC 1-on-1 Meetings), thu-19 (Startup World Cup Hawaiʻi Regional)

> Bill Bryant is a General Partner at Threshold Ventures (formerly Draper Fisher Jurvetson), one of Silicon Valley's most established venture funds. He focuses on enterprise software and cloud infrastructure startups, and has been investing for more than two decades.

**Links:**
- [Threshold Ventures team](https://threshold.vc/team)
- [Threshold portfolio](https://threshold.vc/portfolio)

---

### Bill Reichert
**Role:** General Partner · Pegasus Tech Ventures  
**Sessions:** thu-20 (The Pacific Bridge), thu-21 (Pitch Winner Announcement)

> Bill Reichert is a General Partner at Pegasus Tech Ventures and a veteran Silicon Valley investor with over 30 years of experience. He runs the Startup World Cup — a global pitch competition now held in 60+ cities — and is known for coaching founders on how to pitch more clearly and compellingly.

**Links:**
- [Pegasus Tech Ventures team](https://www.pegasustechventures.com/our-team)
- [Startup World Cup](https://www.startupworldcup.io/)

---

### Brent Freeman
**Role:** Founder & CEO · Alchemy of Joy  
**Sessions:** thu-10 (Mindfulness Intro), thu-17 (Mindfulness Interlude)

> Brent Freeman is a mindfulness teacher and entrepreneur who founded Alchemy of Joy. He combines business experience with contemplative practice, helping leaders and teams perform at their best without burning out. His sessions at EMW are built as practical resets, not lectures.

**Links:**
- [Brent Freeman](https://brentfreeman.com/)
- [Brent's meditations](https://brentfreeman.com/meditations)

---

### Brian Keaulana
**Role:** Producer · ICAN  
**Sessions:** thu-12 (A Conversation with the Writer/Creator of Chief of War)

> Brian Keaulana is a legendary Hawaiian waterman, ocean safety expert, and cultural producer. He's one of the most respected figures in Hawaiian surfing, ocean rescue, and stunt work, and has spent decades preserving and celebrating Native Hawaiian culture through film and storytelling.

**Links:**
- [ICAN International](https://www.icanintl.org/about)
- [Brian Keaulana Wikipedia](https://en.wikipedia.org/wiki/Brian_Keaulana)

---

### Chenoa Farnsworth
**Role:** Managing Partner · Blue Startups  
**Sessions:** thu-04 (Welcome), thu-22 (Wrap Up)

> Chenoa Farnsworth is Managing Partner at Blue Startups, Hawaiʻi's most active startup accelerator. She has helped dozens of companies — many from the Asia-Pacific region — raise funding and grow their business. She is one of the central figures building Hawaiʻi's tech and startup ecosystem.

**Links:**
- [Blue Startups](https://bluestartups.com/about)
- [East Meets West](https://eastmeetswest.co/)

---

### Chris Yeh
**Role:** Founding Partner · Blitzscaling Ventures  
**Sessions:** thu-15 (Blitzscaling: The Sequel)

> Chris Yeh co-wrote the book *Blitzscaling* with Reid Hoffman, LinkedIn's co-founder, explaining how companies like Airbnb and Facebook grew explosively fast to win their markets. He is now a Founding Partner at Blitzscaling Ventures and lectures on entrepreneurship at Stanford and other universities.

**Links:**
- [Chris Yeh](https://www.chrisyeh.com/)
- [Blitzscaling book](https://www.blitzscaling.com/)

---

### Dan Dan Li
**Role:** Founder · Popshop Live  
**Sessions:** thu-11 (Intersection of Entertainment and AI)

> Dan Dan Li is the founder of Popshop Live, a live video shopping platform that lets creators sell directly to fans in real time. She's an example of how entertainment, commerce, and technology are merging — and how AI tools are reshaping what individual creators can build.

**Links:**
- [Popshop Live](https://popshoplive.com/)

---

### David Holt
**Role:** Program Director · Blue Startups  
**Sessions:** thu-04 (Welcome), thu-22 (Wrap Up)

> David Holt is Program Director at Blue Startups, overseeing the accelerator's day-to-day operations and events like East Meets West. He works closely with founders during the program cycle and connects startups to the broader Hawaiʻi tech and investor community.

**Links:**
- [Blue Startups](https://bluestartups.com/about)

---

### Helena Janulis
**Role:** Director of Operations · Investable Oceans  
**Sessions:** thu-07 (Launching Prosperity: Hawaiʻi's Space and Blue Economy Strategy)

> Helena Janulis leads operations at Investable Oceans, a platform that connects capital to sustainable ocean businesses — from aquaculture to marine technology. She works at the frontier of the "blue economy," building financial pipelines for companies that treat the ocean as an economic and ecological asset.

**Links:**
- [Investable Oceans team](https://www.investableoceans.com/pages/our-team)
- [What is the blue economy?](https://www.worldbank.org/en/topic/oceans-fisheries-and-coastal-economies)

---

### Henk Rogers
**Role:** Founder · Blue Planet Alliance  
**Sessions:** thu-08 (From Hawaiʻi to Orbit)

> Henk Rogers is the entrepreneur who licensed Tetris to Nintendo in the 1980s — one of the most important deals in gaming history. Since then he has pivoted to clean energy and space: he founded the Blue Planet Alliance to end fossil fuel use, and co-founded Privateer to address space debris. He lives in Hawaiʻi and is deeply invested in the islands' future.

**Links:**
- [Blue Planet Alliance](https://blueplanetalliance.org/about-us)
- [Privateer](https://www.privateer.com/company)

---

### Holly Liu
**Role:** Co-founder · VENN  
**Sessions:** thu-11 (Intersection of Entertainment and AI)

> Holly Liu is a serial entrepreneur and co-founder of Kabam, a mobile games company that sold for over $700 million. She's now co-founder of VENN, a gaming-focused media network, and is a prominent voice on creativity, company-building, and how AI is changing entertainment.

**Links:**
- [VENN](https://www.venn.tv/)
- [Holly Liu pod (Tiger Eye)](https://www.tigereye.com/podcast/holly-liu-co-founder-kabam-the-art-of-the-pivot)

---

### James Tokioka
**Role:** Director · Hawaiʻi DBEDT  
**Sessions:** thu-06 (Hawaiʻi State DBEDT Director Welcome)

> James Tokioka is the Director of Hawaiʻi's Department of Business, Economic Development and Tourism — the state agency responsible for growing the economy and attracting investment. He previously served as a state legislator. He shapes policy that affects startups, tech, energy, and tourism across the islands.

**Links:**
- [DBEDT Hawaii](https://dbedt.hawaii.gov/)
- [Director bio](https://dbedt.hawaii.gov/about/director/)

---

### Jeannie Yang
**Role:** Ex-SVP Product & CPO · Smule  
**Sessions:** thu-11 (Intersection of Entertainment and AI)

> Jeannie Yang served as Chief Product Officer at Smule, a music-making app with hundreds of millions of users worldwide. She brings deep expertise in product strategy and how technology enables human creativity — particularly in music. She's now an advisor and speaker on the intersection of AI and creative platforms.

**Links:**
- [Smule](https://www.smule.com/)

---

### John Lim
**Role:** Chief Strategy Officer · Pegasus Tech Ventures  
**Sessions:** thu-18 (Pegasus Tech Ventures Introduction)

> John Lim is Chief Strategy Officer at Pegasus Tech Ventures and a key architect of the Startup World Cup's global expansion. He works on building the network of regional competitions — now in 60+ cities — that connect local startup ecosystems to Silicon Valley investors and resources.

**Links:**
- [Pegasus Tech Ventures team](https://www.pegasustechventures.com/our-team)
- [Startup World Cup FAQ](https://www.startupworldcup.io/faq)

---

### Keyvan Peymani
**Role:** VC Facilitator · VC 1-on-1 Meetings  
**Sessions:** thu-14 (VC 1-on-1 Meetings)

> Keyvan Peymani facilitates the VC 1-on-1 matchmaking sessions at East Meets West, connecting startup founders with investors for focused, time-boxed conversations. He works on making the early fundraising process more structured and accessible for founders from the Pacific region.

*(No external links needed — facilitator role)*

---

### Maya Rogers
**Role:** President & CEO · Tetris  
**Sessions:** thu-04 (Welcome), thu-20 (The Pacific Bridge), thu-22 (Wrap Up)

> Maya Rogers is President and CEO of The Tetris Company — the organization behind one of the best-selling and most-played video games in history. She's also a longtime member of Hawaiʻi's tech community and a co-host of East Meets West, connecting global entertainment and local entrepreneurship.

**Links:**
- [The Tetris Company](https://tetris.com/about-tetris)
- [Tetris Wikipedia](https://en.wikipedia.org/wiki/The_Tetris_Company)

---

### Miki Hardisty
**Role:** Co-founder & CEO · ʻŌlelo Intelligence  
**Sessions:** thu-20 (The Pacific Bridge)

> Miki Hardisty co-founded ʻŌlelo Intelligence, a startup building AI tools for the Hawaiian language and Pacific cultures. She's working on one of the most important questions in AI: how do we build language technology that *preserves* rather than erodes indigenous languages? Her company is a real-world example of community-driven tech.

**Links:**
- [ʻŌlelo Intelligence](https://www.olelo-ai.com/about-us)

---

### Paʻa Sibbett
**Role:** Writer & Creator · Chief of War (Apple TV+)  
**Sessions:** thu-12 (A Conversation with the Writer/Creator of Chief of War)

> Paʻa Sibbett is the co-creator and writer of *Chief of War*, an Apple TV+ series about the unification of the Hawaiian Islands told from a Native Hawaiian point of view. He worked with Jason Momoa to bring this story to a global audience while maintaining cultural accuracy and respect. His work is a case study in what it means to control your own narrative.

**Links:**
- [Chief of War on Apple TV+](https://www.apple.com/tv-pr/news/2025/03/apple-tv-unveils-first-look-at-star-executive-producer-and-writer-jason-momoa-in-the-epic-new-drama-chief-of-war-premiering-globally-friday-august-1-2025/)
- [Paʻa on Hawaiʻi Public Radio](https://www.hawaiipublicradio.org/the-conversation/2025-07-03/chief-of-war-co-creator-on-telling-hawaiian-stories-in-hollywood)

---

### Rayfe Gaspar-Asaoka
**Role:** Partner · Geodesic Capital  
**Sessions:** thu-14 (VC 1-on-1 Meetings), thu-19 (Startup World Cup Hawaiʻi Regional)

> Rayfe Gaspar-Asaoka is a partner at Geodesic Capital, a venture fund focused on deep tech, national security, and the U.S.–Japan relationship. He looks for founders working on hard infrastructure problems: semiconductors, defense technology, and the systems that underpin the global economy.

**Links:**
- [Geodesic Capital](https://geodesiccap.com/)
- [Rayfe at Geodesic](https://geodesiccap.com/insight/five-deeptech-and-national-security-themes-defining-2026/)

---

### Rich Robinson
**Role:** Entrepreneur-in-Residence · Animoca Brands  
**Sessions:** thu-20 (The Pacific Bridge)

> Rich Robinson is an Entrepreneur-in-Residence at Animoca Brands, one of the largest companies in Web3 gaming and digital ownership. He works at the frontier of blockchain-based economies and the next generation of digital assets. His presence at EMW signals how seriously the Web3 world is watching the Asia-Pacific market.

**Links:**
- [Animoca Brands](https://www.animocabrands.com/)
- [Rich Robinson pod](https://www.podcasts.animocabrands.com/founder-insights-ep26)

---

### Summer Kim
**Role:** Partner & Head of User Research · StratMinds VC  
**Sessions:** thu-14 (VC 1-on-1 Meetings), thu-19 (Startup World Cup Hawaiʻi Regional)

> Summer Kim is a partner at StratMinds VC who brings a rare skillset to venture capital: deep user research expertise. Rather than evaluating startups purely on financials, she digs into whether a product actually works for real people. She's a judge at the Startup World Cup Hawaiʻi Regional.

**Links:**
- [StratMinds VC team](https://www.stratminds.vc/team)

---

### Tey Bannerman
**Role:** Human-Centred AI Advisor · McKinsey & Company  
**Sessions:** thu-16 (The Navigator's Playbook: Being Human in the Age of AI)

> Tey Bannerman is a human-centred AI advisor at McKinsey & Company, working with large organizations to implement AI responsibly. His keynote asks a fundamental question relevant to every student: as AI takes over more routine tasks, what does it mean to be useful and irreplaceable at work?

**Links:**
- [Tey Bannerman](https://teybannerman.com/)
- [Why AI won't replace jobs](https://teybannerman.com/ai/strategy/2025/11/05/why-ai-wont-replace-jobs.html)

---

### Tim Draper
**Role:** Founder · Draper Associates  
**Sessions:** thu-09 (Fireside Chat with Tim Draper)

> Tim Draper is one of Silicon Valley's most famous venture capitalists, known for early investments in Tesla, SpaceX, Skype, Hotmail, and Bitcoin. He's a third-generation VC — his grandfather started a fund, his father co-founded DFJ — and is known for making bold contrarian bets that most investors pass on.

**Links:**
- [Draper Associates team](https://www.draper.vc/team)
- [Draper history](https://www.draper.vc/history)

---

### Trung Lam
**Role:** Executive Director · Hawaii Technology Development Corporation  
**Sessions:** thu-07 (Launching Prosperity: Hawaiʻi's Space and Blue Economy Strategy)

> Trung Lam is Executive Director of the Hawaiʻi Technology Development Corporation (HTDC), the state agency that supports tech companies and helps build Hawaiʻi's innovation economy. He bridges government policy and the startup world, directing programs that fund and grow technology businesses across the islands.

**Links:**
- [HTDC](https://www.htdc.org/)
- [HTDC aerospace programs](https://www.htdc.org/programs/aerospace/)

---

## Implementation Checklist (for later)

- [ ] Teacher reviews and edits all 27 bio drafts above
- [ ] Add `bio` and `links` fields to each SPEAKERS entry in `index.html`
- [ ] Add `.speaker-bio` CSS class to the style block
- [ ] Update `renderSpeakers()` to render the bio paragraph and extra links
- [ ] Test that accordion expand/collapse still works with the added content
- [ ] Verify all links are live before publishing

---

*Bios drafted by AI on 2026-04-04. All facts should be verified before publishing to students.*
