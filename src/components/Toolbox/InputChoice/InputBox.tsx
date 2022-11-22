import React, { useEffect, useState } from "react";
import { ButtonIcon } from "../../Shared/Buttons/ButtonIcon";
import { OnlyIconButton } from "../../shared/Buttons/OnlyIconButton";
import trashCan from "./../../assets/trash-can.png";

interface MySwitchProps {
  port: chrome.runtime.Port;
  disabled?: boolean;
  label: string;
  url: string;
}

function InputBox({ port, url, label }: MySwitchProps) {
  const [timeValue, setTimeValue] = useState(0);
  const [seeRules, setSeeRules] = useState(false);
  const [rules, setRules] = useState<{ domain: string; text: string }[]>([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await chrome.storage.local.get(["timeRulesObject"]);
      let timeRuleObject: any = {};
      if (data["timeRulesObject"] !== undefined) {
        timeRuleObject = JSON.parse(data["timeRulesObject"]);
      }
      let rulesList = [];
      for (let timeInfos in timeRuleObject) {
        rulesList.push({
          domain: timeRuleObject[timeInfos].domain,
          text: `Warning every ${timeRuleObject[timeInfos].time} min active on ${timeRuleObject[timeInfos].domain}.`,
        });
      }
      setRules(rulesList);
    };
    // call the function
    fetchData();
  }, [action]);

  const CreateNewTimeRule = () => {
    port.postMessage({
      msg: "CreateNewTimeRule",
      domain: url,
      timeValue: timeValue,
    });
    setSeeRules(false);
    setAction("CreateNewTimeRule");
  };

  const deleteItem = (domain: string) => {
    port.postMessage({
      msg: "DeleteTimeRule",
      domain,
    });
    setSeeRules(false);
    setAction("DeleteTimeRule");
  };

  return (
    <div
      style={{
        margin: "25px 15px 15px 15px",
        padding: "15px",
        fontSize: "15px",
        backgroundColor: "rgba(58, 112, 39, 0.5)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ paddingRight: "5px" }}>{url}</div>
        <input
          type="number"
          style={{ width: "50px", marginRight: "5px" }}
          placeholder="000"
          min="0"
          onChange={(event) => {
            setTimeValue(parseInt(event.target.value));
          }}
        />
        <div style={{ paddingRight: "25px" }}> min </div>
      </div>
      <div
        style={{
          paddingTop: "5px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ButtonIcon title="Add rule" onClick={CreateNewTimeRule} />
        <ButtonIcon
          title="See rules"
          onClick={() => {
            setSeeRules(!seeRules);
            setAction("seeRules");
          }}
        />
      </div>
      {seeRules &&
        rules.map((rule) => (
          <div
            style={{
              display: "flex",
              paddingTop: "10px",
              flexDirection: "row",
            }}
          >
            <div style={{ width: "80%" }}>{rule.text}</div>
            <OnlyIconButton
              icon={trashCan}
              onClick={() => {
                deleteItem(rule.domain);
              }}
            />
          </div>
        ))}
    </div>
  );
}

export default InputBox;
