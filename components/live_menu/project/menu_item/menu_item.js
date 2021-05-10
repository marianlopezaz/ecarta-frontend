// Import dependencias
import Link from "next/link";

// Import componentes
import styles from "../project_view/styles.module.css";

const MenuItem = ({ menu, qr }) => {
  return (
    <Link href="/projects/[qr]/[menu_id]" as={`/projects/${qr}/${menu.id}`}>
      <a>
        <div
          className={
            menu.medias && menu.medias.length > 0
              ? styles.menu_img
              : styles.no_menu_media
          }
          style={
            menu.medias && menu.medias.length > 0
              ? {
                  backgroundImage: `url(${menu.medias[0].url_regular})`,
                }
              : {}
          }
        >
          {!menu.medias || (menu.medias && menu.medias.length === 0) ? (
            <>
              <img src="/images/dashboard/add_img.svg" />
              <p>Imagen no encontrada</p>
            </>
          ) : null}
        </div>
        <p className={styles.menu_item_title}>{menu.name}</p>
        <p className={styles.menu_item_desciption}>{menu.description}</p>
      </a>
    </Link>
  );
};

export default MenuItem;
