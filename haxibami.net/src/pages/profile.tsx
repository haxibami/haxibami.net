import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Profile.module.scss'

const Profile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="haxibami profile" lang="ja" />
        <meta name="twitter:site" content="@haxibami" />
        <meta name="twitter:creator" content="@haxibami" />
        <meta name="twitter:image" content="https://www.haxibami.net/ogpicon.webp" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="https://www.haxibami.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="haxibami.net" />
        <meta property="og:description" content="haxibami profile" />
        <meta property="og:site_name" content="haxibami.net" />
        <meta property="og:image" content="https://www.haxibami.net/ogpicon.webp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.console}>
          <div className={styles.titlebar}>
            <span>About me: hash</span> <div className={styles.windowbutton}></div>
          </div>
          <div className={styles.console_text}>
            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.typing}><span className={styles.green}>haxfetch</span></span>
            </p><br />
            <p className={styles.info}>
            <span className={styles.icon_wrapper}><Link href='/'><a><Image className={styles.icon} src="/favicon.ico" alt="haxibami Logo" width={150} height={150} /></a></Link></span>
            <span className={styles.infotext}>
              <p><span className={styles.cyan}>haxibami</span>@<span className={styles.cyan}>Internet-2.0</span></p>
              <p>---------------------</p>
              <p><span className={styles.purple}>Name</span> <span className={styles.magenta}>{'>>'}</span> haxibami (IPA:[haʃibamʲi], 漢字:榛)</p>
              <p><span className={styles.purple}>Lang</span> <span className={styles.magenta}>{'>>'}</span> {'Japanese (learning English & Russian)'}</p>
              <p><span className={styles.purple}>Country</span> <span className={styles.magenta}>{'>>'}</span> Japan</p>
              <p><span className={styles.purple}>Org</span> <span className={styles.magenta}>{'>>'}</span> {"The Univ. of Tokyo Junior Division, Humanity and Social sciences I (B1)"}</p>
              <p><span className={styles.purple}>Recently</span> <span className={styles.magenta}>{'>>'}</span> 🍅🗡👑✨ <span className={styles.yellow}><a href='https://cinema.revuestarlight.com'>starlightened!</a></span></p>
            </span>
            </p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>list</span> <span className={styles.magenta}>interests</span>
            </p><br />
            <p>Things that are fundamental to human (ex: cognitive science, philosophy)</p>
            <p>also I like: geography, geology, jurisprudence, computer systems.</p><br />
            <p>人間存在の根源に関わる領域に興味があります（認知科学、哲学など）。ほか、地理や地学、法、歴史、計算機なども好きです。</p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>list</span> <span className={styles.magenta}>awards</span>
            </p><br />
            <p>{"Japan Geography Olympiad: 科学地理オリンピック日本選手権 '19銀, '20&'21金"}</p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.blinking}></span>
            </p>

            <br />
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default Profile
