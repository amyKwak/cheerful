"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Countdown from "react-countdown";

const quotes = [
  "Distance means so little when someone means so much ❤️",
  "Absence sharpens love, presence strengthens it 💑",
  "Even though we are miles apart, you are never far from my heart 💞",
  "The pain of parting is nothing to the joy of meeting again 😍",
  "Distance is not for the fearful, it is for the bold 💪",
  "True love doesn’t mean being inseparable; it means being separated and nothing changes 💖",
  "The longer the wait, the sweeter the kiss 💋",
  "The best and most beautiful things in the world cannot be seen or even touched. They must be felt with the heart ❤️",
  "No matter how far apart we are, my thoughts always find their way back to you 💭",
  "Distance gives us a reason to love harder 💗",
  "The miles between us mean nothing when we share the same sky 🌌",
  "In the arithmetic of love, one plus one equals everything, and two minus one equals nothing 💞",
  "True love doesn't mind the distance; it just waits for the right time to rekindle the flame 🔥",
  "The heart knows a thousand ways to connect, even across a thousand miles 💓",
  "Long-distance relationships are like wind to a fire; it extinguishes the weak and fuels the strong 💪",
  "Our love is like a road stretched out, with no end in sight, no matter how far it goes 🛣️",
  "Distance is not an obstacle; it's a reminder of how strong true love can be 💖",
  "Every mile that separates us is worth it because our love is stronger than any distance 🌟",
  "Love bridges the gaps that miles create, making them seem insignificant in the grand tapestry of our relationship 🎨",
  "Time apart only makes our reunions more magical ✨",
  "Though we may be separated by distance, our hearts beat as one 💓",
  "Distance tests love, but it also proves its resilience 💪",
  "The map might show distance, but it can never measure the love between us 🗺️❤️",
  "Missing someone gets easier every day because even though you are one day further from the last time you saw them, you are one day closer to the next time you will 💖",
  "Distance teaches us to appreciate the moments we have together and the moments we will have when we are apart 💕",
  "Love transcends distance; it's a language understood by the heart, not bound by miles 💌",
  "In the vast expanse of space and time, our love remains constant and unwavering 💫",
  "Every moment spent apart is just a prelude to the joy of being together again 💏",
  "Distance is just a test to see how far love can travel 💖",
  "The road may be long, but at the end of it, I'll find you waiting, and that's all that matters 🛤️",
  "Our love defies geography; it knows no bounds 🌍",
  "Even oceans apart, our love flows stronger than any current 🌊",
  "Distance cannot diminish the bond we share; it only strengthens it 💪",
  "The space between us is just a reminder of how much closer we'll be when we're together again 💕",
  "Though we may be apart, our hearts beat in synchrony, tuned to the rhythm of our love 💓",
  "Distance is not a hindrance; it's a chapter in our love story, making the ending all the more beautiful 📖",
  "No matter how far apart we are, our love keeps us connected, heart to heart ❤️",
  "The miles between us are nothing compared to the strength of our love 💖",
  "Distance is just a physical barrier; our love transcends space and time 💫",
  "Every mile that separates us only serves to remind me of how much I love you 💕",
  "Distance cannot separate souls that are bound by love 💖",
  "Our love is like a compass; no matter which direction we go, it always points us back to each other 🧭",
  "In the tapestry of life, distance is just a thread, weaving us closer together 💞",
  "The universe conspired to bring us together, and no amount of distance can undo that cosmic bond ✨",
  "Though we may be apart, our love knows no distance; it stretches across the miles and fills the spaces between us 💖",
  "Distance is just a temporary obstacle in our journey; our love will guide us back to each other 🌟",
  "Every mile apart is a testament to the strength of our love, growing stronger with each passing day 💪",
  "The melody of our love can be heard across the distance, a symphony that resonates in the hearts of two souls destined to be together 🎶❤️",
  "Distance may keep us apart physically, but our hearts are always entwined, beating as one 💓",
  "Our love is like a star shining bright in the night sky, guiding us through the darkness of distance 🌠",
  "Though we may be separated by miles, our love knows no bounds; it transcends space and time 💖",
];

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Function to change the quote index every day
    const changeQuoteDaily = () => {
      const today = new Date();
      const newQuoteIndex = today.getDay() % quotes.length; // Change quote index based on the day of the week
      setQuoteIndex(newQuoteIndex);
    };

    // Change the quote index initially
    changeQuoteDaily();

    // Set interval to change quote daily
    const interval = setInterval(changeQuoteDaily, 24 * 60 * 60 * 1000); // Change every 24 hours

    return () => clearInterval(interval); // Clean up interval
  }, []);

  // Date for March 29th
  const march29th = new Date("2024-03-29T00:00:00");

  // Renderer for Countdown component to display days, hours, minutes, and seconds
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.encouragingQuote}>
          <p className={styles.loveQuote}>{quotes[quoteIndex]}</p>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="https://i.pinimg.com/236x/60/7b/01/607b01352712d545f5abbc7d6ca02fdd.jpg"
            alt="Heart"
            width={150}
            height={150}
          />
        </div>

        <div className={styles.countdownContainer}>
          <p className={styles.countdownText}>Cuddle Countdown:</p>
          <div className={styles.countdown}>
            <Countdown date={march29th} renderer={renderer} />
          </div>
        </div>
      </main>
    </div>
  );
}
