import React, { useState, useEffect, useCallback } from "react";
import lnBitLogo from "../public/images/lnbit-logo.webp";
import Image from "next/image";
import styles from "../styles/Lnbits.module.css";

const LNbitsPayment = ({ fee, memberdata, userData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [paid, setPaid] = useState(false);
  const [animationState, setAnimationState] = useState("");

  const handleIframeLoad = useCallback((event) => {
    event.target.style.opacity = '1';
  }, []);

  const userNameParser = () => {
    const username = userData.name || 'Not found';
    return username;
  }

  useEffect(() => {
    createInvoice();
  }, [fee]);

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [modalVisible]);



  const createInvoice = async () => {
    const response = await fetch("api/lnbits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(fee),
        memo: `Bitcoin HK Membership Dues for ${userNameParser()}`,
      }),
    });
    const data = await response.json();
    if (!iframeSrc && userData) {
      setIframeSrc(`${data.completelink}${data.id}`);
      setPaymentID(data.id);
    }
  };

  const openModal = () => {
    setAnimationState("in");
    setModalVisible(true);
  };

  const closeModal = async () => {
    setAnimationState("out");
    setTimeout(async () => {
      setModalVisible(false);
      const response = await fetch(`/api/lnbits/?paymentID=${paymentID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.paid) setPaid(true);
    }, 1000);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      {!paid ? (
        <button className={styles.payButton} onClick={openModal}>
          <div className={styles.buttonContent}>
            Pay with LNbits{" "}
            <div className={styles.logoContainer}>
              <Image src={lnBitLogo} alt="lnbits logo" width={25} height={25} />
            </div>
          </div>
        </button>
      ) : (
        <span className={styles.paymentConfirmed}>
          Thanks for paying your dues! Check your email for upcoming events and
          ways to contribute!
        </span>
      )}
      {modalVisible && (
        <div
          className={`${styles.modal} ${
            animationState === "in" ? styles.fadeIn : styles.fadeOut
          }`}
          onClick={handleModalClick}
        >
          <div
            className={`${styles.modalContent} ${
              animationState === "in" ? styles.slideIn : styles.slideOut
            }`}
          >
            <iframe
              className={styles.paymentPopup}
              src={iframeSrc}
              title="Payment"
              allow="clipboard-read; clipboard-write"
              onLoad={handleIframeLoad}
            />
            <button
              className={`${styles.closeButton} ${
                animationState === "in" ? styles.fadeIn : styles.fadeOut
              }`}
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LNbitsPayment;
