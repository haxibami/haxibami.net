import Link from "next/link";

import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Styles from "./style.module.scss";

interface PagerProps {
  top: string;
  total: number;
  page: number;
  perPage: number;
  postType: string;
}

const Pager: React.FC<PagerProps> = (props) => {
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
            (<Link href={top}>

              <div className={Styles.Visible} id={Styles.Prev}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  width={20}
                  height={20}
                />
                Prev
              </div>

            </Link>)
          ) : (
            (<Link href={`${top}/page/${prevPage}`}>

              <div className={Styles.Visible} id={Styles.Prev}>
                Prev
              </div>

            </Link>)
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
          (<Link href={`${top}/page/${nextPage}`}>

            <div className={Styles.Visible} id={Styles.Next}>
              Next
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                width={20}
                height={20}
              />
            </div>

          </Link>)
        ) : (
          <div className={Styles.Invisible}></div>
        )}
      </span>
    </div>
  );
};

export default Pager;
