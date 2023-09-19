import bgImage from "../../assets/img/footer/icon-police.png";
import "./style/index.css"

export default function Footer() {
  return <div className="footer">
    <img src={bgImage} />
    网站备案号
    <a href="https://beian.miit.gov.cn/" target="_blank">
      （蜀ICP备2022009654号）</a
    >
  </div>
}