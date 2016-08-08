/**
* Global service that distribute texts for dialogs.
* Texts are indexed by actor's names. Each actor has a set of regular dialogs, and angry dialogs.
*/
class DialogsVendor {
  _dialogs: Object;
  _angryDialogs: Object;
  constructor() {
    this._dialogs = {};
    this._angryDialogs = {};
  }

  /** Add new dialogs
  * @param key [string] : actor name
  * @param texts [array] : set of dialogs
  * @param angry [boolean] : define if those dialogs are angry dialogs or regulare dialogs
  */
  addTexts(key: string, texts: Array<Array<{text: string, speed?: number}>>, angry:boolean = false) {
    if (!angry)
      this._dialogs[key] = texts;
    else
      this._angryDialogs[key] = texts;
  }

  /** Obtain actor's dialogs */
  getTexts(key: string)  {
    return this._dialogs[key] || [];
  }
  /** Obtain actor's angry dialogs */
  getAngryTexts(key: string) {
    return this._angryDialogs[key] || [];
  }
}
const dialogsVendor = new DialogsVendor();

// ------------------
// Angler
// ------------------
const ANGLERFISH_DIALOGS = [
  [
    {text: 
`C... Am... F... G...`, speed: 150},
    {text: 
`Sorry, I'm rehearsing a tough piece I'm
working on.`},
    {text: 
`It starts in 4/4, but ends up being
actually 3/4.`},
    {text: 
`And while you think it's only made of
dissonances, it actually makes
perfect sense on a global scale.`},
    {text: 
`I really love this composer.
Too bad she died after two albums.`},
    {text: 
`But I guess you don't really care about
jazz.`}
  ],
  [
    {text: 
`I started playing bass three years ago.`},
    {text: 
`They told me I couldn't. But I just love
this instrument. I wanted to try.`},
    {text: 
`True, it was difficult. But now I think
I'm not doing too bad.`},
    {text: 
`Like, I've been in some jam, and it seemed
to go pretty well?`},
    {text: 
`Anyway, I don't care if people like what
I'm playing or not. I just enjoy it.`},
    {text: 
`In a way, bass is how I express myself.`}
  ],
  [
    {text: 
`You know, I would like to become a
professional bass player.`},
    {text: 
`I know it requires hard studies, but...
I'm ready for it.`},
    {text: 
`My mum might disagree though. She doesn't
like me playing music.`},
    {text: 
`She says that it's not what angler fishes
do.`},
    {text: 
`She would prefer me to hunt, or something.
Dude, I'm vegan!`},
    {text: 
`So I don't know. I wish I could follow
my dreams, but I still love my family.`},
    {text: 
`I don't want to lose them. But do I have
to make a choice here?`}
  ],
  [
    {text: 
`I... I think I should talk to her. Maybe
she'll understand.`},
    {text: 
`You know, I feel relieved. Thanks for
listening to my rant.`},
    {text: 
`Hey, since you kinda helped me, let me
give you something!`},
    {text: 
`You can play a random note by pressing B.`},
    {text: 
`It's... An angler fish thing.`}
  ],
  [
    {text: 
`I'm confident now!`},
    {text: 
`Aha, no, not really. But I might be...
Less afraid?`},
    {text: 
`I don't know...`, speed:100},
    {text: 
`You're a great listener.
Maybe TOO great.`}
  ],
  [
    {text: 
`Run away before I tell you all my youth!`}
  ]
];
dialogsVendor.addTexts('AnglerFish', ANGLERFISH_DIALOGS);
const ANGLER_ANGRY = [
  [
    {text: 'Please, go attack someone else…'},
    {text: `I don't want to talk to you…`}
  ]
];
dialogsVendor.addTexts('AnglerFish', ANGLER_ANGRY, true);

// ---------------------------------
// Clown fish
// ---------------------------------
const CLOWNFISH_DIALOG = [
  [
    {text: 
`YARR! I'm Captain Fire Scale, the most
feared pirate in all seas!`},
    {text: 
`And you're... You're... SHARP TEETH!
My loyal second in command.`},
    {text: 
`We're sailing to the Very Deep Seas
of Death.
No! The Death Depths!`},
    {text: 
`To find... a legendary treasure!`},
    {text: 
`It's a doomed treasure! Protected by
skeletons and tentacles.`},
    {text: 
`And, like, if you touch it, you have a
curse. That makes you dying forever!`},
    {text: 
`But we'll still go get it, 'cause we're
pirates. And I'm Captain Fire Scale!
YAARRRR!`}
  ],
  [
    {text: 
`WATCH OUT! This skeleton has a gun!`},
    {text: 
`BANG, You're dead.`, speed: 20},
    {text: 
`But I resurrect you with my magical
Orb of Pirate.`},
    {text: 
`Now you can kill the skeleton.`},
    {text: 
`But the skeleton was just afraid, and
wanted to make friends.`},
    {text: 
`So we spare it.`},
    {text: 
`BUT`, speed: 0},
    {text: 
`We steal its rupee eyes.
Because we're pirates!`}
  ],
  [
    {text: 
`It's a storm! AAAAAHHH!`},
    {text: 
`The current is too strong. We can't go
deeper!`},
    {text: 
`Quick, flip the ship 360 degrees!`},
    {text: 
`DO AS I SAY!`, speed: 20},
    {text: 
`Now I use my sword to cut the current
in half!`},
    {text: 
`Look! We're gaining momentum!
Hurray!`}
  ],
  [
    {text: 
`The treasure! It's ours! YAAAAY!`},
    {text: 
`WAIT! Don't touch it!`},
    {text: 
`The curse would make us crazy. This
treasure isn't meant to be found.`},
    {text: 
`It's keeping fallen gods asleep, from
dimensions far beneath our own…`},
    {text: 
`None shall even look at it.
But it's our terrible fate.`},
    {text: 
`I must avenge my family, and the only way
is to give up my sanity, and my soul.`},
    {text: 
`Don't follow me. You already helped me
getting here. Now it's between Captain
Fire Scale and Piracy.`},
    {text: 
`As you swim back up, you see me
disappearing in the darkness below.`},
    {text: 
`...`, speed: 300},
    {text: 
`Then we win. The end!`}
  ],
  [
    {text: 
`You've been a great companion!
Here, let me give you a power.`},
    {text: 
`Alaka... Pirate-ZAM!
You are now invulnerable to walls!`},
    {text:
`You don't have to do anything to
activate that power. It's on you.
Like a curse.`
},
    {text: 
`A PIRATE CURSE!`},
    {text: 
`It will be our super pirate friends
secret!`},
    {text: 
`YARR!`}
  ],
  [
    {text: 
`Tomorrow, we'll go to the Planet of Space
Pirates.`},
    {text: 
`They have skeletons that shoot lasers!`},
    {text: 
`But first, we'll need an airship to get
out of the water, then out of the
atmosphere!`},
    {text: 
`With you on my side, we can't fail! YARR!`}
  ]
];
dialogsVendor.addTexts('ClownFish', CLOWNFISH_DIALOG);
const CLOWN_ANGRY = [
  [
    {text: 'LEAVE ME ALONE!'},
  ],
  [
    {text: 'SOMEBODY HELP!'},
  ]
];
dialogsVendor.addTexts('ClownFish', CLOWN_ANGRY, true);

