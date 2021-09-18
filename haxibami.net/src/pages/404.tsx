import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/NotFound.module.scss'

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="404 not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.console}>
          <div className={styles.titlebar}>
            <span>404: hash</span> <div className={styles.windowbutton}></div>
          </div>
          <div className={styles.console_text}>

            <br /><p>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.magenta}>{'>>'}</span> <span className={styles.typing}><span className={styles.green}>haxibami</span> <span className={styles.yellow}>show</span> status</span>
            </p><br />
            <p><span className={styles.red}><b><span className={styles.error}>[haxibami.net ERROR!]</span></b></span></p>
            <p><span className={styles.notfound}>404 not found. Go back to <Link href="/"><a>Home</a></Link></span></p>

            <br /><p className={styles.newprompt}>
            ┌── <span className={styles.path}><b>~/haxibami.net</b></span> on <span className={styles.cyan}><b>Internet-2.0</b></span>
            <br />└─<span className={styles.red}>{'>>'}</span> <span className={styles.blinking}></span>
            </p>

            <br />
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default NotFound
