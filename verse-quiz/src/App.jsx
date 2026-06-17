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
    name: "DEP 242 Pack 1 - Assurance of Salvation",
    verses: [
      { id: "DEP1-1", title: "Can be assured", reference: "2 Corinthians 13:5", text: "Examine yourselves to see whether you are in the faith; test yourselves. Do you not realize that Christ Jesus is in you\u2014unless, of course, you fail the test?" },
      { id: "DEP1-2", title: "Can be assured", reference: "1 John 5:11-12", text: "And this is the testimony: God has given us eternal life, and this life is in his Son. Whoever has the Son has life; whoever does not have the Son of God does not have life." },
      { id: "DEP1-3", title: "Assured of having eternal life", reference: "1 John 5:13", text: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life." },
      { id: "DEP1-4", title: "Assured of having eternal life", reference: "John 6:47", text: "Very truly I tell you, the one who believes has eternal life." },
      { id: "DEP1-5", title: "Forgiveness of sin", reference: "Ephesians 1:7", text: "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\u2019s grace" },
      { id: "DEP1-6", title: "Forgiveness of sin", reference: "Romans 8:1", text: "Therefore, there is now no condemnation for those who are in Christ Jesus," },
      { id: "DEP1-7", title: "Justified", reference: "Romans 3:24", text: "and all are justified freely by his grace through the redemption that came by Christ Jesus." },
      { id: "DEP1-8", title: "Justified", reference: "Romans 5:1", text: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ," },
      { id: "DEP1-9", title: "Born again in Christ", reference: "1 Peter 1:3", text: "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead," },
      { id: "DEP1-10", title: "Born again in Christ", reference: "Titus 3:5", text: "he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit," },
      { id: "DEP1-11", title: "Being children of God", reference: "Galatians 3:26", text: "So in Christ Jesus you are all children of God through faith," },
      { id: "DEP1-12", title: "Being children of God", reference: "Romans 8:14", text: "For those who are led by the Spirit of God are the children of God." },
      { id: "DEP1-13", title: "Holy Spirit living in Believers", reference: "Romans 8:9", text: "You, however, are not in the realm of the flesh but are in the realm of the Spirit, if indeed the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, they do not belong to Christ." },
      { id: "DEP1-14", title: "Holy Spirit living in Believers", reference: "John 14:16-17", text: "And I will ask the Father, and he will give you another advocate to help you and be with you forever\u2014 the Spirit of truth. The world cannot accept him, because it neither sees him nor knows him. But you know him, for he lives with you and will be in you." },
      { id: "DEP1-15", title: "Salvation never to be lost", reference: "John 10:28-29", text: "I give them eternal life, and they shall never perish; no one will snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father\u2019s hand." },
      { id: "DEP1-16", title: "Salvation never to be lost", reference: "Romans 8:39", text: "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." },
      { id: "DEP1-17", title: "Assurance based on the Word", reference: "1 Peter 1:23", text: "For you have been born again, not of perishable seed, but of imperishable, through the living and enduring word of God." },
      { id: "DEP1-18", title: "Assurance based on the Word", reference: "Ephesians 1:13", text: "And you also were included in Christ when you heard the message of truth, the gospel of your salvation. When you believed, you were marked in him with a seal, the promised Holy Spirit," },
    ],
  },
  {
    id: "DEP2",
    name: "DEP 242 Pack 2 - Quiet Time",
    verses: [
      { id: "DEP2-1", title: "God wants to fellowship with us", reference: "1 Corinthians 1:9", text: "God is faithful, who has called you into fellowship with his Son, Jesus Christ our Lord." },
      { id: "DEP2-2", title: "God wants to fellowship with us", reference: "Isaiah 30:18", text: "Yet the Lord longs to be gracious to you; therefore he will rise up to show you compassion. For the Lord is a God of justice. Blessed are all who wait for him!" },
      { id: "DEP2-3", title: "God's command", reference: "Isaiah 55:6", text: "Seek the Lord while he may be found; call on him while he is near." },
      { id: "DEP2-4", title: "God's command", reference: "Psalm 27:8", text: "My heart says of you, \u201cSeek his face!\u201d Your face, Lord, I will seek." },
      { id: "DEP2-5", title: "Promise of blessings", reference: "John 15:5", text: "\u201cI am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing." },
      { id: "DEP2-6", title: "Promise of blessings", reference: "Psalm 34:10", text: "The lions may grow weak and hungry, but those who seek the Lord lack no good thing." },
      { id: "DEP2-7", title: "To discern and obey God's will", reference: "Habakkuk 2:1", text: "I will stand at my watch and station myself on the ramparts; I will look to see what he will say to me, and what answer I am to give to this complaint." },
      { id: "DEP2-8", title: "To discern and obey God's will", reference: "Psalm 143:8, 10", text: "Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life. Teach me to do your will, for you are my God; may your good Spirit lead me on level ground." },
      { id: "DEP2-9", title: "Looking on the Lord", reference: "Hebrews 12:2", text: "fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God." },
      { id: "DEP2-10", title: "Looking on the Lord", reference: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
      { id: "DEP2-11", title: "Coming to the Lord with thirst", reference: "Psalm 42:1", text: "As the deer pants for streams of water, so my soul pants for you, my God." },
      { id: "DEP2-12", title: "Coming to the Lord with thirst", reference: "Psalm 130:5-6", text: "I wait for the Lord, my whole being waits, and in his word I put my hope. I wait for the Lord more than watchmen wait for the morning, more than watchmen wait for the morning." },
      { id: "DEP2-13", title: "Casting our burdens on the Lord", reference: "Psalm 55:22", text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken." },
      { id: "DEP2-14", title: "Casting our burdens on the Lord", reference: "Psalm 68:19", text: "Praise be to the Lord, to God our Savior, who daily bears our burdens." },
      { id: "DEP2-15", title: "Taking refuge and rest in the Lord", reference: "Psalm 91:9-10", text: "If you say, \u201cThe Lord is my refuge,\u201d and you make the Most High your dwelling, no harm will overtake you, no disaster will come near your tent." },
      { id: "DEP2-16", title: "Taking refuge and rest in the Lord", reference: "Matthew 11:28-29", text: "\u201cCome to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls." },
      { id: "DEP2-17", title: "Meeting the Lord in the Word and prayer", reference: "Psalm 119:147-148", text: "I rise before dawn and cry for help; I have put my hope in your word. My eyes stay open through the watches of the night, that I may meditate on your promises." },
      { id: "DEP2-18", title: "Meeting the Lord in the Word and prayer", reference: "Psalm 5:3", text: "In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly." },
      { id: "DEP2-19", title: "Worshiping the Lord", reference: "Psalm 95:6", text: "Come, let us bow down in worship, let us kneel before the Lord our Maker;" },
      { id: "DEP2-20", title: "Worshiping the Lord", reference: "Hebrews 13:15", text: "Through Jesus, therefore, let us continually offer to God a sacrifice of praise\u2014the fruit of lips that openly profess his name." },
      { id: "DEP2-21", title: "Getting daily satisfaction", reference: "Psalm 90:14", text: "Satisfy us in the morning with your unfailing love, that we may sing for joy and be glad all our days." },
      { id: "DEP2-22", title: "Getting daily satisfaction", reference: "Psalm 107:9", text: "for he satisfies the thirsty and fills the hungry with good things." },
      { id: "DEP2-23", title: "Jesus - praying very early in the morning", reference: "Mark 1:35", text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed." },
      { id: "DEP2-24", title: "Moses - personal fellowship with the Lord", reference: "Exodus 33:11", text: "The Lord would speak to Moses face to face, as one speaks to a friend. Then Moses would return to the camp, but his young aide Joshua son of Nun did not leave the tent." },
      { id: "DEP2-25", title: "Daniel - giving top priority to the fellowship", reference: "Daniel 6:10", text: "Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before." },
      { id: "DEP2-26", title: "Disciples - understanding the Word when alone with Jesus", reference: "Mark 4:34", text: "He did not say anything to them without using a parable. But when he was alone with his own disciples, he explained everything." },
    ],
  },
  {
    id: "DEP3",
    name: "DEP 242 Pack 3 - The Word",
    verses: [
      { id: "DEP3-1", title: "Inspired by God", reference: "2 Timothy 3:16", text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness," },
      { id: "DEP3-2", title: "Inspired by God", reference: "2 Peter 1:21", text: "For prophecy never had its origin in the human will, but prophets, though human, spoke from God as they were carried along by the Holy Spirit." },
      { id: "DEP3-3", title: "Standing forever and never changing", reference: "Matthew 24:35", text: "Heaven and earth will pass away, but my words will never pass away." },
      { id: "DEP3-4", title: "Standing forever and never changing", reference: "1 Peter 1:24-25", text: "For, \u201cAll people are like grass, and all their glory is like the flowers of the field; the grass withers and the flowers fall, but the word of the Lord endures forever.\u201d And this is the word that was preached to you." },
      { id: "DEP3-5", title: "Being the truth", reference: "John 17:17", text: "Sanctify them by the truth; your word is truth." },
      { id: "DEP3-6", title: "Being the truth", reference: "2 Samuel 7:28", text: "Sovereign Lord, you are God! Your covenant is trustworthy, and you have promised these good things to your servant." },
      { id: "DEP3-7", title: "Having power", reference: "Jeremiah 23:29", text: "\u201cIs not my word like fire,\u201d declares the Lord, \u201cand like a hammer that breaks a rock in pieces?" },
      { id: "DEP3-8", title: "Having power", reference: "2 Timothy 2:9", text: "for which I am suffering even to the point of being chained like a criminal. But God\u2019s word is not chained." },
      { id: "DEP3-9", title: "Jesus also confirmed the Word", reference: "Matthew 4:4", text: "Jesus answered, \u201cIt is written: \u2018Man shall not live on bread alone, but on every word that comes from the mouth of God.\u2019\u201d" },
      { id: "DEP3-10", title: "Jesus also confirmed the Word", reference: "Luke 24:27", text: "And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself." },
      { id: "DEP3-11", title: "Making us born again", reference: "1 Peter 1:23", text: "For you have been born again, not of perishable seed, but of imperishable, through the living and enduring word of God." },
      { id: "DEP3-12", title: "Making us born again", reference: "James 1:18", text: "He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created." },
      { id: "DEP3-13", title: "Helping us grow up", reference: "1 Peter 2:2", text: "Like newborn babies, crave pure spiritual milk, so that by it you may grow up in your salvation," },
      { id: "DEP3-14", title: "Helping us grow up", reference: "Acts 20:32", text: "\u201cNow I commit you to God and to the word of his grace, which can build you up and give you an inheritance among all those who are sanctified." },
      { id: "DEP3-15", title: "Giving guidance", reference: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
      { id: "DEP3-16", title: "Giving guidance", reference: "Proverbs 6:22-23", text: "When you walk, they will guide you; when you sleep, they will watch over you; when you awake, they will speak to you. For this command is a lamp, this teaching is a light, and correction and instruction are the way to life," },
      { id: "DEP3-17", title: "Solving problems", reference: "Psalm 107:20", text: "He sent out his word and healed them; he rescued them from the grave." },
      { id: "DEP3-18", title: "Solving problems", reference: "Matthew 8:8", text: "The centurion replied, \u201cLord, I do not deserve to have you come under my roof. But just say the word, and my servant will be healed." },
      { id: "DEP3-19", title: "Being our joy and delight", reference: "Jeremiah 15:16", text: "When your words came, I ate them; they were my joy and my heart\u2019s delight, for I bear your name, Lord God Almighty." },
      { id: "DEP3-20", title: "Being our joy and delight", reference: "Psalm 119:111", text: "Your statutes are my heritage forever; they are the joy of my heart." },
      { id: "DEP3-21", title: "Being spiritual weapons", reference: "Ephesians 6:17", text: "Take the helmet of salvation and the sword of the Spirit, which is the word of God." },
      { id: "DEP3-22", title: "Being spiritual weapons", reference: "Hebrews 4:12", text: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart." },
      { id: "DEP3-23", title: "Search the Word every day", reference: "Acts 17:11", text: "Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true." },
      { id: "DEP3-24", title: "Meditate on the Word all day long", reference: "Psalm 119:97", text: "Oh, how I love your law! I meditate on it all day long." },
      { id: "DEP3-25", title: "Obey the Word before teaching", reference: "Ezra 7:10", text: "For Ezra had devoted himself to the study and observance of the Law of the Lord, and to teaching its decrees and laws in Israel." },
      { id: "DEP3-26", title: "Treasure the Word more than daily bread", reference: "Job 23:12", text: "I have not departed from the commands of his lips; I have treasured the words of his mouth more than my daily bread." },
      { id: "DEP3-27", title: "Trust and obey the Word", reference: "Luke 5:5-6", text: "Simon answered, \u201cMaster, we\u2019ve worked hard all night and haven\u2019t caught anything. But because you say so, I will let down the nets.\u201d When they had done so, they caught such a large number of fish that their nets began to break." },
      { id: "DEP3-28", title: "Hearing", reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ." },
      { id: "DEP3-29", title: "Hearing", reference: "Luke 11:28", text: "He replied, \u201cBlessed rather are those who hear the word of God and obey it.\u201d" },
      { id: "DEP3-30", title: "Reading", reference: "Revelation 1:3", text: "Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near." },
      { id: "DEP3-31", title: "Reading", reference: "Deuteronomy 17:19", text: "It is to be with him, and he is to read it all the days of his life so that he may learn to revere the Lord his God and follow carefully all the words of this law and these decrees" },
      { id: "DEP3-32", title: "Studying", reference: "Acts 17:11", text: "Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true." },
      { id: "DEP3-33", title: "Studying", reference: "2 Timothy 2:15", text: "Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth." },
      { id: "DEP3-34", title: "Memorizing", reference: "Deuteronomy 6:6", text: "These commandments that I give you today are to be on your hearts." },
      { id: "DEP3-35", title: "Memorizing", reference: "Proverbs 7:1-3", text: "My son, keep my words and store up my commands within you. Keep my commands and you will live; guard my teachings as the apple of your eye. Bind them on your fingers; write them on the tablet of your heart." },
      { id: "DEP3-36", title: "Meditating", reference: "Psalm 1:1-2", text: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord, and who meditates on his law day and night." },
      { id: "DEP3-37", title: "Meditating", reference: "Joshua 1:8", text: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful." },
    ],
  },
  {
    id: "DEP4",
    name: "DEP 242 Pack 4 - Prayer",
    verses: [
      { id: "DEP4-1", title: "Cease not to pray", reference: "1 Thessalonians 5:17", text: "pray continually," },
      { id: "DEP4-2", title: "Devote yourself to prayer", reference: "Colossians 4:2", text: "Devote yourselves to prayer, being watchful and thankful." },
      { id: "DEP4-3", title: "Be alert to pray", reference: "1 Peter 4:7", text: "The end of all things is near. Therefore be alert and of sober mind so that you may pray." },
      { id: "DEP4-4", title: "Pray for everyone", reference: "1 Timothy 2:1-2", text: "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people\u2014 for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness." },
      { id: "DEP4-5", title: "Promise to answer", reference: "John 14:13-14", text: "And I will do whatever you ask in my name, so that the Father may be glorified in the Son. You may ask me for anything in my name, and I will do it." },
      { id: "DEP4-6", title: "Immeasurable answer", reference: "Ephesians 3:20", text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us," },
      { id: "DEP4-7", title: "Understanding God's will", reference: "Jeremiah 33:3", text: "\u2018Call to me and I will answer you and tell you great and unsearchable things you do not know.\u2019" },
      { id: "DEP4-8", title: "Getting the wisdom from God", reference: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." },
      { id: "DEP4-9", title: "Delivering us from fears", reference: "Psalm 34:4", text: "I sought the Lord, and he answered me; he delivered me from all my fears." },
      { id: "DEP4-10", title: "Delivering us from trouble", reference: "Psalm 50:15", text: "and call on me in the day of trouble; I will deliver you, and you will honor me.\u201d" },
      { id: "DEP4-11", title: "Giving us boldness", reference: "Acts 4:31", text: "After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly." },
      { id: "DEP4-12", title: "Giving us opportunities for the Gospel", reference: "Colossians 4:3", text: "And pray for us, too, that God may open a door for our message, so that we may proclaim the mystery of Christ, for which I am in chains." },
      { id: "DEP4-13", title: "Pray in the name of Jesus", reference: "John 16:24", text: "Until now you have not asked for anything in my name. Ask and you will receive, and your joy will be complete." },
      { id: "DEP4-14", title: "Pray in faith", reference: "Matthew 21:22", text: "If you believe, you will receive whatever you ask for in prayer.\u201d" },
      { id: "DEP4-15", title: "Pray in the Spirit", reference: "Ephesians 6:18", text: "And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the Lord\u2019s people." },
      { id: "DEP4-16", title: "Pray in God's will", reference: "1 John 5:14-15", text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us. And if we know that he hears us\u2014whatever we ask\u2014we know that we have what we asked of him." },
      { id: "DEP4-17", title: "Confess and renounce the sin", reference: "Psalm 66:18", text: "If I had cherished sin in my heart, the Lord would not have listened;" },
      { id: "DEP4-18", title: "Obey the Lord", reference: "1 John 3:22", text: "and receive from him anything we ask, because we keep his commands and do what pleases him." },
      { id: "DEP4-19", title: "Pray with one accord", reference: "Matthew 18:19", text: "\u201cAgain, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven." },
      { id: "DEP4-20", title: "Ask and act", reference: "Matthew 7:7-8", text: "\u201cAsk and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened." },
      { id: "DEP4-21", title: "Pray with all your heart", reference: "Jeremiah 29:12-13", text: "Then you will call on me and come and pray to me, and I will listen to you. You will seek me and find me when you seek me with all your heart." },
      { id: "DEP4-22", title: "Pray in claiming the promise", reference: "Nehemiah 1:8-9", text: "\u201cRemember the instruction you gave your servant Moses, saying, \u2018If you are unfaithful, I will scatter you among the nations, but if you return to me and obey my commands, then even if your exiled people are at the farthest horizon, I will gather them from there and bring them to the place I have chosen as a dwelling for my Name.\u2019" },
      { id: "DEP4-23", title: "Praying at the risk of life", reference: "Daniel 6:10", text: "Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before." },
      { id: "DEP4-24", title: "Giving priority to prayer", reference: "Luke 5:15-16", text: "Yet the news about him spread all the more, so that crowds of people came to hear him and to be healed of their sicknesses. But Jesus often withdrew to lonely places and prayed." },
      { id: "DEP4-25", title: "Praying all through the night", reference: "Luke 6:12", text: "One of those days Jesus went out to a mountainside to pray, and spent the night praying to God." },
      { id: "DEP4-26", title: "Praying earnestly", reference: "James 5:17-18", text: "Elijah was a human being, even as we are. He prayed earnestly that it would not rain, and it did not rain on the land for three and a half years. Again he prayed, and the heavens gave rain, and the earth produced its crops." },
      { id: "DEP4-27", title: "Praying in the midst of hardship", reference: "Acts 16:25", text: "About midnight Paul and Silas were praying and singing hymns to God, and the other prisoners were listening to them." },
      { id: "DEP4-28", title: "Praising", reference: "1 Chronicles 29:11-13", text: "Yours, Lord, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, Lord, is the kingdom; you are exalted as head over all. Wealth and honor come from you; you are the ruler of all things. In your hands are strength and power to exalt and give strength to all. Now, our God, we give you thanks, and praise your glorious name." },
      { id: "DEP4-29", title: "Intercession", reference: "1 Timothy 2:1-2", text: "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people\u2014 for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness." },
      { id: "DEP4-30", title: "Thanksgiving", reference: "1 Thessalonians 5:18", text: "give thanks in all circumstances; for this is God\u2019s will for you in Christ Jesus." },
      { id: "DEP4-31", title: "Confession", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
      { id: "DEP4-32", title: "Supplication", reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    ],
  },
  {
    id: "DEP5",
    name: "DEP 242 Pack 5 - Fellowship",
    verses: [
      { id: "DEP5-1", title: "The Blood of Christ", reference: "Ephesians 2:13", text: "But now in Christ Jesus you who once were far away have been brought near by the blood of Christ." },
      { id: "DEP5-2", title: "The Blood of Christ", reference: "Colossians 1:20", text: "and through him to reconcile to himself all things, whether things on earth or things in heaven, by making peace through his blood, shed on the cross." },
      { id: "DEP5-3", title: "God - The Father, The Son, The Holy Spirit", reference: "1 John 1:3", text: "We proclaim to you what we have seen and heard, so that you also may have fellowship with us. And our fellowship is with the Father and with his Son, Jesus Christ." },
      { id: "DEP5-4", title: "God - The Father, The Son, The Holy Spirit", reference: "2 Corinthians 13:14", text: "May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all." },
      { id: "DEP5-5", title: "Promise of being with us", reference: "Matthew 18:20", text: "For where two or three gather in my name, there am I with them.\u201d" },
      { id: "DEP5-6", title: "Bestowing His blessings", reference: "Psalm 133:1-3", text: "How good and pleasant it is when God\u2019s people live together in unity! It is like precious oil poured on the head, running down on the beard, running down on Aaron\u2019s beard, down on the collar of his robe. It is as if the dew of Hermon were falling on Mount Zion. For there the Lord bestows his blessing, even life forevermore." },
      { id: "DEP5-7", title: "Protection against sins", reference: "Hebrews 3:13", text: "But encourage one another daily, as long as it is called \u201cToday,\u201d so that none of you may be hardened by sin\u2019s deceitfulness." },
      { id: "DEP5-8", title: "Helping up each other", reference: "Ecclesiastes 4:9-10", text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up." },
      { id: "DEP5-9", title: "Training in godly life", reference: "2 Timothy 2:22", text: "Flee the evil desires of youth and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart." },
      { id: "DEP5-10", title: "Developing godly character", reference: "Proverbs 27:17,19", text: "As iron sharpens iron, so one person sharpens another. As water reflects the face, so one\u2019s life reflects the heart." },
      { id: "DEP5-11", title: "Getting God's wisdom", reference: "Proverbs 13:20", text: "Walk with the wise and become wise, for a companion of fools suffers harm." },
      { id: "DEP5-12", title: "Attaining maturity", reference: "Ephesians 4:13", text: "until we all reach unity in the faith and in the knowledge of the Son of God and become mature, attaining to the whole measure of the fullness of Christ." },
      { id: "DEP5-13", title: "Fruitful in the ministry", reference: "Acts 2:42,47", text: "They devoted themselves to the apostles\u2019 teaching and to fellowship, to the breaking of bread and to prayer. praising God and enjoying the favor of all the people. And the Lord added to their number daily those who were being saved." },
      { id: "DEP5-14", title: "Partnering in the gospel", reference: "Philippians 1:5,27", text: "because of your partnership in the gospel from the first day until now, Whatever happens, conduct yourselves in a manner worthy of the gospel of Christ. Then, whether I come and see you or only hear about you in my absence, I will know that you stand firm in the one Spirit, striving together as one for the faith of the gospel" },
      { id: "DEP5-15", title: "Spurring one another", reference: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another\u2014and all the more as you see the Day approaching." },
      { id: "DEP5-16", title: "Meeting the needs", reference: "2 Corinthians 8:3-4", text: "For I testify that they gave as much as they were able, and even beyond their ability. Entirely on their own, they urgently pleaded with us for the privilege of sharing in this service to the Lord\u2019s people." },
      { id: "DEP5-17", title: "Participating in the sufferings of Christ", reference: "1 Peter 4:13", text: "But rejoice inasmuch as you participate in the sufferings of Christ, so that you may be overjoyed when his glory is revealed." },
      { id: "DEP5-18", title: "Carrying each other's burdens", reference: "Galatians 6:2", text: "Carry each other\u2019s burdens, and in this way you will fulfill the law of Christ." },
      { id: "DEP5-19", title: "Be like-minded", reference: "Philippians 2:1-2", text: "Therefore if you have any encouragement from being united with Christ, if any comfort from his love, if any common sharing in the Spirit, if any tenderness and compassion, then make my joy complete by being like-minded, having the same love, being one in spirit and of one mind." },
      { id: "DEP5-20", title: "Be humble", reference: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others." },
      { id: "DEP5-21", title: "Open your heart wide", reference: "2 Corinthians 6:12-13", text: "We are not withholding our affection from you, but you are withholding yours from us. As a fair exchange\u2014I speak as to my children\u2014open wide your hearts also." },
      { id: "DEP5-22", title: "Submit to one another", reference: "Ephesians 5:21", text: "Submit to one another out of reverence for Christ." },
      { id: "DEP5-23", title: "Do not compare with others", reference: "Mark 9:34-35", text: "But they kept quiet because on the way they had argued about who was the greatest. Sitting down, Jesus called the Twelve and said, \u201cAnyone who wants to be first must be the very last, and the servant of all.\u201d" },
      { id: "DEP5-24", title: "Let no bitter root grow up", reference: "Hebrews 12:15", text: "See to it that no one falls short of the grace of God and that no bitter root grows up to cause trouble and defile many." },
      { id: "DEP5-25", title: "Part from the fruitless things", reference: "Ephesians 5:11", text: "Have nothing to do with the fruitless deeds of darkness, but rather expose them." },
      { id: "DEP5-26", title: "Be available", reference: "2 Timothy 2:4", text: "No one serving as a soldier gets entangled in civilian affairs, but rather tries to please his commanding officer." },
      { id: "DEP5-27", title: "In relation to believers", reference: "Matthew 5:23-24", text: "\u201cTherefore, if you are offering your gift at the altar and there remember that your brother or sister has something against you, leave your gift there in front of the altar. First go and be reconciled to them; then come and offer your gift." },
      { id: "DEP5-28", title: "In relation to believers", reference: "Matthew 18:15", text: "\u201cIf your brother or sister sins, go and point out their fault, just between the two of you. If they listen to you, you have won them over." },
      { id: "DEP5-29", title: "In relation to God", reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
      { id: "DEP5-30", title: "In relation to God", reference: "Proverbs 28:13", text: "Whoever conceals their sins does not prosper, but the one who confesses and renounces them finds mercy." },
    ],
  },
  {
    id: "DEP6",
    name: "DEP 242 Pack 6 - Witnessing",
    verses: [
      { id: "DEP6-1", title: "Every Christian", reference: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\u201d" },
      { id: "DEP6-2", title: "Every Christian", reference: "2 Corinthians 5:18-19", text: "All this is from God, who reconciled us to himself through Christ and gave us the ministry of reconciliation: that God was reconciling the world to himself in Christ, not counting people\u2019s sins against them. And he has committed to us the message of reconciliation." },
      { id: "DEP6-3", title: "God's command", reference: "2 Timothy 4:1-2", text: "In the presence of God and of Christ Jesus, who will judge the living and the dead, and in view of his appearing and his kingdom, I give you this charge: Preach the word; be prepared in season and out of season; correct, rebuke and encourage\u2014with great patience and careful instruction." },
      { id: "DEP6-4", title: "Love for the lost", reference: "Luke 19:10", text: "For the Son of Man came to seek and to save the lost.\u201d" },
      { id: "DEP6-5", title: "God's commission", reference: "1 Thessalonians 2:4", text: "On the contrary, we speak as those approved by God to be entrusted with the gospel. We are not trying to please people but God, who tests our hearts." },
      { id: "DEP6-6", title: "Compelling role", reference: "1 Corinthians 9:16", text: "For when I preach the gospel, I cannot boast, since I am compelled to preach. Woe to me if I do not preach the gospel!" },
      { id: "DEP6-7", title: "No preaching, no believing", reference: "Romans 10:14", text: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them?" },
      { id: "DEP6-8", title: "God wants all men to be saved", reference: "1 Timothy 2:3-4", text: "This is good, and pleases God our Savior, who wants all people to be saved and to come to a knowledge of the truth." },
      { id: "DEP6-9", title: "God's great concern for men", reference: "Jonah 4:10-11", text: "But the Lord said, \u201cYou have been concerned about this plant, though you did not tend it or make it grow. It sprang up overnight and died overnight. And should I not have concern for the great city of Nineveh, in which there are more than a hundred and twenty thousand people who cannot tell their right hand from their left\u2014and also many animals?\u201d" },
      { id: "DEP6-10", title: "God rejoices over one sinner's repentance", reference: "Luke 15:7", text: "I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent." },
      { id: "DEP6-11", title: "To have blessed fellowship in the Lord", reference: "1 John 1:3", text: "We proclaim to you what we have seen and heard, so that you also may have fellowship with us. And our fellowship is with the Father and with his Son, Jesus Christ." },
      { id: "DEP6-12", title: "Promise for everlasting glory", reference: "Daniel 12:3", text: "Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever." },
      { id: "DEP6-13", title: "Follow Jesus first", reference: "Matthew 4:19", text: "\u201cCome, follow me,\u201d Jesus said, \u201cand I will send you out to fish for people.\u201d" },
      { id: "DEP6-14", title: "Live a life of good testimony", reference: "Philippians 2:15-16", text: "so that you may become blameless and pure, \u201cchildren of God without fault in a warped and crooked generation.\u201d Then you will shine among them like stars in the sky as you hold firmly to the word of life. And then I will be able to boast on the day of Christ that I did not run or labor in vain." },
      { id: "DEP6-15", title: "Pray for people", reference: "Ephesians 6:19", text: "Pray also for me, that whenever I speak, words may be given me so that I will fearlessly make known the mystery of the gospel," },
      { id: "DEP6-16", title: "Be prepared to answer", reference: "1 Peter 3:15", text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect," },
      { id: "DEP6-17", title: "Share your testimony", reference: "John 4:39", text: "Many of the Samaritans from that town believed in him because of the woman\u2019s testimony, \u201cHe told me everything I ever did.\u201d" },
      { id: "DEP6-18", title: "Believe in the power of the Word", reference: "Hebrews 4:12", text: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart." },
      { id: "DEP6-19", title: "The Word preached never returns in vain", reference: "Isaiah 55:11", text: "so is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it." },
      { id: "DEP6-20", title: "Focus on Jesus Christ when witnessing", reference: "1 Corinthians 1:23-24", text: "but we preach Christ crucified: a stumbling block to Jews and foolishness to Gentiles, but to those whom God has called, both Jews and Greeks, Christ the power of God and the wisdom of God." },
      { id: "DEP6-21", title: "Witness in power and conviction", reference: "1 Thessalonians 1:5", text: "because our gospel came to you not simply with words but also with power, with the Holy Spirit and deep conviction. You know how we lived among you for your sake." },
      { id: "DEP6-22", title: "Help them receive Jesus Christ", reference: "Romans 10:9-10", text: "If you declare with your mouth, \u201cJesus is Lord,\u201d and believe in your heart that God raised him from the dead, you will be saved. For it is with your heart that you believe and are justified, and it is with your mouth that you profess your faith and are saved." },
      { id: "DEP6-23", title: "Encourage them not to delay the decision", reference: "2 Corinthians 6:2", text: "For he says, \u201cIn the time of my favor I heard you, and in the day of salvation I helped you.\u201d I tell you, now is the time of God\u2019s favor, now is the day of salvation." },
      { id: "DEP6-24", title: "Help them be assured of their salvation", reference: "2 Corinthians 13:5", text: "Examine yourselves to see whether you are in the faith; test yourselves. Do you not realize that Christ Jesus is in you\u2014unless, of course, you fail the test?" },
      { id: "DEP6-25", title: "Have an evangelical Bible Study", reference: "Acts 17:2-3", text: "As was his custom, Paul went into the synagogue, and on three Sabbath days he reasoned with them from the Scriptures, explaining and proving that the Messiah had to suffer and rise from the dead. \u201cThis Jesus I am proclaiming to you is the Messiah,\u201d he said." },
      { id: "DEP6-26", title: "Paul", reference: "Acts 20:24", text: "However, I consider my life worth nothing to me; my only aim is to finish the race and complete the task the Lord Jesus has given me\u2014the task of testifying to the good news of God\u2019s grace." },
      { id: "DEP6-27", title: "Philip", reference: "Acts 8:29-30", text: "The Spirit told Philip, \u201cGo to that chariot and stay near it.\u201d Then Philip ran up to the chariot and heard the man reading Isaiah the prophet. \u201cDo you understand what you are reading?\u201d Philip asked." },
      { id: "DEP6-28", title: "Peter and John", reference: "Acts 4:20", text: "As for us, we cannot help speaking about what we have seen and heard.\u201d" },
      { id: "DEP6-29", title: "Created in His own image", reference: "Genesis 1:27", text: "So God created mankind in his own image, in the image of God he created them; male and female he created them." },
      { id: "DEP6-30", title: "Separated from God by our sin", reference: "Isaiah 59:1-2", text: "Surely the arm of the Lord is not too short to save, nor his ear too dull to hear. But your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear." },
      { id: "DEP6-31", title: "Man's condition - Sinner", reference: "Romans 5:12", text: "Therefore, just as sin entered the world through one man, and death through sin, and in this way death came to all people, because all sinned\u2014" },
      { id: "DEP6-32", title: "Man's condition - Sinner", reference: "Romans 3:23", text: "for all have sinned and fall short of the glory of God," },
      { id: "DEP6-33", title: "Man's condition - Judgment", reference: "Hebrews 9:27", text: "Just as people are destined to die once, and after that to face judgment," },
      { id: "DEP6-34", title: "Man's condition - Judgment", reference: "2 Thessalonians 1:8-9", text: "He will punish those who do not know God and do not obey the gospel of our Lord Jesus. They will be punished with everlasting destruction and shut out from the presence of the Lord and from the glory of his might" },
      { id: "DEP6-35", title: "Man's condition - Eternal death", reference: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." },
      { id: "DEP6-36", title: "Man's condition - Eternal death", reference: "Revelation 21:8", text: "But the cowardly, the unbelieving, the vile, the murderers, the sexually immoral, those who practice magic arts, the idolaters and all liars\u2014they will be consigned to the fiery lake of burning sulfur. This is the second death.\u201d" },
      { id: "DEP6-37", title: "Salvation not by ourselves - Works", reference: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith\u2014and this is not from yourselves, it is the gift of God\u2014 not by works, so that no one can boast." },
      { id: "DEP6-38", title: "Salvation not by ourselves - Works", reference: "Galatians 2:21", text: "I do not set aside the grace of God, for if righteousness could be gained through the law, Christ died for nothing!\u201d" },
      { id: "DEP6-39", title: "Salvation not by ourselves - Religion", reference: "Acts 4:12", text: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.\u201d" },
      { id: "DEP6-40", title: "Salvation not by ourselves - Money", reference: "1 Peter 1:18", text: "For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your ancestors," },
      { id: "DEP6-41", title: "Salvation not by ourselves - Miracles and wonders", reference: "1 Corinthians 1:22-23", text: "Jews demand signs and Greeks look for wisdom, but we preach Christ crucified: a stumbling block to Jews and foolishness to Gentiles," },
      { id: "DEP6-42", title: "Salvation not by ourselves - Wisdom", reference: "1 Corinthians 1:21", text: "For since in the wisdom of God the world through its wisdom did not know him, God was pleased through the foolishness of what was preached to save those who believe." },
      { id: "DEP6-43", title: "Salvation not by ourselves - Philosophy and tradition", reference: "Colossians 2:8", text: "See to it that no one takes you captive through hollow and deceptive philosophy, which depends on human tradition and the elemental spiritual forces of this world rather than on Christ." },
      { id: "DEP6-44", title: "Salvation not by ourselves - Natural descent", reference: "John 1:13", text: "children born not of natural descent, nor of human decision or a husband\u2019s will, but born of God." },
      { id: "DEP6-45", title: "Salvation not by ourselves - The flesh counts for nothing", reference: "John 3:6-7", text: "Flesh gives birth to flesh, but the Spirit gives birth to spirit. You should not be surprised at my saying, \u2018You must be born again.\u2019" },
      { id: "DEP6-46", title: "Salvation not by ourselves - The flesh counts for nothing", reference: "John 6:63", text: "The Spirit gives life; the flesh counts for nothing. The words I have spoken to you\u2014they are full of the Spirit and life." },
      { id: "DEP6-47", title: "God's solution - Bridge bringing us to God", reference: "1 Peter 3:18", text: "For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive in the Spirit." },
      { id: "DEP6-48", title: "God's solution - God gave His only begotten Son", reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
      { id: "DEP6-49", title: "God's solution - Jesus died for our sin", reference: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
      { id: "DEP6-50", title: "God's solution - Jesus resurrected", reference: "1 Corinthians 15:3-4", text: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures," },
      { id: "DEP6-51", title: "God's solution - Forgiving us all our sins", reference: "Colossians 2:13", text: "When you were dead in your sins and in the uncircumcision of your flesh, God made you alive with Christ. He forgave us all our sins," },
      { id: "DEP6-52", title: "Man must - hear and believe", reference: "John 5:24", text: "\u201cVery truly I tell you, whoever hears my word and believes him who sent me has eternal life and will not be judged but has crossed over from death to life." },
      { id: "DEP6-53", title: "Man must - Receive Jesus", reference: "John 1:12", text: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God\u2014" },
      { id: "DEP6-54", title: "Man must - Receive Jesus", reference: "Revelation 3:20", text: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me." },
      { id: "DEP6-55", title: "Man must - Pray to receive Jesus", reference: "Romans 10:9-10", text: "If you declare with your mouth, \u201cJesus is Lord,\u201d and believe in your heart that God raised him from the dead, you will be saved. For it is with your heart that you believe and are justified, and it is with your mouth that you profess your faith and are saved." },
    ],
  },
  {
    id: "DEP7",
    name: "DEP 242 Pack 7 - The Lordship of Christ",
    verses: [
      { id: "DEP7-1", title: "The Creator", reference: "John 1:2-3", text: "He was with God in the beginning. Through him all things were made; without him nothing was made that has been made." },
      { id: "DEP7-2", title: "The Lord of all creation", reference: "Colossians 1:16-17", text: "For in him all things were created: things in heaven and on earth, visible and invisible, whether thrones or powers or rulers or authorities; all things have been created through him and for him. He is before all things, and in him all things hold together." },
      { id: "DEP7-3", title: "The head of Church", reference: "Colossians 1:18", text: "And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy." },
      { id: "DEP7-4", title: "Far above all power", reference: "Ephesians 1:21", text: "far above all rule and authority, power and dominion, and every name that is invoked, not only in the present age but also in the one to come." },
      { id: "DEP7-5", title: "The Lord of everyone", reference: "Philippians 2:10-11", text: "that at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord, to the glory of God the Father." },
      { id: "DEP7-6", title: "The Lord of both the dead and the living", reference: "Romans 14:9", text: "For this very reason, Christ died and returned to life so that he might be the Lord of both the dead and the living." },
      { id: "DEP7-7", title: "Bought with Christ's life price", reference: "1 Corinthians 6:19-20", text: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies." },
      { id: "DEP7-8", title: "Make the decision of commitment to the Lordship", reference: "2 Corinthians 5:15", text: "And he died for all, that those who live should no longer live for themselves but for him who died for them and was raised again." },
      { id: "DEP7-9", title: "Satisfying all our needs", reference: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
      { id: "DEP7-10", title: "Abundant reward", reference: "Mark 10:29-30", text: "\u201cTruly I tell you,\u201d Jesus replied, \u201cno one who has left home or brothers or sisters or mother or father or children or fields for me and the gospel will fail to receive a hundred times as much in this present age: homes, brothers, sisters, mothers, children and fields\u2014along with persecutions\u2014and in the age to come eternal life." },
      { id: "DEP7-11", title: "Giving His promise", reference: "Genesis 22:16-17", text: "and said, \u201cI swear by myself, declares the Lord, that because you have done this and have not withheld your son, your only son, I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore. Your descendants will take possession of the cities of their enemies," },
      { id: "DEP7-12", title: "Accompanying us", reference: "1 Chronicles 28:9", text: "\u201cAnd you, my son Solomon, acknowledge the God of your father, and serve him with wholehearted devotion and with a willing mind, for the Lord searches every heart and understands every desire and every thought. If you seek him, he will be found by you; but if you forsake him, he will reject you forever." },
      { id: "DEP7-13", title: "Giving His power", reference: "2 Chronicles 16:9", text: "For the eyes of the Lord range throughout the earth to strengthen those whose hearts are fully committed to him. You have done a foolish thing, and from now on you will be at war.\u201d" },
      { id: "DEP7-14", title: "Protecting us", reference: "Psalm 91:14", text: "\u201cBecause he loves me,\u201d says the Lord, \u201cI will rescue him; I will protect him, for he acknowledges my name." },
      { id: "DEP7-15", title: "Honoring us", reference: "1 Samuel 2:30", text: "\u201cTherefore the Lord, the God of Israel, declares: \u2018I promised that members of your family would minister before me forever.\u2019 But now the Lord declares: \u2018Far be it from me! Those who honor me I will honor, but those who despise me will be disdained." },
      { id: "DEP7-16", title: "Self", reference: "Luke 9:23", text: "Then he said to them all: \u201cWhoever wants to be my disciple must deny themselves and take up their cross daily and follow me." },
      { id: "DEP7-17", title: "Relationship with others", reference: "Proverbs 16:7", text: "When the Lord takes pleasure in anyone\u2019s way, he causes their enemies to make peace with them." },
      { id: "DEP7-18", title: "Life paths", reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
      { id: "DEP7-19", title: "Worldly desires", reference: "Ephesians 4:22-24", text: "You were taught, with regard to your former way of life, to put off your old self, which is being corrupted by its deceitful desires; to be made new in the attitude of your minds; and to put on the new self, created to be like God in true righteousness and holiness." },
      { id: "DEP7-20", title: "Lusts", reference: "2 Timothy 2:22", text: "Flee the evil desires of youth and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart." },
      { id: "DEP7-21", title: "Possessions", reference: "1 Timothy 6:7-9", text: "For we brought nothing into the world, and we can take nothing out of it. But if we have food and clothing, we will be content with that. Those who want to get rich fall into temptation and a trap and into many foolish and harmful desires that plunge people into ruin and destruction." },
      { id: "DEP7-22", title: "Time managing", reference: "Ephesians 5:15-16", text: "Be very careful, then, how you live\u2014not as unwise but as wise, making the most of every opportunity, because the days are evil." },
      { id: "DEP7-23", title: "God's calling", reference: "Mark 1:20", text: "Without delay he called them, and they left their father Zebedee in the boat with the hired men and followed him." },
      { id: "DEP7-24", title: "Paul", reference: "Philippians 1:20", text: "I eagerly expect and hope that I will in no way be ashamed, but will have sufficient courage so that now as always Christ will be exalted in my body, whether by life or by death." },
      { id: "DEP7-25", title: "Timothy", reference: "Philippians 2:21-22", text: "For everyone looks out for their own interests, not those of Jesus Christ. But you know that Timothy has proved himself, because as a son with his father he has served with me in the work of the gospel." },
      { id: "DEP7-26", title: "Our faith fathers", reference: "Hebrews 11:36-38", text: "Some faced jeers and flogging, and even chains and imprisonment. They were put to death by stoning; they were sawed in two; they were killed by the sword. They went about in sheepskins and goatskins, destitute, persecuted and mistreated\u2014 the world was not worthy of them. They wandered in deserts and mountains, living in caves and in holes in the ground." },
    ],
  },
  {
    id: "DEP8",
    name: "DEP 242 Pack 8 - World Vision",
    verses: [
      { id: "DEP8-1", title: "God's concern and promise for the world", reference: "Genesis 12:2-3", text: "\u201cI will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing. I will bless those who bless you, and whoever curses you I will curse; and all peoples on earth will be blessed through you.\u201d" },
      { id: "DEP8-2", title: "God's concern and promise for the world", reference: "Isaiah 49:6", text: "he says: \u201cIt is too small a thing for you to be my servant to restore the tribes of Jacob and bring back those of Israel I have kept. I will also make you a light for the Gentiles, that my salvation may reach to the ends of the earth.\u201d" },
      { id: "DEP8-3", title: "Great Commission", reference: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.\u201d" },
      { id: "DEP8-4", title: "Great Commission", reference: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.\u201d" },
      { id: "DEP8-5", title: "Commit yourself to the mission", reference: "Isaiah 6:8", text: "Then I heard the voice of the Lord saying, \u201cWhom shall I send? And who will go for us?\u201d And I said, \u201cHere am I. Send me!\u201d" },
      { id: "DEP8-6", title: "Commit yourself to the mission", reference: "Romans 15:16", text: "to be a minister of Christ Jesus to the Gentiles. He gave me the priestly duty of proclaiming the gospel of God, so that the Gentiles might become an offering acceptable to God, sanctified by the Holy Spirit." },
      { id: "DEP8-7", title: "Pray for the world", reference: "Psalm 2:8", text: "Ask me, and I will make the nations your inheritance, the ends of the earth your possession." },
      { id: "DEP8-8", title: "Pray for the world", reference: "Psalm 57:5", text: "Be exalted, O God, above the heavens; let your glory be over all the earth." },
      { id: "DEP8-9", title: "Preach the gospel", reference: "Titus 1:2-3", text: "in the hope of eternal life, which God, who does not lie, promised before the beginning of time, and which now at his appointed season he has brought to light through the preaching entrusted to me by the command of God our Savior," },
      { id: "DEP8-10", title: "Preach the gospel", reference: "2 Timothy 4:17", text: "But the Lord stood at my side and gave me strength, so that through me the message might be fully proclaimed and all the Gentiles might hear it. And I was delivered from the lion\u2019s mouth." },
      { id: "DEP8-11", title: "Help them grow in Christ", reference: "Colossians 1:28-29", text: "He is the one we proclaim, admonishing and teaching everyone with all wisdom, so that we may present everyone fully mature in Christ. To this end I strenuously contend with all the energy Christ so powerfully works in me." },
      { id: "DEP8-12", title: "Help them grow in Christ", reference: "Philippians 1:9-11", text: "And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ\u2014to the glory and praise of God." },
      { id: "DEP8-13", title: "Spiritual Multiplication", reference: "2 Timothy 2:2", text: "And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others." },
      { id: "DEP8-14", title: "Spiritual Multiplication", reference: "Isaiah 60:22", text: "The least of you will become a thousand, the smallest a mighty nation. I am the Lord; in its time I will do this swiftly.\u201d" },
      { id: "DEP8-15", title: "Live a simple and wholehearted life", reference: "Hebrews 12:1", text: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us," },
      { id: "DEP8-16", title: "Live a simple and wholehearted life", reference: "2 Chronicles 16:9", text: "For the eyes of the Lord range throughout the earth to strengthen those whose hearts are fully committed to him. You have done a foolish thing, and from now on you will be at war.\u201d" },
      { id: "DEP8-17", title: "Glory of the mission finish", reference: "Habakkuk 2:14", text: "For the earth will be filled with the knowledge of the glory of the Lord as the waters cover the sea." },
      { id: "DEP8-18", title: "Glory of the mission finish", reference: "Malachi 1:11", text: "My name will be great among the nations, from where the sun rises to where it sets. In every place incense and pure offerings will be brought to me, because my name will be great among the nations,\u201d says the Lord Almighty." },
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
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const currentIndex = current && pack ? pack.verses.findIndex((v) => v.id === current.id) : -1;

  const navigateCard = (idx) => {
    if (!pack || idx < 0 || idx >= pack.verses.length) return;
    startQuiz(pack.verses[idx]);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // Only trigger if horizontal swipe dominates (avoid scroll interference)
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) navigateCard(currentIndex + 1); // swipe left → next
    else navigateCard(currentIndex - 1);         // swipe right → prev
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
      <div style={{ maxWidth: 680, margin: "0 auto", padding: current ? "16px 14px 100px" : "32px 16px 48px", boxSizing: "border-box" }}
        onTouchStart={current ? handleTouchStart : undefined}
        onTouchEnd={current ? handleTouchEnd : undefined}
      >
        {!current && (
          <header style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: gold, fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>
              TMS (A–E) + DEP 242 · NIV
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
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PACKS.map((p) => {
                const done = masteredInPack(p);
                const complete = done === p.verses.length;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPack(p)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      padding: "18px 22px",
                      background: "#fff",
                      border: `1px solid ${complete ? sage : "#e3ddd0"}`,
                      borderLeft: `4px solid ${complete ? sage : gold}`,
                      borderRadius: 8,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 17,
                      color: ink,
                      textAlign: "left",
                    }}
                  >
                    <span>{p.name}</span>
                    <span style={{ fontSize: 13, fontFamily: "system-ui, sans-serif", color: complete ? sage : "#b6ad9b", whiteSpace: "nowrap" }}>
                      {done}/{p.verses.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : !current ? (
          /* ── Verse list ── */
          <div>
            {backLink("All packs", () => setPack(null))}
            <h2 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 16px" }}>{pack.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pack.verses.map((v) => (
                <button
                  key={v.id}
                  onClick={() => startQuiz(v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "15px 20px",
                    background: "#fff",
                    border: `1px solid ${mastered[v.id] ? sage : "#e3ddd0"}`,
                    borderLeft: `4px solid ${mastered[v.id] ? sage : gold}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 17,
                    color: ink,
                    textAlign: "left",
                  }}
                >
                  <span>{v.reference}</span>
                  <span style={{ fontSize: 13, fontFamily: "system-ui, sans-serif", color: mastered[v.id] ? sage : "#b6ad9b", whiteSpace: "nowrap" }}>
                    {mastered[v.id] ? "✓ Mastered" : "Practice"}
                  </span>
                </button>
              ))}
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
            ) : (
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
            {/* ── Carousel ── */}
            <div style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: paper,
              borderTop: "1px solid #e3ddd0",
              padding: "10px 14px 14px",
              zIndex: 100,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                maxWidth: 680,
                margin: "0 auto",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                paddingBottom: 2,
              }}>
                {pack.verses.map((v, i) => {
                  const isActive = i === currentIndex;
                  const isMastered = mastered[v.id];
                  return (
                    <button
                      key={v.id}
                      onClick={() => navigateCard(i)}
                      title={v.reference}
                      style={{
                        flexShrink: 0,
                        width: isActive ? 28 : 10,
                        height: 10,
                        borderRadius: 5,
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "width 0.2s ease, background 0.2s ease",
                        background: isActive ? ink : isMastered ? sage : "#ccc5b3",
                      }}
                    />
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