/* -----------------------
Crab
--------------------------- */
const CRAB_DIALOGS = [
  [
    {text: 
`Look at them.
Look. at. them.`},
    {text: 
`Swimming, wandering, like nothing ever
matters.`},
    {text: 
`Meanwhile, our water get polluted, entire
species go extinct, but WHO CARES!`},
    {text: 
`Sure, let's do nothing about it. Brillant.
Urgh.`},
    {text: 
`Does anyone read the news? Do they think
before voting?`},
    {text: 
`Sea creatures are idiots. Let them die.`}
  ],
  [
    {text: 
`WHY IS EVERYTHING SO COLD HERE!?`},
    {text: 
`Of all the places to make a school, they
chose one where we barely get sun rays!`},
    {text: 
`Oh, but poor little fishies need their
very cold water!`},
    {text: 
`Lies. None of it makes sense.`},
    {text: 
`It's once again designed to piss me off.
There's the truth.`},
  ],
  [
    {text: 
`They couldn't make practicable areas for
crabs? Ramps, elevators?`},
    {text: 
`Look! I'm litterally stuck in that hole!`},
    {text: 
`Not that I want to go to the lame waters
below anyway. But that's irrelevant!`},
    {text: 
`This school sucks. I can't even get any
signal. Why do they still forbid phones!?`},
    {text: 
`Stupid rules, stupid teachers, stupid
architecture... Yay for education!`}
  ],
  [
    {text: 
`The first thing I've learnt here is that
if you don't want to be bullied, you have
to bully yourself.`},
    {text: 
`But I don't want to bully! It's stupid.
I don't like to be mean.`},
    {text: 
`I think people already hurt themself
enough. I don't want to be part of that
ugly party.`},
    {text: 
`So the ultimate solution was to isolate
myself. Nobody likes me, but I don't
like them either. So there.`,},
    {text: 
`I don't cause trouble, and no-one
bothers me. Fine!`},
    {text: 
`Hopefully I'll leave this dumb place
before dying of boredom.`}
  ],
  [
    {text: 
`Well, at least you understand me.`},
    {text: 
`I'm surprised you haven't ditched me
already. Maybe you're different.`},
    {text: 
`Say, do you want to see how terrible
this place can be? It's simple.`,},
    {text: 
`You just have to fall to the ground
and see how gravity is fun.`,},
    {text: 
`The way to do that is:`},
    {text: 
`to believe!`, speed: 200},
    {text: 
`... and press G.`}
  ],
  [
    {text: 
`It's pretty annoying, right?`},
    {text: 
`Eh, you still have sweet moves.
Have you tried to moonwalk?`},
    {text: 
`Yet our sport teacher is still
convinced I'm a bad dancer. Shame
on them!`},
    {text: 
`I hate dancing anyway. It's so lame,
right?`}
  ]
];
dialogsVendor.addTexts('Crab', CRAB_DIALOGS);
const CRAB_ANGRY = [
  [
    {text: 
`Let me guess: you gonna eat me as well.`},
    {text: 'Typical.'},
  ],
  [
    {text: 'Go away, jerk.'},
  ]
];
dialogsVendor.addTexts('Crab', CRAB_ANGRY, true);

