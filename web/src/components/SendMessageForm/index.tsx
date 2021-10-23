import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import styles from './styles.module.scss';

// contexts
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';

export function SendMessageForm() {
  // states
  const [message, setMessage] = useState('');

  // context
  const { user, signOut } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post('messages', { message });

    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGitHub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSubmit} className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          name='message'
          id='message'
          placeholder='Qual sua expectativa para o evento?'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  );
}
