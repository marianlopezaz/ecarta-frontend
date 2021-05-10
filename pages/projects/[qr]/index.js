import React, { useEffect, useState } from "react";

// Import dependencias
import { useRouter } from "next/router";
import { BabelLoading } from "react-loadingg";
import useSWR from "swr";
import Alert from "react-s-alert";

// Import componentes
import api from "../../../utils/config";
import { getProject } from "../../../utils/menu_service";
import ProjectView from "../../../components/live_menu/project/project_view/project";
import AdvertisementView from "../../../components/live_menu/project/advertisement_view/advertisement";

const QRView = () => {
  const router = useRouter();
  const { qr } = router.query;
  const [showMenu, setShowMenu] = useState(false);
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const url = `${api.api_url}/advertisement/getMenus/${qr}`;
  let { data } = useSWR(qr !== undefined ? url : null, (url) =>
    getProject(url).then((result) => {
      if (result.success == true) {
        return result.result;
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  );

  useEffect(() => {
    let cookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)seen_advertisement\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookie === "") {
      document.cookie = `seen_advertisement=${false}`;
    }
    if (cookie === "false") {
      if (data !== undefined) {
        if (data.advertisement) {
          document.cookie = `seen_advertisement=${false}`;
          setShowAdvertisement(true);
        } else {
          document.cookie = `seen_advertisement=${true}`;
          setShowMenu(true);
          setShowAdvertisement(false);
        }
      }
    }
    if (cookie === "true") {
      setShowMenu(true);
      setShowAdvertisement(false);
    }
  }, [data]);

  const menuShow = () => {
    document.cookie = `seen_advertisement=${true}`;
    setShowMenu(true);
    setShowAdvertisement(false);
  };

  return showMenu ? (
    <ProjectView
      project={data !== undefined ? data : undefined}
      qr={qr}
    />
  ) : showAdvertisement ? (
    <AdvertisementView
      menuShow={menuShow}
      advertisement={data !== undefined ? data.advertisement : undefined}
    />
  ) : (
    <BabelLoading color="var(--black)" />
  );
};

export default QRView;
