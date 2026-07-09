import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Button } from '@/src/components/ui/Button';

import styles from '../Auth.module.scss';

export function AuthSocials() {
  return (
    <div className={styles.socials}>
      <Button
        type="button"
        size="sm"
        variant="integrations"
        leftIcon={<FaGoogle />}
        fullWidth
      >
        Google
      </Button>

      <Button
        type="button"
        size="sm"
        variant="integrations"
        leftIcon={<FaGithub />}
        fullWidth
      >
        GitHub
      </Button>
    </div>
  );
}
