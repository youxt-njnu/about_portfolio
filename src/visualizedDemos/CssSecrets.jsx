import styles from "./CssSecrets.module.scss";

function $$ (selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// play.csssecrets.io/

export const CssSecrets = () => {
  return <div className='absolute top-20 w-full text-lg'>
    <button className={styles.info}>yes</button>
  </div>;
}