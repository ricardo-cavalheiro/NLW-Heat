import { useContext } from 'react';
import styles from './App.module.scss';

// contexts
import { AuthContext } from './contexts/auth';

// components
import { MessageList } from './components/MessageList';
import { LoginBox } from './components/LoginBox';
import { SendMessageForm } from './components/SendMessageForm';

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main
      className={`${styles.contentWrapper} ${
        user !== null && styles.contentSigned
      }`}
    >
      <MessageList />
      {user !== null ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
