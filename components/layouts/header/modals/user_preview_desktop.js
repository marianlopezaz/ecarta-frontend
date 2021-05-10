import React, { useEffect } from "react";

// Import dependencias
import styles from "./user_preview.module.css";
import { Row, Col } from "react-bootstrap";
import { User } from "../../../icons";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { BoxLoading } from "react-loadingg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Import Redux
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logout, forcedLogout } from "../../../../redux/actions/userActions";

// Import Componentes
import MenuDesktop from "./menu_desktop";
import UserProfile from "../../../user/user_profile";
import UserChangePassword from "../../../user/change_password";

const Modal = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.user;
  });
  const user = store.user;
  const isloading = store.isLoading;
  const isLoggedIn = store.isLoggedIn;
  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openUserProfile, setOpenUserProfile] = React.useState(false);
  const [openUserChangePassword, setOpenUserChangePassword] = React.useState(
    false
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "#ffffff";
    };
  }, []);

  const handleCloseMenu = (e) => {
    setOpenMenu(false);
    setOpenUserProfile(false);
    setOpenUserChangePassword(false);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const hadleOpenUserProfile = () => {
    setOpenUserProfile(true);
  };

  const handleCloseUserProfile = () => {
    setOpenUserProfile(false);
  };

  const handleOpenUserChangePassword = () => {
    setOpenUserChangePassword(true);
    setOpenUserProfile(false);
  };

  const handleCloseUserChangePassword = () => {
    setOpenUserChangePassword(false);
    setOpenUserProfile(true);
  };

  const handleSignOut = () => {
    dispatch(logout(user.auth_token)).then((result) => {
      if (result === "unauthorized") {
        dispatch(forcedLogout()).then((status) => {
          if (status) {
            router.push("/login");
          }
        });
      } else if (result) {
        router.push("/login");
      }
    });
  };

  return (
    <>
      {!fullScreen ? (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={openMenu}
          onClose={handleCloseMenu}
          id="menu_desktop"
        >
          {isLoggedIn ? (
            !isloading ? (
              !openUserProfile ? (
                !openUserChangePassword ? (
                  <div>
                    <div id={styles.close_menu_container} title="Cerrar">
                      <img
                        id={styles.close_icon}
                        src="/icons/close.svg"
                        alt="close"
                        onClick={handleCloseMenu}
                      />
                    </div>
                    <DialogContent>
                      <MenuDesktop
                        handleCloseMenu={handleCloseMenu}
                        user={user}
                        handleSignOut={handleSignOut}
                        hadleOpenUserProfile={hadleOpenUserProfile}
                      />
                    </DialogContent>
                  </div>
                ) : (
                  <DialogContent>
                    <UserChangePassword
                      user_auth_token={user.auth_token}
                      handleCloseUserChangePassword={
                        handleCloseUserChangePassword
                      }
                    />
                  </DialogContent>
                )
              ) : (
                <DialogContent>
                  <UserProfile
                    view_user={user}
                    handleCloseUserProfile={handleCloseUserProfile}
                    handleOpenUserChangePassword={handleOpenUserChangePassword}
                  />
                </DialogContent>
              )
            ) : (
              <DialogContent>
                {!fullScreen ? (
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={11}
                      sm={11}
                      xs={11}
                      style={{ height: 300 }}
                      className="center"
                    >
                      <BoxLoading color="var(--pink)" />
                    </Col>
                  </Row>
                ) : (
                  <Row md={12} sm={12} xs={12}>
                    <Col
                      md={11}
                      sm={11}
                      xs={11}
                      style={{ height: "90vh" }}
                      className="center"
                    >
                      <BoxLoading color="var(--pink)" />
                    </Col>
                  </Row>
                )}
              </DialogContent>
            )
          ) : (
            <DialogContent>
              <Row md={12} sm={12} xs={12}>
                <Col
                  md={11}
                  sm={11}
                  xs={11}
                  style={{ height: 300 }}
                  className="center"
                >
                  <BoxLoading color="var(--pink)" />
                </Col>
              </Row>
            </DialogContent>
          )}
        </Dialog>
      ) : null}
      <div
        onClick={handleOpenMenu}
        style={{ cursor: "pointer" }}
        title="Ver Usuario"
      >
        <span id={styles.header_username}>{user.name}</span>
        <User classes={styles.svg} />
      </div>
    </>
  );
};

export default Modal;
