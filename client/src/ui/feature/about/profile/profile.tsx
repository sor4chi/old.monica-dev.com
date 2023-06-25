import * as styles from './profile.css';

import { Anchor } from '@/ui/foundation/anchor';
import { content as contentStyle } from '@/ui/foundation/article/article.css';

export const Profile = () => (
  <article className={contentStyle}>
    <h2>About Me</h2>
    <p>
      2003年生まれ・20歳・北海道出身。
      <br />
      埼玉大学工学部情報工学科・学士3年。
    </p>
    <p>高校三年生の時に他の人と違うことがしたいというモチベーションでプログラミングを始めました。</p>
    <p>
      以降<Anchor href="https://twitter.com/SERPENT_4">SERPENT</Anchor>のメンバーと一緒にプログラミングを続け、現在は
      <strong>Sor4chi</strong>(Github名)や<strong>Monica</strong>(Twitter名)という名前で活動しています。
    </p>
    <p>
      2022年2月からスカウトをいただいて<Anchor href="https://wizleap.co.jp/">Wizleap Inc.</Anchor>
      にてフルスタックエンジニアとしてインターンに参加、現在も継続中。
      <br />
      テックリードとしてのポジションや、ライブラリ化、アーキテクチャなどDXに関する様々なことに取り組んでいます。
      裁量権の大きいスタートアップ企業での開発経験はとても刺激的で技術面だけでなくビジネス面や人間関係面でも大きな成長をさせていただきました。
    </p>
    <p>
      2023年2月からスカウトをいただいて<Anchor href="https://fiah.ai/">Fiah Inc.</Anchor>
      にてフルスタックエンジニアとしてインターンに参加、現在も継続中。
      <br />
      新規事業のアプリケーションのフロントエンドを担当しています。
    </p>
    <h2>Skills</h2>
    <p>触ったことある程度も含んでるので信頼度は薄めです、Github見てもらったほうがいいかもしれない...</p>
    <strong>Frontend</strong>
    <h4 className={styles.skills}>
      <span className={styles.skill}>HTML / CSS</span>
      <span className={styles.skill}>Vue.js / Nuxt.js</span>
      <span className={styles.skill}>React / Next.js</span>
      <span className={styles.skill}>JavaScript / TypeScript</span>
    </h4>
    <strong>Backend</strong>
    <h4 className={styles.skills}>
      <span className={styles.skill}>Express.js / Nest.js</span>
      <span className={styles.skill}>Django</span>
      <span className={styles.skill}>Laravel</span>
      <span className={styles.skill}>Rails</span>
      <span className={styles.skill}>Go</span>
    </h4>
    <strong>Other</strong>
    <h4 className={styles.skills}>
      <span className={styles.skill}>AWS</span>
      <span className={styles.skill}>Docker</span>
      <span className={styles.skill}>Nginx</span>
      <span className={styles.skill}>Mysql</span>
    </h4>
  </article>
);
