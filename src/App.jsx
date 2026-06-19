import { useState, useRef, useEffect } from "react";

// ── Verse data: NIV 1984 ────────────────────────────────────────────
const PACKS = [
  {
    id: "5A",
    name: "The 5 Assurances",
    verses: [
      { id: "5A-1", title: "Assurance of Salvation", reference: "1 John 5:11-12", text: "And this is the testimony: God has given us eternal life, and this life is in his Son. He who has the Son has life; he who does not have the Son of God does not have life." },
      { id: "5A-2", title: "Assurance of Answered Prayer", reference: "John 16:24", text: "Until now you have not asked for anything in my name. Ask and you will receive, and your joy will be complete." },
      { id: "5A-3", title: "Assurance of Victory", reference: "1 Corinthians 10:13", text: "No temptation has seized you except what is common to man. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can stand up under it." },
      { id: "5A-4", title: "Assurance of Forgiveness", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
      { id: "5A-5", title: "Assurance of Guidance", reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge him, and he will make your paths straight." },
    ],
  },
  {
    id: "A",
    name: "Pack A · Live the New Life",
    verses: [
      { id: "A-1", title: "Christ the Center", reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, he is a new creation; the old has gone, the new has come!" },
      { id: "A-2", title: "Christ the Center", reference: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I live in the body, I live by faith in the Son of God, who loved me and gave himself for me." },
      { id: "A-3", title: "Obedience to Christ", reference: "Romans 12:1", text: "Therefore, I urge you, brothers, in view of God's mercy, to offer your bodies as living sacrifices, holy and pleasing to God—this is your spiritual act of worship." },
      { id: "A-4", title: "Obedience to Christ", reference: "John 14:21", text: "Whoever has my commands and obeys them, he is the one who loves me. He who loves me will be loved by my Father, and I too will love him and show myself to him." },
      { id: "A-5", title: "The Word", reference: "2 Timothy 3:16", text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness," },
      { id: "A-6", title: "The Word", reference: "Joshua 1:8", text: "Do not let this Book of the Law depart from your mouth; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful." },
      { id: "A-7", title: "Prayer", reference: "John 15:7", text: "If you remain in me and my words remain in you, ask whatever you wish, and it will be given you." },
      { id: "A-8", title: "Prayer", reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
      { id: "A-9", title: "Fellowship", reference: "Matthew 18:20", text: "For where two or three come together in my name, there am I with them." },
      { id: "A-10", title: "Fellowship", reference: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds. Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching." },
      { id: "A-11", title: "Witnessing", reference: "Matthew 4:19", text: "\"Come, follow me,\" Jesus said, \"and I will make you fishers of men.\"" },
      { id: "A-12", title: "Witnessing", reference: "Romans 1:16", text: "I am not ashamed of the gospel, because it is the power of God for the salvation of everyone who believes: first for the Jew, then for the Gentile." },
    ],
  },
  {
    id: "B",
    name: "Pack B · Proclaim Christ",
    verses: [
      { id: "B-1", title: "All Have Sinned", reference: "Romans 3:23", text: "for all have sinned and fall short of the glory of God," },
      { id: "B-2", title: "All Have Sinned", reference: "Isaiah 53:6", text: "We all, like sheep, have gone astray, each of us has turned to his own way; and the Lord has laid on him the iniquity of us all." },
      { id: "B-3", title: "Sin's Penalty", reference: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." },
      { id: "B-4", title: "Sin's Penalty", reference: "Hebrews 9:27", text: "Just as man is destined to die once, and after that to face judgment," },
      { id: "B-5", title: "Christ Paid the Penalty", reference: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
      { id: "B-6", title: "Christ Paid the Penalty", reference: "1 Peter 3:18", text: "For Christ died for sins once for all, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive by the Spirit," },
      { id: "B-7", title: "Salvation Not by Works", reference: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith—and this not from yourselves, it is the gift of God— not by works, so that no one can boast." },
      { id: "B-8", title: "Salvation Not by Works", reference: "Titus 3:5", text: "he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit," },
      { id: "B-9", title: "Must Receive Christ", reference: "John 1:12", text: "Yet to all who received him, to those who believed in his name, he gave the right to become children of God—" },
      { id: "B-10", title: "Must Receive Christ", reference: "Revelation 3:20", text: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with him, and he with me." },
      { id: "B-11", title: "Assurance of Salvation", reference: "1 John 5:13", text: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life." },
      { id: "B-12", title: "Assurance of Salvation", reference: "John 5:24", text: "\"I tell you the truth, whoever hears my word and believes him who sent me has eternal life and will not be condemned; he has crossed over from death to life." },
    ],
  },
  {
    id: "C",
    name: "Pack C · Rely on God's Resources",
    verses: [
      { id: "C-1", title: "His Spirit", reference: "1 Corinthians 3:16", text: "Don't you know that you yourselves are God's temple and that God's Spirit lives in you?" },
      { id: "C-2", title: "His Spirit", reference: "1 Corinthians 2:12", text: "We have not received the spirit of the world but the Spirit who is from God, that we may understand what God has freely given us." },
      { id: "C-3", title: "His Strength", reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
      { id: "C-4", title: "His Strength", reference: "Philippians 4:13", text: "I can do everything through him who gives me strength." },
      { id: "C-5", title: "His Faithfulness", reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
      { id: "C-6", title: "His Faithfulness", reference: "Numbers 23:19", text: "God is not a man, that he should lie, nor a son of man, that he should change his mind. Does he speak and then not act? Does he promise and not fulfill?" },
      { id: "C-7", title: "His Peace", reference: "Isaiah 26:3", text: "You will keep in perfect peace him whose mind is steadfast, because he trusts in you." },
      { id: "C-8", title: "His Peace", reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
      { id: "C-9", title: "His Provision", reference: "Romans 8:32", text: "He who did not spare his own Son, but gave him up for us all—how will he not also, along with him, graciously give us all things?" },
      { id: "C-10", title: "His Provision", reference: "Philippians 4:19", text: "And my God will meet all your needs according to his glorious riches in Christ Jesus." },
      { id: "C-11", title: "His Help in Temptation", reference: "Hebrews 2:18", text: "Because he himself suffered when he was tempted, he is able to help those who are being tempted." },
      { id: "C-12", title: "His Help in Temptation", reference: "Psalm 119:9,11", text: "How can a young man keep his way pure? By living according to your word. I have hidden your word in my heart that I might not sin against you." },
    ],
  },
  {
    id: "D",
    name: "Pack D · Be Christ's Disciple",
    verses: [
      { id: "D-1", title: "Put Christ First", reference: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
      { id: "D-2", title: "Put Christ First", reference: "Luke 9:23", text: "Then he said to them all: \"If anyone would come after me, he must deny himself and take up his cross daily and follow me." },
      { id: "D-3", title: "Separate from the World", reference: "1 John 2:15-16", text: "Do not love the world or anything in the world. If anyone loves the world, the love of the Father is not in him. For everything in the world—the cravings of sinful man, the lust of his eyes and the boasting of what he has and does—comes not from the Father but from the world." },
      { id: "D-4", title: "Separate from the World", reference: "Romans 12:2", text: "Do not conform any longer to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will." },
      { id: "D-5", title: "Be Steadfast", reference: "1 Corinthians 15:58", text: "Therefore, my dear brothers, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain." },
      { id: "D-6", title: "Be Steadfast", reference: "Hebrews 12:3", text: "Consider him who endured such opposition from sinful men, so that you will not grow weary and lose heart." },
      { id: "D-7", title: "Serve Others", reference: "Mark 10:45", text: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." },
      { id: "D-8", title: "Serve Others", reference: "2 Corinthians 4:5", text: "For we do not preach ourselves, but Jesus Christ as Lord, and ourselves as your servants for Jesus' sake." },
      { id: "D-9", title: "Give Generously", reference: "Proverbs 3:9-10", text: "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine." },
      { id: "D-10", title: "Give Generously", reference: "2 Corinthians 9:6-7", text: "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously. Each man should give what he has decided in his heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." },
      { id: "D-11", title: "Develop World Vision", reference: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." },
      { id: "D-12", title: "Develop World Vision", reference: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age." },
    ],
  },
  {
    id: "E",
    name: "Pack E · Grow in Christlikeness",
    verses: [
      { id: "E-1", title: "Love", reference: "John 13:34-35", text: "\"A new command I give you: Love one another. As I have loved you, so you must love one another. By this all men will know that you are my disciples, if you love one another.\"" },
      { id: "E-2", title: "Love", reference: "1 John 3:18", text: "Dear children, let us not love with words or tongue but with actions and in truth." },
      { id: "E-3", title: "Humility", reference: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit, but in humility consider others better than yourselves. Each of you should look not only to your own interests, but also to the interests of others." },
      { id: "E-4", title: "Humility", reference: "1 Peter 5:5-6", text: "Young men, in the same way be submissive to those who are older. All of you, clothe yourselves with humility toward one another, because, \"God opposes the proud but gives grace to the humble.\" Humble yourselves, therefore, under God's mighty hand, that he may lift you up in due time." },
      { id: "E-5", title: "Purity", reference: "Ephesians 5:3", text: "But among you there must not be even a hint of sexual immorality, or of any kind of impurity, or of greed, because these are improper for God's holy people." },
      { id: "E-6", title: "Purity", reference: "1 Peter 2:11", text: "Dear friends, I urge you, as aliens and strangers in the world, to abstain from sinful desires, which war against your soul." },
      { id: "E-7", title: "Honesty", reference: "Leviticus 19:11", text: "Do not steal. Do not lie. Do not deceive one another." },
      { id: "E-8", title: "Honesty", reference: "Acts 24:16", text: "So I strive always to keep my conscience clear before God and man." },
      { id: "E-9", title: "Faith", reference: "Hebrews 11:6", text: "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him." },
      { id: "E-10", title: "Faith", reference: "Romans 4:20-21", text: "Yet he did not waver through unbelief regarding the promise of God, but was strengthened in his faith and gave glory to God, being fully persuaded that God had power to do what he had promised." },
      { id: "E-11", title: "Good Works", reference: "Galatians 6:9-10", text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers." },
      { id: "E-12", title: "Good Works", reference: "Matthew 5:16", text: "In the same way, let your light shine before men, that they may see your good deeds and praise your Father in heaven." },
    ],
  },
  {
    id: "DEP1",
    name: "Pack 1 - Assurance of Salvation",
    verses: [
      { id: "DEP1-1", title: "Can be assured", reference: "2 Corinthians 13:5", text: "Examine yourselves to see whether you are in the faith; test yourselves. Do you not realize that Christ Jesus is in you\u2014unless, of course, you fail the test?" },
      { id: "DEP1-2", title: "Can be assured", reference: "1 John 5:11-12", text: "And this is the testimony: God has given us eternal life, and this life is in his Son. He who has the Son has life; he who does not have the Son of God does not have life." },
      { id: "DEP1-3", title: "Assured of having eternal life", reference: "1 John 5:13", text: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life." },
      { id: "DEP1-4", title: "Assured of having eternal life", reference: "John 6:47", text: "I tell you the truth, he who believes has everlasting life." },
      { id: "DEP1-5", title: "Forgiveness of sin", reference: "Ephesians 1:7", text: "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God's grace" },
      { id: "DEP1-6", title: "Forgiveness of sin", reference: "Romans 8:1", text: "Therefore, there is now no condemnation for those who are in Christ Jesus," },
      { id: "DEP1-7", title: "Justified", reference: "Romans 3:24", text: "and are justified freely by his grace through the redemption that came by Christ Jesus." },
      { id: "DEP1-8", title: "Justified", reference: "Romans 5:1", text: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ," },
      { id: "DEP1-9", title: "Born again in Christ", reference: "1 Peter 1:3", text: "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead," },
      { id: "DEP1-10", title: "Born again in Christ", reference: "Titus 3:5", text: "he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit," },
      { id: "DEP1-11", title: "Being children of God", reference: "Galatians 3:26", text: "You are all sons of God through faith in Christ Jesus," },
      { id: "DEP1-12", title: "Being children of God", reference: "Romans 8:14", text: "because those who are led by the Spirit of God are sons of God." },
      { id: "DEP1-13", title: "Holy Spirit living in Believers", reference: "Romans 8:9", text: "You, however, are controlled not by the sinful nature but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ." },
      { id: "DEP1-14", title: "Holy Spirit living in Believers", reference: "John 14:16-17", text: "And I will ask the Father, and he will give you another Counselor to be with you forever\u2014the Spirit of truth. The world cannot accept him, because it neither sees him nor knows him. But you know him, for he lives with you and will be in you." },
      { id: "DEP1-15", title: "Salvation never to be lost", reference: "John 10:28-29", text: "I give them eternal life, and they shall never perish; no one can snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father's hand." },
      { id: "DEP1-16", title: "Salvation never to be lost", reference: "Romans 8:39", text: "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." },
      { id: "DEP1-17", title: "Assurance based on the Word", reference: "1 Peter 1:23", text: "For you have been born again, not of perishable seed, but of imperishable, through the living and enduring word of God." },
      { id: "DEP1-18", title: "Assurance based on the Word", reference: "Ephesians 1:13", text: "And you also were included in Christ when you heard the word of truth, the gospel of your salvation. Having believed, you were marked in him with a seal, the promised Holy Spirit," },
    ],
  },

  {
    id: "DEP2",
    name: "Pack 2 - Quiet Time",
    verses: [
      { id: "DEP2-1", title: "God wants to fellowship with us", reference: "1 Corinthians 1:9", text: "God, who has called you into fellowship with his Son Jesus Christ our Lord, is faithful." },
      { id: "DEP2-2", title: "God wants to fellowship with us", reference: "Isaiah 30:18", text: "Yet the LORD longs to be gracious to you; he rises to show you compassion. For the LORD is a God of justice. Blessed are all who wait for him!" },
      { id: "DEP2-3", title: "God's command", reference: "Isaiah 55:6", text: "Seek the LORD while he may be found; call on him while he is near." },
      { id: "DEP2-4", title: "God's command", reference: "Psalm 27:8", text: "My heart says of you, \"Seek his face!\" Your face, LORD, I will seek." },
      { id: "DEP2-5", title: "Promise of blessings", reference: "John 15:5", text: "\"I am the vine; you are the branches. If a man remains in me and I in him, he will bear much fruit; apart from me you can do nothing." },
      { id: "DEP2-6", title: "Promise of blessings", reference: "Psalm 34:10", text: "The lions may grow weak and hungry, but those who seek the LORD lack no good thing." },
      { id: "DEP2-7", title: "To discern and obey God's will", reference: "Habakkuk 2:1", text: "I will stand at my watch and station myself on the ramparts; I will look to see what he will say to me, and what answer I am to give to this complaint." },
      { id: "DEP2-8", title: "To discern and obey God's will", reference: "Psalm 143:8, 10", text: "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I lift up my soul. Teach me to do your will, for you are my God; may your good Spirit lead me on level ground." },
      { id: "DEP2-9", title: "Looking on the Lord", reference: "Hebrews 12:2", text: "Let us fix our eyes on Jesus, the author and perfecter of our faith, who for the joy set before him endured the cross, scorning its shame, and sat down at the right hand of the throne of God." },
      { id: "DEP2-10", title: "Looking on the Lord", reference: "Psalm 42:11", text: "Why are you downcast, O my soul? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
      { id: "DEP2-11", title: "Coming to the Lord with thirst", reference: "Psalm 42:1", text: "As the deer pants for streams of water, so my soul pants for you, O God." },
      { id: "DEP2-12", title: "Coming to the Lord with thirst", reference: "Psalm 130:5-6", text: "I wait for the LORD, my soul waits, and in his word I put my hope. My soul waits for the Lord more than watchmen wait for the morning, more than watchmen wait for the morning." },
      { id: "DEP2-13", title: "Casting our burdens on the Lord", reference: "Psalm 55:22", text: "Cast your cares on the LORD and he will sustain you; he will never let the righteous fall." },
      { id: "DEP2-14", title: "Casting our burdens on the Lord", reference: "Psalm 68:19", text: "Praise be to the Lord, to God our Savior, who daily bears our burdens. Selah" },
      { id: "DEP2-15", title: "Taking refuge and rest in the Lord", reference: "Psalm 91:9-10", text: "If you make the Most High your dwelling\u2014even the LORD, who is my refuge\u2014then no harm will befall you, no disaster will come near your tent." },
      { id: "DEP2-16", title: "Taking refuge and rest in the Lord", reference: "Matthew 11:28-29", text: "\"Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls." },
      { id: "DEP2-17", title: "Meeting the Lord in the Word and prayer", reference: "Psalm 119:147-148", text: "I rise before dawn and cry for help; I have put my hope in your word. My eyes stay open through the watches of the night, that I may meditate on your promises." },
      { id: "DEP2-18", title: "Meeting the Lord in the Word and prayer", reference: "Psalm 5:3", text: "In the morning, O LORD, you hear my voice; in the morning I lay my requests before you and wait in expectation." },
      { id: "DEP2-19", title: "Worshiping the Lord", reference: "Psalm 95:6", text: "Come, let us bow down in worship, let us kneel before the LORD our Maker;" },
      { id: "DEP2-20", title: "Worshiping the Lord", reference: "Hebrews 13:15", text: "Through Jesus, therefore, let us continually offer to God a sacrifice of praise\u2014the fruit of lips that confess his name." },
      { id: "DEP2-21", title: "Getting daily satisfaction", reference: "Psalm 90:14", text: "Satisfy us in the morning with your unfailing love, that we may sing for joy and be glad all our days." },
      { id: "DEP2-22", title: "Getting daily satisfaction", reference: "Psalm 107:9", text: "for he satisfies the thirsty and fills the hungry with good things." },
      { id: "DEP2-23", title: "Jesus - praying very early in the morning", reference: "Mark 1:35", text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed." },
      { id: "DEP2-24", title: "Moses - personal fellowship with the Lord", reference: "Exodus 33:11", text: "The LORD would speak to Moses face to face, as a man speaks with his friend. Then Moses would return to the camp, but his young aide Joshua son of Nun did not leave the tent." },
      { id: "DEP2-25", title: "Daniel - giving top priority to the fellowship", reference: "Daniel 6:10", text: "Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before." },
      { id: "DEP2-26", title: "Disciples - understanding the Word when alone with Jesus", reference: "Mark 4:34", text: "He did not say anything to them without using a parable. But when he was alone with his own disciples, he explained everything." },
    ],
  },
  {
    id: "DEP3",
    name: "Pack 3 - The Word",
    verses: [
      { id: "DEP3-1", title: "Inspired by God", reference: "2 Timothy 3:16", text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness," },
      { id: "DEP3-2", title: "Inspired by God", reference: "2 Peter 1:21", text: "For prophecy never had its origin in the will of man, but men spoke from God as they were carried along by the Holy Spirit." },
      { id: "DEP3-3", title: "Standing forever and never changing", reference: "Matthew 24:35", text: "Heaven and earth will pass away, but my words will never pass away." },
      { id: "DEP3-4", title: "Standing forever and never changing", reference: "1 Peter 1:24-25", text: "For, \"All men are like grass, and all their glory is like the flowers of the field; the grass withers and the flowers fall, but the word of the Lord stands forever.\" And this is the word that was preached to you." },
      { id: "DEP3-5", title: "Being the truth", reference: "John 17:17", text: "Sanctify them by the truth; your word is truth." },
      { id: "DEP3-6", title: "Being the truth", reference: "2 Samuel 7:28", text: "O Sovereign LORD, you are God! Your words are trustworthy, and you have promised these good things to your servant." },
      { id: "DEP3-7", title: "Having power", reference: "Jeremiah 23:29", text: "\"Is not my word like fire,\" declares the LORD, \"and like a hammer that breaks a rock in pieces?" },
      { id: "DEP3-8", title: "Having power", reference: "2 Timothy 2:9", text: "for which I am suffering even to the point of being chained like a criminal. But God's word is not chained." },
      { id: "DEP3-9", title: "Jesus also confirmed the Word", reference: "Matthew 4:4", text: "Jesus answered, \"It is written: 'Man does not live on bread alone, but on every word that comes from the mouth of God.'\"" },
      { id: "DEP3-10", title: "Jesus also confirmed the Word", reference: "Luke 24:27", text: "And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself." },
      { id: "DEP3-11", title: "Making us born again", reference: "1 Peter 1:23", text: "For you have been born again, not of perishable seed, but of imperishable, through the living and enduring word of God." },
      { id: "DEP3-12", title: "Making us born again", reference: "James 1:18", text: "He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created." },
      { id: "DEP3-13", title: "Helping us grow up", reference: "1 Peter 2:2", text: "Like newborn babies, crave pure spiritual milk, so that by it you may grow up in your salvation," },
      { id: "DEP3-14", title: "Helping us grow up", reference: "Acts 20:32", text: "\"Now I commit you to God and to the word of his grace, which can build you up and give you an inheritance among all those who are sanctified." },
      { id: "DEP3-15", title: "Giving guidance", reference: "Psalm 119:105", text: "Your word is a lamp to my feet and a light for my path." },
      { id: "DEP3-16", title: "Giving guidance", reference: "Proverbs 6:22-23", text: "When you walk, they will guide you; when you sleep, they will watch over you; when you awake, they will speak to you. For these commands are a lamp, this teaching is a light, and the corrections of discipline are the way to life," },
      { id: "DEP3-17", title: "Solving problems", reference: "Psalm 107:20", text: "He sent forth his word and healed them; he rescued them from the grave." },
      { id: "DEP3-18", title: "Solving problems", reference: "Matthew 8:8", text: "The centurion replied, \"Lord, I do not deserve to have you come under my roof. But just say the word, and my servant will be healed." },
      { id: "DEP3-19", title: "Being our joy and delight", reference: "Jeremiah 15:16", text: "When your words came, I ate them; they were my joy and my heart's delight, for I bear your name, O LORD God Almighty." },
      { id: "DEP3-20", title: "Being our joy and delight", reference: "Psalm 119:111", text: "Your statutes are my heritage forever; they are the joy of my heart." },
      { id: "DEP3-21", title: "Being spiritual weapons", reference: "Ephesians 6:17", text: "Take the helmet of salvation and the sword of the Spirit, which is the word of God." },
      { id: "DEP3-22", title: "Being spiritual weapons", reference: "Hebrews 4:12", text: "For the word of God is living and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart." },
      { id: "DEP3-23", title: "Search the Word every day", reference: "Acts 17:11", text: "Now the Bereans were of more noble character than the Thessalonians, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true." },
      { id: "DEP3-24", title: "Meditate on the Word all day long", reference: "Psalm 119:97", text: "Oh, how I love your law! I meditate on it all day long." },
      { id: "DEP3-25", title: "Obey the Word before teaching", reference: "Ezra 7:10", text: "For Ezra had devoted himself to the study and observance of the Law of the LORD, and to teaching its decrees and laws in Israel." },
      { id: "DEP3-26", title: "Treasure the Word more than daily bread", reference: "Job 23:12", text: "I have not departed from the commands of his lips; I have treasured the words of his mouth more than my daily bread." },
      { id: "DEP3-27", title: "Trust and obey the Word", reference: "Luke 5:5-6", text: "Simon answered, \"Master, we've worked hard all night and haven't caught anything. But because you say so, I will let down the nets.\" When they had done so, they caught such a large number of fish that their nets began to break." },
      { id: "DEP3-28", title: "Hearing", reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word of Christ." },
      { id: "DEP3-29", title: "Hearing", reference: "Luke 11:28", text: "He replied, \"Blessed rather are those who hear the word of God and obey it.\"" },
      { id: "DEP3-30", title: "Reading", reference: "Revelation 1:3", text: "Blessed is the one who reads the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near." },
      { id: "DEP3-31", title: "Reading", reference: "Deuteronomy 17:19", text: "It is to be with him, and he is to read it all the days of his life so that he may learn to revere the LORD his God and follow carefully all the words of this law and these decrees" },
      { id: "DEP3-32", title: "Studying", reference: "Acts 17:11", text: "Now the Bereans were of more noble character than the Thessalonians, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true." },
      { id: "DEP3-33", title: "Studying", reference: "2 Timothy 2:15", text: "Do your best to present yourself to God as one approved, a workman who does not need to be ashamed and who correctly handles the word of truth." },
      { id: "DEP3-34", title: "Memorizing", reference: "Deuteronomy 6:6", text: "These commandments that I give you today are to be upon your hearts." },
      { id: "DEP3-35", title: "Memorizing", reference: "Proverbs 7:1-3", text: "My son, keep my words and store up my commands within you. Keep my commands and you will live; guard my teachings as the apple of your eye. Bind them on your fingers; write them on the tablet of your heart." },
      { id: "DEP3-36", title: "Meditating", reference: "Psalm 1:1-2", text: "Blessed is the man who does not walk in the counsel of the wicked or stand in the way of sinners or sit in the seat of mockers. But his delight is in the law of the LORD, and on his law he meditates day and night." },
      { id: "DEP3-37", title: "Meditating", reference: "Joshua 1:8", text: "Do not let this Book of the Law depart from your mouth; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful." },
    ],
  },
  {
    id: "DEP4",
    name: "Pack 4 - Prayer",
    verses: [
      { id: "DEP4-1", title: "Cease not to pray", reference: "1 Thessalonians 5:17", text: "pray continually;" },
      { id: "DEP4-2", title: "Devote yourself to prayer", reference: "Colossians 4:2", text: "Devote yourselves to prayer, being watchful and thankful." },
      { id: "DEP4-3", title: "Be alert to pray", reference: "1 Peter 4:7", text: "The end of all things is near. Therefore be clear minded and self-controlled so that you can pray." },
      { id: "DEP4-4", title: "Pray for everyone", reference: "1 Timothy 2:1-2", text: "I urge, then, first of all, that requests, prayers, intercession and thanksgiving be made for everyone\u2014for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness." },
      { id: "DEP4-5", title: "Promise to answer", reference: "John 14:13-14", text: "And I will do whatever you ask in my name, so that the Son may bring glory to the Father. You may ask me for anything in my name, and I will do it." },
      { id: "DEP4-6", title: "Immeasurable answer", reference: "Ephesians 3:20", text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us," },
      { id: "DEP4-7", title: "Understanding God's will", reference: "Jeremiah 33:3", text: "'Call to me and I will answer you and tell you great and unsearchable things you do not know.'" },
      { id: "DEP4-8", title: "Getting the wisdom from God", reference: "James 1:5", text: "If any of you lacks wisdom, he should ask God, who gives generously to all without finding fault, and it will be given to him." },
      { id: "DEP4-9", title: "Delivering us from fears", reference: "Psalm 34:4", text: "I sought the LORD, and he answered me; he delivered me from all my fears." },
      { id: "DEP4-10", title: "Delivering us from trouble", reference: "Psalm 50:15", text: "and call upon me in the day of trouble; I will deliver you, and you will honor me.\"" },
      { id: "DEP4-11", title: "Giving us boldness", reference: "Acts 4:31", text: "After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly." },
      { id: "DEP4-12", title: "Giving us opportunities for the Gospel", reference: "Colossians 4:3", text: "And pray for us, too, that God may open a door for our message, so that we may proclaim the mystery of Christ, for which I am in chains." },
      { id: "DEP4-13", title: "Pray in the name of Jesus", reference: "John 16:24", text: "Until now you have not asked for anything in my name. Ask and you will receive, and your joy will be complete." },
      { id: "DEP4-14", title: "Pray in faith", reference: "Matthew 21:22", text: "If you believe, you will receive whatever you ask for in prayer.\"" },
      { id: "DEP4-15", title: "Pray in the Spirit", reference: "Ephesians 6:18", text: "And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the saints." },
      { id: "DEP4-16", title: "Pray in God's will", reference: "1 John 5:14-15", text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us. And if we know that he hears us\u2014whatever we ask\u2014we know that we have what we asked of him." },
      { id: "DEP4-17", title: "Confess and renounce the sin", reference: "Psalm 66:18", text: "If I had cherished sin in my heart, the Lord would not have listened;" },
      { id: "DEP4-18", title: "Obey the Lord", reference: "1 John 3:22", text: "and receive from him anything we ask, because we obey his commands and do what pleases him." },
      { id: "DEP4-19", title: "Pray with one accord", reference: "Matthew 18:19", text: "\"Again, I tell you that if two of you on earth agree about anything you ask for, it will be done for you by my Father in heaven." },
      { id: "DEP4-20", title: "Ask and act", reference: "Matthew 7:7-8", text: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; he who seeks finds; and to him who knocks, the door will be opened." },
      { id: "DEP4-21", title: "Pray with all your heart", reference: "Jeremiah 29:12-13", text: "Then you will call upon me and come and pray to me, and I will listen to you. You will seek me and find me when you seek me with all your heart." },
      { id: "DEP4-22", title: "Pray in claiming the promise", reference: "Nehemiah 1:8-9", text: "\"Remember the instruction you gave your servant Moses, saying, 'If you are unfaithful, I will scatter you among the nations, but if you return to me and obey my commands, then even if your exiled people are at the farthest horizon, I will gather them from there and bring them to the place I have chosen as a dwelling for my Name.'" },
      { id: "DEP4-23", title: "Praying at the risk of life", reference: "Daniel 6:10", text: "Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before." },
      { id: "DEP4-24", title: "Giving priority to prayer", reference: "Luke 5:15-16", text: "Yet the news about him spread all the more, so that crowds of people came to hear him and to be healed of their sicknesses. But Jesus often withdrew to lonely places and prayed." },
      { id: "DEP4-25", title: "Praying all through the night", reference: "Luke 6:12", text: "One of those days Jesus went out to a mountainside to pray, and spent the night praying to God." },
      { id: "DEP4-26", title: "Praying earnestly", reference: "James 5:17-18", text: "Elijah was a man just like us. He prayed earnestly that it would not rain, and it did not rain on the land for three and a half years. Again he prayed, and the heavens gave rain, and the earth produced its crops." },
      { id: "DEP4-27", title: "Praying in the midst of hardship", reference: "Acts 16:25", text: "About midnight Paul and Silas were praying and singing hymns to God, and the other prisoners were listening to them." },
      { id: "DEP4-28", title: "Praising", reference: "1 Chronicles 29:11-13", text: "Yours, O LORD, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, O LORD, is the kingdom; you are exalted as head over all. Wealth and honor come from you; you are the ruler of all things. In your hands are strength and power to exalt and give strength to all. Now, our God, we give you thanks, and praise your glorious name." },
      { id: "DEP4-29", title: "Intercession", reference: "1 Timothy 2:1-2", text: "I urge, then, first of all, that requests, prayers, intercession and thanksgiving be made for everyone\u2014for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness." },
      { id: "DEP4-30", title: "Thanksgiving", reference: "1 Thessalonians 5:18", text: "give thanks in all circumstances, for this is God's will for you in Christ Jesus." },
      { id: "DEP4-31", title: "Confession", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
      { id: "DEP4-32", title: "Supplication", reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    ],
  },
  {
    id: "DEP5",
    name: "Pack 5 - Fellowship",
    verses: [
      { id: "DEP5-1", title: "The Blood of Christ", reference: "Ephesians 2:13", text: "But now in Christ Jesus you who once were far away have been brought near through the blood of Christ." },
      { id: "DEP5-2", title: "The Blood of Christ", reference: "Colossians 1:20", text: "and through him to reconcile to himself all things, whether things on earth or things in heaven, by making peace through his blood, shed on the cross." },
      { id: "DEP5-3", title: "God - The Father, The Son, The Holy Spirit", reference: "1 John 1:3", text: "We proclaim to you what we have seen and heard, so that you also may have fellowship with us. And our fellowship is with the Father and with his Son, Jesus Christ." },
      { id: "DEP5-4", title: "God - The Father, The Son, The Holy Spirit", reference: "2 Corinthians 13:14", text: "May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all." },
      { id: "DEP5-5", title: "Promise of being with us", reference: "Matthew 18:20", text: "For where two or three come together in my name, there am I with them.\"" },
      { id: "DEP5-6", title: "Bestowing His blessings", reference: "Psalm 133:1-3", text: "How good and pleasant it is when brothers live together in unity! It is like precious oil poured on the head, running down on the beard, running down on Aaron's beard, down upon the collar of his robes. It is as if the dew of Hermon were falling on Mount Zion. For there the LORD bestows his blessing, even life forevermore." },
      { id: "DEP5-7", title: "Protection against sins", reference: "Hebrews 3:13", text: "But encourage one another daily, as long as it is called Today, so that none of you may be hardened by sin's deceitfulness." },
      { id: "DEP5-8", title: "Helping up each other", reference: "Ecclesiastes 4:9-10", text: "Two are better than one, because they have a good return for their work: If one falls down, his friend can help him up. But pity the man who falls and has no one to help him up!" },
      { id: "DEP5-9", title: "Training in godly life", reference: "2 Timothy 2:22", text: "Flee the evil desires of youth, and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart." },
      { id: "DEP5-10", title: "Developing godly character", reference: "Proverbs 27:17,19", text: "As iron sharpens iron, so one man sharpens another. As water reflects a face, so a man's heart reflects the man." },
      { id: "DEP5-11", title: "Getting God's wisdom", reference: "Proverbs 13:20", text: "He who walks with the wise grows wise, but a companion of fools suffers harm." },
      { id: "DEP5-12", title: "Attaining maturity", reference: "Ephesians 4:13", text: "until we all reach unity in the faith and in the knowledge of the Son of God and become mature, attaining to the whole measure of the fullness of Christ." },
      { id: "DEP5-13", title: "Fruitful in the ministry", reference: "Acts 2:42,47", text: "They devoted themselves to the apostles' teaching and to the fellowship, to the breaking of bread and to prayer. praising God and enjoying the favor of all the people. And the Lord added to their number daily those who were being saved." },
      { id: "DEP5-14", title: "Partnering in the gospel", reference: "Philippians 1:5,27", text: "because of your partnership in the gospel from the first day until now, Whatever happens, conduct yourselves in a manner worthy of the gospel of Christ. Then, whether I come and see you or only hear about you in my absence, I will know that you stand firm in one spirit, contending as one man for the faith of the gospel" },
      { id: "DEP5-15", title: "Spurring one another", reference: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds. Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another\u2014and all the more as you see the Day approaching." },
      { id: "DEP5-16", title: "Meeting the needs", reference: "2 Corinthians 8:3-4", text: "For I testify that they gave as much as they were able, and even beyond their ability. Entirely on their own, they urgently pleaded with us for the privilege of sharing in this service to the saints." },
      { id: "DEP5-17", title: "Participating in the sufferings of Christ", reference: "1 Peter 4:13", text: "But rejoice that you participate in the sufferings of Christ, so that you may be overjoyed when his glory is revealed." },
      { id: "DEP5-18", title: "Carrying each other's burdens", reference: "Galatians 6:2", text: "Carry each other's burdens, and in this way you will fulfill the law of Christ." },
      { id: "DEP5-19", title: "Be like-minded", reference: "Philippians 2:1-2", text: "If you have any encouragement from being united with Christ, if any comfort from his love, if any fellowship with the Spirit, if any tenderness and compassion, then make my joy complete by being like-minded, having the same love, being one in spirit and purpose." },
      { id: "DEP5-20", title: "Be humble", reference: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit, but in humility consider others better than yourselves. Each of you should look not only to your own interests, but also to the interests of others." },
      { id: "DEP5-21", title: "Open your heart wide", reference: "2 Corinthians 6:12-13", text: "We are not withholding our affection from you, but you are withholding yours from us. As a fair exchange\u2014I speak as to my children\u2014open wide your hearts also." },
      { id: "DEP5-22", title: "Submit to one another", reference: "Ephesians 5:21", text: "Submit to one another out of reverence for Christ." },
      { id: "DEP5-23", title: "Do not compare with others", reference: "Mark 9:34-35", text: "But they kept quiet because on the way they had argued about who was the greatest. Sitting down, Jesus called the Twelve and said, \"If anyone wants to be first, he must be the very last, and the servant of all.\"" },
      { id: "DEP5-24", title: "Let no bitter root grow up", reference: "Hebrews 12:15", text: "See to it that no one misses the grace of God and that no bitter root grows up to cause trouble and defile many." },
      { id: "DEP5-25", title: "Part from the fruitless things", reference: "Ephesians 5:11", text: "Have nothing to do with the fruitless deeds of darkness, but rather expose them." },
      { id: "DEP5-26", title: "Be available", reference: "2 Timothy 2:4", text: "No one serving as a soldier gets involved in civilian affairs\u2014he wants to please his commanding officer." },
      { id: "DEP5-27", title: "In relation to believers", reference: "Matthew 5:23-24", text: "\"Therefore, if you are offering your gift at the altar and there remember that your brother has something against you, leave your gift there in front of the altar. First go and be reconciled to your brother; then come and offer your gift." },
      { id: "DEP5-28", title: "In relation to believers", reference: "Matthew 18:15", text: "\"If your brother sins against you, go and show him his fault, just between the two of you. If he listens to you, you have won your brother over." },
      { id: "DEP5-29", title: "In relation to God", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
      { id: "DEP5-30", title: "In relation to God", reference: "Proverbs 28:13", text: "He who conceals his sins does not prosper, but whoever confesses and renounces them finds mercy." },
    ],
  },
  {
    id: "DEP6",
    name: "Pack 6 - Witnessing",
    verses: [
      { id: "DEP6-1", title: "Every Christian", reference: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\"" },
      { id: "DEP6-2", title: "Every Christian", reference: "2 Corinthians 5:18-19", text: "All this is from God, who reconciled us to himself through Christ and gave us the ministry of reconciliation: that God was reconciling the world to himself in Christ, not counting men's sins against them. And he has committed to us the message of reconciliation." },
      { id: "DEP6-3", title: "God's command", reference: "2 Timothy 4:1-2", text: "In the presence of God and of Christ Jesus, who will judge the living and the dead, and in view of his appearing and his kingdom, I give you this charge: Preach the Word; be prepared in season and out of season; correct, rebuke and encourage\u2014with great patience and careful instruction." },
      { id: "DEP6-4", title: "Love for the lost", reference: "Luke 19:10", text: "For the Son of Man came to seek and to save what was lost.\"" },
      { id: "DEP6-5", title: "God's commission", reference: "1 Thessalonians 2:4", text: "On the contrary, we speak as men approved by God to be entrusted with the gospel. We are not trying to please men but God, who tests our hearts." },
      { id: "DEP6-6", title: "Compelling role", reference: "1 Corinthians 9:16", text: "Yet when I preach the gospel, I cannot boast, for I am compelled to preach. Woe to me if I do not preach the gospel!" },
      { id: "DEP6-7", title: "No preaching, no believing", reference: "Romans 10:14", text: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them?" },
      { id: "DEP6-8", title: "God wants all men to be saved", reference: "1 Timothy 2:3-4", text: "This is good, and pleases God our Savior, who wants all men to be saved and to come to a knowledge of the truth." },
      { id: "DEP6-9", title: "God's great concern for men", reference: "Jonah 4:10-11", text: "But the LORD said, \"You have been concerned about this vine, though you did not tend it or make it grow. It sprang up overnight and died overnight. But Nineveh has more than a hundred and twenty thousand people who cannot tell their right hand from their left, and many cattle as well. Should I not be concerned about that great city?\"" },
      { id: "DEP6-10", title: "God rejoices over one sinner's repentance", reference: "Luke 15:7", text: "I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent." },
      { id: "DEP6-11", title: "To have blessed fellowship in the Lord", reference: "1 John 1:3", text: "We proclaim to you what we have seen and heard, so that you also may have fellowship with us. And our fellowship is with the Father and with his Son, Jesus Christ." },
      { id: "DEP6-12", title: "Promise for everlasting glory", reference: "Daniel 12:3", text: "Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever." },
      { id: "DEP6-13", title: "Follow Jesus first", reference: "Matthew 4:19", text: "\"Come, follow me,\" Jesus said, \"and I will make you fishers of men.\"" },
      { id: "DEP6-14", title: "Live a life of good testimony", reference: "Philippians 2:15-16", text: "so that you may become blameless and pure, children of God without fault in a crooked and depraved generation, in which you shine like stars in the universe as you hold out the word of life\u2014in order that I may boast on the day of Christ that I did not run or labor for nothing." },
      { id: "DEP6-15", title: "Pray for people", reference: "Ephesians 6:19", text: "Pray also for me, that whenever I open my mouth, words may be given me so that I will fearlessly make known the mystery of the gospel," },
      { id: "DEP6-16", title: "Be prepared to answer", reference: "1 Peter 3:15", text: "But in your hearts set apart Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect," },
      { id: "DEP6-17", title: "Share your testimony", reference: "John 4:39", text: "Many of the Samaritans from that town believed in him because of the woman's testimony, \"He told me everything I ever did.\"" },
      { id: "DEP6-18", title: "Believe in the power of the Word", reference: "Hebrews 4:12", text: "For the word of God is living and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart." },
      { id: "DEP6-19", title: "The Word preached never returns in vain", reference: "Isaiah 55:11", text: "so is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it." },
      { id: "DEP6-20", title: "Focus on Jesus Christ when witnessing", reference: "1 Corinthians 1:23-24", text: "but we preach Christ crucified: a stumbling block to Jews and foolishness to Gentiles, but to those whom God has called, both Jews and Greeks, Christ the power of God and the wisdom of God." },
      { id: "DEP6-21", title: "Witness in power and conviction", reference: "1 Thessalonians 1:5", text: "because our gospel came to you not simply with words, but also with power, with the Holy Spirit and with deep conviction. You know how we lived among you for your sake." },
      { id: "DEP6-22", title: "Help them receive Jesus Christ", reference: "Romans 10:9-10", text: "That if you confess with your mouth, \"Jesus is Lord,\" and believe in your heart that God raised him from the dead, you will be saved. For it is with your heart that you believe and are justified, and it is with your mouth that you confess and are saved." },
      { id: "DEP6-23", title: "Encourage them not to delay the decision", reference: "2 Corinthians 6:2", text: "For he says, \"In the time of my favor I heard you, and in the day of salvation I helped you.\" I tell you, now is the time of God's favor, now is the day of salvation." },
      { id: "DEP6-24", title: "Help them be assured of their salvation", reference: "2 Corinthians 13:5", text: "Examine yourselves to see whether you are in the faith; test yourselves. Do you not realize that Christ Jesus is in you\u2014unless, of course, you fail the test?" },
      { id: "DEP6-25", title: "Have an evangelical Bible Study", reference: "Acts 17:2-3", text: "As his custom was, Paul went into the synagogue, and on three Sabbath days he reasoned with them from the Scriptures, explaining and proving that the Christ had to suffer and rise from the dead. \"This Jesus I am proclaiming to you is the Christ, \" he said." },
      { id: "DEP6-26", title: "Paul", reference: "Acts 20:24", text: "However, I consider my life worth nothing to me, if only I may finish the race and complete the task the Lord Jesus has given me\u2014the task of testifying to the gospel of God's grace." },
      { id: "DEP6-27", title: "Philip", reference: "Acts 8:29-30", text: "The Spirit told Philip, \"Go to that chariot and stay near it.\" Then Philip ran up to the chariot and heard the man reading Isaiah the prophet. \"Do you understand what you are reading?\" Philip asked." },
      { id: "DEP6-28", title: "Peter and John", reference: "Acts 4:20", text: "For we cannot help speaking about what we have seen and heard.\"" },
      { id: "DEP6-29", title: "Created in His own image", reference: "Genesis 1:27", text: "So God created man in his own image, in the image of God he created him; male and female he created them." },
      { id: "DEP6-30", title: "Separated from God by our sin", reference: "Isaiah 59:1-2", text: "Surely the arm of the LORD is not too short to save, nor his ear too dull to hear. But your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear." },
      { id: "DEP6-31", title: "Man's condition - Sinner", reference: "Romans 5:12", text: "Therefore, just as sin entered the world through one man, and death through sin, and in this way death came to all men, because all sinned\u2014" },
      { id: "DEP6-32", title: "Man's condition - Sinner", reference: "Romans 3:23", text: "for all have sinned and fall short of the glory of God," },
      { id: "DEP6-33", title: "Man's condition - Judgment", reference: "Hebrews 9:27", text: "Just as man is destined to die once, and after that to face judgment," },
      { id: "DEP6-34", title: "Man's condition - Judgment", reference: "2 Thessalonians 1:8-9", text: "He will punish those who do not know God and do not obey the gospel of our Lord Jesus. They will be punished with everlasting destruction and shut out from the presence of the Lord and from the majesty of his power" },
      { id: "DEP6-35", title: "Man's condition - Eternal death", reference: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." },
      { id: "DEP6-36", title: "Man's condition - Eternal death", reference: "Revelation 21:8", text: "But the cowardly, the unbelieving, the vile, the murderers, the sexually immoral, those who practice magic arts, the idolaters and all liars\u2014their place will be in the fiery lake of burning sulfur. This is the second death.\"" },
      { id: "DEP6-37", title: "Salvation not by ourselves - Works", reference: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith\u2014and this not from yourselves, it is the gift of God\u2014not by works, so that no one can boast." },
      { id: "DEP6-38", title: "Salvation not by ourselves - Works", reference: "Galatians 2:21", text: "I do not set aside the grace of God, for if righteousness could be gained through the law, Christ died for nothing!\"" },
      { id: "DEP6-39", title: "Salvation not by ourselves - Religion", reference: "Acts 4:12", text: "Salvation is found in no one else, for there is no other name under heaven given to men by which we must be saved.\"" },
      { id: "DEP6-40", title: "Salvation not by ourselves - Money", reference: "1 Peter 1:18", text: "For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your forefathers," },
      { id: "DEP6-41", title: "Salvation not by ourselves - Miracles and wonders", reference: "1 Corinthians 1:22-23", text: "Jews demand miraculous signs and Greeks look for wisdom, but we preach Christ crucified: a stumbling block to Jews and foolishness to Gentiles," },
      { id: "DEP6-42", title: "Salvation not by ourselves - Wisdom", reference: "1 Corinthians 1:21", text: "For since in the wisdom of God the world through its wisdom did not know him, God was pleased through the foolishness of what was preached to save those who believe." },
      { id: "DEP6-43", title: "Salvation not by ourselves - Philosophy and tradition", reference: "Colossians 2:8", text: "See to it that no one takes you captive through hollow and deceptive philosophy, which depends on human tradition and the basic principles of this world rather than on Christ." },
      { id: "DEP6-44", title: "Salvation not by ourselves - Natural descent", reference: "John 1:13", text: "children born not of natural descent, nor of human decision or a husband's will, but born of God." },
      { id: "DEP6-45", title: "Salvation not by ourselves - The flesh counts for nothing", reference: "John 3:6-7", text: "Flesh gives birth to flesh, but the Spirit gives birth to spirit. You should not be surprised at my saying, 'You must be born again.'" },
      { id: "DEP6-46", title: "Salvation not by ourselves - The flesh counts for nothing", reference: "John 6:63", text: "The Spirit gives life; the flesh counts for nothing. The words I have spoken to you are spirit and they are life." },
      { id: "DEP6-47", title: "God's solution - Bridge bringing us to God", reference: "1 Peter 3:18", text: "For Christ died for sins once for all, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive by the Spirit," },
      { id: "DEP6-48", title: "God's solution - God gave His only begotten Son", reference: "John 3:16", text: "\"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
      { id: "DEP6-49", title: "God's solution - Jesus died for our sin", reference: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
      { id: "DEP6-50", title: "God's solution - Jesus resurrected", reference: "1 Corinthians 15:3-4", text: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures," },
      { id: "DEP6-51", title: "God's solution - Forgiving us all our sins", reference: "Colossians 2:13", text: "When you were dead in your sins and in the uncircumcision of your sinful nature, God made you alive with Christ. He forgave us all our sins," },
      { id: "DEP6-52", title: "Man must - hear and believe", reference: "John 5:24", text: "\"I tell you the truth, whoever hears my word and believes him who sent me has eternal life and will not be condemned; he has crossed over from death to life." },
      { id: "DEP6-53", title: "Man must - Receive Jesus", reference: "John 1:12", text: "Yet to all who received him, to those who believed in his name, he gave the right to become children of God\u2014" },
      { id: "DEP6-54", title: "Man must - Receive Jesus", reference: "Revelation 3:20", text: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with him, and he with me." },
      { id: "DEP6-55", title: "Man must - Pray to receive Jesus", reference: "Romans 10:9-10", text: "That if you confess with your mouth, \"Jesus is Lord,\" and believe in your heart that God raised him from the dead, you will be saved. For it is with your heart that you believe and are justified, and it is with your mouth that you confess and are saved." },
    ],
  },
  {
    id: "DEP7",
    name: "Pack 7 - The Lordship of Christ",
    verses: [
      { id: "DEP7-1", title: "The Creator", reference: "John 1:2-3", text: "He was with God in the beginning. Through him all things were made; without him nothing was made that has been made." },
      { id: "DEP7-2", title: "The Lord of all creation", reference: "Colossians 1:16-17", text: "For by him all things were created: things in heaven and on earth, visible and invisible, whether thrones or powers or rulers or authorities; all things were created by him and for him. He is before all things, and in him all things hold together." },
      { id: "DEP7-3", title: "The head of Church", reference: "Colossians 1:18", text: "And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy." },
      { id: "DEP7-4", title: "Far above all power", reference: "Ephesians 1:21", text: "far above all rule and authority, power and dominion, and every title that can be given, not only in the present age but also in the one to come." },
      { id: "DEP7-5", title: "The Lord of everyone", reference: "Philippians 2:10-11", text: "that at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue confess that Jesus Christ is Lord, to the glory of God the Father." },
      { id: "DEP7-6", title: "The Lord of both the dead and the living", reference: "Romans 14:9", text: "For this very reason, Christ died and returned to life so that he might be the Lord of both the dead and the living." },
      { id: "DEP7-7", title: "Bought with Christ's life price", reference: "1 Corinthians 6:19-20", text: "Do you not know that your body is a temple of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your body." },
      { id: "DEP7-8", title: "Make the decision of commitment to the Lordship", reference: "2 Corinthians 5:15", text: "And he died for all, that those who live should no longer live for themselves but for him who died for them and was raised again." },
      { id: "DEP7-9", title: "Satisfying all our needs", reference: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
      { id: "DEP7-10", title: "Abundant reward", reference: "Mark 10:29-30", text: "\"I tell you the truth,\" Jesus replied, \"no one who has left home or brothers or sisters or mother or father or children or fields for me and the gospel will fail to receive a hundred times as much in this present age (homes, brothers, sisters, mothers, children and fields\u2014and with them, persecutions) and in the age to come, eternal life." },
      { id: "DEP7-11", title: "Giving His promise", reference: "Genesis 22:16-17", text: "and said, \"I swear by myself, declares the LORD, that because you have done this and have not withheld your son, your only son, I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore. Your descendants will take possession of the cities of their enemies," },
      { id: "DEP7-12", title: "Accompanying us", reference: "1 Chronicles 28:9", text: "\"And you, my son Solomon, acknowledge the God of your father, and serve him with wholehearted devotion and with a willing mind, for the LORD searches every heart and understands every motive behind the thoughts. If you seek him, he will be found by you; but if you forsake him, he will reject you forever." },
      { id: "DEP7-13", title: "Giving His power", reference: "2 Chronicles 16:9", text: "For the eyes of the LORD range throughout the earth to strengthen those whose hearts are fully committed to him. You have done a foolish thing, and from now on you will be at war.\"" },
      { id: "DEP7-14", title: "Protecting us", reference: "Psalm 91:14", text: "\"Because he loves me,\" says the LORD, \"I will rescue him; I will protect him, for he acknowledges my name." },
      { id: "DEP7-15", title: "Honoring us", reference: "1 Samuel 2:30", text: "\"Therefore the LORD, the God of Israel, declares: 'I promised that your house and your father's house would minister before me forever.' But now the LORD declares: 'Far be it from me! Those who honor me I will honor, but those who despise me will be disdained." },
      { id: "DEP7-16", title: "Self", reference: "Luke 9:23", text: "Then he said to them all: \"If anyone would come after me, he must deny himself and take up his cross daily and follow me." },
      { id: "DEP7-17", title: "Relationship with others", reference: "Proverbs 16:7", text: "When a man's ways are pleasing to the LORD, he makes even his enemies live at peace with him." },
      { id: "DEP7-18", title: "Life paths", reference: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways acknowledge him, and he will make your paths straight." },
      { id: "DEP7-19", title: "Worldly desires", reference: "Ephesians 4:22-24", text: "You were taught, with regard to your former way of life, to put off your old self, which is being corrupted by its deceitful desires; to be made new in the attitude of your minds; and to put on the new self, created to be like God in true righteousness and holiness." },
      { id: "DEP7-20", title: "Lusts", reference: "2 Timothy 2:22", text: "Flee the evil desires of youth, and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart." },
      { id: "DEP7-21", title: "Possessions", reference: "1 Timothy 6:7-9", text: "For we brought nothing into the world, and we can take nothing out of it. But if we have food and clothing, we will be content with that. People who want to get rich fall into temptation and a trap and into many foolish and harmful desires that plunge men into ruin and destruction." },
      { id: "DEP7-22", title: "Time managing", reference: "Ephesians 5:15-16", text: "Be very careful, then, how you live\u2014not as unwise but as wise, making the most of every opportunity, because the days are evil." },
      { id: "DEP7-23", title: "God's calling", reference: "Mark 1:20", text: "Without delay he called them, and they left their father Zebedee in the boat with the hired men and followed him." },
      { id: "DEP7-24", title: "Paul", reference: "Philippians 1:20", text: "I eagerly expect and hope that I will in no way be ashamed, but will have sufficient courage so that now as always Christ will be exalted in my body, whether by life or by death." },
      { id: "DEP7-25", title: "Timothy", reference: "Philippians 2:21-22", text: "For everyone looks out for his own interests, not those of Jesus Christ. But you know that Timothy has proved himself, because as a son with his father he has served with me in the work of the gospel." },
      { id: "DEP7-26", title: "Our faith fathers", reference: "Hebrews 11:36-38", text: "Some faced jeers and flogging, while still others were chained and put in prison. They were stoned; they were sawed in two; they were put to death by the sword. They went about in sheepskins and goatskins, destitute, persecuted and mistreated\u2014the world was not worthy of them. They wandered in deserts and mountains, and in caves and holes in the ground." },
    ],
  },
  {
    id: "DEP8",
    name: "Pack 8 - World Vision",
    verses: [
      { id: "DEP8-1", title: "God's concern and promise for the world", reference: "Genesis 12:2-3", text: "\"I will make you into a great nation and I will bless you; I will make your name great, and you will be a blessing. I will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.\"" },
      { id: "DEP8-2", title: "God's concern and promise for the world", reference: "Isaiah 49:6", text: "he says: \"It is too small a thing for you to be my servant to restore the tribes of Jacob and bring back those of Israel I have kept. I will also make you a light for the Gentiles, that you may bring my salvation to the ends of the earth.\"" },
      { id: "DEP8-3", title: "Great Commission", reference: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.\"" },
      { id: "DEP8-4", title: "Great Commission", reference: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\"" },
      { id: "DEP8-5", title: "Commit yourself to the mission", reference: "Isaiah 6:8", text: "Then I heard the voice of the Lord saying, \"Whom shall I send? And who will go for us?\" And I said, \"Here am I. Send me!\"" },
      { id: "DEP8-6", title: "Commit yourself to the mission", reference: "Romans 15:16", text: "to be a minister of Christ Jesus to the Gentiles with the priestly duty of proclaiming the gospel of God, so that the Gentiles might become an offering acceptable to God, sanctified by the Holy Spirit." },
      { id: "DEP8-7", title: "Pray for the world", reference: "Psalm 2:8", text: "Ask of me, and I will make the nations your inheritance, the ends of the earth your possession." },
      { id: "DEP8-8", title: "Pray for the world", reference: "Psalm 57:5", text: "Be exalted, O God, above the heavens; let your glory be over all the earth." },
      { id: "DEP8-9", title: "Preach the gospel", reference: "Titus 1:2-3", text: "a faith and knowledge resting on the hope of eternal life, which God, who does not lie, promised before the beginning of time, and at his appointed season he brought his word to light through the preaching entrusted to me by the command of God our Savior," },
      { id: "DEP8-10", title: "Preach the gospel", reference: "2 Timothy 4:17", text: "But the Lord stood at my side and gave me strength, so that through me the message might be fully proclaimed and all the Gentiles might hear it. And I was delivered from the lion's mouth." },
      { id: "DEP8-11", title: "Help them grow in Christ", reference: "Colossians 1:28-29", text: "We proclaim him, admonishing and teaching everyone with all wisdom, so that we may present everyone perfect in Christ. To this end I labor, struggling with all his energy, which so powerfully works in me." },
      { id: "DEP8-12", title: "Help them grow in Christ", reference: "Philippians 1:9-11", text: "And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless until the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ\u2014to the glory and praise of God." },
      { id: "DEP8-13", title: "Spiritual Multiplication", reference: "2 Timothy 2:2", text: "And the things you have heard me say in the presence of many witnesses entrust to reliable men who will also be qualified to teach others." },
      { id: "DEP8-14", title: "Spiritual Multiplication", reference: "Isaiah 60:22", text: "The least of you will become a thousand, the smallest a mighty nation. I am the LORD; in its time I will do this swiftly.\"" },
      { id: "DEP8-15", title: "Live a simple and wholehearted life", reference: "Hebrews 12:1", text: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles, and let us run with perseverance the race marked out for us." },
      { id: "DEP8-16", title: "Live a simple and wholehearted life", reference: "2 Chronicles 16:9", text: "For the eyes of the LORD range throughout the earth to strengthen those whose hearts are fully committed to him. You have done a foolish thing, and from now on you will be at war.\"" },
      { id: "DEP8-17", title: "Glory of the mission finish", reference: "Habakkuk 2:14", text: "For the earth will be filled with the knowledge of the glory of the LORD, as the waters cover the sea." },
      { id: "DEP8-18", title: "Glory of the mission finish", reference: "Malachi 1:11", text: "My name will be great among the nations, from the rising to the setting of the sun. In every place incense and pure offerings will be brought to my name, because my name will be great among the nations,\" says the LORD Almighty." },
    ],
  },
  {
    id: "S1",
    name: "Series 1 - Getting to Know God",
    verses: [
      { id: "S1-1", title: "Jesus' Deity", reference: "John 1:1,14", text: "In the beginning was the Word, and the Word was with God, and the Word was God. The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the One and Only, who came from the Father, full of grace and truth." },
      { id: "S1-2", title: "Jesus' Deity", reference: "Hebrews 1:8", text: "But about the Son he says, \"Your throne, O God, will last for ever and ever, and righteousness will be the scepter of your kingdom." },
      { id: "S1-3", title: "Jesus' Humanity", reference: "Hebrews 4:15", text: "For we do not have a high priest who is unable to sympathize with our weaknesses, but we have one who has been tempted in every way, just as we are\u2014yet was without sin." },
      { id: "S1-4", title: "Jesus' Humanity", reference: "Luke 2:52", text: "And Jesus grew in wisdom and stature, and in favor with God and men." },
      { id: "S1-5", title: "Jesus' Resurrection", reference: "1 Corinthians 15:3-4", text: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures," },
      { id: "S1-6", title: "Jesus' Resurrection", reference: "1 Corinthians 15:20", text: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep." },
      { id: "S1-7", title: "Jesus Reveals God", reference: "John 1:18", text: "No one has ever seen God, but God the One and Only, who is at the Father's side, has made him known." },
      { id: "S1-8", title: "Jesus Reveals God", reference: "Hebrews 1:3", text: "The Son is the radiance of God's glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven." },
      { id: "S1-9", title: "Jesus as Redeemer", reference: "Luke 19:10", text: "For the Son of Man came to seek and to save what was lost.\"" },
      { id: "S1-10", title: "Jesus as Redeemer", reference: "1 Peter 1:18-19", text: "For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your forefathers, but with the precious blood of Christ, a lamb without blemish or defect." },
      { id: "S1-11", title: "Jesus' Return", reference: "1 Thessalonians 4:16-17", text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air. And so we will be with the Lord forever." },
      { id: "S1-12", title: "Jesus' Return", reference: "1 John 3:2-3", text: "Dear friends, now we are children of God, and what we will be has not yet been made known. But we know that when he appears, we shall be like him, for we shall see him as he is. Everyone who has this hope in him purifies himself, just as he is pure." },
      { id: "S1-13", title: "Holy Spirit Testifies", reference: "John 16:13-14", text: "But when he, the Spirit of truth, comes, he will guide you into all truth. He will not speak on his own; he will speak only what he hears, and he will tell you what is yet to come. He will bring glory to me by taking from what is mine and making it known to you." },
      { id: "S1-14", title: "Holy Spirit Testifies", reference: "1 Corinthians 12:3", text: "Therefore I tell you that no one who is speaking by the Spirit of God says, \"Jesus be cursed,\" and no one can say, \"Jesus is Lord,\" except by the Holy Spirit." },
      { id: "S1-15", title: "Holy Spirit Indwells", reference: "Romans 8:9", text: "You, however, are controlled not by the sinful nature but by the Spirit, if the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, he does not belong to Christ." },
      { id: "S1-16", title: "Holy Spirit Indwells", reference: "Galatians 4:6", text: "Because you are sons, God sent the Spirit of his Son into our hearts, the Spirit who calls out, \"Abba, Father.\"" },
      { id: "S1-17", title: "Holy Spirit Controls", reference: "Ephesians 5:18", text: "Do not get drunk on wine, which leads to debauchery. Instead, be filled with the Spirit." },
      { id: "S1-18", title: "Holy Spirit Controls", reference: "Galatians 5:16", text: "So I say, live by the Spirit, and you will not gratify the desires of the sinful nature." },
      { id: "S1-19", title: "Holy Spirit Reveals", reference: "1 Corinthians 2:9-10", text: "However, as it is written: \"No eye has seen, no ear has heard, no mind has conceived what God has prepared for those who love him\"\u2014but God has revealed it to us by his Spirit. The Spirit searches all things, even the deep things of God." },
      { id: "S1-20", title: "Holy Spirit Reveals", reference: "John 14:26", text: "But the Counselor, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you." },
      { id: "S1-21", title: "Holy Spirit Empowers", reference: "1 Corinthians 2:4-5", text: "My message and my preaching were not with wise and persuasive words, but with a demonstration of the Spirit's power, so that your faith might not rest on men's wisdom, but on God's power." },
      { id: "S1-22", title: "Holy Spirit Empowers", reference: "1 Thessalonians 1:5", text: "because our gospel came to you not simply with words, but also with power, with the Holy Spirit and with deep conviction. You know how we lived among you for your sake." },
      { id: "S1-23", title: "Holy Spirit Gives Gifts", reference: "1 Corinthians 12:11", text: "All these are the work of one and the same Spirit, and he gives them to each one, just as he determines." },
      { id: "S1-24", title: "Holy Spirit Gives Gifts", reference: "1 Corinthians 12:4-6", text: "There are different kinds of gifts, but the same Spirit. There are different kinds of service, but the same Lord. There are different kinds of working, but the same God works all of them in all men." },
      { id: "S1-25", title: "God's Power", reference: "Jeremiah 32:17", text: "\"Ah, Sovereign LORD, you have made the heavens and the earth by your great power and outstretched arm. Nothing is too hard for you." },
      { id: "S1-26", title: "God's Knowledge", reference: "Romans 11:33", text: "Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out!" },
      { id: "S1-27", title: "God's Presence", reference: "Jeremiah 23:24", text: "Can anyone hide in secret places so that I cannot see him?\" declares the LORD. \"Do not I fill heaven and earth?\" declares the LORD." },
      { id: "S1-28", title: "God's Grace", reference: "2 Corinthians 9:8", text: "And God is able to make all grace abound to you, so that in all things at all times, having all that you need, you will abound in every good work." },
      { id: "S1-29", title: "God's Glory", reference: "1 Chronicles 29:11-13", text: "Yours, O LORD, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, O LORD, is the kingdom; you are exalted as head over all. Wealth and honor come from you; you are the ruler of all things. In your hands are strength and power to exalt and give strength to all. Now, our God, we give you thanks, and praise your glorious name." },
      { id: "S1-30", title: "God's Faithfulness", reference: "2 Thessalonians 3:3", text: "But the Lord is faithful, and he will strengthen and protect you from the evil one." },
      { id: "S1-31", title: "God is Spirit", reference: "John 4:24", text: "God is spirit, and his worshipers must worship in spirit and in truth.\"" },
      { id: "S1-32", title: "God's Holiness", reference: "1 Peter 1:15-16", text: "But just as he who called you is holy, so be holy in all you do; for it is written: \"Be holy, because I am holy.\"" },
      { id: "S1-33", title: "God's Greatness", reference: "Psalm 145:3", text: "Great is the LORD and most worthy of praise; his greatness no one can fathom." },
      { id: "S1-34", title: "God's Love", reference: "1 John 4:10", text: "This is love: not that we loved God, but that he loved us and sent his Son as an atoning sacrifice for our sins." },
      { id: "S1-35", title: "God's Mercy", reference: "Psalm 86:15", text: "But you, O Lord, are a compassionate and gracious God, slow to anger, abounding in love and faithfulness." },
      { id: "S1-36", title: "God's Sovereignty", reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    ],
  },
  {
    id: "S2",
    name: "Series 2 - Growing in Love",
    verses: [
      { id: "S2-1", title: "Tell the Truth", reference: "Ephesians 4:15", text: "Instead, speaking the truth in love, we will in all things grow up into him who is the Head, that is, Christ." },
      { id: "S2-2", title: "Tell the Truth", reference: "Colossians 3:9", text: "Do not lie to each other, since you have taken off your old self with its practices" },
      { id: "S2-3", title: "Avoid Gossip", reference: "Proverbs 17:9", text: "He who covers over an offense promotes love, but whoever repeats the matter separates close friends." },
      { id: "S2-4", title: "Avoid Gossip", reference: "Proverbs 11:13", text: "A gossip betrays a confidence, but a trustworthy man keeps a secret." },
      { id: "S2-5", title: "Speak Graciously", reference: "Colossians 4:4-6", text: "Pray that I may proclaim it clearly, as I should. Be wise in the way you act toward outsiders; make the most of every opportunity. Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone." },
      { id: "S2-6", title: "Speak Graciously", reference: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
      { id: "S2-7", title: "Admit Sin", reference: "James 5:16", text: "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous man is powerful and effective." },
      { id: "S2-8", title: "Admit Sin", reference: "Matthew 5:23-24", text: "\"Therefore, if you are offering your gift at the altar and there remember that your brother has something against you, leave your gift there in front of the altar. First go and be reconciled to your brother; then come and offer your gift." },
      { id: "S2-9", title: "Listen", reference: "James 1:19", text: "My dear brothers, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry," },
      { id: "S2-10", title: "Listen", reference: "Proverbs 18:13", text: "He who answers before listening\u2014that is his folly and his shame." },
      { id: "S2-11", title: "Accept Reproof", reference: "Proverbs 9:8-9", text: "Do not rebuke a mocker or he will hate you; rebuke a wise man and he will love you. Instruct a wise man and he will be wiser still; teach a righteous man and he will add to his learning." },
      { id: "S2-12", title: "Accept Reproof", reference: "Matthew 18:15", text: "\"If your brother sins against you, go and show him his fault, just between the two of you. If he listens to you, you have won your brother over." },
      { id: "S2-13", title: "Forgive Others", reference: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
      { id: "S2-14", title: "Forgive Others", reference: "Colossians 3:13", text: "Bear with each other and forgive whatever grievances you may have against one another. Forgive as the Lord forgave you." },
      { id: "S2-15", title: "Be Patient", reference: "Ephesians 4:2", text: "Be completely humble and gentle; be patient, bearing with one another in love." },
      { id: "S2-16", title: "Be Patient", reference: "2 Timothy 2:24-25", text: "And the Lord's servant must not quarrel; instead, he must be kind to everyone, able to teach, not resentful. Those who oppose him he must gently instruct, in the hope that God will grant them repentance leading them to a knowledge of the truth," },
      { id: "S2-17", title: "Control Anger", reference: "Ephesians 4:26", text: "\"In your anger do not sin\": Do not let the sun go down while you are still angry," },
      { id: "S2-18", title: "Control Anger", reference: "Colossians 3:8", text: "But now you must rid yourselves of all such things as these: anger, rage, malice, slander, and filthy language from your lips." },
      { id: "S2-19", title: "Overcome Bitterness", reference: "Hebrews 12:15", text: "See to it that no one misses the grace of God and that no bitter root grows up to cause trouble and defile many." },
      { id: "S2-20", title: "Overcome Bitterness", reference: "Ephesians 4:31", text: "Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice." },
      { id: "S2-21", title: "Endure Injustice", reference: "1 Peter 2:20-21", text: "But how is it to your credit if you receive a beating for doing wrong and endure it? But if you suffer for doing good and you endure it, this is commendable before God. To this you were called, because Christ suffered for you, leaving you an example, that you should follow in his steps." },
      { id: "S2-22", title: "Endure Injustice", reference: "Romans 12:19", text: "Do not take revenge, my friends, but leave room for God's wrath, for it is written: \"It is mine to avenge; I will repay,\" says the Lord." },
      { id: "S2-23", title: "Avoid Jealousy", reference: "Proverbs 27:4", text: "Anger is cruel and fury overwhelming, but who can stand before jealousy?" },
      { id: "S2-24", title: "Avoid Jealousy", reference: "James 3:16", text: "For where you have envy and selfish ambition, there you find disorder and every evil practice." },
      { id: "S2-25", title: "Live in Harmony", reference: "Romans 15:5-6", text: "May the God who gives endurance and encouragement give you a spirit of unity among yourselves as you follow Christ Jesus, so that with one heart and mouth you may glorify the God and Father of our Lord Jesus Christ." },
      { id: "S2-26", title: "Live in Harmony", reference: "1 Corinthians 1:10", text: "I appeal to you, brothers, in the name of our Lord Jesus Christ, that all of you agree with one another so that there may be no divisions among you and that you may be perfectly united in mind and thought." },
      { id: "S2-27", title: "Serve Others", reference: "Matthew 20:26-27", text: "Not so with you. Instead, whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave\u2014" },
      { id: "S2-28", title: "Serve Others", reference: "Galatians 5:13", text: "You, my brothers, were called to be free. But do not use your freedom to indulge the sinful nature; rather, serve one another in love." },
      { id: "S2-29", title: "Put Others First", reference: "Romans 15:2", text: "Each of us should please his neighbor for his good, to build him up." },
      { id: "S2-30", title: "Put Others First", reference: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit, but in humility consider others better than yourselves. Each of you should look not only to your own interests, but also to the interests of others." },
      { id: "S2-31", title: "Encourage One Another", reference: "1 Thessalonians 5:11", text: "Therefore encourage one another and build each other up, just as in fact you are doing." },
      { id: "S2-32", title: "Encourage One Another", reference: "Ecclesiastes 4:9-10", text: "Two are better than one, because they have a good return for their work: If one falls down, his friend can help him up. But pity the man who falls and has no one to help him up!" },
      { id: "S2-33", title: "Be Compassionate", reference: "Matthew 9:36", text: "When he saw the crowds, he had compassion on them, because they were harassed and helpless, like sheep without a shepherd." },
      { id: "S2-34", title: "Be Compassionate", reference: "Romans 12:15", text: "Rejoice with those who rejoice; mourn with those who mourn." },
      { id: "S2-35", title: "Be Gentle", reference: "James 3:17", text: "But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere." },
      { id: "S2-36", title: "Be Gentle", reference: "Galatians 6:1", text: "Brothers, if someone is caught in a sin, you who are spiritual should restore him gently. But watch yourself, or you also may be tempted." },
    ],
  },
  {
    id: "S3",
    name: "Series 3 - Growing in Faith",
    verses: [
      { id: "S3-1", title: "Importance of Promises", reference: "2 Peter 1:3-4", text: "His divine power has given us everything we need for life and godliness through our knowledge of him who called us by his own glory and goodness. Through these he has given us his very great and precious promises, so that through them you may participate in the divine nature and escape the corruption in the world caused by evil desires." },
      { id: "S3-2", title: "Importance of Promises", reference: "2 Corinthians 1:20", text: "For no matter how many promises God has made, they are \"Yes\" in Christ. And so through him the \"Amen\" is spoken by us to the glory of God." },
      { id: "S3-3", title: "Promises for Ministry", reference: "2 Corinthians 1:3-4", text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves have received from God." },
      { id: "S3-4", title: "Promises for Ministry", reference: "1 Corinthians 3:7-8", text: "So neither he who plants nor he who waters is anything, but only God, who makes things grow. The man who plants and the man who waters have one purpose, and each will be rewarded according to his own labor." },
      { id: "S3-5", title: "Promises for Fulfilled Life", reference: "Psalm 1:2-3", text: "But his delight is in the law of the LORD, and on his law he meditates day and night. He is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither. Whatever he does prospers." },
      { id: "S3-6", title: "Promises for Fulfilled Life", reference: "2 Peter 1:8", text: "For if you possess these qualities in increasing measure, they will keep you from being ineffective and unproductive in your knowledge of our Lord Jesus Christ." },
      { id: "S3-7", title: "Promises for Help in Trouble", reference: "1 Peter 5:10", text: "And the God of all grace, who called you to his eternal glory in Christ, after you have suffered a little while, will himself restore you and make you strong, firm and steadfast." },
      { id: "S3-8", title: "Promises for Help in Trouble", reference: "2 Corinthians 12:9", text: "But he said to me, \"My grace is sufficient for you, for my power is made perfect in weakness.\" Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me." },
      { id: "S3-9", title: "Promises for Provision", reference: "Ephesians 1:3", text: "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ." },
      { id: "S3-10", title: "Promises for Provision", reference: "Psalm 37:4-5", text: "Delight yourself in the LORD and he will give you the desires of your heart. Commit your way to the LORD; trust in him and he will do this:" },
      { id: "S3-11", title: "Promises for Forgiveness", reference: "1 John 2:1-2", text: "My dear children, I write this to you so that you will not sin. But if anybody does sin, we have one who speaks to the Father in our defense\u2014Jesus Christ, the Righteous One. He is the atoning sacrifice for our sins, and not only for ours but also for the sins of the whole world." },
      { id: "S3-12", title: "Promises for Forgiveness", reference: "Psalm 103:12", text: "as far as the east is from the west, so far has he removed our transgressions from us." },
      { id: "S3-13", title: "Power", reference: "Hebrews 4:12", text: "For the word of God is living and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart." },
      { id: "S3-14", title: "Power", reference: "Isaiah 55:10-11", text: "As the rain and the snow come down from heaven, and do not return to it without watering the earth and making it bud and flourish, so that it yields seed for the sower and bread for the eater, so is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it." },
      { id: "S3-15", title: "Inspiration", reference: "2 Peter 1:20-21", text: "Above all, you must understand that no prophecy of Scripture came about by the prophet's own interpretation. For prophecy never had its origin in the will of man, but men spoke from God as they were carried along by the Holy Spirit." },
      { id: "S3-16", title: "Inspiration", reference: "1 Thessalonians 2:13", text: "And we also thank God continually because, when you received the word of God, which you heard from us, you accepted it not as the word of men, but as it actually is, the word of God, which is at work in you who believe." },
      { id: "S3-17", title: "Nourishment", reference: "Jeremiah 15:16", text: "When your words came, I ate them; they were my joy and my heart's delight, for I bear your name, O LORD God Almighty." },
      { id: "S3-18", title: "Nourishment", reference: "Job 23:12", text: "I have not departed from the commands of his lips; I have treasured the words of his mouth more than my daily bread." },
      { id: "S3-19", title: "Know", reference: "Acts 17:11", text: "Now the Bereans were of more noble character than the Thessalonians, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true." },
      { id: "S3-20", title: "Know", reference: "John 5:39-40", text: "You diligently study the Scriptures because you think that by them you possess eternal life. These are the Scriptures that testify about me, yet you refuse to come to me to have life." },
      { id: "S3-21", title: "Obey", reference: "John 8:31-32", text: "To the Jews who had believed him, Jesus said, \"If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.\"" },
      { id: "S3-22", title: "Obey", reference: "Matthew 4:4", text: "Jesus answered, \"It is written: 'Man does not live on bread alone, but on every word that comes from the mouth of God.'\"" },
      { id: "S3-23", title: "Reliability", reference: "Matthew 24:35", text: "Heaven and earth will pass away, but my words will never pass away." },
      { id: "S3-24", title: "Reliability", reference: "John 17:17", text: "Sanctify them by the truth; your word is truth." },
      { id: "S3-25", title: "Testing of Faith", reference: "1 Peter 1:6-7", text: "In this you greatly rejoice, though now for a little while you may have had to suffer grief in all kinds of trials. These have come so that your faith\u2014of greater worth than gold, which perishes even though refined by fire\u2014may be proved genuine and may result in praise, glory and honor when Jesus Christ is revealed." },
      { id: "S3-26", title: "Testing of Faith", reference: "James 1:2-4", text: "Consider it pure joy, my brothers, whenever you face trials of many kinds, because you know that the testing of your faith develops perseverance. Perseverance must finish its work so that you may be mature and complete, not lacking anything." },
      { id: "S3-27", title: "Results of Unbelief", reference: "Hebrews 4:2", text: "For we also have had the gospel preached to us, just as they did; but the message they heard was of no value to them, because those who heard did not combine it with faith." },
      { id: "S3-28", title: "Results of Unbelief", reference: "Hebrews 10:38", text: "But my righteous one will live by faith. And if he shrinks back, I will not be pleased with him.\"" },
      { id: "S3-29", title: "The Battle of Faith", reference: "Ephesians 6:16", text: "In addition to all this, take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one." },
      { id: "S3-30", title: "The Battle of Faith", reference: "1 Timothy 6:11-12", text: "But you, man of God, flee from all this, and pursue righteousness, godliness, faith, love, endurance and gentleness. Fight the good fight of the faith. Take hold of the eternal life to which you were called when you made your good confession in the presence of many witnesses." },
      { id: "S3-31", title: "Source of Faith", reference: "Hebrews 11:1", text: "Now faith is being sure of what we hope for and certain of what we do not see." },
      { id: "S3-32", title: "Source of Faith", reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word of Christ." },
      { id: "S3-33", title: "Faith in Action", reference: "Hebrews 6:12", text: "We do not want you to become lazy, but to imitate those who through faith and patience inherit what has been promised." },
      { id: "S3-34", title: "Faith in Action", reference: "James 2:17", text: "In the same way, faith by itself, if it is not accompanied by action, is dead." },
      { id: "S3-35", title: "Justification by Faith", reference: "Galatians 2:16", text: "know that a man is not justified by observing the law, but by faith in Jesus Christ. So we, too, have put our faith in Christ Jesus that we may be justified by faith in Christ and not by observing the law, because by observing the law no one will be justified." },
      { id: "S3-36", title: "Justification by Faith", reference: "Romans 5:1", text: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ," },
    ],
  },
  {
    id: "S4",
    name: "Series 4 - Walking in Victory",
    verses: [
      { id: "S4-1", title: "Victory in Christ", reference: "1 Corinthians 15:57", text: "But thanks be to God! He gives us the victory through our Lord Jesus Christ." },
      { id: "S4-2", title: "Victory in Christ", reference: "2 Corinthians 2:14", text: "But thanks be to God, who always leads us in triumphal procession in Christ and through us spreads everywhere the fragrance of the knowledge of him." },
      { id: "S4-3", title: "Weapons for Victory", reference: "2 Corinthians 10:4-5", text: "The weapons we fight with are not the weapons of the world. On the contrary, they have divine power to demolish strongholds. We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ." },
      { id: "S4-4", title: "Weapons for Victory", reference: "Ephesians 6:10-11", text: "Finally, be strong in the Lord and in his mighty power. Put on the full armor of God so that you can take your stand against the devil's schemes." },
      { id: "S4-5", title: "Overcoming the Devil", reference: "Revelation 12:11", text: "They overcame him by the blood of the Lamb and by the word of their testimony; they did not love their lives so much as to shrink from death." },
      { id: "S4-6", title: "Overcoming the Devil", reference: "James 4:7-8", text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you. Come near to God and he will come near to you. Wash your hands, you sinners, and purify your hearts, you double-minded." },
      { id: "S4-7", title: "Overcoming the Flesh", reference: "Romans 8:5-6", text: "Those who live according to the sinful nature have their minds set on what that nature desires; but those who live in accordance with the Spirit have their minds set on what the Spirit desires. The mind of sinful man is death, but the mind controlled by the Spirit is life and peace;" },
      { id: "S4-8", title: "Overcoming the Flesh", reference: "Romans 13:14", text: "Rather, clothe yourselves with the Lord Jesus Christ, and do not think about how to gratify the desires of the sinful nature." },
      { id: "S4-9", title: "Overcoming the World", reference: "1 John 4:4", text: "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world." },
      { id: "S4-10", title: "Overcoming the World", reference: "1 John 5:4-5", text: "for everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith. Who is it that overcomes the world? Only he who believes that Jesus is the Son of God." },
      { id: "S4-11", title: "Overcoming Sin", reference: "Psalm 37:31", text: "The law of his God is in his heart; his feet do not slip." },
      { id: "S4-12", title: "Overcoming Sin", reference: "Romans 6:12-13", text: "Therefore do not let sin reign in your mortal body so that you obey its evil desires. Do not offer the parts of your body to sin, as instruments of wickedness, but rather offer yourselves to God, as those who have been brought from death to life; and offer the parts of your body to him as instruments of righteousness." },
      { id: "S4-13", title: "Thought", reference: "Philippians 4:8", text: "Finally, brothers, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable\u2014if anything is excellent or praiseworthy\u2014think about such things." },
      { id: "S4-14", title: "Thought", reference: "Titus 1:15", text: "To the pure, all things are pure, but to those who are corrupted and do not believe, nothing is pure. In fact, both their minds and consciences are corrupted." },
      { id: "S4-15", title: "Heart", reference: "Luke 6:45", text: "The good man brings good things out of the good stored up in his heart, and the evil man brings evil things out of the evil stored up in his heart. For out of the overflow of his heart his mouth speaks." },
      { id: "S4-16", title: "Heart", reference: "Proverbs 4:23", text: "Above all else, guard your heart, for it is the wellspring of life." },
      { id: "S4-17", title: "Sight", reference: "Matthew 6:22", text: "\"The eye is the lamp of the body. If your eyes are good, your whole body will be full of light." },
      { id: "S4-18", title: "Sight", reference: "Matthew 5:28", text: "But I tell you that anyone who looks at a woman lustfully has already committed adultery with her in his heart." },
      { id: "S4-19", title: "Body", reference: "1 Thessalonians 4:3", text: "It is God's will that you should be sanctified: that you should avoid sexual immorality;" },
      { id: "S4-20", title: "Body", reference: "1 Corinthians 6:13", text: "\"Food for the stomach and the stomach for food\"\u2014but God will destroy them both. The body is not meant for sexual immorality, but for the Lord, and the Lord for the body." },
      { id: "S4-21", title: "Speech", reference: "Ephesians 4:29", text: "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen." },
      { id: "S4-22", title: "Speech", reference: "Matthew 12:36-37", text: "But I tell you that men will have to give account on the day of judgment for every careless word they have spoken. For by your words you will be acquitted, and by your words you will be condemned.\"" },
      { id: "S4-23", title: "Actions", reference: "1 Thessalonians 5:22", text: "Avoid every kind of evil." },
      { id: "S4-24", title: "Actions", reference: "1 Timothy 5:1-2", text: "Do not rebuke an older man harshly, but exhort him as if he were your father. Treat younger men as brothers, older women as mothers, and younger women as sisters, with absolute purity." },
      { id: "S4-25", title: "Ask", reference: "Matthew 21:22", text: "If you believe, you will receive whatever you ask for in prayer.\"" },
      { id: "S4-26", title: "Ask", reference: "Matthew 7:7-8", text: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; he who seeks finds; and to him who knocks, the door will be opened." },
      { id: "S4-27", title: "Praying Alone", reference: "Matthew 6:6", text: "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you." },
      { id: "S4-28", title: "Praying Alone", reference: "Mark 1:35", text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed." },
      { id: "S4-29", title: "God's Answer", reference: "Jeremiah 33:3", text: "'Call to me and I will answer you and tell you great and unsearchable things you do not know.'" },
      { id: "S4-30", title: "God's Answer", reference: "Ephesians 3:20", text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us," },
      { id: "S4-31", title: "Pray in His Will", reference: "1 John 5:14-15", text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us. And if we know that he hears us\u2014whatever we ask\u2014we know that we have what we asked of him." },
      { id: "S4-32", title: "Pray in His Will", reference: "1 Thessalonians 5:17-18", text: "pray continually; give thanks in all circumstances, for this is God's will for you in Christ Jesus." },
      { id: "S4-33", title: "Intercessory Prayer", reference: "1 Samuel 12:23", text: "As for me, far be it from me that I should sin against the LORD by failing to pray for you. And I will teach you the way that is good and right." },
      { id: "S4-34", title: "Intercessory Prayer", reference: "Matthew 9:37-38", text: "Then he said to his disciples, \"The harvest is plentiful but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.\"" },
      { id: "S4-35", title: "Praise", reference: "Hebrews 13:15", text: "Through Jesus, therefore, let us continually offer to God a sacrifice of praise\u2014the fruit of lips that confess his name." },
      { id: "S4-36", title: "Praise", reference: "Psalm 146:1-2", text: "Praise the LORD. Praise the LORD, O my soul. I will praise the LORD all my life; I will sing praise to my God as long as I live." },
    ],
  },
  {
    id: "S5",
    name: "Series 5 - Sharing Christ with Others",
    verses: [
      { id: "S5-1", title: "Reaching All Men", reference: "Colossians 1:27-28", text: "To them God has chosen to make known among the Gentiles the glorious riches of this mystery, which is Christ in you, the hope of glory. We proclaim him, admonishing and teaching everyone with all wisdom, so that we may present everyone perfect in Christ." },
      { id: "S5-2", title: "Representing God", reference: "2 Corinthians 5:19-20", text: "that God was reconciling the world to himself in Christ, not counting men's sins against them. And he has committed to us the message of reconciliation. We are therefore Christ's ambassadors, as though God were making his appeal through us. We implore you on Christ's behalf: Be reconciled to God." },
      { id: "S5-3", title: "Pleasing God", reference: "1 Thessalonians 2:4", text: "On the contrary, we speak as men approved by God to be entrusted with the gospel. We are not trying to please men but God, who tests our hearts." },
      { id: "S5-4", title: "Serving All Men", reference: "1 Corinthians 9:19", text: "Though I am free and belong to no man, I make myself a slave to everyone, to win as many as possible." },
      { id: "S5-5", title: "Seeing Opportunities", reference: "John 4:35", text: "Do you not say, 'Four months more and then the harvest'? I tell you, open your eyes and look at the fields! They are ripe for harvest." },
      { id: "S5-6", title: "Sharing Your Life", reference: "1 Thessalonians 2:8", text: "We loved you so much that we were delighted to share with you not only the gospel of God but our lives as well, because you had become so dear to us." },
      { id: "S5-7", title: "Sin a Reality", reference: "Romans 3:10-12", text: "As it is written: \"There is no one righteous, not even one; there is no one who understands, no one who seeks God. All have turned away, they have together become worthless; there is no one who does good, not even one.\"" },
      { id: "S5-8", title: "Consequences of Sin", reference: "2 Thessalonians 1:8-9", text: "He will punish those who do not know God and do not obey the gospel of our Lord Jesus. They will be punished with everlasting destruction and shut out from the presence of the Lord and from the majesty of his power" },
      { id: "S5-9", title: "Christ Paid the Price", reference: "1 Peter 2:24", text: "He himself bore our sins in his body on the tree, so that we might die to sins and live for righteousness; by his wounds you have been healed." },
      { id: "S5-10", title: "Salvation a Free Gift", reference: "2 Timothy 1:9", text: "who has saved us and called us to a holy life\u2014not because of anything we have done but because of his own purpose and grace. This grace was given us in Christ Jesus before the beginning of time," },
      { id: "S5-11", title: "Believe and Receive Him", reference: "Romans 10:9-10", text: "That if you confess with your mouth, \"Jesus is Lord,\" and believe in your heart that God raised him from the dead, you will be saved. For it is with your heart that you believe and are justified, and it is with your mouth that you confess and are saved." },
      { id: "S5-12", title: "Assurance of Salvation", reference: "John 10:28-29", text: "I give them eternal life, and they shall never perish; no one can snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father's hand." },
      { id: "S5-13", title: "I'm Not So Bad", reference: "Proverbs 21:2", text: "All a man's ways seem right to him, but the LORD weighs the heart." },
      { id: "S5-14", title: "Too Much to Give Up", reference: "Mark 8:36", text: "What good is it for a man to gain the whole world, yet forfeit his soul?" },
      { id: "S5-15", title: "I Can't Understand", reference: "John 7:17", text: "If anyone chooses to do God's will, he will find out whether my teaching comes from God or whether I speak on my own." },
      { id: "S5-16", title: "I'm Not Good Enough Yet", reference: "Luke 5:31-32", text: "Jesus answered them, \"It is not the healthy who need a doctor, but the sick. I have not come to call the righteous, but sinners to repentance.\"" },
      { id: "S5-17", title: "What Will People Think?", reference: "John 5:44", text: "How can you believe if you accept praise from one another, yet make no effort to obtain the praise that comes from the only God?" },
      { id: "S5-18", title: "I Can't Hold Out", reference: "Hebrews 7:25", text: "Therefore he is able to save completely those who come to God through him, because he always lives to intercede for them." },
      { id: "S5-19", title: "I'll Wait Till Later", reference: "Proverbs 27:1", text: "Do not boast about tomorrow, for you do not know what a day may bring forth." },
      { id: "S5-20", title: "Too Many Hypocrites", reference: "Romans 14:12", text: "So then, each of us will give an account of himself to God." },
      { id: "S5-21", title: "I Don't Believe in Christ", reference: "John 5:39", text: "You diligently study the Scriptures because you think that by them you possess eternal life. These are the Scriptures that testify about me," },
      { id: "S5-22", title: "What About Other Religions?", reference: "Proverbs 14:12", text: "There is a way that seems right to a man, but in the end it leads to death." },
      { id: "S5-23", title: "God Won't Send Anyone to Hell", reference: "Matthew 25:41", text: "\"Then he will say to those on his left, 'Depart from me, you who are cursed, into the eternal fire prepared for the devil and his angels." },
      { id: "S5-24", title: "What About the Heathen?", reference: "Romans 1:20", text: "For since the creation of the world God's invisible qualities\u2014his eternal power and divine nature\u2014have been clearly seen, being understood from what has been made, so that men are without excuse." },
      { id: "S5-25", title: "Redeemed", reference: "1 Peter 1:18-19", text: "For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your forefathers, but with the precious blood of Christ, a lamb without blemish or defect." },
      { id: "S5-26", title: "Reconciled", reference: "2 Corinthians 5:18", text: "All this is from God, who reconciled us to himself through Christ and gave us the ministry of reconciliation:" },
      { id: "S5-27", title: "Forgiven", reference: "Ephesians 1:7", text: "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God's grace" },
      { id: "S5-28", title: "Free from the Law", reference: "Romans 6:14-15", text: "For sin shall not be your master, because you are not under law, but under grace. What then? Shall we sin because we are not under law but under grace? By no means!" },
      { id: "S5-29", title: "Born of God", reference: "Galatians 3:26", text: "You are all sons of God through faith in Christ Jesus," },
      { id: "S5-30", title: "Made Priest", reference: "1 Peter 2:9", text: "But you are a chosen people, a royal priesthood, a holy nation, a people belonging to God, that you may declare the praises of him who called you out of darkness into his wonderful light." },
      { id: "S5-31", title: "Made Righteous", reference: "2 Corinthians 5:21", text: "God made him who had no sin to be sin for us, so that in him we might become the righteousness of God." },
      { id: "S5-32", title: "Sanctified", reference: "1 Corinthians 1:30", text: "It is because of him that you are in Christ Jesus, who has become for us wisdom from God\u2014that is, our righteousness, holiness and redemption." },
      { id: "S5-33", title: "Perfected", reference: "Hebrews 10:14", text: "because by one sacrifice he has made perfect forever those who are being made holy." },
      { id: "S5-34", title: "Justified", reference: "Romans 3:24", text: "and are justified freely by his grace through the redemption that came by Christ Jesus." },
      { id: "S5-35", title: "Made Heavenly Citizens", reference: "Philippians 3:20", text: "But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ," },
      { id: "S5-36", title: "Made Complete", reference: "Colossians 2:9-10", text: "For in Christ all the fullness of the Deity lives in bodily form, and you have been given fullness in Christ, who is the head over every power and authority." },
    ],
  },
];

const TOTAL_VERSES = PACKS.reduce((n, p) => n + p.verses.length, 0);

// ── Matching helpers ────────────────────────────────────────────────
const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,;:!?"()\[\]—–-]/g, " ")
    .replace(/'/g, "")
    .replace(/\s+/g, " ")
    .trim();

const toWords = (s) => (normalize(s) ? normalize(s).split(" ") : []);

function diffWords(expected, attempt) {
  const exp = toWords(expected);
  const att = toWords(attempt);
  const len = Math.max(exp.length, att.length);
  const cells = [];
  let correct = 0;
  for (let i = 0; i < len; i++) {
    const e = exp[i];
    const a = att[i];
    if (e !== undefined && e === a) {
      correct++;
      cells.push({ word: e, status: "ok" });
    } else if (e !== undefined) {
      cells.push({ word: e, status: "wrong", typed: a });
    } else {
      cells.push({ word: a, status: "extra" });
    }
  }
  return { cells, correct, total: exp.length, perfect: correct === exp.length && att.length === exp.length };
}

const firstLetter = (word) => {
  const m = word.toLowerCase().match(/[a-z0-9]/);
  return m ? m[0] : null;
};

// ── UI constants ────────────────────────────────────────────────────
const ink = "#22304a";
const paper = "#fbf9f4";
const gold = "#a8842c";
const sage = "#3e7a52";
const rust = "#b04a3a";

export default function VerseQuiz() {
  const [pack, setPack] = useState(null);
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("review");
  const [mastered, setMastered] = useState({});

  // Test mode state
  const [titleInput, setTitleInput] = useState("");
  const [verseInput, setVerseInput] = useState("");
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // Review mode state
  const [revealedCount, setRevealedCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [flash, setFlash] = useState(null);
  const reviewInputRef = useRef(null);
  const carouselRef = useRef(null);
  const [kbOffset, setKbOffset] = useState(0);

  const currentIndex = current && pack ? pack.verses.findIndex((v) => v.id === current.id) : -1;

  // Keep the active carousel pill scrolled into view
  useEffect(() => {
    if (currentIndex < 0) return;
    const el = carouselRef.current?.querySelector('[data-active="true"]');
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex, pack]);

  // Lift the fixed carousel above the on-screen keyboard.
  // On mobile the keyboard overlays a `position:fixed; bottom:0` bar instead of
  // resizing the layout viewport, so we measure the visual viewport and offset.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const overlap = window.innerHeight - vv.height - vv.offsetTop;
      setKbOffset(overlap > 80 ? overlap : 0); // ignore tiny URL-bar jitter
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const navigateCard = (idx) => {
    if (!pack || idx < 0 || idx >= pack.verses.length) return;
    startQuiz(pack.verses[idx]);
  };

  const titleWords = current ? current.title.split(/\s+/).filter((w) => firstLetter(w) !== null) : [];
  const verseWords = current ? current.text.split(/\s+/).filter((w) => firstLetter(w) !== null) : [];
  const words = [...titleWords, ...verseWords];
  const reviewDone = current && revealedCount >= words.length;
  const inTitlePhase = revealedCount < titleWords.length;
  const titleRevealed = Math.min(revealedCount, titleWords.length);
  const verseRevealed = Math.max(0, revealedCount - titleWords.length);

  useEffect(() => {
    if (mode === "review" && current && !reviewDone && reviewInputRef.current) {
      reviewInputRef.current.focus();
    }
  }, [mode, current, revealedCount, reviewDone]);

  const startQuiz = (v) => {
    setCurrent(v);
    setTitleInput("");
    setVerseInput("");
    setResult(null);
    setRevealed(false);
    resetReview();
  };

  const resetReview = () => {
    setRevealedCount(0);
    setMistakes(0);
    setHints(0);
    setFlash(null);
  };

  const check = () => {
    const titleOk = normalize(titleInput) === normalize(current.title);
    const diff = diffWords(current.text, verseInput);
    setResult({ titleOk, diff });
    if (titleOk && diff.perfect) {
      setMastered((m) => ({ ...m, [current.id]: true }));
    }
  };

  const handleReviewKey = (raw) => {
    const ch = raw.toLowerCase().match(/[a-z0-9]/) ? raw.toLowerCase() : null;
    if (!ch || reviewDone) return;
    const expected = firstLetter(words[revealedCount]);
    if (ch === expected) {
      setRevealedCount((c) => c + 1);
      setFlash("ok");
    } else {
      setMistakes((m) => m + 1);
      setFlash("wrong");
    }
    setTimeout(() => setFlash(null), 450);
  };

  const allCorrect = result && result.titleOk && result.diff.perfect;
  const masteredInPack = (p) => p.verses.filter((v) => mastered[v.id]).length;

  const modePill = (value, label) => (
    <button
      onClick={() => {
        setMode(value);
        setResult(null);
        setRevealed(false);
        resetReview();
      }}
      style={{
        padding: "6px 14px",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "system-ui, sans-serif",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        background: mode === value ? ink : "transparent",
        color: mode === value ? "#fff" : ink,
      }}
    >
      {label}
    </button>
  );

  const backLink = (label, onClick) => (
    <button
      onClick={onClick}
      style={{ background: "none", border: "none", color: gold, cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: 13, padding: 0, marginBottom: 18 }}
    >
      ← {label}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: paper, fontFamily: "Georgia, 'Times New Roman', serif", color: ink }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: current ? "16px 14px 170px" : "32px 16px 48px", boxSizing: "border-box" }}>

        {!current && (
          <header style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: gold, fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>
              TMS · DEP 242 · 180 Series · NIV 1984
            </div>
            <h1 style={{ fontSize: 32, margin: "8px 0 4px", fontWeight: 500 }}>Hide It in Your Heart</h1>
            <div style={{ fontSize: 14, opacity: 0.65 }}>
              {Object.keys(mastered).length} of {TOTAL_VERSES} verses mastered
            </div>
          </header>
        )}

        {!pack ? (
          /* ── Pack list ── */
          <div>
            <p style={{ textAlign: "center", fontSize: 15, opacity: 0.75, marginBottom: 24 }}>
              Choose a pack to practice.
            </p>
            {(() => {
              const sections = [
                { title: "Topical Memory System", tag: "60", match: (p) => ["5A", "A", "B", "C", "D", "E"].includes(p.id) },
                { title: "Discipleship Eight Packages", tag: "242", match: (p) => p.id.startsWith("DEP") },
                { title: "Topical Memory System", tag: "180", match: (p) => /^S\d/.test(p.id) },
              ];
              return sections.map((sec, si) => {
                const packs = PACKS.filter(sec.match);
                return (
                  <div key={si} style={{ marginBottom: si < sections.length - 1 ? 30 : 0 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      margin: "0 2px 14px",
                      paddingBottom: 8,
                      borderBottom: "1px solid #e3ddd0",
                    }}>
                      <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: ink }}>{sec.title}</h2>
                      <span style={{ fontSize: 14, fontFamily: "system-ui, sans-serif", color: gold, fontWeight: 700 }}>({sec.tag})</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {packs.map((p) => {
                        const done = masteredInPack(p);
                        const complete = done === p.verses.length;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPack(p)}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              gap: 8,
                              padding: "13px 14px",
                              background: "#fff",
                              border: `1px solid ${complete ? sage : "#e3ddd0"}`,
                              borderLeft: `4px solid ${complete ? sage : gold}`,
                              borderRadius: 8,
                              cursor: "pointer",
                              fontFamily: "inherit",
                              fontSize: 14,
                              lineHeight: 1.3,
                              color: ink,
                              textAlign: "left",
                              minHeight: 76,
                              boxSizing: "border-box",
                            }}
                          >
                            <span>{p.name}</span>
                            <span style={{ fontSize: 12, fontFamily: "system-ui, sans-serif", color: complete ? sage : "#b6ad9b", whiteSpace: "nowrap" }}>
                              {done}/{p.verses.length}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        ) : !current ? (
          /* ── Verse list ── */
          <div>
            {backLink("All packs", () => setPack(null))}
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 16px" }}>{pack.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pack.verses.map((v) => {
                const isM = mastered[v.id];
                return (
                  <button
                    key={v.id}
                    onClick={() => startQuiz(v)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      padding: "14px 16px",
                      background: "#fff",
                      border: `1px solid ${isM ? sage : "#ddd6c8"}`,
                      borderLeft: `4px solid ${isM ? sage : gold}`,
                      borderRadius: 8,
                      boxShadow: "0 1px 4px rgba(34,48,74,0.08)",
                      cursor: "pointer",
                      fontFamily: "system-ui, sans-serif",
                      color: ink,
                      textAlign: "left",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                      <span style={{
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: 1.3,
                        flex: 1,
                        minWidth: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {v.title}
                      </span>
                      <span style={{ fontSize: 11, color: isM ? sage : "#b6ad9b", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {isM ? "✓ Mastered" : "Practice"}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8270" }}>
                      {v.reference}
                    </div>
                    <div style={{
                      marginTop: 6,
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: ink,
                      minHeight: 60,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {v.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── Quiz view ── */
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
              <button
                onClick={() => setCurrent(null)}
                style={{ background: "none", border: "none", color: gold, cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: 13, padding: "6px 0" }}
              >
                ← Back
              </button>
              <div style={{ display: "flex", gap: 3, background: "#eee8da", borderRadius: 7, padding: 3 }}>
                {modePill("study", "Study")}
                {modePill("review", "Review")}
                {modePill("test", "Test")}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                background: "#fff",
                border: `1.5px solid ${mode === "review" && flash === "wrong" ? rust : mode === "review" && flash === "ok" ? sage : "#ddd6c8"}`,
                borderRadius: 6,
                boxShadow: "0 1px 4px rgba(34,48,74,0.10)",
                padding: "14px 16px 12px",
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                fontFamily: "system-ui, sans-serif",
                transition: "border-color 0.15s",
              }}
            >
              {mode === "review" && !reviewDone ? (
                <button
                  onClick={() => {
                    setHints((h) => h + 1);
                    setRevealedCount((c) => c + 1);
                    setFlash("ok");
                    setTimeout(() => setFlash(null), 450);
                    if (reviewInputRef.current) reviewInputRef.current.focus();
                  }}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "system-ui, sans-serif",
                    background: "none",
                    color: gold,
                    border: `1px solid ${gold}`,
                    borderRadius: 12,
                    cursor: "pointer",
                  }}
                >
                  Hint
                </button>
              ) : (
                <span style={{ position: "absolute", top: 12, right: 14, fontSize: 11, color: "#c5bca8" }}>{current.id}</span>
              )}

              {mode === "review" ? (
                <>
                  <style>{`@keyframes caretBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }`}</style>
                  <div
                    onClick={() => reviewInputRef.current && reviewInputRef.current.focus()}
                    style={{ fontSize: 16, fontWeight: 700, color: ink, paddingRight: 70, minHeight: 22, cursor: "text", overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {titleWords.slice(0, titleRevealed).map((w, i) => (
                      <span key={i}>{w}{" "}</span>
                    ))}
                    {inTitlePhase && (
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: 28,
                          borderBottom: `2px solid ${flash === "wrong" ? rust : gold}`,
                          color: rust,
                          fontFamily: "system-ui, sans-serif",
                          fontSize: 13,
                          fontWeight: 400,
                          textAlign: "center",
                          animation: flash === "wrong" ? "none" : "caretBlink 1.1s step-end infinite",
                        }}
                      >
                        {flash === "wrong" ? "✗" : "\u00A0"}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#8a8270", marginTop: 2 }}>{current.reference}</div>

                  <div
                    onClick={() => reviewInputRef.current && reviewInputRef.current.focus()}
                    style={{
                      position: "relative",
                      minHeight: 110,
                      margin: "14px 0 6px",
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: ink,
                      whiteSpace: "normal",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      cursor: "text",
                    }}
                  >
                    {!reviewDone && (
                      <input
                        ref={reviewInputRef}
                        value=""
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v) handleReviewKey(v[v.length - 1]);
                        }}
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                        aria-label="Type the first letter of the next word"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 1,
                          height: 1,
                          fontSize: 16,
                          opacity: 0,
                          border: "none",
                          padding: 0,
                          outline: "none",
                        }}
                      />
                    )}
                    {verseWords.slice(0, verseRevealed).map((w, i) => (
                      <span key={i} style={{ display: "inline", overflowWrap: "break-word" }}>{w}{" "}</span>
                    ))}
                    {!reviewDone && !inTitlePhase && (
                      <span
                        style={{
                          display: "inline-block",
                          minWidth: 28,
                          borderBottom: `2px solid ${flash === "wrong" ? rust : gold}`,
                          color: rust,
                          fontFamily: "system-ui, sans-serif",
                          fontSize: 13,
                          textAlign: "center",
                          animation: flash === "wrong" ? "none" : "caretBlink 1.1s step-end infinite",
                        }}
                      >
                        {flash === "wrong" ? "✗" : " "}
                      </span>
                    )}
                  </div>

                  <div style={{ textAlign: "right", fontSize: 12, color: "#8a8270" }}>{current.reference}</div>
                </>
              ) : mode === "study" ? (
                <>
                  <div style={{ fontSize: 16, fontWeight: 700, color: ink, paddingRight: 50 }}>{current.title}</div>
                  <div style={{ fontSize: 12, color: "#8a8270", marginTop: 2 }}>{current.reference}</div>
                  <div style={{ margin: "12px 0 6px", fontSize: 15, lineHeight: 1.75, color: ink }}>{current.text}</div>
                  <div style={{ textAlign: "right", fontSize: 12, color: "#8a8270" }}>{current.reference}</div>
                </>
              ) : (
                <>
                  <input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Title…"
                    style={{
                      display: "block",
                      width: "70%",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "inherit",
                      color: ink,
                      background: "transparent",
                      border: "none",
                      borderBottom: `1.5px solid ${result ? (result.titleOk ? sage : rust) : "#d8d2c4"}`,
                      outline: "none",
                      padding: "2px 0",
                      borderRadius: 0,
                    }}
                  />
                  <div style={{ fontSize: 12, color: "#8a8270", marginTop: 4 }}>{current.reference}</div>

                  <textarea
                    value={verseInput}
                    onChange={(e) => setVerseInput(e.target.value)}
                    placeholder="Write the verse from memory…"
                    rows={5}
                    style={{
                      display: "block",
                      width: "100%",
                      boxSizing: "border-box",
                      margin: "14px 0 6px",
                      padding: 0,
                      fontSize: 15,
                      lineHeight: 1.75,
                      fontFamily: "inherit",
                      color: ink,
                      background: "transparent",
                      border: "none",
                      borderBottom: `1.5px solid ${result ? (result.diff.perfect ? sage : rust) : "#e7e1d2"}`,
                      borderRadius: 0,
                      outline: "none",
                      resize: "vertical",
                    }}
                  />

                  <div style={{ textAlign: "right", fontSize: 12, color: "#8a8270" }}>{current.reference}</div>
                </>
              )}
            </div>

            {/* Below the card */}
            {mode === "review" ? (
              !reviewDone ? (
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#8a8270", textAlign: "center", marginTop: 10, minHeight: 16 }}>
                  {flash === "wrong" ? (
                    <span style={{ color: rust, fontWeight: 600 }}>Not quite — try again</span>
                  ) : (
                    <>
                      Type the first letter of each word ·{" "}
                      {inTitlePhase
                        ? `Title: word ${revealedCount + 1} of ${titleWords.length}`
                        : `Verse: word ${verseRevealed + 1} of ${verseWords.length}`}
                      {mistakes > 0 && <> · {mistakes} {mistakes === 1 ? "miss" : "misses"}</>}
                      {hints > 0 && <> · {hints} {hints === 1 ? "hint" : "hints"}</>}
                    </>
                  )}
                </div>
              ) : (
                <div style={{ marginTop: 14 }}>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: 6,
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      background: "#eef5ef",
                      color: sage,
                      border: "1px solid #cfe2d4",
                    }}
                  >
                    ✓ Card complete
                    {mistakes === 0 && hints === 0
                      ? " — flawless!"
                      : ` — ${mistakes} ${mistakes === 1 ? "miss" : "misses"}, ${hints} ${hints === 1 ? "hint" : "hints"}`}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={resetReview}
                      style={{ flex: 1, padding: "11px 0", fontSize: 14, fontWeight: 600, fontFamily: "system-ui, sans-serif", background: ink, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
                    >
                      Review again
                    </button>
                    <button
                      onClick={() => { setMode("test"); resetReview(); }}
                      style={{ flex: 1, padding: "11px 0", fontSize: 14, fontWeight: 600, fontFamily: "system-ui, sans-serif", background: "none", color: ink, border: "1px solid #d8d2c4", borderRadius: 6, cursor: "pointer" }}
                    >
                      Try test mode
                    </button>
                  </div>
                </div>
              )
            ) : mode === "study" ? null : (
              <>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button
                    onClick={check}
                    style={{ flex: 1, padding: "12px 0", fontSize: 15, fontWeight: 600, fontFamily: "system-ui, sans-serif", background: ink, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
                  >
                    Check answer
                  </button>
                  <button
                    onClick={() => setRevealed(!revealed)}
                    style={{ padding: "12px 18px", fontSize: 15, fontFamily: "system-ui, sans-serif", background: "none", color: ink, border: "1px solid #d8d2c4", borderRadius: 6, cursor: "pointer" }}
                  >
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                </div>

                {result && (
                  <div style={{ marginTop: 14 }}>
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: 6,
                        fontFamily: "system-ui, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        background: allCorrect ? "#eef5ef" : "#faf0ee",
                        color: allCorrect ? sage : rust,
                        border: `1px solid ${allCorrect ? "#cfe2d4" : "#ecd2cc"}`,
                      }}
                    >
                      {allCorrect
                        ? "✓ Correct! Word perfect."
                        : `${result.titleOk ? "Title correct" : "Title incorrect"} · Verse: ${result.diff.correct}/${result.diff.total} words right`}
                    </div>

                    {!result.diff.perfect && (
                      <div style={{ marginTop: 12, lineHeight: 1.9, fontSize: 15, fontFamily: "system-ui, sans-serif", overflowWrap: "break-word" }}>
                        {result.diff.cells.map((c, i) => (
                          <span
                            key={i}
                            title={c.status === "wrong" ? `You typed: ${c.typed || "(nothing)"}` : undefined}
                            style={{
                              marginRight: 6,
                              color: c.status === "ok" ? sage : rust,
                              textDecoration: c.status === "extra" ? "line-through" : "none",
                              borderBottom: c.status === "wrong" ? `2px solid ${rust}` : "none",
                            }}
                          >
                            {c.word}
                          </span>
                        ))}
                        <div style={{ fontSize: 12, color: "#b6ad9b", marginTop: 6 }}>
                          Green = right · underlined = wrong word (hover to see what you typed) · struck = extra word
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {revealed && (
                  <div style={{ marginTop: 14, position: "relative", background: "#fff", border: "1.5px solid #ddd6c8", borderRadius: 6, boxShadow: "0 1px 4px rgba(34,48,74,0.10)", padding: "14px 16px 12px", fontFamily: "system-ui, sans-serif" }}>
                    <span style={{ position: "absolute", top: 12, right: 14, fontSize: 11, color: "#c5bca8" }}>{current.id}</span>
                    <div style={{ fontSize: 16, fontWeight: 700, color: ink, paddingRight: 50 }}>{current.title}</div>
                    <div style={{ fontSize: 12, color: "#8a8270", marginTop: 2 }}>{current.reference}</div>
                    <div style={{ margin: "12px 0 6px", fontSize: 15, lineHeight: 1.75, color: ink }}>{current.text}</div>
                    <div style={{ textAlign: "right", fontSize: 12, color: "#8a8270" }}>{current.reference}</div>
                  </div>
                )}
              </>
            )}

            {/* ── Previous / Next buttons ── */}
            <div style={{ display: "flex", gap: 10, maxWidth: 680, margin: "18px auto 0" }}>
              <button
                onClick={() => navigateCard(currentIndex - 1)}
                disabled={currentIndex <= 0}
                style={{
                  flex: 1,
                  padding: "13px 16px",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: currentIndex <= 0 ? "#c5bca8" : ink,
                  background: "#fff",
                  border: "1.5px solid #ddd6c8",
                  borderRadius: 8,
                  cursor: currentIndex <= 0 ? "default" : "pointer",
                  opacity: currentIndex <= 0 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => navigateCard(currentIndex + 1)}
                disabled={currentIndex >= pack.verses.length - 1}
                style={{
                  flex: 1,
                  padding: "13px 16px",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: currentIndex >= pack.verses.length - 1 ? "#c5bca8" : ink,
                  background: "#fff",
                  border: "1.5px solid #ddd6c8",
                  borderRadius: 8,
                  cursor: currentIndex >= pack.verses.length - 1 ? "default" : "pointer",
                  opacity: currentIndex >= pack.verses.length - 1 ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>

            {/* ── Carousel ── */}
            <div style={{
              position: "fixed",
              bottom: kbOffset,
              left: 0,
              right: 0,
              background: paper,
              borderTop: "1px solid #e3ddd0",
              padding: "10px 14px 14px",
              zIndex: 100,
              transition: "bottom 0.2s ease",
            }}>
              <div
                ref={carouselRef}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  maxWidth: 680,
                  margin: "0 auto",
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  padding: "2px 4px 4px",
                }}
              >
                {pack.verses.map((v, i) => {
                  const isActive = i === currentIndex;
                  const isMastered = mastered[v.id];
                  return (
                    <button
                      key={v.id}
                      data-active={isActive}
                      onClick={() => navigateCard(i)}
                      title={v.reference}
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        minHeight: 38,
                        padding: "8px 13px",
                        borderRadius: 10,
                        border: isActive ? `2px solid ${ink}` : "2px solid transparent",
                        cursor: "pointer",
                        fontFamily: "system-ui, sans-serif",
                        fontSize: 13,
                        fontWeight: isActive ? 700 : 500,
                        whiteSpace: "nowrap",
                        transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
                        background: isActive ? ink : isMastered ? sage : "#ece6d8",
                        color: isActive ? paper : isMastered ? "#fff" : "#6f6857",
                      }}
                    >
                      {isMastered && (
                        <span style={{ fontSize: 12, lineHeight: 1, opacity: isActive ? 1 : 0.95 }}>✓</span>
                      )}
                      <span>{v.reference}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ textAlign: "center", fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#b6ad9b", marginTop: 4 }}>
                {currentIndex + 1} / {pack.verses.length} · {current.reference}
              </div>
            </div>
          </div>
        )}

        {!current && (
          <footer style={{ textAlign: "center", marginTop: 40, fontSize: 11, color: "#b6ad9b", fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
            Scripture quotations taken from The Holy Bible, New International Version® NIV®<br />
            Copyright © 1973, 1978, 1984 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.
          </footer>
        )}
      </div>
    </div>
  );
}