/*-----------------------------
Betta Fish
-------------------------------*/
const BETTA_DIALOGS = [
  [
    {text: 
`Look at the sexy little shark we've got
there!`},
    {text: 
`My my, you're simply fabulous sweetie.
What are your secrets?`},
    {text: 
`Don't look at me like that! I really think
you can be proud of your style.`},
    {text: 
`It would be a shame not to use it, trust
me.`},
    {text: 
`Turn around so that I can get a better
look!`}
  ],
  [
    {text: 
`Mmm, I say... It's not quite that.`},
    {text: 
`See, you have naturally great colors and
allure. But you don't work them!`},
    {text: 
`You think negligences make you cool,
don't you? Well it doesn't!`},
    {text: 
`Apparence is a constant effort! Beauty
comes from a combination of nature and
creativity.`},
    {text: 
`“Oh, but you're born pretty, so it's easier
for you!” WRONG!`},
    {text: 
`My look is a daily task. It's the result
of application and constant searches.`},
    {text: 
`Everyone has something visually special to
offer. And YOU decided to keep it for
nobody! Shame.`}
  ],
  [
    {text: 
`It's easy, really. You could shine!`},
    {text: 
`Look, I use a special cream for my scales...
I know you don't have scales, but you
could try it.`},
    {text: 
`It might emphasize your skin. Your soft,
beautiful skin...`},
    {text: 
`You also have a tin! Do something with
that. Everybody loves shark tins.`},
    {text: 
`And clean your tail! I know you can't see
it, but... Yurk!`}
  ],
  [
    {text: 
`Your colors! Why don't you make something
out of them? You have so much wasted
potential!`},
    {text: 
`Have you thought of wearing something?
You know tissue is getting pretty in.`},
    {text: 
`You could become a star! People would
admire you, and see all the hidden beauty
that I'm seeing right now!`},
    {text: 
`Would you like that? Be loved?
Successful? Famous?`},
    {text: 
`... Would you?`},
    {text: 
`...`, speed: 250},
  ],
  [
    {text: 
`The more I look at you, the more I get
inspiration.`},
    {text: 
`But by helping you perfecting yourself,
I fear I might... deform you.`},
    {text: 
`Your beauty comes from who you are.
Altering it with my ideas would destroy it.`},
    {text: 
`So... You should be yourself, I guess.
`},
    {text: 
`Only I will ever see the gem that you have.
But you know? I'm starting to like that
idea.`},
    {text: 
`Sorry for my remarks. I was just trying to
help, honest.
`},
    {text: 
`Here, I can at least offer you this
accessory. Just as a gift.`},
    {text: 
`You can wear it by pressing A. Only
if you want to!`},
    {text: 
`... In the end, I guess you were kind of
right: negligences do make you pretty!`},
    {text: 
`Still though, clean up that tail.
Seriously.`}
  ],
  [
    {text: 
`Tried it? Of course it suits you!
Who do you think I am?`,},
    {text: 
`Again, wear it only if you like it.`,},
    {text: 
`(psst, you should seriously keep it on)`, speed: 100},
    {text: 
`Nah, just kidding. Do as you want.`},
    {text: 
`(or am I?)`, speed: 150}
  ],
];
dialogsVendor.addTexts('BettaFish', BETTA_DIALOGS);

const BETTA_ANGRY = [
  [
    {text: `Oh my! Is it my turn now?`},
    {text: `Fine, I guess my time has come!`}
  ],
  [
    {text:`ADIEU, world!
I shall embrace my fate with dignity.`}
  ]
];
dialogsVendor.addTexts('BettaFish', BETTA_ANGRY, true);

// ---------------
// Tang
// ---------------
const HIPPOTANG_DIALOGS = [
  [
    {text: 
`Meh, this sea is boring.`},
    {text: 
`Sure, it's nice. There's all the comfort
you need, and lots of folks.`},
    {text: 
`But have you seen Pacific? Dude, that's
something!`},
    {text: 
`The natural seascape is astonishing.
There's so much more than a big blue!`},
    {text: 
`And sure it can be hostile. But that's why
I like it! That place is exciting!`},
    {text: 
`You wouldn't believe the creatures I've
witness. Plus, the culture there is really
special.`},
    {text: 
`There are some weird traditions, I tell
you. Some people jump out of water
strictly twice a day. They say it's healthy.`},
    {text: 
`I tried it here, but it's not the same.`}
  ],
  [
    {text: 
`North Pole is creepy. And tough.`},
    {text: 
`But it sure is stimulating.
Once you tasted water that cold, you can
go anywhere!`},
    {text: 
`At some point, the low temperature gets
to your mind. I got those hallucinations,
I tell you!`},
    {text: 
`I am still not sure what was dreams,
and what wasn't. Everything is so messed
up there!`},
    {text: 
`It's the only place where I haven't seen
anyone. Couldn't approach any living
creature.`},
    {text: 
`You feel more and more alone, as
everything around you looks dead...`},
    {text:
`Your only companions are the silence, the
solitude, the cold, the madness...`},
    {text: 
`It's awesome!`}
  ],
  [
    {text: 
`Next holidays, I'll go where I usually go:`},
    {text: 
`TO THE UNKNOWN!`, speed: 150},
    {text: 
`I swim in a random direction, get a lift
with anyone who accepts, and I let water
chose my destination.`},
    {text: 
`It's the ultimate way to travel.
Unpredictable and dangerous!`},
    {text: 
`For all the boring stuff you see, there's
as much epic discoveries!`},
    {text: 
`Did you know there are reversed mountains
that can be visited? Or a museum of
corals?`},
    {text: 
`I've seen them. And it was epic!`},
    {text: 
`Now? I guess I'm waiting for the next epic
adventure.`}
  ],
  [
    {text: 
`Technically, this is my home.
I've got family, school, ID card…`},
    {text: 
`But I feel distant about all that.
It's past, I don't really need it anymore.`},
    {text: 
`After my studies, I don't think I want to
come back here.`},
    {text: 
`I'm not sure “home” means anything to me
anymore.`},
    {text: 
`I get bored. I don't like comfort.
I'm always hungry for new experiences.`},
    {text: 
`And as cool as they are, I'm still searching
for one that would resonate with me.`},
    {text: 
`I mean, sure, you get to live to experience
the most stuff, but...`},
    {text: 
`Am I just an empty box that can only
passively observe?`}
  ],
  [
    {text: 
`For each place I have visited, I have fond
memories of the people I've met.`},
    {text: 
`Is there a place that makes them
remember me?`},
    {text: 
`I've seen so much cool things around the
world, I would like to create my own...
coolness...`},
    {text: 
`A home not only for me, but also to
other travelers who want to discover...
who I am?`},
    {text: 
`You sure would be welcome! You seem
to enjoy adventure!`},
    {text: 
`I tell you, there's a secret to better
appreciate your surroundings.`},
    {text: 
`Press D, and you will see the world
with a whole new perspective!`,},
    {text: 
`Or, at least, that will make you giggle
a little.`}
  ],
  [
    {text: 
`You know where I've never been?`},
    {text: 
`An AQUARIUM!`, speed: 20},
    {text: 
`That would be a terrible idea.
So let's not dream too much of it.`},
    {text: 
`Hey! Why not go to a fishing pond instead?`},
    {text: 
`... Actually, it would be fun with you
around. Those fishmen don't know how
brutal a shark can be!`}
  ]
];
dialogsVendor.addTexts('HippoTang', HIPPOTANG_DIALOGS);

