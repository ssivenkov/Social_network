import React, { FunctionComponent, Suspense } from 'react';

import { Preloader } from 'components/common/preloader/Preloader';

export function withSuspense<TWrappedComponentProps>(
  WrappedComponent: FunctionComponent<TWrappedComponentProps>,
) {
  return (props: TWrappedComponentProps) => (
    <Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </Suspense>
  );
}
