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
        <meta name="description" content="what is haxibami.net?" lang="ja" />
        <meta name="twitter:site" content="@haxibami" />
        <meta name="twitter:creator" content="@haxibami" />
        <meta name="twitter:image" content="https://www.haxibami.net/ogpicon.webp" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="https://www.haxibami.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="haxibami.net" />
        <meta property="og:description" content="what is haxibami.net?" />
        <meta property="og:site_name" content="haxibami.net" />
        <meta property="og:image" content="https://www.haxibami.net/ogpicon.webp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.console}>
          <div className={styles.titlebar}>
            <span>About this site: hash</span> <div className={styles.windowbutton}></div>
          </div>
          <div className={styles.console_text}>
            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Vercel</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.typing}><span className={styles.green}>haxfetch</span> <span className={styles.cyan}>--system</span></span>
            </p><br />
            <p className={styles.info}>
            <span className={styles.icon_wrapper}><Link href='/profile'><a><Image className={styles.icon} src="/favicon_glasses.ico" alt="haxibami Logo" width={150} height={150} /></a></Link> </span>
            <span className={styles.infotext}>
              <p><span className={styles.cyan}>haxibami.net</span>@<span className={styles.cyan}>Vercel</span></p>
              <p>---------------------</p>
              <p><span className={styles.purple}>Framework</span> <span className={styles.magenta}>{'>>'}</span> Next.js, React</p>
              <p><span className={styles.purple}>Lang</span> <span className={styles.magenta}>{'>>'}</span> TypeScript, scss</p>
              <p><span className={styles.purple}>Host</span> <span className={styles.magenta}>{'>>'}</span> Vercel</p>
              <p><span className={styles.purple}>Domain</span> <span className={styles.magenta}>{'>>'}</span> Google Domains</p>
              <p><span className={styles.purple}>Repo</span> <span className={styles.magenta}>{'>>'}</span> Github: <a href="https://github.com/haxibami/haxibami.net">haxibami/haxibami.net</a></p>
              <p><span className={styles.purple}>Comment</span> <span className={styles.magenta}>{'>>'}</span> To get info about me, visit <span className={styles.green}><Link href='/profile'><a>PROFILE</a></Link></span> page.</p>
            </span>
            </p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Vercel</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>what</span> are these <span className={styles.magenta}>brand-icons</span>?
            </p><br />
            <p>Svg icons (/*.svg) are licensed under Creative Commons 4.0 International license(CC BY 4.0), as stated in the <Link href="https://fontawesome.com/license/free"><a>{'<'}FontAwesome Free Icons License{'>'}</a></Link>.</p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Vercel</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.green}>why</span> <span className={styles.magenta}>window-buttons</span> on the <span className={styles.yellow}>right</span>?
            </p><br />
            <p>Remember, not all computers are running MacOS (or Windows). Some GTK theme on Linux has this kind of style.</p>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Vercel</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.blinking}></span>
            </p>

            <br />
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default About