const TANG_ANGRY = [
  [
    {text: `Hey, what do you want?
I've done nothing to you!`},
  ],
  [
    {text: `Don't approach me!`}
  ]
];
dialogsVendor.addTexts('HippoTang', TANG_ANGRY, true);


/* ----------------------
* Seahorse
--------------------------*/
const SEAHORSE_DIALOGS = [
  [
    {text: 
`Have you heard the thing about Giles?`},
    {text: 
`Like, I knew he liked weird shows, but
zombie octopuses? Ga-ross!!`},
    {text: 
`That would explain that one time I saw him
with a starfish plushie. Where does he
even buy that kind of toy!?`},
    {text: 
`I'm sure it's because he sees Scally.
Everyone knows she's attracted by eels.`},
    {text: 
`They pretend not to know each other. But
trust me, they have a serious
relationship!`},
    {text: 
`You do see who I'm talking about, right?`}
  ],
  [
    {text: 
`See that clown fish next to us?`},
    {text: 
`Naaaah, the little one, that swim just a
bit faster.`},
    {text: 
`She has dead parents.`, speed: 100},
    {text: 
`I don't mean she's an orphan.
What I'm saying is that her mother and
father are dead people.`},
    {text: 
`That are still able to swim, breath,
and raise her.`},
    {text: 
`I know it's weird and scientifically
incorrect! Aren't you talking with a
seahorse anyway?`},
    {text: 
`Trust me, I've seen crazier secrets around
them. They can't hide anything from me.`}
  ],
  [
    {text: 
`O`, speed: 0},
    {text: 
`OM`, speed: 0},
    {text: 
`OMG`, speed: 0},
    {text: 
`Nepdan and Gullydia will break up this
afternoon!`},
    {text: 
`It's not a guess. I had confirmation from
my investigator.`},
    {text: 
`After so long, such a beautiful couple...
Too sad.`},
    {text: 
`None of them know yet.`},
    {text: 
`What? Time travel you say?
No, silly, just social science!`},
    {text: 
`Look, it makes no doubt.
I'm never wrong on that.`}
  ],
  [
    {text: 
`If I know everything about you as well?
Well of course I do!`},
    {text: 
`Even more than you do, I would say.`},
    {text: 
`No, I don't want to prove my point.
It would be just rude. I have principles.`},
    {text: 
`Am I telling everyone your personal issues
when you're not around?`},
    {text: 
`Why, yes!`}
  ],
  [
    {text: 
`You look a little bit angry. Am I wrong?`},
    {text: 
`Look, there are obviously parts of your
life that I don't know. I'm not an oracle!`},
    {text: 
`You can have your private life. I won't
steal you that.`},
    {text: 
`Everything else you do outside?
People will see. So they will know.`},
    {text: 
`Maybe I'm not right. You still listened to
my gossips though, didn't you?`},
    {text: 
`Heeey, don't be mad! I actually think
you have a point.`},
    {text: 
`I should talk more about myself, or
things that I like, rather than make
judgements of other people.`},
    {text:
`So, what do I like?`},
    {text: 
`... Well I like secrets.`, speed: 70},
    {text: 
`And people listening to them.
Just like you.`},
    {text: 
`Okay, at least I could try not to hurt
people. Fair.`},
    {text: 
`Say, do you wonder how I know so much
about everyone around here?`},
    {text: 
`I have my own little secret for that...`, speed: 100},
    {text: 
`I press T.`, speed: 20},
    {text: 
`Okay, it's not my only method obviously.
But it's very helpful.`}
  ],
  [
    {text: 
`Caroil was talking yesterday with...
Oh, right.`},
    {text: 
`Hum, I... ate some eggs... This morning.`},
    {text: 
`'t was great.`},
    {text: 
`You make that hard, you know?`}
  ],
  [
    {text: 
`Did you know that Klammer was working on
an album? You should totally check it out!`},
    {text: 
`Ok, that's a lie. But I think it's the
kind of information I should spread.`},
    {text:
`The album, I mean.
Not... lies...`}
  ]
];
dialogsVendor.addTexts('Seahorse', SEAHORSE_DIALOGS);

const SEAHORSE_ANGRY = [
  [
    {text:
`I know what you've done!
You're a monster!`}
  ]
];
dialogsVendor.addTexts('Seahorse', SEAHORSE_ANGRY, true);

/* -----------------------------------
 * Salmon
 * ------------------------------ */
