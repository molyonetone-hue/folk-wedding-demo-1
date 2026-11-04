/* =====================================================================
   WEDDING CONFIGURATION — THE ONLY FILE YOU NEED TO EDIT PER COUPLE
   ---------------------------------------------------------------------
   ONETONE STUDIO · "The Heritage Kalyanam" template

   How text works:
   • Anything written as { en: "...", ta: "..." } is bilingual.
     The site shows `en` in English mode and `ta` in Tamil mode.
   • A plain "string" is shown the same in both languages.

   ⚠ TAMIL REVIEW: All Tamil (`ta`) copy in this file is a DRAFT written
     for the demo. Please have a fluent Tamil speaker review every `ta`
     line before publishing for a real couple.

   Tip: keep the commas and quote marks exactly as they are. If the site
   goes blank after an edit, a missing comma or quote is the usual cause.
   ===================================================================== */

window.WEDDING_CONFIG = {

  /* ---------- 1. BASICS ---------------------------------------------- */
  meta: {
    pageTitle: "Arwind & Thivya · 06.02.2027",
    description: "Two hearts. Two families. One beautiful beginning. The wedding of Arwind & Thivya, Kuala Lumpur, 6 February 2027.",
    shareImage: "assets/images/og-image.svg"
  },

  defaultLanguage: "en",          // "en" or "ta"

  couple: {
    // Partner 1 is shown first in the names (e.g. ARWIND & THIVYA)
    partner1: {
      first: { en: "Arwind", ta: "அர்விந்த்" },
      full: { en: "Arwind Raj Kumar", ta: "அர்விந்த் ராஜ் குமார்" },
      nickname: "Win",
      role: { en: "The Groom", ta: "மணமகன்" }
    },
    partner2: {
      first: { en: "Thivya", ta: "திவ்யா" },
      full: { en: "Thivya Priya Nadarajan", ta: "திவ்யா பிரியா நடராஜன்" },
      nickname: "Thivi",
      role: { en: "The Bride", ta: "மணமகள்" }
    },
    monogram: "A · T"
  },

  // Main wedding moment — used by the countdown. Keep the +08:00 (Malaysia time).
  weddingDateISO: "2027-02-06T09:00:00+08:00",
  weddingDateDisplay: { en: "06 February 2027", ta: "06 பிப்ரவரி 2027" },
  weddingLocation: { en: "Sri Kandaswamy Temple, Brickfields, Kuala Lumpur", ta: "ஸ்ரீ கந்தசாமி கோவில், பிரிக்ஃபீல்ட்ஸ், கோலாலம்பூர்" },

  /* ---------- 2. LOOK & FEEL ----------------------------------------- */
  // Change these to re-colour the whole site.
  theme: {
    oxide: "#8B2A22",      // red oxide / rose red
    maroon: "#5E1A1D",     // deep silk maroon
    turmeric: "#E3A72F",
    leaf: "#3E5B2C",       // banana leaf
    brass: "#C49A4A",      // lamp brass
    coconut: "#3B2316",    // old teak
    ivory: "#F4EBDA",      // jasmine ivory
    kolam: "#FBF6EC"       // kolam white
  },
  showIntro: true,                // false = skip the cinematic preloader entirely
  showCustomCursor: true,         // subtle cursor ring on desktop only

  /* ---------- 3. MUSIC (YouTube) ------------------------------------- */
  // Paste an 11-character YouTube video ID that you are allowed to use
  // and whose owner allows embedding, e.g. https://youtu.be/XXXXXXXXXXX
  // While the ID is "YOUR_VIDEO_ID", music is switched off and the site
  // works normally without any sound controls.
  //
  // Alternative: a licensed audio file you own the rights to, e.g.
  // audioFile: "assets/audio/entrance.mp3". If set, it is used instead of
  // YouTube and can keep playing quietly in the background.
  music: {
    enabled: true,
    // Paste the couple's entrance song here — a full YouTube link or the 11-char video ID.
    // It starts automatically the moment a guest taps to enter the invitation.
    youtubeVideoId: "https://www.youtube.com/watch?v=tu_o0UvLNwQ",
    audioFile: "",
    startSeconds: 3,
    volume: 45,                   // 0–100 (phones may ignore this)
    loop: true,
    trackTitle: { en: "Sita Kalyanam", ta: "ஸீதா கல்யாணம்" },
    // Optional "open in YouTube Music" link, shown as an alternative.
    youtubeMusicUrl: "https://music.youtube.com/"
  },

  /* ---------- 4. INTERFACE TEXT -------------------------------------- */
  // Every label, heading and button on the site. Add a key in both
  // languages; use it in index.html with data-i18n="yourKey".
  text: {
    en: {
      skipIntro: "Skip intro",
      introLine1: "Two hearts.",
      introLine2: "Two families.",
      introLine3: "One beautiful beginning.",
      enter: "Enter Our Celebration",
      bestWithMusic: "Best experienced with music",
      musicOn: "With music",
      musicOff: "Without music",
      heroEyebrow: "The wedding of", introWelcome: "Welcome to the wedding of", calHead: "Daily calendar", giftSeal: "Moi", saveTheDate: "Save the Date",
      heroBlessing: "With the blessings of our families",
      heroInvite: "invite you to celebrate the beginning of their forever.",
      days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      countdownDone: "Just married, thank you for celebrating with us.",
      scroll: "Scroll to begin",
      menu: "Menu", close: "Close",
      navHome: "Home", navStory: "Our Story", navCouple: "Meet Us",
      navEvents: "Celebrations", navWishlist: "Wishlist",
      navGuestbook: "Guestbook", navMemories: "Memories",
      chapter1: "Heritage", chapter2: "Connection", chapter3: "Laughter",
      chapter4: "Celebration", chapter6: "Blessings",
      storyTitle: "Our Love Story",
      storyIntro: "It started with an argument about mutton curry. It's been going well ever since.",
      coupleTitle: "Meet the Two of Us",
      coupleIntro: "Same roots, very different playlists.",
      favourites: "Current favourites",
      likelyTitle: "Who is more likely to…?",
      likelyHint: "Pick who you think, then see if you were right",
      eventsTitle: "The Celebrations",
      eventsIntro: "Four days. Two homes, one temple, one very big party. Here's where we'll be, and where you'll find us.",
      bridesSide: "Thivya's side", groomsSide: "Arwind's side",
      heroWelcome: "The whole family is waiting inside.",
      heroWelcomeBig: "Come in, come in!",
      slideLatch: "Tap the door to come in", calSlip: "Slip No. 37 · Eco Wt",
      calDays: "Days to go", calLeft: "Countdown", calQuote: "Two families, one kitchen, and endless filter coffee.",
      calMuhurtham: "Kalyanam muhurtham", calForecastTitle: "Family Rasi Palan", calTear: "Tear off a page",
      likelyBoth: "Both", guessRight: "You know them well!", guessWrong: "Not quite!", likelyScore: "Score",
      contactMsg: "Lost on the way? Call me, I'll guide you.", loveIt: "I'd love this", giftOpen: "Tap to open",
      calTitle: "Days to the thaali",
      wishWatermark: "with love",
      bioTitle: "Marriage Bio-Data", bioInvoke: "Murugan Thunai", bioName: "Name", bioNick: "Called at home", bioAbout: "Nature", bioLikes: "Likes",
      calNote: "Paati has already started counting.",
      albumHint: "Keep scrolling, the album turns",
      footerFeast: "Come hungry. The banana leaves are ready.",
      saveDateLine: "Mark your calendars!",
      saveDateSub: "Four days of celebrations are coming. Pop them in your diary now!",
      contactsTitle: "Need help or wanna ask anything?",
      contactsIntro: "Lost on the way, or not sure about something? Call or WhatsApp the family. They're happy to help.",
      call: "Call", whatsapp: "WhatsApp",
      bothFamilies: "Both families",
      sameDayNote: "Both families celebrate on the same evening, at their own homes.",
      time: "Time", venue: "Venue", dressCode: "Wear",
      moreDetails: "More details", lessDetails: "Fewer details",
      googleMaps: "Google Maps", waze: "Waze", getDirections: "Get directions",
      privateAddress: "Exact address shared personally by the family.",
      memoriesTitle: "Share Our Wedding Memories",
      memoriesIntro: "Got photos or videos from the wedding? Please share every one of them here. Files too large to upload? WhatsApp them to any of our contacts and we will add them for you.",
      addPhotos: "Add your photos",
      scanToShare: "Scan to share your photos",
      sharePhotos: "Share Photos", viewGuestGallery: "View Guest Gallery",
      shareStepsTitle: "How to share",
      shareStep1: "Scan the code or tap Share Photos.",
      shareStep2: "Pick your photos and videos. No sign-in, no app.",
      shareStep3: "Tap Send. They go straight into our wedding album.",
      shareAlt: "Video too big? WhatsApp it to any of our contacts and we will add it for you.",
      shareStep2Form: "Sign in with your Google account and choose your photos or videos.",
      shareAltForm: "No Google account? WhatsApp your photos to any of our siblings and they'll add them for you.",
      // Upload page (upload.html)
      uploadTitle: "Share your photos",
      uploadIntro: "Nalungu chaos, temple moments, reception dance-offs: send us everything. No sign-in needed.",
      yourName: "Your name",
      yourNameHint: "So we know who to thank",
      chooseFiles: "Choose photos & videos",
      sizeHint: "Up to {mb} MB each · you can pick many at once",
      filesReady: "{n} ready to send",
      send: "Send",
      sending: "Sending… please keep this page open",
      sentAll: "Done! {n} sent. Thank you for the memories.",
      someFailed: "{n} didn't go through. Check your connection and try again.",
      retry: "Try again",
      addMore: "Send more",
      remove: "Remove",
      statusWaiting: "Waiting",
      statusSending: "Sending…",
      statusDone: "Sent",
      statusFailed: "Didn't send",
      tooBig: "Too large. Please WhatsApp this one to the family.",
      notAllowed: "Only photos and videos, please.",
      uploadClosed: "Uploads for this wedding have closed. Thank you!",
      backToSite: "Back to the wedding website",
      guestUploads: "Guest uploads",
      guestHighlights: "Guest favourites",
      guestRecent: "Fresh from the guests",
      scanFromPhone: "On a computer? Scan to upload from your phone",
      guestbookTitle: "Leave Us A Little Love",
      guestbookIntro: "Write your wish on the postcard below and post it to us. We'll read every single one.",
      writeWish: "Write a wish",
      sampleWishes: "Sample wishes",
      wishFormTitle: "Write us a wish",
      wishRelation: "How do you know us?",
      wishRelationHint: "Optional, e.g. Thivya's cousin, Arwind's football kaki",
      wishMessage: "Your wish",
      wishPlaceholder: "Dear Arwind & Thivya,\n\nTap here and start writing…",
      sendWish: "Post your wish",
      wishMissing: "Please add your name and a message.",
      wishDemo: "This is a preview of the site, so your wish wasn't sent. Once it's live, it will be.",
      wishThanksApproved: "Thank you! Your wish will appear here once the couple has read it.",
      wishThanksAuto: "Thank you! Your wish is now on the wall.",
      wishError: "That didn't send. Please check your connection and try again.",
      wishClosed: "The guestbook has closed. Thank you for all the love!",
      firstWish: "No wishes on the wall yet. Be the first!",
      wishlistTitle: "A Little Wishlist",
      wishlistIntro: "Your presence means the world to us. Gifts are entirely optional, but for anyone who's asked, here are a few things we'd love for our new home.",
      giftTitle: "Digital moi",
      giftIntro: "Bank transfer or DuitNow QR.",
      moiLine: "Can't make it on the day, or would still like to send your blessings? You're welcome to open this.",
      moiOpen: "Open the moi envelope",
      moiTap: "Tap the seal to open",
      moiThanks: "With heartfelt thanks for your kindness and your blessings.",
      moiClose: "Close the envelope",
      bank: "Bank", accountName: "Account name", accountNumber: "Account number",
      copy: "Copy", copied: "Copied",
      footerLine: "With love, from two families to yours.",
      madeBy: "Thoughtfully designed by",
      playMusic: "Play music", pauseMusic: "Pause music",
      musicBlocked: "Your browser paused the music. Tap to play.",
      musicUnavailable: "Music isn't available right now.",
      openYouTubeMusic: "Listen on YouTube Music",
      volume: "Volume",
      nowPlaying: "Now playing",
      hidePlayer: "Minimise player",
      language: "Language"
    },
    ta: {
      skipIntro: "அறிமுகத்தைத் தவிர்",
      introLine1: "இரு இதயங்கள்.",
      introLine2: "இரு குடும்பங்கள்.",
      introLine3: "ஓர் அழகிய தொடக்கம்.",
      enter: "கொண்டாட்டத்தில் இணையுங்கள்",
      bestWithMusic: "இசையுடன் பார்த்தால் இன்னும் அழகு",
      musicOn: "இசையுடன்",
      musicOff: "இசையின்றி",
      heroEyebrow: "திருமண அழைப்பிதழ்", introWelcome: "திருமணத்திற்கு அன்புடன் வரவேற்கிறோம்", calHead: "தினசரி காலண்டர்", giftSeal: "மொய்", saveTheDate: "நாளைக் குறித்து வையுங்கள்",
      heroBlessing: "எங்கள் குடும்பத்தாரின் ஆசீர்வாதத்துடன்",
      heroInvite: "தங்கள் வாழ்நாள் பயணத்தின் தொடக்கத்தைக் கொண்டாட உங்களை அன்புடன் அழைக்கிறார்கள்.",
      days: "நாட்கள்", hours: "மணி", minutes: "நிமிடம்", seconds: "விநாடி",
      countdownDone: "திருமணம் இனிதே நடந்தது, எங்களுடன் கொண்டாடியதற்கு நன்றி.",
      scroll: "கீழே தொடருங்கள்",
      menu: "பட்டியல்", close: "மூடு",
      navHome: "முகப்பு", navStory: "எங்கள் கதை", navCouple: "எங்களைப் பற்றி",
      navEvents: "விழாக்கள்", navWishlist: "பரிசுப் பட்டியல்",
      navGuestbook: "வாழ்த்துகள்", navMemories: "நினைவுகள்",
      chapter1: "பாரம்பரியம்", chapter2: "இணைப்பு", chapter3: "சிரிப்பு",
      chapter4: "கொண்டாட்டம்", chapter6: "ஆசிகள்",
      storyTitle: "எங்கள் காதல் கதை",
      storyIntro: "ஆட்டுக்கறி குழம்பைப் பற்றிய ஒரு வாக்குவாதத்தில் தொடங்கியது. அன்றிலிருந்து எல்லாம் நன்றாகவே போகிறது.",
      coupleTitle: "எங்கள் இருவரைப் பற்றி",
      coupleIntro: "ஒரே வேர்கள், வெவ்வேறு பாடல் பட்டியல்கள்.",
      favourites: "இப்போதைய விருப்பங்கள்",
      likelyTitle: "இருவரில் யார்…?",
      likelyHint: "யார் என்று தேர்ந்தெடுத்து, சரியா என்று பாருங்கள்",
      eventsTitle: "திருமண விழாக்கள்",
      eventsIntro: "நான்கு நாட்கள். இரண்டு வீடுகள், ஒரு கோயில், ஒரு பெரிய கொண்டாட்டம். நாங்கள் எங்கே இருப்போம் என்பது இதோ.",
      bridesSide: "திவ்யா வீட்டார்", groomsSide: "அர்விந்த் வீட்டார்",
      heroWelcome: "குடும்பமே உள்ளே காத்திருக்கு.",
      heroWelcomeBig: "வாங்க, வாங்க!",
      slideLatch: "கதவைத் தட்டி உள்ளே வாருங்கள்", calSlip: "தாள் எண் 37",
      calDays: "இன்னும் நாட்கள்", calLeft: "நேரம்", calQuote: "இரு குடும்பங்கள், ஒரே சமையலறை, முடிவில்லா ஃபில்டர் காபி.",
      calMuhurtham: "திருமண முகூர்த்தம்", calForecastTitle: "குடும்ப ராசி பலன்", calTear: "ஒரு தாளைக் கிழியுங்கள்",
      likelyBoth: "இருவரும்", guessRight: "அவர்களை நன்கு அறிவீர்கள்!", guessWrong: "அப்படியில்லை!", likelyScore: "மதிப்பெண்",
      contactMsg: "வழி தவறினால் அழையுங்கள், நான் வழிகாட்டுகிறேன்.", loveIt: "இது பிடிக்கும்", giftOpen: "திறக்கத் தட்டுங்கள்",
      calTitle: "தாலி கட்டும் நாளுக்கு",
      wishWatermark: "அன்புடன்",
      bioTitle: "திருமண விவரக் குறிப்பு", bioInvoke: "முருகன் துணை", bioName: "பெயர்", bioNick: "வீட்டுப் பெயர்", bioAbout: "குணநலன்", bioLikes: "விருப்பங்கள்",
      calNote: "பாட்டி ஏற்கனவே நாட்களை எண்ணத் தொடங்கிவிட்டார்.",
      albumHint: "தொடர்ந்து உருட்டுங்கள், ஆல்பம் புரளும்",
      footerFeast: "பசியோடு வாருங்கள். வாழை இலைகள் தயார்.",
      saveDateLine: "நாட்காட்டியில் குறியுங்கள்!",
      saveDateSub: "நான்கு நாள் கொண்டாட்டங்கள் வரவிருக்கின்றன. இப்போதே குறித்து வையுங்கள்!",
      contactsTitle: "உதவி தேவையா?",
      contactsIntro: "வழி தெரியவில்லையா, அல்லது ஏதாவது சந்தேகமா? குடும்பத்தினரை அழைக்கவும் அல்லது WhatsApp செய்யவும். மகிழ்ச்சியுடன் உதவுவார்கள்.",
      call: "அழைக்க", whatsapp: "WhatsApp",
      bothFamilies: "இரு குடும்பங்களும்",
      sameDayNote: "இரு குடும்பங்களும் ஒரே மாலையில், தத்தம் வீடுகளில் கொண்டாடுகின்றனர்.",
      time: "நேரம்", venue: "இடம்", dressCode: "உடை",
      moreDetails: "மேலும் விவரங்கள்", lessDetails: "விவரங்களை மறை",
      googleMaps: "Google Maps", waze: "Waze", getDirections: "வழி காட்டு",
      privateAddress: "முழு முகவரியைக் குடும்பத்தினர் நேரடியாகப் பகிர்வார்கள்.",
      memoriesTitle: "திருமண நினைவுகளைப் பகிருங்கள்",
      memoriesIntro: "நலுங்கில் எடுத்த வேடிக்கையான படமா? திருமணத்தின் இயல்பான ஒரு தருணமா? பல வருடங்கள் சிரிக்க வைக்கும் ஒரு படமா? எங்களுடன் பகிருங்கள்!",
      addPhotos: "உங்கள் படங்களைச் சேர்க்கவும்",
      scanToShare: "படங்களைப் பகிர ஸ்கேன் செய்யுங்கள்",
      sharePhotos: "படங்களைப் பகிர", viewGuestGallery: "விருந்தினர் படங்கள்",
      shareStepsTitle: "எப்படிப் பகிர்வது",
      shareStep1: "குறியீட்டை ஸ்கேன் செய்யுங்கள் அல்லது “படங்களைப் பகிர” என்பதைத் தொடுங்கள்.",
      shareStep2: "உங்கள் படங்களையும் காணொளிகளையும் தேர்ந்தெடுங்கள். உள்நுழைவோ செயலியோ தேவையில்லை.",
      shareStep3: "அனுப்பு என்பதைத் தொடுங்கள். அவை நேராக எங்கள் திருமண ஆல்பத்திற்குச் செல்லும்.",
      shareAlt: "காணொளி மிகப் பெரியதா? அதை எங்கள் உடன்பிறப்புகளில் யாருக்காவது WhatsApp-இல் அனுப்புங்கள்; அவர்கள் சேர்த்துவிடுவார்கள்.",
      shareStep2Form: "உங்கள் Google கணக்கில் உள்நுழைந்து படங்கள் அல்லது காணொளிகளைத் தேர்ந்தெடுங்கள்.",
      shareAltForm: "Google கணக்கு இல்லையா? உங்கள் படங்களை எங்கள் உடன்பிறப்புகளில் யாருக்காவது WhatsApp-இல் அனுப்புங்கள்; அவர்கள் சேர்த்துவிடுவார்கள்.",
      uploadTitle: "உங்கள் படங்களைப் பகிருங்கள்",
      uploadIntro: "நலுங்குக் கலாட்டா, கோயில் தருணங்கள், வரவேற்பு நடனங்கள்: எல்லாவற்றையும் அனுப்புங்கள். உள்நுழைவு தேவையில்லை.",
      yourName: "உங்கள் பெயர்",
      yourNameHint: "யாருக்கு நன்றி சொல்வது என்று தெரிந்துகொள்ள",
      chooseFiles: "படங்கள் & காணொளிகளைத் தேர்ந்தெடுங்கள்",
      sizeHint: "ஒவ்வொன்றும் {mb} MB வரை · பலவற்றை ஒரே நேரத்தில் தேர்ந்தெடுக்கலாம்",
      filesReady: "{n} அனுப்பத் தயார்",
      send: "அனுப்பு",
      sending: "அனுப்புகிறது… இந்தப் பக்கத்தை மூடாதீர்கள்",
      sentAll: "முடிந்தது! {n} அனுப்பப்பட்டன. நினைவுகளுக்கு நன்றி.",
      someFailed: "{n} அனுப்பப்படவில்லை. இணைப்பைச் சரிபார்த்து மீண்டும் முயலுங்கள்.",
      retry: "மீண்டும் முயலு",
      addMore: "மேலும் அனுப்பு",
      remove: "நீக்கு",
      statusWaiting: "காத்திருக்கிறது",
      statusSending: "அனுப்புகிறது…",
      statusDone: "அனுப்பப்பட்டது",
      statusFailed: "அனுப்பப்படவில்லை",
      tooBig: "மிகப் பெரியது. இதை WhatsApp-இல் குடும்பத்தினருக்கு அனுப்புங்கள்.",
      notAllowed: "படங்களும் காணொளிகளும் மட்டும்.",
      uploadClosed: "இந்தத் திருமணத்திற்கான பதிவேற்றம் நிறைவடைந்தது. நன்றி!",
      backToSite: "திருமண இணையதளத்திற்குத் திரும்ப",
      guestUploads: "விருந்தினர் பதிவேற்றங்கள்",
      guestHighlights: "விருந்தினர்களின் சிறந்த படங்கள்",
      guestRecent: "விருந்தினர்களிடமிருந்து புதிதாக",
      scanFromPhone: "கணினியில் இருக்கிறீர்களா? உங்கள் கைபேசியிலிருந்து பதிவேற்ற ஸ்கேன் செய்யுங்கள்",
      guestbookTitle: "எங்களுக்குக் கொஞ்சம் அன்பை விட்டுச் செல்லுங்கள்",
      guestbookIntro: "கீழே உள்ள அஞ்சல் அட்டையில் உங்கள் வாழ்த்தை எழுதி எங்களுக்கு அனுப்புங்கள். ஒவ்வொன்றையும் நாங்கள் படிப்போம்.",
      writeWish: "வாழ்த்து எழுதுங்கள்",
      sampleWishes: "மாதிரி வாழ்த்துகள்",
      wishFormTitle: "எங்களுக்கு ஒரு வாழ்த்து எழுதுங்கள்",
      wishRelation: "எங்களை எப்படித் தெரியும்?",
      wishRelationHint: "விருப்பத்தேர்வு, உதா: திவ்யாவின் உறவினர், அர்விந்தின் கால்பந்து நண்பர்",
      wishMessage: "உங்கள் வாழ்த்து",
      wishPlaceholder: "அன்புள்ள அர்விந்த் & திவ்யா,\n\nஇங்கே தொட்டு எழுதத் தொடங்குங்கள்…",
      wishDemo: "இது தளத்தின் முன்னோட்டம், எனவே உங்கள் வாழ்த்து அனுப்பப்படவில்லை. தளம் நேரலைக்கு வந்ததும் அனுப்பப்படும்.",
      sendWish: "வாழ்த்தை அனுப்பு",
      wishMissing: "உங்கள் பெயரையும் வாழ்த்தையும் சேர்க்கவும்.",
      wishThanksApproved: "நன்றி! தம்பதியர் படித்த பின் உங்கள் வாழ்த்து இங்கே தோன்றும்.",
      wishThanksAuto: "நன்றி! உங்கள் வாழ்த்து இப்போது சுவரில் உள்ளது.",
      wishError: "அனுப்பப்படவில்லை. இணைப்பைச் சரிபார்த்து மீண்டும் முயலுங்கள்.",
      wishClosed: "வாழ்த்துப் புத்தகம் நிறைவடைந்தது. உங்கள் அன்புக்கு நன்றி!",
      firstWish: "சுவரில் இன்னும் வாழ்த்துகள் இல்லை. முதலில் நீங்கள் எழுதுங்கள்!",
      wishlistTitle: "ஒரு சிறு பரிசுப் பட்டியல்",
      wishlistIntro: "உங்கள் வருகையே எங்களுக்குப் பெரிய பரிசு. பரிசுகள் முற்றிலும் விருப்பமானவை; கேட்டவர்களுக்காக, எங்கள் புதிய வீட்டுக்கு நாங்கள் விரும்பும் சில பொருட்கள் இதோ.",
      giftTitle: "டிஜிட்டல் மொய்",
      giftIntro: "வங்கிப் பரிமாற்றம் அல்லது DuitNow QR.",
      moiLine: "அன்று வர இயலவில்லையா, அல்லது ஆசீர்வாதம் அனுப்ப விரும்புகிறீர்களா? இந்த உறையைத் திறக்கலாம்.",
      moiOpen: "மொய் உறையைத் திறக்க",
      moiTap: "முத்திரையைத் தொட்டுத் திறக்கவும்",
      moiThanks: "உங்கள் அன்புக்கும் ஆசீர்வாதத்துக்கும் மனமார்ந்த நன்றி.",
      moiClose: "உறையை மூடு",
      bank: "வங்கி", accountName: "கணக்கின் பெயர்", accountNumber: "கணக்கு எண்",
      copy: "நகலெடு", copied: "நகலெடுக்கப்பட்டது",
      footerLine: "எங்கள் இரு குடும்பங்களிடமிருந்து உங்கள் குடும்பத்திற்கு அன்புடன்.",
      madeBy: "வடிவமைப்பு",
      playMusic: "இசையை இயக்கு", pauseMusic: "இசையை நிறுத்து",
      musicBlocked: "உங்கள் உலாவி இசையை நிறுத்தியது. இயக்கத் தொடுங்கள்.",
      musicUnavailable: "இப்போது இசை கிடைக்கவில்லை.",
      openYouTubeMusic: "YouTube Music-இல் கேளுங்கள்",
      volume: "ஒலியளவு",
      nowPlaying: "இப்போது ஒலிப்பது",
      hidePlayer: "பிளேயரைச் சிறிதாக்கு",
      language: "மொழி"
    }
  },

  /* ---------- 5. LOVE STORY TIMELINE --------------------------------- */
  // shape: "portrait" (tall temple arch, best for upright photos) or
  //        "landscape" (wider, gentler arch, for sideways photos and groups).
  // focus: which part of the photo to keep when it's cropped, as
  //        "horizontal% vertical%" ("50% 30%" = centre, upper third).
  // Photos: ~1200px on the long edge, .jpg, saved in assets/images.
  story: [
    {
      year: "2019",
      title: { en: "The First Meeting", ta: "முதல் சந்திப்பு" },
      text: {
        en: "They met at a mutual friend's Deepavali open house in Subang Jaya. Arwind was explaining, with great confidence, why his amma's mutton curry was the best. Thivya disagreed. Their first conversation was an argument about food, and neither of them has backed down since.",
        ta: "சுபாங் ஜெயாவில் ஒரு நண்பரின் தீபாவளி திறந்த இல்ல உபசரிப்பில் இருவரும் முதன்முதலில் சந்தித்தனர். தன் அம்மாவின் ஆட்டுக்கறி குழம்புதான் சிறந்தது என்று அர்விந்த் மிகுந்த நம்பிக்கையுடன் விளக்கிக் கொண்டிருந்தார். திவ்யா அதை ஒப்புக்கொள்ளவில்லை. அவர்களின் முதல் உரையாடலே சாப்பாட்டைப் பற்றிய ஒரு வாக்குவாதம்தான், இன்றுவரை இருவரும் விட்டுக்கொடுக்கவில்லை."
      },
      image: "assets/images/story-2019.jpg", shape: "landscape", focus: "40% 40%",
      alt: { en: "Arwind and Thivya laughing with plates of food at a Deepavali open house at night", ta: "இரவில் ஒரு தீபாவளி உபசரிப்பில் உணவுத் தட்டுகளுடன் சிரிக்கும் அர்விந்தும் திவ்யாவும்" }
    },
    {
      year: "2020",
      title: { en: "The Coffee Dates", ta: "காபி சந்திப்புகள்" },
      text: {
        en: "A few Instagram replies turned into long conversations. Their first coffee date in Bangsar lasted five hours, one filter coffee, one iced latte, and a lot of “okay, just one more story”.",
        ta: "சில இன்ஸ்டாகிராம் பதில்கள் நீண்ட உரையாடல்களாக மாறின. பங்சாரில் நடந்த அவர்களின் முதல் காபி சந்திப்பு ஐந்து மணி நேரம் நீடித்தது, ஒரு ஃபில்டர் காபி, ஒரு ஐஸ்டு லாட்டே, பல “சரி, இன்னும் ஒரே ஒரு கதை” தருணங்கள்."
      },
      image: "assets/images/story-2020.jpg", shape: "portrait", focus: "45% 30%",
      alt: { en: "Arwind and Thivya smiling together at a café table with a latte", ta: "ஒரு லாட்டேயுடன் கஃபே மேசையில் புன்னகைக்கும் அர்விந்தும் திவ்யாவும்" }
    },
    {
      year: "2022",
      title: { en: "Two Families, One Big Story", ta: "இரு குடும்பங்கள், ஒரு பெரிய கதை" },
      text: {
        en: "Family visits turned into dinners, celebrations and Deepavali gatherings, along with many, many questions about when they were getting married.",
        ta: "குடும்பச் சந்திப்புகள் விருந்துகளாகவும், கொண்டாட்டங்களாகவும், தீபாவளி ஒன்றுகூடல்களாகவும் மாறின, கூடவே “எப்போது கல்யாணம்?” என்ற எண்ணற்ற கேள்விகளும்."
      },
      image: "assets/images/story-2022.jpg", shape: "landscape", focus: "50% 45%",
      alt: { en: "Both families gathered for Deepavali in silk and veshti, with oil lamps and a kolam in front", ta: "அகல் விளக்குகளும் கோலமும் முன்னிருக்க, பட்டும் வேட்டியுமாகத் தீபாவளிக்கு ஒன்றுகூடிய இரு குடும்பங்கள்" }
    },
    {
      year: "2025",
      title: { en: "The Proposal", ta: "திருமணக் கோரிக்கை" },
      text: {
        en: "Arwind planned a romantic proposal in Cameron Highlands. Thivya accidentally discovered the ring box before dinner. She said yes before he could finish his speech. He still has the rest of it saved in his Notes app.",
        ta: "கேமரன் மலையில் அர்விந்த் ஒரு அழகான திருமணக் கோரிக்கையைத் திட்டமிட்டார். இரவு உணவுக்கு முன்பே திவ்யா தற்செயலாக மோதிரப் பெட்டியைக் கண்டுபிடித்துவிட்டார். அவர் பேச்சை முடிப்பதற்குள்ளேயே “சரி” என்று சொல்லிவிட்டார். மீதிப் பேச்சு இன்னும் அவரது கைபேசியில் சேமிக்கப்பட்டிருக்கிறது."
      },
      image: "assets/images/story-2025.jpg", shape: "portrait", focus: "55% 40%",
      alt: { en: "Arwind on one knee holding out the ring as Thivya covers her face, friends cheering, misty tea hills behind", ta: "மூடுபனி தேயிலை மலைகளின் முன், நண்பர்கள் ஆரவாரிக்க, மோதிரத்துடன் மண்டியிடும் அர்விந்த்; முகத்தை மூடிக்கொள்ளும் திவ்யா" }
    },
    {
      year: "2027",
      title: { en: "The Kalyanam", ta: "கல்யாணம்" },
      text: {
        en: "After years of laughter, long drives, food debates and family gatherings, they're getting married.",
        ta: "பல வருடச் சிரிப்பு, நீண்ட பயணங்கள், சாப்பாட்டு விவாதங்கள், குடும்ப ஒன்றுகூடல்களுக்குப் பிறகு, இதோ, அவர்கள் திருமணம் செய்துகொள்கிறார்கள்."
      },
      image: "assets/images/story-2027.jpg", shape: "portrait", focus: "55% 55%",
      alt: { en: "Arwind and Thivya in traditional dress sharing tea on the steps of an old house, a kolam drawn in front", ta: "பாரம்பரிய உடையில் பழைய வீட்டின் படிகளில் தேநீர் அருந்தும் அர்விந்தும் திவ்யாவும்; முன்னே ஒரு கோலம்" }
    }
  ],
  storyClosing: {
    en: "Somewhere between the teasing, the laughter and the ordinary days, we found our forever.",
    ta: "கிண்டல்களுக்கும், சிரிப்புகளுக்கும், சாதாரண நாட்களுக்கும் இடையில் எங்கோ, எங்கள் என்றென்றைக் கண்டடைந்தோம்."
  },

  /* ---------- 6. MEET THE COUPLE ------------------------------------- */
  profiles: [
    {
      who: "partner1",
      photo: "assets/images/portrait-arwind.jpg",
      cutout: "assets/images/cutout-arwind.png",   // background removed, pasted on the bio-data sheet
      stamp: { en: "Approved by Thivya's Amma", ta: "திவ்யாவின் அம்மா ஒப்புதல்" },
      bio: {
        en: "Product manager by day, self-appointed food critic by night. Claims he doesn't care about wedding planning, yet has strong opinions on the entrance song, the biryani and the font on the invitation.",
        ta: "பகலில் புராடக்ட் மேனேஜர், இரவில் தானே நியமித்துக்கொண்ட உணவு விமர்சகர். திருமண ஏற்பாடுகளில் அக்கறை இல்லை என்று சொல்வார், ஆனால் நுழைவுப் பாடல், பிரியாணி, அழைப்பிதழின் எழுத்துரு பற்றி உறுதியான கருத்துகள் உண்டு."
      },
      favourites: [
        { en: "Filter coffee", ta: "ஃபில்டர் காபி" },
        { en: "Football", ta: "கால்பந்து" },
        { en: "Old Vijay movies", ta: "பழைய விஜய் படங்கள்" },
        { en: "Family BBQs", ta: "குடும்ப BBQ" },
        { en: "Road trips", ta: "நீண்ட கார் பயணங்கள்" }
      ]
    },
    {
      who: "partner2",
      photo: "assets/images/portrait-thivya.jpg",
      cutout: "assets/images/cutout-thivya.png",
      stamp: { en: "Approved by Arwind's Paati", ta: "அர்விந்தின் பாட்டி ஒப்புதல்" },
      bio: {
        en: "Brand marketer, saree archivist and keeper of The Spreadsheet. Has a moodboard for the moodboards and hundreds of saved references, every single one of them essential.",
        ta: "பிராண்ட் மார்க்கெட்டர், புடவைக் காப்பாளர், “அந்த ஸ்ப்ரெட்ஷீட்டின்” பொறுப்பாளர். மூட்போர்டுகளுக்கே ஒரு மூட்போர்டு வைத்திருப்பவர்; சேமித்த நூற்றுக்கணக்கான குறிப்புகள், ஒவ்வொன்றும் அவசியமானது."
      },
      favourites: [
        { en: "Iced latte", ta: "ஐஸ்டு லாட்டே" },
        { en: "Kanchipuram sarees", ta: "காஞ்சிபுரம் புடவைகள்" },
        { en: "Tamil songs", ta: "தமிழ்ப் பாடல்கள்" },
        { en: "Photography", ta: "புகைப்படக்கலை" },
        { en: "Travel", ta: "பயணம்" }
      ]
    }
  ],

  likely: [
    { q: { en: "Who takes longer to get ready?", ta: "தயாராக யார் அதிக நேரம் எடுப்பார்?" },
      a: { en: "Thivya.", ta: "திவ்யா." },
      aside: { en: "Worth the wait, she says.", ta: "காத்திருப்பது தகும் என்கிறார்." } },
    { q: { en: "Who controls the car playlist?", ta: "காரில் பாடல்களை யார் தேர்வு செய்வார்?" },
      a: { en: "Arwind.", ta: "அர்விந்த்." },
      aside: { en: "According to Arwind.", ta: "அர்விந்தின் கூற்றுப்படி." } },
    { q: { en: "Who plans the trips?", ta: "பயணங்களை யார் திட்டமிடுவார்?" },
      a: { en: "Thivya.", ta: "திவ்யா." },
      aside: { en: "There is a spreadsheet. Of course.", ta: "ஒரு ஸ்ப்ரெட்ஷீட் இருக்கிறது. நிச்சயமாக." } },
    { q: { en: "Who chooses the food?", ta: "சாப்பாட்டை யார் தேர்வு செய்வார்?" },
      a: { en: "Both.", ta: "இருவரும்." },
      aside: { en: "That's usually the problem.", ta: "அதுதான் பொதுவாகப் பிரச்சினையே." } },
    { q: { en: "Who is more sentimental?", ta: "யார் அதிகம் உணர்ச்சிவசப்படுவார்?" },
      a: { en: "Arwind.", ta: "அர்விந்த்." },
      aside: { en: "But don't tell anyone.", ta: "ஆனால் யாரிடமும் சொல்லாதீர்கள்." } },
    { q: { en: "Who apologises first after a food debate?", ta: "சாப்பாட்டு விவாதத்திற்குப் பிறகு முதலில் சமாதானம் செய்வது யார்?" },
      a: { en: "Arwind.", ta: "அர்விந்த்." },
      aside: { en: "Usually with roti canai.", ta: "பெரும்பாலும் ரொட்டி சானாயுடன்." } }
  ],

  /* ---------- 7. CELEBRATIONS / EVENTS ------------------------------- */
  // tone: "nalungu" (turmeric), "nalungu2" (red oxide), "kalyanam" (maroon), "reception" (banana leaf)
  // A day can have one venue (`venue`) or two side-by-side (`sides`).
  // mapQuery is what Google Maps / Waze will search for.
  events: [
    {
      id: "amma-nalungu",
      tone: "nalungu",
      icon: "assets/images/icons/turmeric.png",
      art: "assets/images/events/amma-nalungu-v2.jpg",   // gold-on-maroon stamp illustration
      dayLabel: { en: "Day One", ta: "முதல் நாள்" },
      date: { en: "Thursday, 4 February 2027", ta: "வியாழன், 4 பிப்ரவரி 2027" },
      shortDate: { day: "04", month: { en: "Feb", ta: "பிப்" }, weekday: { en: "Thu", ta: "வியா" } },
      name: { en: "Amma Nalungu", ta: "அம்மா நலுங்கு" },
      description: {
        en: "An intimate evening led by the mothers, turmeric, sandalwood, kumkumam and the first blessings of the wedding week. Expect laughter, a few happy tears and far too much food.",
        ta: "அம்மாக்கள் முன்னின்று நடத்தும் ஒரு நெருக்கமான மாலை, மஞ்சள், சந்தனம், குங்குமத்துடன் திருமண வாரத்தின் முதல் ஆசீர்வாதங்கள். சிரிப்பு, சில ஆனந்தக் கண்ணீர், அளவுக்கு மீறிய சாப்பாடு நிச்சயம்."
      },
      dressCode: { en: "Bright traditional wear, yellow is always welcome", ta: "பளிச்சென்ற பாரம்பரிய உடை, மஞ்சளுக்கு எப்போதும் வரவேற்பு" },
      sides: [
        { side: "bride", time: "6:30 PM", timeTa: "மாலை 6:30",
          venue: { en: "Thivya's Family Home, Klang", ta: "திவ்யாவின் குடும்ப இல்லம், கிள்ளான்" },
          mapQuery: "Klang, Selangor", private: true },
        { side: "groom", time: "6:30 PM", timeTa: "மாலை 6:30",
          venue: { en: "Arwind's Family Home, Puchong", ta: "அர்விந்தின் குடும்ப இல்லம், பூச்சோங்" },
          mapQuery: "Puchong, Selangor", private: true }
      ]
    },
    {
      id: "friends-nalungu",
      tone: "nalungu2",
      icon: "assets/images/icons/bangles.png",
      art: "assets/images/events/friends-nalungu-v2.jpg",   // gold-on-maroon stamp illustration
      dayLabel: { en: "Day Two", ta: "இரண்டாம் நாள்" },
      date: { en: "Friday, 5 February 2027", ta: "வெள்ளி, 5 பிப்ரவரி 2027" },
      shortDate: { day: "05", month: { en: "Feb", ta: "பிப்" }, weekday: { en: "Fri", ta: "வெள்" } },
      name: { en: "Friends, Athai & Mama Nalungu", ta: "நண்பர்கள், அத்தை & மாமா நலுங்கு" },
      description: {
        en: "The loud one. Friends, athais and mamas take over with turmeric, teasing, songs and games. Wear something you don't mind getting a little yellow.",
        ta: "இது சத்தமான நாள்! நண்பர்கள், அத்தைகள், மாமாக்கள் மஞ்சள், கேலி, பாடல்கள், விளையாட்டுகளுடன் களமிறங்குகிறார்கள். கொஞ்சம் மஞ்சள் படிந்தாலும் பரவாயில்லாத உடையை அணியுங்கள்."
      },
      dressCode: { en: "Colourful and comfortable", ta: "வண்ணமயமான, வசதியான உடை" },
      sides: [
        { side: "bride", time: "7:00 PM", timeTa: "இரவு 7:00",
          venue: { en: "Thivya's Family Home, Klang", ta: "திவ்யாவின் குடும்ப இல்லம், கிள்ளான்" },
          mapQuery: "Klang, Selangor", private: true },
        { side: "groom", time: "7:00 PM", timeTa: "இரவு 7:00",
          venue: { en: "Arwind's Family Home, Puchong", ta: "அர்விந்தின் குடும்ப இல்லம், பூச்சோங்" },
          mapQuery: "Puchong, Selangor", private: true }
      ]
    },
    {
      id: "kalyanam",
      tone: "kalyanam",
      icon: "assets/images/icons/thaali.png",
      art: "assets/images/events/kalyanam-v5.jpg",   // gold-on-maroon stamp illustration
      dayLabel: { en: "Day Three", ta: "மூன்றாம் நாள்" },
      date: { en: "Saturday, 6 February 2027", ta: "சனி, 6 பிப்ரவரி 2027" },
      shortDate: { day: "06", month: { en: "Feb", ta: "பிப்" }, weekday: { en: "Sat", ta: "சனி" } },
      name: { en: "The Kalyanam", ta: "திருமணம்" },
      description: {
        en: "The sacred ceremony. With the blessings of Lord Murugan, our elders and all of you, Arwind ties the thaali and two families become one.",
        ta: "புனிதமான திருமணச் சடங்கு. முருகப் பெருமானின் அருளோடும், பெரியோர்கள் மற்றும் உங்கள் அனைவரின் ஆசியோடும், அர்விந்த் தாலி கட்ட, இரு குடும்பங்கள் ஒன்றாகின்றன."
      },
      dressCode: { en: "Traditional attire", ta: "பாரம்பரிய உடை" },
      venue: {
        time: "9:00 AM", timeTa: "காலை 9:00",
        venue: { en: "Sri Kandaswamy Temple, Brickfields, Kuala Lumpur", ta: "ஸ்ரீ கந்தசுவாமி கோயில், பிரிக்ஃபீல்ட்ஸ், கோலாலம்பூர்" },
        mapQuery: "Sri Kandaswamy Temple, Brickfields, Kuala Lumpur"
      }
    },
    {
      id: "reception",
      tone: "reception",
      icon: "assets/images/icons/laddu.png",
      art: "assets/images/events/reception-v2.jpg",   // gold-on-maroon stamp illustration
      dayLabel: { en: "Day Four", ta: "நான்காம் நாள்" },
      date: { en: "Sunday, 7 February 2027", ta: "ஞாயிறு, 7 பிப்ரவரி 2027" },
      shortDate: { day: "07", month: { en: "Feb", ta: "பிப்" }, weekday: { en: "Sun", ta: "ஞாயி" } },
      name: { en: "The Reception", ta: "திருமண வரவேற்பு" },
      description: {
        en: "Dinner, dancing and the entrance song Arwind has been rehearsing for months. Come hungry; leave with a full heart (and a full plate).",
        ta: "இரவு விருந்து, நடனம், அர்விந்த் பல மாதங்களாக ஒத்திகை பார்த்து வரும் அந்த நுழைவுப் பாடல். பசியுடன் வாருங்கள்; நிறைந்த மனதுடன் (நிறைந்த தட்டுடனும்) செல்லுங்கள்."
      },
      dressCode: { en: "Festive formal", ta: "விழாக்கால நேர்த்தியான உடை" },
      venue: {
        time: "6:30 PM", timeTa: "மாலை 6:30",
        venue: { en: "HGH Convention Centre, Sentul, Kuala Lumpur", ta: "HGH கன்வென்ஷன் சென்டர், செந்தூல், கோலாலம்பூர்" },
        mapQuery: "HGH Convention Centre, Sentul, Kuala Lumpur"
      }
    }
  ],

  // Family contacts, shown under the celebrations: two people per side.
  // `phone` is shown as written; the Call and WhatsApp buttons use its digits,
  // so always include the country code (+60). ⚠ Replace these placeholder
  // numbers with the families' real ones, and check each with them first.
  contacts: [
    { side: "bride", people: [
      { name: { en: "Mr. Nadarajan", ta: "திரு. நடராஜன்" },
        relation: { en: "Father of the bride", ta: "மணமகளின் தந்தை" },
        phone: "+60 12-000 0001" },
      { name: { en: "Vikram", ta: "விக்ரம்" },
        relation: { en: "Brother of the bride", ta: "மணமகளின் சகோதரர்" },
        phone: "+60 12-000 0002" }
    ] },
    { side: "groom", people: [
      { name: { en: "Mr. Kumar", ta: "திரு. குமார்" },
        relation: { en: "Father of the groom", ta: "மணமகனின் தந்தை" },
        phone: "+60 12-000 0003" },
      { name: { en: "Suresh", ta: "சுரேஷ்" },
        relation: { en: "Cousin of the groom", ta: "மணமகனின் உறவினர்" },
        phone: "+60 12-000 0004" }
    ] }
  ],

  // Calendar: a playful "forecast" column, like the rasi palan on a daily calendar
  calendarForecast: [
    { who: { en: "The bride", ta: "மணமகள்" }, mood: { en: "Glowing", ta: "ஜொலிப்பு" } },
    { who: { en: "The groom", ta: "மணமகன்" }, mood: { en: "Nervous", ta: "பதட்டம்" } },
    { who: { en: "Amma", ta: "அம்மா" }, mood: { en: "Very busy", ta: "மிகவும் பிஸி" } },
    { who: { en: "Appa", ta: "அப்பா" }, mood: { en: "Calm-ish", ta: "கொஞ்சம் அமைதி" } },
    { who: { en: "Paati", ta: "பாட்டி" }, mood: { en: "In charge", ta: "பொறுப்பு" } },
    { who: { en: "Cousins", ta: "உறவினர்கள்" }, mood: { en: "Dancing", ta: "நடனம்" } },
    { who: { en: "Uncles", ta: "மாமாக்கள்" }, mood: { en: "Advising", ta: "அறிவுரை" } },
    { who: { en: "Guests", ta: "விருந்தினர்" }, mood: { en: "Well fed", ta: "வயிறு நிறைவு" } }
  ],

  /* ---------- 8. GUEST SERVICES (photo uploads + guestbook wishes) --- */
  // Both the photo uploader and the guestbook talk to the studio's Google
  // Apps Script (apps-script/Code.gs). Setup: README §6.
  //
  // demoMode: true shows sample photos and sample wishes, and nothing is
  // sent. Set it to false once the script is deployed and tested.
  guestServices: {
    demoMode: true,
    appsScriptUrl: "",                 // the Web app URL ending in /exec
    eventKey: "arwind-thivya-2027"     // must match a key in EVENTS in Code.gs
  },

  /* ---------- 9. GUEST PHOTO SHARING -------------------------------- */
  // provider: "appsScript" (recommended) — guests upload right on the site
  //   (and on upload.html via the QR code) with NO sign-in.
  // provider: "googleForm" — guests sign in to a Google Form (uploadUrl).
  memories: {
    provider: "appsScript",
    maxFileMB: 35,                // keep the same as MAX_FILE_MB in Code.gs
    showRecent: true,             // show the newest guest uploads on the site (see showOnSite in Code.gs)
    recentCount: 6,               // how many (1–12)
    uploadUrl: "",                // googleForm only: e.g. "https://forms.gle/AbCdEf123"
    galleryUrl: "",               // optional: the couple's Drive folder, shared "Anyone with the link · Viewer"
    driveFolderId: "",            // optional: same folder's ID → live grid of uploads in the page
    embedUrl: "",                 // optional alternative: any other embeddable wall (e.g. Padlet)
    hashtag: "#ArwindWedsThivya",
    // Favourite guest photos to feature here after the wedding: download
    // them from Drive, save them in assets/images, and list them like the samples.
    highlights: [],
    samples: [
      { src: "assets/images/memories/memory-01.jpg", by: "@karthik.k", caption: { en: "Nalungu chaos, as promised", ta: "சொன்னபடி நலுங்குக் கலாட்டா" } },
      { src: "assets/images/memories/memory-02.jpg", by: "@shalini.r", caption: { en: "The aunties have assembled", ta: "அத்தைகள் வந்துவிட்டார்கள்" } },
      { src: "assets/images/memories/memory-03.jpg", by: "@vinod_m", caption: { en: "The sambar queue", ta: "சாம்பார் வரிசை" } },
      { src: "assets/images/memories/memory-04.jpg", by: "@priya.d", caption: { en: "Mid-dance, slightly blurry", ta: "நடனத்தின் நடுவில், கொஞ்சம் மங்கலாக" } },
      { src: "assets/images/memories/memory-05.jpg", by: "@ravi.s", caption: { en: "Temple morning", ta: "கோயில் காலை" } },
      { src: "assets/images/memories/memory-06.jpg", by: "@deepa.n", caption: { en: "Groom's squad, reporting", ta: "மணமகன் அணி தயார்" } }
    ]
  },

  /* ---------- 10. GUESTBOOK ------------------------------------------ */
  // provider: "appsScript" (recommended) — guests write wishes right on the
  //   site; they're saved to the studio's Google Sheet and shown on the wall
  //   (see wishesOnSite in Code.gs for approval).
  // provider: "form" — a "Write a wish" button opens an outside form (formUrl).
  // `wishes` below are the samples shown in demo mode.
  guestbook: {
    provider: "appsScript",
    formUrl: "",                  // provider "form" only: Google Form / Tally / Jotform link
    showLive: true,               // show guests' wishes on the site
    liveCount: 24,                // how many (newest first, up to 60)
    maxLength: 600,               // keep the same as WISH_MAX_CHARS in Code.gs
    wishes: [
      { name: "Karthik", relation: { en: "Groom's best friend", ta: "மணமகனின் நெருங்கிய நண்பர்" },
        text: { en: "Bro, still can't believe someone agreed to marry you voluntarily. Wishing you both a lifetime of happiness!",
                ta: "ப்ரோ, யாரோ ஒருவர் தானாக முன்வந்து உன்னைத் திருமணம் செய்ய ஒப்புக்கொண்டதை இன்னும் நம்ப முடியவில்லை. உங்கள் இருவருக்கும் வாழ்நாள் முழுதும் மகிழ்ச்சி!" } },
      { name: "Shalini", relation: { en: "Bride's university friend", ta: "மணமகளின் பல்கலைக்கழகத் தோழி" },
        text: { en: "From university lunch breaks to wedding planning madness. So happy for you both!",
                ta: "பல்கலைக்கழக மதிய இடைவேளைகள் முதல் திருமண ஏற்பாட்டுப் பரபரப்பு வரை. உங்கள் இருவருக்காகவும் மிகவும் மகிழ்ச்சி!" } },
      { name: { en: "Amma & Appa", ta: "அம்மா & அப்பா" }, relation: { en: "With all our love", ta: "எங்கள் முழு அன்புடன்" },
        text: { en: "May your life together be filled with love, patience, good health and endless blessings.",
                ta: "உங்கள் இணைந்த வாழ்க்கை அன்பு, பொறுமை, நல்ல ஆரோக்கியம், எல்லையற்ற ஆசீர்வாதங்களால் நிறையட்டும்." } }
    ]
  },

  /* ---------- 11. WISHLIST ------------------------------------------- */
  // A simple list of ideas. Icons: coffee, pan, dice, plate, luggage, camera, projector, speaker.
  wishlist: {
    items: [
      { icon: "coffee", art: "assets/images/wishlist/coffee.jpg", name: { en: "Filter coffee set", ta: "ஃபில்டர் காபி செட்" }, note: { en: "Brass, please. Arwind insists.", ta: "பித்தளை வேண்டும், அர்விந்தின் வற்புறுத்தல்." } },
      { icon: "pan", art: "assets/images/wishlist/pan.jpg", name: { en: "Cast-iron cookware", ta: "வார்ப்பிரும்புப் பாத்திரங்கள்" }, note: { en: "For the dosa debates.", ta: "தோசை விவாதங்களுக்காக." } },
      { icon: "dice", art: "assets/images/wishlist/dice.png", name: { en: "Board game collection", ta: "பலகை விளையாட்டுத் தொகுப்பு" }, note: { en: "Competitive. Very.", ta: "போட்டி மிகுந்தது. மிகவும்." } },
      { icon: "plate", art: "assets/images/wishlist/plate.jpg", name: { en: "Dinnerware set", ta: "உணவுப் பாத்திரத் தொகுப்பு" }, note: { en: "For the many, many guests.", ta: "எண்ணற்ற விருந்தினர்களுக்காக." } },
      { icon: "luggage", art: "assets/images/wishlist/luggage.jpg", name: { en: "Travel luggage set", ta: "பயணப் பெட்டித் தொகுப்பு" }, note: { en: "The spreadsheet has trips planned.", ta: "ஸ்ப்ரெட்ஷீட்டில் பயணங்கள் தயார்." } },
      { icon: "camera", art: "assets/images/wishlist/camera.png", name: { en: "Instant photo printer", ta: "உடனடிப் புகைப்பட அச்சுப்பொறி" }, note: { en: "Thivi's fridge-door gallery.", ta: "திவியின் குளிர்சாதனக் கதவுக் காட்சியகம்." } },
      { icon: "projector", art: "assets/images/wishlist/projector.jpg", name: { en: "Compact projector", ta: "சிறிய புரொஜெக்டர்" }, note: { en: "Old Vijay movies, big screen.", ta: "பழைய விஜய் படங்கள், பெரிய திரையில்." } },
      { icon: "speaker", art: "assets/images/wishlist/speaker.jpg", name: { en: "Home speaker", ta: "வீட்டு ஸ்பீக்கர்" }, note: { en: "For the playlist dispute.", ta: "பாடல் பட்டியல் சர்ச்சைக்காக." } }
    ]
  },

  /* ---------- 12. DIGITAL GIFT --------------------------------------- */
  // ⚠ Demo values are FICTIONAL. Set enabled: false to hide this section.
  gift: {
    enabled: true,
    bankName: "Maybank",
    accountName: "ARWIND RAJ & THIVYA PRIYA (DEMO)",
    accountNumber: "0000 0000 0000",
    qrImage: "assets/images/duitnow-qr-sample.png",   // ⚠ sample only — replace with the couple's real DuitNow QR
    note: { en: "Reference: your name + “Wedding”", ta: "குறிப்பு: உங்கள் பெயர் + “Wedding”" }
  },

  /* ---------- 13. FOOTER --------------------------------------------- */
  footer: {
    studioName: "Onetone Studio",
    studioUrl: "https://onetone.my"
  }
};
