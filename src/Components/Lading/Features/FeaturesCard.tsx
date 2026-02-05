import type { JSX } from "react";
import styles from "../../../assets/Style/Landing/Features/FeaturesCard.module.css";

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  background?: string;
};

export const FeaturesCard = ({ icon, title, description, background }: Props) => {
  return (
    <div className={styles.FeaturesCard}>
      <div
        className={styles.FeatureIconContainer}
        style={{background: background || "linear-gradient(135deg, #000, #333)",}}>
        {icon}
      </div>
      <h3 className={styles.FeatureTitle}>{title}</h3>
      <p className={styles.FeatureDescription}>{description}</p>
      <div className={styles.line}></div>
    </div>
  );
};
