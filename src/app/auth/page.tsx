import { Suspense } from 'react';
import AuthorizeContent from './AuthorizeContent';

export default function AuthorizePage() {
  return (
    <Suspense fallback={null}>
      <AuthorizeContent />
    </Suspense>
  );
}
