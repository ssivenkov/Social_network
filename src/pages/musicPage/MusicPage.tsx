import React from 'react';

import styles from './musicPage.module.scss';

const MusicPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iframeWrapper}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
          className={styles.roundBorderTopLeft}
          frameBorder='0'
          height='100%'
          src='https://www.youtube.com/embed/GsiKHJtSFyg'
          title='YouTube video player'
          width='100%'
        />
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
          className={styles.roundBorderTopRight}
          frameBorder='0'
          height='100%'
          src='https://www.youtube.com/embed/lSAz2ONC1rk'
          title='YouTube video player'
          width='100%'
        />
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
          className={styles.roundBorderBottomRight}
          frameBorder='0'
          height='100%'
          src='https://www.youtube.com/embed/3oHhEx7voLs'
          title='YouTube video player'
          width='100%'
        />
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
          className={styles.roundBorderBottomLeft}
          frameBorder='0'
          height='100%'
          src='https://www.youtube.com/embed/KB15PmfhvBY'
          title='YouTube video player'
          width='100%'
        />
      </div>
    </div>
  );
};

export default MusicPage;
