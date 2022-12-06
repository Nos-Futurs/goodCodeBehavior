import React, { useRef } from "react";
import * as ReactDom from "react-dom";
import { InfosEnum } from "../Shared/methods/enum";
import { CarbonInfos } from "./ModalInfos/CarbonInfos";
import { DataInfos } from "./ModalInfos/DataInfos";
import { TimeInfos } from "./ModalInfos/TimeInfos";
import { BlackAndWhiteRuleInfos } from "./ModalInfos/ToolboxInfos/BlackAndWhiteRule";
import { OfflineTabsInfos } from "./ModalInfos/ToolboxInfos/NonActiveTabRule";
import { DownloadRuleInfos } from "./ModalInfos/ToolboxInfos/NotDownloadingRule";
import { TimeRulesInfos } from "./ModalInfos/ToolboxInfos/TimeRulesInfos";
import { useSimpleModal } from "./useSimpleModal";

const portalDiv: HTMLElement | null = document.getElementById("portal");

export const SimpleModal = () => {
  const node = useRef(null);
  const { isOpen, closeModal, typeModal } = useSimpleModal();

  const informationToDisplay = (type: InfosEnum) => {
    if (type === InfosEnum.TIME) {
      return <TimeInfos />;
    } else if (type === InfosEnum.ENERGY_CARBON) {
      return <CarbonInfos />;
    } else if (type === InfosEnum.DATA) {
      return <DataInfos />;
    } else if (type === InfosEnum.TIME_RULE) {
      return <TimeRulesInfos />;
    } else if (type === InfosEnum.BLACK_WHITE_RULE) {
      return <BlackAndWhiteRuleInfos />;
    } else if (type === InfosEnum.DOWNLOAD_RULE) {
      return <DownloadRuleInfos />;
    } else if (type === InfosEnum.OFFLINE_RULE) {
      return <OfflineTabsInfos />;
    } else {
      return <></>;
    }
  };

  if (!portalDiv) {
    return <></>;
  }

  if (isOpen) {
    return ReactDom.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: "10",
          backgroundColor: "rgba(0, 0, 0, .4)",
          width: "432px",
        }}
      >
        <div
          onClick={() => {
            closeModal();
          }}
          style={{ position: "fixed", width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            right: "10%",
            border: "solid",
            borderRadius: "5px",
            width: "320px",
            height: "240px",
            backgroundColor: "white",
            overflowY: "scroll",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div style={{ margin: "20px" }}>
            {informationToDisplay(typeModal)}
          </div>
        </div>
      </div>,
      portalDiv
    );
  }
  return <></>;
};