const SALMON_DIALOGS = [
  [
    {text: 
`Can't talk. I'm swimming.`},
    {text: 
`I gotta train hard if I want to win
tomorrow's competition.`},
    {text: 
`I already have perfected a great technique
to gain speed, but I still have endurance
issues.`},
    {text: 
`I might not be able to keep up the whole
race if I don't exercise enough.`},
    {text: 
`...`, speed: 150},
    {text: 
`Wait, WHY AM I STILL TALKING!?`, speed: 40}
  ],
  [
    {text: 
`Actually it's unlikely I lose the competion.`},
    {text: 
`I've been champion for years, so...
I'm pretty confident. Insecurities are not
my thing.`},
    {text: 
`But nothing is never acquired, you know!
You gotta improve yourself constantly!`},
    {text: 
`If I just sit and let go, I know I'll lose
my abilities very quickly.`},
    {text: 
`It's how you keep a healthy life, kid!
Always try to get better at what you do.`},
    {text: 
`And to become the best!`},
    {text: 
`Nothing is impossible if you try.`},
    {text:
`And all that stuff. Yep.`}
  ],
  [
    {text: 
`The secret of sport is not only good
training.`},,
    {text: 
`A balanced nutrition is also important
to stay in shape!`},
    {text: 
`You can't just eat plaktons every day.
Even if you stay thin. Your body will
quickly get exhausted.`},
    {text: 
`Plants are necessary to remain a good
(and happy) athlete!`},
    {text: 
`Wait, you're a shark.`},
    {text: 
`I don't know anything about shark diet.
You'll have to look it up yourself, sorry.`}
  ],
  [
    {text: 
`It's great to be sportfish, but don't
forget that sport isn't everything!`},
    {text: 
`A lot of people believe that doing sports
allows them to give obnoxious lessons
to everyone.`},
    {text: 
`Sometime they feel superior just because
they exercise. Which is silly of course.`},
    {text: 
`You shouldn't laugh at fishes or harrass
them just because they don't like sports!`},
    {text: 
`I think it's okay not to enjoy physical
exercise.`},
    {text: 
`Some fishes will forget common sense
just to have the healthiest life style.`},
    {text: 
`Actually, pushing yourself too hard can be
really dangerous!`},
    {text: 
`Most of all, you have to know your limits.`},
    {text: 
`And stop lecturing anyone who just want
to have a friendly chat.`},
    {text: 
`Am I right?`}
  ],
  [
    {text: 
`Woops! Sorry. I have a tendancy to turn my
brain off while I exercise.`},,
    {text: 
`So I might have been a little bit
nonsensical there.`},
    {text: 
`Not sure if you're here to listen to me
or to watch me running.`},
    {text: 
`Anyway, I take that as encouragments!
Thanks!`},
    {text: 
`If you want to be good at swimming, here's
a REAL advice:`},
    {text: 
`Stop your respiration, quickly fold up
your tins, and use the water to gain
velocity.`},
    {text: 
`All while pushing Shift. To, well, keep your
momentum.`},
    {text: 
`I know you can do it!`}
  ],
  [
    {text: 
`Look at me, I think I have beaten
my record!`},,
    {text: 
`We'll se tomorrow how it'll go.
I'll still exercise a little more.`},
    {text: 
`I actually should take a break.
But I like to take some risks.`},
    {text: 
`Do as I say, not as I do.`}
  ], [
    {text: 
`...`},
    {text: 
`...`},
    {text: 
`...`},
    {text: 
`I'm too exhausted.
I LITTERALY can't talk right now.`}
]];
dialogsVendor.addTexts('Salmon', SALMON_DIALOGS);

const SALMON_ANGRY = [
  [
    {text: 
`Go away, looser!`}
  ]
];
dialogsVendor.addTexts('Salmon', SALMON_ANGRY, true);

/* ----------------------------
 * Jellyfish
 *--------------------------------- */
