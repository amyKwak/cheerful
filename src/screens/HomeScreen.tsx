import styles from "./HomeScreen.module.css";
import { Logo } from "../components/Logo";
import { Button } from "../components/Button";
import { WeekProgress } from "../components/WeekProgress";
import { colors } from "../theme";
import {
  dayName,
  isSunday,
  nightsLeftThisWeek,
  toISODate,
} from "../lib/dateUtils";
import type { WeekList } from "../lib/types";

interface HomeScreenProps {
  userName: string;
  today: Date;
  weekStart: Date;
  weekList: WeekList | undefined;
  reflectedISO: string[];
  onGoToList: () => void;
  onReflect: () => void;
}

function hasCompleteList(weekList: WeekList | undefined): boolean {
  return (
    !!weekList &&
    weekList.items.filter((item) => item.trim().length > 0).length >= 5
  );
}

export function HomeScreen({
  userName,
  today,
  weekStart,
  weekList,
  reflectedISO,
  onGoToList,
  onReflect,
}: HomeScreenProps) {
  const listReady = hasCompleteList(weekList);
  const sunday = isSunday(today);
  const day = dayName(today);
  const alreadyReflectedTonight = reflectedISO.includes(toISODate(today));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Logo markSize={32} textSize={22} />
        {listReady && (
          <button
            onClick={onGoToList}
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              fontSize: 14,
              color: colors.amberText,
              background: colors.amberPale,
              border: "none",
              borderRadius: 12,
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Edit list
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            {sunday ? "SUNDAY · NEW WEEK" : `${day} EVENING`}
          </div>
          <h2 className={styles.heading}>Good evening, {userName} 🌙</h2>
          <p className={styles.subtitle}>
            {listReady
              ? "Take five minutes to reread this week's list."
              : sunday
                ? "A fresh week. Start by writing what you're grateful for."
                : "A couple days in and no list yet — no rush. It only takes two minutes."}
          </p>

          {listReady ? (
            <div className={styles.card}>
              <div>
                <div className={styles.cardEyebrow}>TONIGHT'S REFLECTION</div>
                <div className={styles.cardTitle}>
                  {alreadyReflectedTonight
                    ? "Already reflected ✓"
                    : sunday
                      ? "You're all set for the week"
                      : "5 things · this week"}
                </div>
                <div className={styles.cardBody}>
                  {alreadyReflectedTonight
                    ? "Nice work. Come back tomorrow, or read it again."
                    : sunday
                      ? "Your list is set. Reflections open tomorrow night."
                      : "One at a time. No typing — just read."}
                </div>
              </div>
              <Button
                variant="dark"
                onClick={onReflect}
                style={{ flex: "none" }}
              >
                {alreadyReflectedTonight
                  ? "Read again →"
                  : sunday
                    ? "Preview →"
                    : "Reflect now →"}
              </Button>
            </div>
          ) : (
            <div className={styles.card}>
              <div>
                <div className={styles.cardEyebrow}>THIS WEEK'S LIST</div>
                <div className={styles.cardTitle}>
                  {sunday ? "Nothing here yet" : "Still a blank page"}
                </div>
                <div className={styles.cardBody}>
                  {sunday
                    ? "Write your 5 things to unlock nightly reflections."
                    : "Jot your 5 things and reflections open up."}
                </div>
              </div>
              <Button
                variant="dark"
                onClick={onGoToList}
                style={{ flex: "none" }}
              >
                Write your list →
              </Button>
            </div>
          )}

          {listReady ? (
            <>
              <div className={styles.progressWrap}>
                <WeekProgress
                  weekStart={weekStart}
                  reflectedISO={reflectedISO}
                  today={today}
                />
              </div>
              <div className={styles.linkRow}>
                <Button variant="ghost" onClick={onGoToList}>
                  View &amp; edit this week's list ›
                </Button>
              </div>
            </>
          ) : (
            !sunday && (
              <div className={styles.note}>
                <span style={{ fontSize: 20 }}>🌤️</span>
                <span>
                  {nightsLeftThisWeek(today)} evenings left this week to
                  reflect.
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
