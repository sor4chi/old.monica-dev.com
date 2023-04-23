import { FaAws, FaDocker, FaHtml5, FaJs, FaLaravel, FaReact, FaVuejs } from 'react-icons/fa';
import { SiDjango, SiMysql, SiNginx, SiRubyonrails } from 'react-icons/si';
import { TbBrandGolang } from 'react-icons/tb';

import * as styles from './profile.css';

import { parseTwemoji } from '@/lib/twemoji';
import { content as contentStyle } from '@/ui/foundation/article/article.css';

export const Profile = () => (
  <article className={contentStyle}>
    <section>
      <h2 dangerouslySetInnerHTML={{ __html: parseTwemoji('🧩About Me') }} />
      <p>
        2003年生まれ・20歳・北海道出身。
        <br />
        埼玉大学工学部情報工学科・学士2年。
      </p>
      <p>高校三年生の時に他の人と違うことがしたいというモチベーションでプログラミングを始めました。</p>
      <p>
        以降<a href="https://twitter.com/SERPENT_4">SERPENT</a>のメンバーと一緒にプログラミングを続け、現在は
        <strong>Sor4chi</strong>(Github名)や<strong>Monica</strong>(Twitter名)という名前で活動しています。
      </p>
      <p>
        2022年2月からスカウトをいただいて<a href="https://wizleap.co.jp/">Wizleap Inc.</a>
        にてフルスタックエンジニアとしてインターンに参加、現在も継続中。
        <br />
        テックリードとしてのポジションや、ライブラリ化、アーキテクチャなどDXに関する様々なことに取り組んでいます。
        裁量権の大きいスタートアップ企業での開発経験はとても刺激的で技術面だけでなくビジネス面や人間関係面でも大きな成長をさせていただきました。
      </p>
      <p>
        2023年2月からスカウトをいただいて<a href="https://fiah.ai/">Fiah Inc.</a>
        にてフルスタックエンジニアとしてインターンに参加、現在も継続中。
        <br />
        新規事業のアプリケーションのフロントエンドを担当しています。
      </p>
    </section>
    <section>
      <h2 dangerouslySetInnerHTML={{ __html: parseTwemoji('🥷Skills') }} />
      <p>触ったことある程度も含んでるので信頼度は薄めです、Github見てもらったほうがいいかもしれない...</p>
      <strong dangerouslySetInnerHTML={{ __html: parseTwemoji('🎨FrontEnd') }} />
      <div className={styles.skills}>
        <span className={styles.skill}>
          <FaHtml5 />
          <span>HTML / CSS</span>
        </span>
        <span className={styles.skill}>
          <FaVuejs />
          <span>Vue.js / Nuxt.js</span>
        </span>
        <span className={styles.skill}>
          <FaReact />
          <span>React / Next.js</span>
        </span>
        <span className={styles.skill}>
          <FaJs />
          <span>JavaScript / TypeScript</span>
        </span>
      </div>
      <strong dangerouslySetInnerHTML={{ __html: parseTwemoji('🖥️Backend') }} />
      <div className={styles.skills}>
        <span className={styles.skill}>
          <FaJs />
          <span>Express.js / Nest.js</span>
        </span>
        <span className={styles.skill}>
          <SiDjango />
          <span>Django</span>
        </span>
        <span className={styles.skill}>
          <FaLaravel />
          <span>Laravel</span>
        </span>
        <span className={styles.skill}>
          <SiRubyonrails />
          <span>Rails</span>
        </span>
        <span className={styles.skill}>
          <TbBrandGolang />
          <span>Go</span>
        </span>
      </div>
      <strong dangerouslySetInnerHTML={{ __html: parseTwemoji('🌀Other') }} />
      <div className={styles.skills}>
        <span className={styles.skill}>
          <FaAws />
          <span>AWS</span>
        </span>
        <span className={styles.skill}>
          <FaDocker />
          <span>Docker</span>
        </span>
        <span className={styles.skill}>
          <SiNginx />
          <span>Nginx</span>
        </span>
        <span className={styles.skill}>
          <SiMysql />
          <span>Mysql</span>
        </span>
      </div>
    </section>
  </article>
);
