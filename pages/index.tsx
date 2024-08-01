import { useState, useEffect } from 'react';
import BannerImageComp from '../components/BannerImageComp';
import EditBannerTemplateBs from '../components/EditBannerTemplateBs';
import styles from '../styles/Home.module.css';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetch('/adBanners.json')
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
  };

  const handleSave = (updatedBanner: Banner) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
    setEditingBanner(null);
  };

  return (
    <div className={styles.container}>
      <h1>Ad Banners</h1>
      <div className={styles.bannerGrid}>
        {banners.map((banner) => (
          <BannerImageComp
            key={banner.id}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            background={banner.background}
            onEdit={() => handleEdit(banner)}
          />
        ))}
      </div>
      {editingBanner && (
  <EditBannerTemplateBs
    banner={editingBanner}
    onSave={handleSave}
    onClose={() => setEditingBanner(null)}
  />
)}
    </div>
  );
}