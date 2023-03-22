import styles from "./documentation-body.module.css";
export default function DocumentationBody({ content, title }) {
  console.log(title);

  return (
    <div className="max-w-2xl mx-auto px-3 ">
      <h1>{title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
