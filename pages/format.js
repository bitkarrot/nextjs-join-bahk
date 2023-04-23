import styles from "../styles/Format.module.css";

export default function format(obj) {
  let fcontent = `<div class="${styles.container}"><h3 class="${styles.header}"> Your submitted info</h3><ul class="${styles.list}">`;
  for (var key in obj) {
    var value = obj[key];
    fcontent =
      fcontent +
      `<li class="${styles.listItem}"><span class="${styles.key}">${key}</span>: <span class="${styles.value}">${value}</span></li>`;
  }
  fcontent = fcontent + "</ul></div>";
  return fcontent;
}