const JELLYFISH_DIALOGS = [
  [
    {text: 
`So, let me summarize: we're all in a
school for fishes.`},
    {text: 
`Different species, all talking
the same idiom, taking lessons in a
subaquatic institute.`},
    {text: 
`And while we're surrounded by
only rocks and water, we know concepts
like the Internet and music.`},
    {text: 
`Am I the only one who find this
suspicious?`},
    {text: 
`LIES.`},
    {text: 
`All of it.`}
  ],
  [
    {text: 
`The Whales`, speed: 100},
    {text: 
`I read several articles online about them.
They are not what they seem.`},
    {text: 
`They are watching us. And make sure we
follow the Great Path.`},
    {text: 
`They have secret knowledges. Like
reincarnation or eternal life.`},
    {text: 
`All the evidences are there. We just don't
want to see it. It's too big for us.`},
    {text: 
`Pun not intended.`, speed: 20},
    {text: 
`But surprisingly, they are not the ones
in control.`}
  ],
  [
    {text: 
`A school is very convenient to spread lies.`},,
    {text: 
`Gathering all fishes together,
predators and preys, and making them
forget the truth.`},
    {text: 
`Yes, I know you can eat people!
I'm not blind.`},
    {text: 
`Sure, getting above our natural instincts
is a nice improvement for society.`},
    {text: 
`My problem isn't predators. It's what THEY
want to do with them.`},
    {text: 
`They have a serum, that could erase all
desire of violence.`},
    {text: 
`Why don't they give it? Because it's not
part of their plan.`},
    {text: 
`We are a big social experiment. They use
us to see who will be the first killed.
And the first to murder.`},
    {text: 
`Not believing me? Well, try to find
an exit then. You'll be surprised.`}
  ],
  [
    {text: 
`We think there are fishes, water,
and stuff above the surface.`},
    {text: 
`It's another of their illusions.`, speed: 100},
    {text: 
`Reality is much more complex.
Opposing water and surface is so
manichean!`},
    {text: 
`What if we're all the same? What if
there is a 3rd dimension that we are
not seeing?`},
    {text: 
`Filled with all their puppet's wires.`},
    {text: 
`Some have seen through it, and have
already escaped.`},
    {text: 
`It's only a matter of time before
everything collapses.`},
    {text: 
`And it will finally make sense.`}
  ],
  [
    {text: 
`What if I'm wrong? Come on, there are
tons of sources agreeing with me!`},
    {text: 
`True, we might be some delusionals
who want to believe they are smart.`},
    {text: 
`But there are still questions to be
raised! Let's answer them.`},
    {text: 
`You're right though: I don't have any
answer.`},
    {text: 
`Only weird beliefs.`},
  ],[
    {text: 
`I'm surprised you are still interested,
by now!`},
    {text: 
`Hehe, maybe you have figured it out.`},
    {text: 
`We're surrounded by lies.
The fish society is a huge joke.`},
    {text: 
`So what are our only defense?
Making more lies.`},
    {text: 
`I like them you know.
Urban myths, fantasy paranoia...`},
    {text: 
`Oftenly I use real rumors, enhance them...
Sometimes I make everything up.`},
    {text: 
`In this world, fiction and reality
are meant to be blurred.`},
    {text: 
`So, what to believe? Everything. Lies
are as real as truths if you decide to.`},
    {text: 
`You seem pretty open-minded!
Or just patient, maybe.`},
    {text: 
`I want you to help me spread more lies.`},
    {text:
`Or stories, legends, alternate truths...
Call them as you like.`},
    {text: 
`So here is an easy illusion to confuse
people:`},
    {text: 
`Keep Q pressed, and make your reality
whatever you want it to be.`},
    {text: 
`How it works? Eh, that's another mystery!`},
    {text: 
`I don't even know what Q is.
But I'll sure find something.`}
  ],
  [
    {text:
`Did you know: dolphins are the only
aquatic creatures that use a body
language.`},
    {text: 
`There is so much we don't know about
deep sea, that it is not impossible to have
an entire civilization down there.` },
    {text:
`When they feel threatened, crayfishes
kill themselves by piercing their
own eyes.`},
    {text: 
`A cemetary in Japan has once fallen
into the ocean after an earthquake.
Water has kept most bodies intact.`},
    {text: 
`Fishes can drown underwater too.
Their gills tear apart when it happens.`},
    {text: 
`Try to come with some too!
#SeaSchoolFacts`}
  ],
  [
    {text: 
`You still didn't eat me.
That's nice!`},
    {text: 
`Or have the Whales made you pacific?`}
  ]
];
dialogsVendor.addTexts('Jellyfish', JELLYFISH_DIALOGS);

const JELLY_ANGRY = [
  [
    {text: 
`Ha! So you're about to eat me like
the others?`},
    {text:
`FINE! Be quick. I don't want to waste time.`}
  ],
  [
    {text:
`Go on! Eat me. See if I care!`}
  ]
];
dialogsVendor.addTexts('Jellyfish', JELLY_ANGRY, true);

