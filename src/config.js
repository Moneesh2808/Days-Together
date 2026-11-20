/**
 * Configuration for Our Love Story website
 * All important dates, images, and text can be customized here!
 */

export const config = {
  // Start date of your relationship (YYYY-MM-DD)
  // Configured to make today exactly Day 293, tomorrow automatically Day 294, and so on.
  relationshipStartDate: "2026-01-31",

  // Partner names & nicknames
  partnerName: "My Love",
  nicknames: ["papa", "my love", "my pondati"],

  // Main memory photo - points to the uploaded image in public folder
  memoryPhoto: "/love.png",
  photoCaption: "A Little Piece of My Happiness ❤️",
  photoQuote: "My favorite place in this world isn't a location. It's wherever I get to be with you.",

  // Landing page texts
  landing: {
    intro: "Every love story is special, but ours is my favorite.",
    title: "Days Together",
    line1: "Every day with you becomes a memory I wish I could live a thousand times.",
    line2: "If I could choose again, in every lifetime, in every universe, I would still choose you.",
    button: "✨ Open Your Surprise ❤️"
  },

  // Milestone counter section texts
  milestone: {
    badge: "Our Forever Love ❤️",
    heading: "Today, We Are",
    counterSuffix: "Days Together",
    quote1: "{days} days of laughter, love, little fights, endless care, unforgettable memories, and a thousand reasons to choose you again.",
    quote2: "And if I had to live these days all over again, I would fall in love with you every single time."
  },

  // Love letter content
  letter: {
    heading: "To My Favorite Person, My Forever Love ❤️",
    salutation: "My love, my happiness, my everything…",
    paragraphs: [
      "These days with you have given memories that I will carry in my heart forever. Every smile of yours makes my day brighter. Every conversation with you gives me a reason to smile, and every moment with you reminds me how lucky I am to have you in my life.",
      "You are not just someone I love. You are the person I want to share my happiness with, the person I want beside me on difficult days, and the person with whom I want to celebrate even the smallest victories.",
      "I know life will not always be perfect. We may have difficult days, misunderstandings, and moments when things do not go as planned. But I want you to know that I will always try to understand you, support you, respect you, and stand beside you.",
      "I want to be there when you are happy, when you are tired, when you need someone to listen, and when the world feels a little too heavy. You never have to pretend to be strong around me. I want us to grow together, learn together, laugh together, and create a lifetime of beautiful memories.",
      "You make ordinary days feel special. You turn little moments into precious memories. And somehow, even after all these days, my heart still finds new reasons to love you more."
    ],
    declarations: [
      "I am always here for you, papa. ❤️",
      "I am always here for you, my love. ❤️",
      "I am always here for you, my pondati. ❤️"
    ],
    closing: [
      "No matter how many days pass, I want to keep choosing you — not just today, but every tomorrow that life gives us.",
      "You are my favorite chapter, my sweetest feeling, and the person I hope to keep loving through every season of life.",
      "Happy days together, my love.",
      "{days} days down, countless beautiful memories ahead.",
      "Forever yours. ❤️🌙"
    ]
  },

  // Final surprise reveal
  final: {
    question: "If I could ask the universe for one thing…",
    answer: "It would be a thousand more tomorrows with you. ❤️",
    button: "Send You All My Love 💌",
    hiddenMessage: "Whatever tomorrow brings, I hope we get to face it together. I love you, papa, my love, my pondati. ❤️"
  }
};

/**
 * Accurately calculate calendar days between relationship start date and current local date.
 * Handles leap years, month differences, daylight savings, and timezone offsets correctly.
 * Automatically advances to 294 tomorrow, 295 the day after, and so on.
 */
export function calculateDaysTogether(startDateStr = config.relationshipStartDate) {
  const parts = startDateStr.split('-').map(Number);
  if (parts.length !== 3) return 293;
  
  const [startYear, startMonth, startDay] = parts;
  // Use UTC midnight for both dates to guarantee consistent calendar-day calculation
  const startUTC = Date.UTC(startYear, startMonth - 1, startDay);

  const now = new Date();
  const currentUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = currentUTC - startUTC;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(days, 1);
}
