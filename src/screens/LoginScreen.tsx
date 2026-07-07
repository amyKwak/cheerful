import { useState } from 'react';
import styles from './LoginScreen.module.css';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';

interface LoginScreenProps {
  onContinue: (name: string) => void;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [name, setName] = useState('');

  function submit() {
    const trimmed = name.trim();
    if (trimmed.length > 0) onContinue(trimmed);
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Logo markSize={46} textSize={30} />
      </div>
      <h1 className={styles.heading}>Welcome to Cheerful</h1>
      <p className={styles.subtitle}>What should we call you?</p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoFocus
        />
        <Button type="submit" variant="primary" disabled={name.trim().length === 0}>
          Continue →
        </Button>
      </form>
    </div>
  );
}
