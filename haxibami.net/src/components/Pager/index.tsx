import Link from "next/link";
import Styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

interface PagerProps {
  top: string;
  total: number;
  page: number;
  perPage: number;
  postType: string;
}

const Pager: React.VFC<PagerProps> = (props) => {
  const { top, total, page, perPage } = props;

  const prevPage = page > 1 ? page - 1 : null;
  let nextPage = null;
  const pages = Math.ceil(total / perPage);
  if (page < pages) {
    nextPage = page + 1;
  }

  return (
    <div id={Styles.Pager}>
      <span className={Styles.PagerItem}>
        {prevPage ? (
          prevPage === 1 ? (
            <Link href={top}>
              <a>
                <div className={Styles.Visible} id={Styles.Prev}>
                  <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    width={20}
                    height={20}
                  />
                  Prev
                </div>
              </a>
            </Link>
          ) : (
            <Link href={`${top}/page/${prevPage}`}>
              <a>
                <div className={Styles.Visible} id={Styles.Prev}>
                  Prev
                </div>
              </a>
            </Link>
          )
        ) : (
          <div className={Styles.Invisible}></div>
        )}
      </span>
      <span className={Styles.PagerItem}>
        <div>
          {page} / {pages}
        </div>
      </span>
      <span className={Styles.PagerItem}>
        {nextPage ? (
          <Link href={`${top}/page/${nextPage}`}>
            <a>
              <div className={Styles.Visible} id={Styles.Next}>
                Next
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  width={20}
                  height={20}
                />
              </div>
            </a>
          </Link>
        ) : (
          <div className={Styles.Invisible}></div>
        )}
      </span>
    </div>
  );
};

export default Pager;
