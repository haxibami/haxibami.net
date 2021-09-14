import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/About.module.scss'

const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="haxibami's phylogenetic tree..." lang="ja" />
        <meta name="twitter:site" content="@haxibami"></meta>
        <meta name="twitter:creator" content="@haxibami"></meta>
        <meta name="twitter:image" content="https://raw.githubusercontent.com/haxibami/haxibami.net/main/haxibami.net/public/favicon.ico"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta property="og:url" content="https://www.haxibami.net/about" />
        <meta property="og:title" content="haxibami.net" />
        <meta property="og:description" content="haxibami's asymmetric pseudo-shell" />
        <meta property="og:image" content="https://raw.githubusercontent.com/haxibami/haxibami.net/main/haxibami.net/public/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.console}>
          <div className={styles.titlebar}>
            <span>About this site: hash</span> <div className={styles.windowbutton}></div>
          </div>
          <div className={styles.console_text}>
            <br></br><p>
            ┌── <span className={styles.path}>~/haxibami.net</span> on <span className={styles.cyan}> Internet 2.0</span>
            <br></br>└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.typing}><span className={styles.green}>haxfetch</span></span>
            </p><br></br>
            <p className={styles.info}>
            <span className={styles.icon_wrapper}><Image className={styles.icon} src="/favicon_glasses.ico" alt="haxibami Logo" width={150} height={150} /> </span>
            <span className={styles.infotext}>
              <p><span className={styles.cyan}>haxibami.net</span>@<span className={styles.cyan}>haxibami</span></p>
              <p>---------------------</p>
              <p><span className={styles.purple}>Framework</span> <span className={styles.magenta}>{'>>'}</span> Next.js, React</p>
              <p><span className={styles.purple}>Language</span> <span className={styles.magenta}>{'>>'}</span> TypeScript, scss</p>
              <p><span className={styles.purple}>Hosting</span> <span className={styles.magenta}>{'>>'}</span> Vercel</p>
              <p><span className={styles.purple}>Domains</span> <span className={styles.magenta}>{'>>'}</span> Google Domains</p>
              <p><span className={styles.purple}>Repo</span> <span className={styles.magenta}>{'>>'}</span> <a href="https://github.com/haxibami/haxibami.net">haxibami/haxibami.net</a></p>
              <p><span className={styles.purple}>Comment</span> <span className={styles.magenta}>{'>>'}</span> {"Still incompleted. Wait till I learn React & TypeScript!"}</p>
            </span>
            </p>

            <br></br><p>
            ┌── <span className={styles.path}>~/haxibami.net</span> on <span className={styles.cyan}> Internet 2.0</span>
            <br></br>└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>what</span> are these <span className={styles.magenta}>brand-icons</span>?
            </p><br></br>
            <p>Svg icons (/public/*.svg) are licensed under Creative Commons 4.0 International license(CC BY 4.0), as stated in the <Link href="https://fontawesome.com/license/free"><a>{'<'}FontAwesome Free Icons License{'>'}</a></Link>.</p>

            <br></br><p>
            ┌── <span className={styles.path}>~/haxibami.net</span> on <span className={styles.cyan}> Internet 2.0</span>
            <br></br>└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>why</span> <span className={styles.magenta}>window-buttons</span> on the <span className={styles.yellow}>right</span>?
            </p><br></br>
            <p>Remember, not all computers are running MacOS (or Windows). Some GTK theme on Linux has this kind of style.</p>

            <br></br><p>
            ┌── <span className={styles.path}>~/haxibami.net</span> on <span className={styles.cyan}> Internet 2.0</span>
            <br></br>└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.blinking}></span>
            </p>

            <br></br>
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default About