// ---------------------
// The Rock That Talks
// ---------------------
const ROCK_DIALOGS = [
  [
    {text:
`Yooooooooo!
It's me! The talking rock!`},
    {text:
`That's right. I'm a rock that talks.
Deal with it.`},
  {text:
`Have you ever once met a rock that is
able to speak? I bet not.`},
  {text:
`Yet, here I am. Talking.
Because I can.`},
  {text:
`I don't care if rocks can't speak.
I just do it. Why not.`},
  {text:
`And boy do I have a lot of stuff to
talk about. Oh boy!`},
  {text:
`Oooooh boy!
So much stuff!`},
  {text:
`I'm gonna talk about them. To anyone who
comes here to listen. You know why?`},
  {text:
`Because I'M THE ROCK THAT CAN TALK!`},
  {text:
`And I'm still talking.`},
  {text:
`And still talking.`},
  {text:
`And right now? GUESS.`},
  {text:
`I'm so excited! Are you?`},
  {text:
`Dude, your face! You weren't expecting me
to be so talkative.`},
  {text:
`How could you even expect a rock to
be talkative?`},
  {text:
`Well I AM a rock, and I AM talkative.`},
  {text:
`Checkmate bro!`},
  {text:
`Talking rock rules!`}
  ],
  [
    {text:
`I can talk about so much!`},
    {text:
`You just have to listen, and I'm
unstoppable. That's a strength.`},
    {text:
`Like, how am I even able to talk?
What is my story?
Where do I come from?`},
    {text:
`I can tell you all that.`},
    {text:
`I can... Because I have a voice!`},
    {text:
`Do other rocks will tell you about their
past? Nuhuuu!`},
    {text:
`They just chill silently.`},
    {text:
`I'm chilling too. But I'm vocal about it!`},
    {text:
`Talking rock principle.`},
    {text:
`Do you like the sound of my voice?`},
    {text:
`Is your mind able to aprehend the
astonishing idea that stone can have
a voice?`},
    {text:
`I don't even have a mouth!
How does that work!?`},
    {text:
`I mean, woah. That defies so many
natural rules!`},
    {text:
`Woooooooaaaaaaaah!`},
    {text:
`Man, I impress myself.
Such a good speaker.`},
    {text:
`Especially for a rock.`},
    {text:
`Because rocks usually don't talk.`},
    {text:
`Unlike me. Who does that.`},
    {text:
`Awesome talking rock.
I'm talking about me here.`},
    {text:
`Did you get that?
TALKING? Ha!`}
  ], [
  {text:
`It's a rock!
It can talk!`},
  {text:
`It's a rock!
It can talk!`},
  {text:
`It's the talking rock!
Yeah!`},
  {text:
`That's my new catchphrase.
Pretty cool huh?`},
  {text:
`I figured, since I can use phrases,
I should have a regular one.`},
  {text:
`Most rocks don't have any catchphrase.`},
  {text:
`Or maybe they do. But they can't use it.
Since, you know, they don't talk.`},
  {text:
`Sucks to be them.`},
  {text:
`There are some fishes though who disguise
like rocks.`},
  {text:
`A camouflage trick or something.`},
  {text:
`I guess they can pretend to be talking
rocks.`},
  {text:
`But I'm certainly not one of them!
I'm authentic! Yes sir!`},
  {text:
`Check it out! Pure rock!`},
  {text:
`And still talking!`},
  {text:
`Despite being just a rock.`},
  {text:
`Just. A. Rock.
But not ANY rock!`},
  {text:
`People come here, they hear a voice,
and then they're like ”Who is there?
I don't see anyone! Who could that be!?”`},
  {text:
`“Certainly not that rock!
Rocks don't talk!”
Guess what loser!`},
  {text:
`That one rock is totally speaking to you!
That's right! I'm a bloody rock!`},
  {text:
`You won't find any fish behind me dude.
There's just the rock.`},
  {text:
`Mind blown!`,
  speed: 100},
  {text:
`That's a nice story to tell to your kids,
actually.`},
  {text:
`That one time you saw a talking rock.`},
  {text:
`Will they believe you? No.
Nobody will ever believe.`},
  {text:
`But it's not about believing!
It's about straight facts. I'm here talking.
DEAL WITH IT!`}
  ],
  [
    {text:
`You know what? I should talk even more.`},
    {text:
`I have a gift. I must use it.`},
    {text:
`All my thoughts. My experiences.
They need to be shared!
Through the magic of language!`},
    {text:
`I have so much stories! You wouldn't
believe.`},
    {text:
`I could write a book.
... If I could write.`},
    {text:
`I can see them. Fishes. Millions of them.
Coming to hear me talking.`},
    {text:
`Yeah it would totally work!`},
    {text:
`the-talking-rock.com!`},
    {text:
`It's a rock!
It can talk!`},
    {text:
`See I told you it was a good catchphrase.`},
    {text:
`I did... because... because...`,
     speed: 80},
    {text:
`You guessed it!
High five!`},
    {text:
`Just kidding!
I'm a rock. I don't have arms.`},
    {text:
`... Neither do you.`},
    {text:
`Eh, who needs that when you can speak?`},
    {text:
`The pen is mighter than the sword!
And I'm already quite tough.`},
    {text:
`Have you tried to attack a rock with a
sword? Yup, it's pointless.`},
    {text:
`Do you imagine fighting a rock that talks?
You loose, no matter what.`},
    {text:
`Whatever you do, I'm still talking.`},
    {text:
`It's what I do! Talking!`},
    {text:
`Let me show you!
I will talk in 3...`},
    {text:
`2...`},
    {text:
`1...`},
    {text:
`PSYCHED! I was already talking!`},
  ],
  [
    {text:
`When will I even stop talking?`},
    {text:
`NEVER!`, speed: 200},
    {text:
`I'm the rock that talks.
The Rock That Talks!`},
    {text:
`dot com.`},
    {text:
`Wait I've already made that joke.`},
    {text:
`Snap! I'm lost in my speech!
Just a moment.`},
    {text:
`...`},
    {text:
`Have I told you the stuff about the
hiding fishes?`},
    {text:
`Yes? How about the sword and pen and
whatever?`},
    {text:
`Ok, right. I think I see where I am.
Back on track!`},
    {text:
`What's better than a talking rock?`},
    {text:
`Nah, not two talking rocks. Silly.
They would just discuss about rock stuff.`},
    {text:
`It's a talking rock aware of its coolness.`},
    {text:
`It would be a shame if I didn't realize
I have a super power.`},
    {text:
`But fortunately I'm lucid enough to
understand the grasp of my speech ability.`},
    {text:
`And all the social implications.`},
    {text:
`I have made so much friends thanks to
talking.`},
    {text:
`We discuss about so much things.
And we tell stories. And jokes.`},
    {text:
`Would you like me to present them to you?`},
    {text:
`Don't fear to ask. I could totally!
I can talk about them for hours.`},
    {text:
`I could talk about anything for hours,
really. You just have to ask me.`},
    {text:
`And I would gladly speak to you about
anything you desire.`},
    {text:
`I'm talking for people to listen!
And they love listening!`},
    {text:
`Or sometime they just skip what I'm saying
by listening faster.`},
    {text:
`... Is it even a thing? Fast-listening?
How do you do that!?`},
    {text:
`That would be rude anyway.
Like, totally jerkish.`},
    {text:
`Near sociopathic, even.`},
    {text:
`Why, you are facing life's greatest miracle.
And you decide not to fully appreciate it?
Are you insane!?`},
    {text:
`When will be the next time you see a
talking rock? WHEN!?`},
    {text:
`You better listen carefully.
I never repeat anything!`},
    {text:
`Except sometimes. Because I have to keep
talking. To remain cool.`},
    {text:
`Cool people talk. I am cool.
Therefore, I talk.`},
    {text:
`I'm a cool rock, mostly.`}
  ], [
    {text: 
`In case you were wondering,
I'm still talking.`},
    {text: 
`Talking about the weather.
Talking about trends...`},
    {text: 
`Hey, people like when I talk.`},
    {text: 
`They won't even let me take a break!
They're all begging for me to speak more!`},
    {text: 
`But I enjoy it so much anyway,
it's not a prob'.`},
    {text: 
`It's never a prob' for Talking Rock.`},
    {text: 
`I'm Talking Rock, by the way.`},
    {text: 
`I just made up that name.
What do you think?`},
    {text: 
`I also thought of “Talking the Rock”, but
that seems a bit too much.`},
    {text: 
`I still like “The Rock That Talks” though.
It's a hard decision to make.`},
    {text: 
`I'm talking about my whole business plan
here!`},
    {text: 
`Maybe I need a marketing team.`},
    {text: 
`Just for doing the analytics!
I'll handle the communication. Thanks.`},
    {text: 
`I mean, who's talking here?`},
    {text: 
`Wait...`, speed: 100},
    {text: 
`That's not a stupid question actually.`},
    {text: 
`Well, it's a rhetorical one, sure.
I'm the one talking. Duuuh.`},
    {text: 
`But YOU... Have only been listening.`},
    {text: 
`Which is fine, I guess.
Hey, I'm totally cool with that.`},
    {text: 
`But what the heck was this
“Press Z to talk” thing!?`},
    {text: 
`You're not talking at all!
You're just listening!`},
    {text: 
`I say, you've been tricked.
They fooled you! Ask for a refund.`},
    {text: 
`You know what? This makes me want
to be even cooler.`},
    {text: 
`What if I share with you some of my
talking power?
So that you can REALLY express yourself?`},
    {text: 
`You deserved it! You should be as cool
as I am!`},
    {text: 
`So, here is my gift:
The True Talking Button.`},
    {text: 
`BEHOLD! Press R and you will be talking
just like me.`},
    {text: 
`People are going to get crazy when they'll
hear you.`},
    {text: 
`Spread the message!
Be a talking individual!`},
    {text: 
`Thanks to The Rock That Talks!`},
    {text: 
`Yeah this one is better.`}
  ],
  [
    {text: 
`Alright, now we can have a true discussion!`},
    {text: 
`The chit-chat earlier? That was nothing!`},
    {text: 
`I'm talking about real speech here!
One that will last in memories!`},
    {text: 
`The true wisdom of the talkin rock!
You can't summarize it in a few minutes. `},
    {text: 
`I'm gonna talk about everything.
Get ready.`},
    {text: 
`People will come from all around the world
to hear even just a fragment of my
message.`},
    {text: 
`Hey, I'll probably be on TV. And the web,
and such.`},
    {text: 
`There's going to be interviews, just so I
can talk even more.`},
    {text: 
`Maybe I'll be guest on some TV shows.
Hey, it would be cool if I'm brought to
studios!`},
    {text: 
`I don't mind just talking here though.
There's enough people to be listened.`},
    {text: 
`I hope it won't get too crowded when
I become famous.`},
    {text: 
`I guess there will be an infrastructure
to manage people who want to hear the
talking rock.`},
    {text: 
`Interviews at eight.`},
    {text: 
`Autographs at ten.`},
    {text: 
`Little break at noon to talk friendly.`},
    {text: 
`Political broadcast at fourteen.`},
    {text: 
`Blessings at sixteen.`},
    {text: 
`Motivational speeches at eighteen.`},
    {text: 
`Then nightly comedy show.`},
    {text: 
`And finally the late debates with special
guests.`},
    {text: 
`Are you taking notes?`},
    {text: 
`Thinking about it, I need a copyright
lawyer too.`},
    {text: 
`I wouldn't want anyone to steal my
discourses to publish a book!`},
    {text: 
`People would figure it out anyway.
My style is unique.`},
    {text: 
`Especially when it includes me signing with
“The Talking Rock” every sentence.`},
    {text: 
`I mean, “The Rock That Talks”.`},
    {text: 
`It's really a complicated choice.`},
    {text: 
`I should already buy the two domain name.
Just in case.`},
    {text: 
`Maybe I could use one for my character,
and the other for the brand?`},
    {text: 
`Which one would you like the most on a
t-shirt?`},
    {text: 
`Let's not forget mugs. Mugs are in, these
days.`},
    {text: 
`Urgh, now I need to hire a store manager.`},
    {text: 
`I should first have a fish resources
manager. That would be handy.`},
    {text: 
`Wow, so much employees. I'd better make
benefits quickly!`},
    {text: 
`I wouldn't want to have an underpaid staff.
That's not in the talking rock spirit!`},
    {text: 
`I want to spread a message about peace,
sharing, friendship and self-confidence!`},
    {text: 
`Everyone should benefit from it! I value
individuality in the people I hire.
This is certainly not blind capitalism!`},
    {text: 
`Like, do I select people I'm talking to?
No sir! They come, I talk. Whoever you are.`},
    {text: 
`Although I guess I will have to when
there will be too many people.`},
    {text: 
`Being famous is hard!
So much responsibilities that I don't want
to have right now!`},
    {text: 
`Heh, I have still time, I'll figure it out.`},
    {text: 
`In the meanwhile, feel free to come listen
to me.`},
    {text: 
`Whatever happens, I'm still the cool rock
that talks that you love.`},
    {text: 
`And I'm sure to remember you! Shark who
listen and also talks since recently.`},
    {text: 
`Talking rock... out!`},
    {text: 
`(haha, no way, I'm kidding)`}
  ], [
    {text:
`Rock? Check.`},
    {text:
`Talking? Check.`},
    {text:
`The rock that talks babe!`},
    {text:
`Go inform everyone! They have to see!`},
    {text:
`NOW!`}
  ]
];

dialogsVendor.addTexts('Rock', ROCK_DIALOGS);

const ROCK_ANGRY = [
  [
    {text: 
`Wait, what? You can't see that!`},
    {text:
`Have you glitched the game? Woah!`}
  ],
  [
    {text:
`Maybe you're reading that from source code.
Hi cool dev who like talking rocks!`}
  ]
];
dialogsVendor.addTexts('Rock', ROCK_ANGRY, true);