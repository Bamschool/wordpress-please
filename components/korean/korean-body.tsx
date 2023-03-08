import styles from "./korean-body.module.css";

export default function KoreanBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
