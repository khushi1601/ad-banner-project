import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BannerImageComp.module.css';

interface BannerProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  onEdit: () => void;
}

const BannerImageComp: React.FC<BannerProps> = ({
  title,
  description,
  cta,
  image,
  background,
  onEdit,
}) => {
  return (
    <div className={styles.banner} style={{ backgroundColor: background }}>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={styles.cta}>{cta}</button>
      </div>
      <div className={styles.imageContainer}>
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <button className={styles.editButton} onClick={onEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
};

export default BannerImageComp;
