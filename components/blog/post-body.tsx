import styles from "./post-body.module.css";

export default function PostBody({ content, textColor }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles.content}
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
